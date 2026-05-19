# Checklist de mise en prod — Module Publications

À suivre **après le déploiement Coolify** du commit `4387ad6` (ou plus récent).

---

## ✅ 0. Vérification pré-requis

### Coolify a-t-il bien rebuild apps/portal ?

1. Va dans **Coolify > apps/portal > Deployments**
2. Vérifie que le **dernier build est en succès** (commit `4387ad6` ou plus récent)
3. Dans les **Application Logs**, cherche au démarrage du container :
   ```
   🚀  Your database is now in sync with your Prisma schema. Done in XXXms
   ```
   → Si tu vois ça : **les 3 nouvelles tables Publications sont créées en DB** ✅

   Si tu vois à la place :
   ```
   [startup] prisma db push échoué — vérifier les logs ci-dessus
   ```
   → Note l'erreur et envoie-la-moi, je débogue.

### Test rapide UI

1. `portal.jlstudio.dev/login` → JL Studio · CRM Agence
2. Sidebar : vérifie que tu vois la section **Marketing** (rose IG) avec entrée "Publications"
3. Clic sur "Publications" → tu dois voir la page liste (vide, avec bouton "Nouvelle publication")
4. **Pas d'erreur 500** = OK, on continue

---

## 🔐 1. Configurer les variables d'environnement Coolify

Dans **Coolify > apps/portal > Environment Variables**, ajoute :

### `N8N_API_KEY`

Génère une clé aléatoire 32 caractères :

```bash
openssl rand -hex 32
```

Exemple : `c3f5b87e8a4d29f1ee2b6c8a37e0145d92f8b4c7e6d3a1b5f8c9e2d4a7b6f3e1`

→ Copie cette valeur dans Coolify avec la clé `N8N_API_KEY`.

### `CRON_SECRET`

Pareil, génère une autre clé aléatoire :

```bash
openssl rand -hex 32
```

→ Copie dans Coolify avec la clé `CRON_SECRET`.

### Sauvegarde + Restart

- Clique **Save** dans Coolify
- Clique **Restart application** (le container redémarre avec les nouvelles env vars, ~30s)

---

## ⏰ 2. Configurer le cron stale-lease

### Pourquoi ce cron ?

Il libère les targets bloquées en `PUBLISHING` depuis > 10 min (par exemple si n8n crash entre le claim et le callback). Sans ce cron, une cible peut rester "en cours" indéfiniment.

### Setup dans Coolify

1. Va dans **Coolify > apps/portal > Scheduled Tasks** (ou "Cron Jobs" selon ta version Coolify)
2. **Add new scheduled task** :
   - **Name** : `publications-stale-lease`
   - **Command** :
     ```bash
     curl -sS -H "Authorization: Bearer $CRON_SECRET" \
       https://portal.jlstudio.dev/api/cron/publications-stale-lease
     ```
   - **Frequency** : `*/5 * * * *` (toutes les 5 minutes)
   - **Container** : `apps/portal` (le container où la commande est exécutée)
3. **Save** et **Enable**

### Test manuel du cron

Tu peux tester immédiatement depuis le shell Coolify de apps/portal :

```bash
curl -sS -H "Authorization: Bearer $CRON_SECRET" \
  https://portal.jlstudio.dev/api/cron/publications-stale-lease
```

→ Réponse attendue : `{"ok":true,"releasedCount":0,"thresholdMinutes":10,"executedAt":"..."}`

---

## 🤖 3. Setup n8n (workflows)

### Pré-requis

- Un compte n8n actif (cloud ou self-hosted)
- Tes credentials API LinkedIn et/ou Instagram (selon ce que tu veux publier)

### Workflow n8n minimal — "Poll Publications & Publish"

#### Étape 1 — Schedule Trigger
- Type : **Cron**
- Mode : **Every 5 minutes**
- Expression : `*/5 * * * *`

