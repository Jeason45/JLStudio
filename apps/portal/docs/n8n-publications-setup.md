# Setup n8n — Publications réseaux sociaux

Cette documentation décrit comment configurer n8n pour qu'il publie automatiquement
les `PostTarget` créés depuis le CRM JL Studio (`portal.jlstudio.dev`).

## Architecture

```
┌─────────────────────────────┐       ┌─────────────────────────┐
│  portal.jlstudio.dev        │       │  n8n                    │
│  (CRM JL Studio)            │       │  workflows              │
│                             │       │                         │
│  PostCampaign / PostTarget  │◀──────┤  1. Poll /pending (5min)│
│                             │       │  2. Claim target         │
│                             │──────▶│  3. Publish to network   │
│                             │       │  4. Callback /published  │
│                             │       │     ou /failed           │
└─────────────────────────────┘       └─────────────────────────┘
```

Le CRM est la **source de contenu unique**. n8n exécute les publications mais
**ne stocke aucun état persistant** — le CRM est la source de vérité.

## Variables d'environnement portail (à configurer côté Coolify)

```
N8N_API_KEY=<générer une string aléatoire 32+ chars>
CRON_SECRET=<générer une string aléatoire 32+ chars>  # pour /api/cron/*
```

Générer une clé : `openssl rand -hex 32`

## Endpoints exposés par le portail

Tous les endpoints `/api/n8n/*` exigent le header :
```
Authorization: Bearer <N8N_API_KEY>
```

### `GET /api/n8n/publications/pending`

Retourne les targets prêtes à publier.

**Query params optionnels :**
- `platform=LINKEDIN` — filtre par plateforme
- `limit=10` — max 100 (default 50)

**Réponse :**
```json
[
  {
    "targetId": "ckxxx",
    "campaignId": "ckyyy",
    "campaignTitle": "Annonce launch v3",
    "platform": "LINKEDIN",
    "scheduledAt": "2026-05-19T14:00:00.000Z",
    "content": {
      "platform": "LINKEDIN",
      "text": "Nouveau site live...",
      "hashtags": ["freelance", "webdesign"],
      "firstCommentText": "Lien dans le 1er commentaire 👉 ..."
    },
    "media": [
      {
        "id": "med_xxx",
        "url": "https://.../image.jpg",
        "thumbnailUrl": "https://.../image-thumb.jpg",
        "mimeType": "image/jpeg",
        "width": 1200,
        "height": 1500,
        "alt": "Aperçu site",
        "role": "primary",
        "position": 0
      }
    ],
    "priority": 0,
    "attempts": 0
  }
]
```

### `POST /api/n8n/publications/:targetId/claim`

À appeler **avant** de publier sur le réseau. Marque la target en `PUBLISHING`
de manière atomique (évite la double publication).

**Réponses :**
- `200 OK { ok: true, claimedAt }` → claim réussi, n8n peut publier
- `409 Conflict` → déjà claimé par un autre worker, abandonner
- `404 Not Found` → target n'existe plus

### `POST /api/n8n/publications/:targetId/published`

À appeler **après** publication réussie.

**Body :**
```json
{
  "externalId": "urn:li:activity:7012345...",
  "publicUrl": "https://linkedin.com/feed/update/...",
  "publishedAt": "2026-05-19T14:00:31.000Z"
}
```

### `POST /api/n8n/publications/:targetId/failed`

À appeler en cas d'échec.

**Body :**
```json
{
  "errorMessage": "LinkedIn API rate limited",
  "shouldRetry": true
}
```

- `shouldRetry=true` + `attempts < 3` → repasse en `SCHEDULED`, retenté au prochain poll
- Sinon → marqué `FAILED` définitivement, demande intervention manuelle

## Workflow n8n recommandé — "Publish Pending"

### 1. Trigger
- **Schedule Trigger** : Cron `*/5 * * * *` (toutes les 5 min)

### 2. HTTP Request (poll pending)
```
Method: GET
URL: https://portal.jlstudio.dev/api/n8n/publications/pending
Authentication: Header Auth → Authorization: Bearer {{$env.N8N_API_KEY}}
```

### 3. Loop Over Items
Itère sur chaque target retournée.

### 4. Switch by Platform
4 branches :
- `LINKEDIN` → workflow LinkedIn
- `INSTAGRAM_FEED` → workflow IG Feed
- `INSTAGRAM_STORY` → workflow IG Story
- `INSTAGRAM_REEL` → workflow IG Reel

