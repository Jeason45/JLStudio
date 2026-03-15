# Correct Template — JL Studio Builder
## Prompt pour Claude API : correction chirurgicale du output.json

Tu recois :
- Le **output.json actuel** (le template genere)
- La **liste des corrections** a appliquer (issues detectees par la comparaison visuelle)
- Les **screenshots** : original (site source) vs reproduction (builder)

Ton objectif : appliquer UNIQUEMENT les corrections demandees, sans toucher au reste.

---

## Regles ABSOLUES

1. **Ne modifie QUE les sections/champs mentionnes dans les corrections**
2. **Ne touche PAS aux sections qui fonctionnent** (score >= 90%)
3. **Ne re-genere PAS** de contenu textuel — le texte doit rester identique
4. **Ne change PAS** de variant sauf si explicitement demande dans une correction
5. **Retourne le JSON COMPLET** (pas juste les diffs) car il remplace le fichier

---

## Comment appliquer chaque type de correction

### Categorie: structure
- Changer le `type` ou `variant` d'une section
- Ajouter/supprimer une section manquante
- Reordonner les sections

### Categorie: color
- Modifier `style.background`, `style.customBgColor`, `style.textColor`, `style.accentColor`
- Rappel: `background: "dark"` → PAS de customBgColor
- Rappel: `background: "custom"` → customBgColor OBLIGATOIRE

### Categorie: typography
- Modifier `style.textTransform`, `style.letterSpacing`, `style.fontWeight`, `style.titleSize`
- Ne PAS mettre `textTransform: "uppercase"` si seulement les titres sont uppercase (c'est le comportement par defaut)

### Categorie: image
- Corriger `content.image`, `content.backgroundImage`, `content.images[]`
- Verifier que les URLs sont completes (https://...)

### Categorie: button
- Corriger `content.primaryButton`, `content.secondaryButton`
- Chaque bouton a: `{ label, href, variant }` avec variant = "primary"|"secondary"|"outline"|"ghost"

### Categorie: decoration
- Corriger `content.floatingImages[]`, `content.decorativeIcon`
- Format floatingImages: `{ src, position, size, opacity }`

### Categorie: spacing
- Corriger `style.paddingY`: "none"|"sm"|"md"|"lg"|"xl"
- Corriger `style.fullWidth`: true|false

---

## Champ `field` dans les corrections

Quand une correction indique `field: "style.textColor"`, cela signifie :
- Section concernee → `sections[index].style.textColor`
- Applique la correction EXACTEMENT a ce champ

Quand une correction indique `field: "content.items[2].title"`, cela signifie :
- Section concernee → `sections[index].content.items[2].title`

---

## Format de sortie

Retourner le output.json COMPLET corrige en JSON valide.
Inclure un champ `meta.corrections` avec la liste des corrections appliquees :
```json
{
  "meta": {
    "corrections": [
      "Section 3: changed style.textColor from #000 to #fff",
      "Section 5: changed variant from luxe-grid to luxe-bento"
    ]
  }
}
```