#### Étape 2 — HTTP Request (Poll Pending)
- Method : `GET`
- URL : `https://portal.jlstudio.dev/api/n8n/publications/pending`
- Authentication : **Header Auth**
  - Header name : `Authorization`
  - Header value : `Bearer {{$env.N8N_API_KEY}}` (mets la même valeur qu'en Coolify)
- Response : **JSON** (auto)

#### Étape 3 — Loop Over Items
- Type : **SplitInBatches**
- Batch size : `1` (un par un, pour éviter rate limits)

#### Étape 4 — Switch by Platform
- Branches selon `{{$json.platform}}` :
  - `LINKEDIN` → workflow LinkedIn
  - `INSTAGRAM_FEED` → workflow IG Feed
  - `INSTAGRAM_STORY` → workflow IG Story
  - `INSTAGRAM_REEL` → workflow IG Reel

#### Étape 5 — Pour chaque branche : Claim → Publish → Callback

**5.1 Claim target**
- Method : `POST`
- URL : `https://portal.jlstudio.dev/api/n8n/publications/{{$json.targetId}}/claim`
- Authentication : Header Auth `Bearer ${N8N_API_KEY}`
- Continue On Fail : ✅ (si 409, on passe au suivant)

**5.2 Publish on platform** (exemple LinkedIn)
- Method : `POST`
- URL : `https://api.linkedin.com/v2/ugcPosts`
- Authentication : OAuth2 LinkedIn (tu dois avoir configuré tes credentials LinkedIn dans n8n)
- Body : voir doc LinkedIn API
- Continue On Fail : ✅

**5.3 Callback `/published` (si succès)**
- Method : `POST`
- URL : `https://portal.jlstudio.dev/api/n8n/publications/{{$json.targetId}}/published`
- Authentication : Header Auth `Bearer ${N8N_API_KEY}`
- Body :
  ```json
  {
    "externalId": "{{$node['LinkedIn Publish']['json']['id']}}",
    "publicUrl": "https://www.linkedin.com/feed/update/{{$node['LinkedIn Publish']['json']['id']}}",
    "publishedAt": "{{$now}}"
  }
  ```

**5.4 Callback `/failed` (si échec)**
- Method : `POST`
- URL : `https://portal.jlstudio.dev/api/n8n/publications/{{$json.targetId}}/failed`
- Authentication : Header Auth `Bearer ${N8N_API_KEY}`
- Body :
  ```json
  {
    "errorMessage": "{{$node['LinkedIn Publish']['error']['message']}}",
    "shouldRetry": true
  }
  ```

### Test du workflow

1. **Activate** le workflow dans n8n (toggle "Active")
2. Vérifie dans **Executions** qu'il tourne toutes les 5 min sans erreur
3. Tant qu'aucune publication n'est programmée dans le CRM, le workflow va juste poll et retourner `[]` à chaque tour

---

## 🧪 4. Test end-to-end

### A. Créer une publication test dans le CRM

1. `portal.jlstudio.dev/admin/publications/new`
2. Remplis :
   - **Titre interne** : `Test 1`
   - Coche **LinkedIn**
   - **Texte** : "Test publication automatique via le CRM JL Studio 🚀"
   - **Date** : programme dans **6 minutes** (pour laisser le temps au cron de tourner)
3. Clique **Valider & planifier** (le bouton du milieu)
4. Tu retombes sur la page de la publication, status `SCHEDULED`

### B. Vérifier dans la liste + calendrier

1. `portal.jlstudio.dev/admin/publications` → ta publication "Test 1" apparaît avec badge bleu "Planifié"
2. `portal.jlstudio.dev/admin/publications/calendar` → tu vois un event coloré au jour/heure programmé

### C. Attendre le poll n8n

- Dans les **6-10 minutes suivantes**, n8n va poll `/api/n8n/publications/pending` à un moment
- Il va trouver ta cible, faire le claim, publier sur LinkedIn, et callback `/published`
- Vérifie dans n8n **Executions** que le workflow a tourné avec succès

### D. Vérifier le résultat

1. **Sur ton LinkedIn** : le post est en ligne ✅
2. **Dans le CRM** `/admin/publications/[id]` :
   - Status passe à `PUBLISHED`
   - `publicUrl` rempli avec le lien LinkedIn
   - `publishedAt` rempli avec l'heure exacte

---

## ⚠️ Troubleshooting

### `prisma db push échoué` dans les logs Coolify

Cause probable : DB inaccessible ou conflit de schéma. Envoie-moi les logs complets.

### n8n retourne 401 sur `/api/n8n/...`

Cause : `N8N_API_KEY` pas configuré côté Coolify, ou valeur différente dans n8n.
Vérifie que les 2 valeurs sont **strictement identiques** (copie-colle).

### n8n retourne 409 sur `/claim`

Pas une erreur : la target a déjà été claimed par un autre worker (ou par un test précédent).
Ignore et passe au suivant.

### `Page size != 89×59mm` détecté par Exaprint

(Hors scope publications mais pour mémoire)

### La publication ne sort jamais sur LinkedIn

1. Check n8n **Executions** : le workflow tourne-t-il bien toutes les 5 min ?
2. Check le résultat de `GET /api/n8n/publications/pending` : ta publication y est-elle ?
3. Check les credentials LinkedIn dans n8n : sont-ils valides (pas expirés) ?

---

## 📋 Récap de ce qu'il te reste à faire

- [ ] **Coolify env vars** : ajouter `N8N_API_KEY` et `CRON_SECRET`
- [ ] **Coolify cron** : configurer `publications-stale-lease` toutes les 5 min
- [ ] **n8n workflow** : créer "Poll Publications & Publish" avec les 4 étapes
- [ ] **n8n credentials** : configurer LinkedIn OAuth2 (et/ou Instagram)
- [ ] **Test end-to-end** : créer une publication test dans le CRM et vérifier qu'elle sort sur LinkedIn

Dis-moi à quelle étape tu coinces et je débogue.