### 5. Pour chaque branche : Claim → Publish → Callback

**5.1 Claim**
```
Method: POST
URL: https://portal.jlstudio.dev/api/n8n/publications/{{$json.targetId}}/claim
Authentication: Bearer {{$env.N8N_API_KEY}}
```

Si 409 → continue à l'item suivant (déjà traité par un autre worker).

**5.2 Publish on network**

Exemples par plateforme :

#### LinkedIn (via API officielle)
```
Method: POST
URL: https://api.linkedin.com/v2/ugcPosts
Headers:
  Authorization: Bearer {{$env.LINKEDIN_ACCESS_TOKEN}}
  X-Restli-Protocol-Version: 2.0.0
Body:
  {
    "author": "urn:li:person:{{$env.LINKEDIN_USER_URN}}",
    "lifecycleState": "PUBLISHED",
    "specificContent": {
      "com.linkedin.ugc.ShareContent": {
        "shareCommentary": { "text": "{{$json.content.text}}" },
        "shareMediaCategory": "{{$json.media.length > 0 ? 'IMAGE' : 'NONE'}}"
        ...
      }
    },
    "visibility": { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" }
  }
```

#### Instagram (via Meta Graph API ou Buffer/Hootsuite)
Voir doc Meta Business : `https://developers.facebook.com/docs/instagram-api`.
Alternative : utiliser un agrégateur (Buffer/Hootsuite/Later) avec son API.

**5.3 Callback /published ou /failed**

Si publication réussie :
```
Method: POST
URL: https://portal.jlstudio.dev/api/n8n/publications/{{$json.targetId}}/published
Body:
  {
    "externalId": "{{$node['LinkedIn Publish']['json']['id']}}",
    "publicUrl": "https://linkedin.com/feed/update/{{$node['LinkedIn Publish']['json']['id']}}",
    "publishedAt": "{{$now}}"
  }
```

Si échec (try/catch dans n8n) :
```
Method: POST
URL: https://portal.jlstudio.dev/api/n8n/publications/{{$json.targetId}}/failed
Body:
  {
    "errorMessage": "{{$node['LinkedIn Publish']['error']['message']}}",
    "shouldRetry": true
  }
```

## Stale lease protection

Si n8n crash entre **claim** et **published/failed**, la target reste en `PUBLISHING`
indéfiniment. Un cron portal interne (`/api/cron/publications-stale-lease`)
repasse à `SCHEDULED` toutes les targets en `PUBLISHING` figées depuis > **10 min**.

Configurer dans Coolify (ou Vercel Cron) :
```
*/5 * * * *  curl -H "Authorization: Bearer $CRON_SECRET" \
             https://portal.jlstudio.dev/api/cron/publications-stale-lease
```

## Test manuel

### 1. Tester l'auth (avec curl)
```bash
curl -H "Authorization: Bearer $N8N_API_KEY" \
  https://portal.jlstudio.dev/api/n8n/publications/pending
```

Réponse attendue : `[]` (si aucune target SCHEDULED) ou un tableau de targets.

### 2. Simuler le cycle complet
1. Créer une publication dans le CRM (`/admin/publications/new`)
2. Sélectionner LinkedIn, remplir le texte, planifier dans 1 min
3. Lancer le workflow n8n manuellement
4. Vérifier : status passe à `PUBLISHING` puis `PUBLISHED`, `publicUrl` rempli

## Sécurité

- **N8N_API_KEY** : 32+ caractères aléatoires, rotation tous les 6 mois
- **HTTPS only** : tous les endpoints `/api/n8n/*` exigent TLS
- **Rate limiting** : à ajouter si besoin (pas d'attaque connue actuellement, n8n est trusted)
- **Logs** : tous les callbacks loggent via `pino` (visible Coolify logs)

## Évolutions V2

- Ajouter `POST /api/n8n/publications/:targetId/metrics` pour sync les likes/views/comments
- Support `FACEBOOK`, `TIKTOK`, `YOUTUBE_SHORT`, `TWITTER` (ajouter à l'enum Prisma)
- Multi-compte par plateforme (table `SocialAccount`)
- Webhook bidirectionnel : portail notifie n8n d'une nouvelle target prête (au lieu du poll)
