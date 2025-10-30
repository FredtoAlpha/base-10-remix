# WIREFRAMES AVANT/APRÈS - RECOMMANDATIONS VISUELLES

---

## PHASE 5 - AFFICHAGE GROUPES (État Actuel vs Optimisé)

### ÉTAT ACTUEL (100% encombrement)

```
╔═══════════════════════════════════════════════════════════════╗
║ Module Complet de Gestion des Groupes                   [x]   ║ ← 80px header
├───────────────────────────────────────────────────────────────┤
║ [1 Type] → [2 Classes] → [3 Config] → [4 Aperçu] → [5 Groupe]║ ← 40px stepper
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  ┌─────────────────────────────────────────┐  Persistence:  ║
║  │ Pass: "Regroupement 1" (6°1, 6°2)      │  [♻️ Replace]  ║ ← 80px controls
║  │ Classes: [6°1] [6°2] Config: Hétéro    │  [⚡ Continue]  ║
║  └─────────────────────────────────────────┘  Offset: [___] ║
║                                               TEMP 1→15      ║
║  ┌─────────────────────────────────────────┐                ║
║  │ Actions rapides                         │                ║ ← 50px toolbar
║  │ [📊] [🔄] [📥] [💾] [✅] | [📄] [📊] |  │                ║
║  └─────────────────────────────────────────┘                ║
║                                                               ║
║  ┌────────────────┬────────────────┬─────────────────┐       ║
║  │    Groupe 1    │    Groupe 2    │    Groupe 3     │ ...   ║ ← 250px
║  │ [Student 1]    │ [Student 1]    │ [Student 1]     │       ║    groupes
║  │ [Student 2]    │ [Student 2]    │ [Student 2]     │       ║ (3 colonnes)
║  │ [Student 3]    │ [Student 3]    │ [Student 3]     │       ║
║  │ [Student 4]    │ [Student 4]    │ [Student 4]     │       ║
║  └────────────────┴────────────────┴─────────────────┘       ║
║                                                               ║
║                    ┌──────────────────┐                       ║
║                    │   STATS Panel    │ ← 360px wide         ║
║                    │  Distribution:   │                       ║
║                    │  F/M: 24/24 ✅   │                       ║
║                    │  Scores: 12.5±3  │                       ║
║                    │  (Collapsible)   │                       ║
║                    └──────────────────┘                       ║
║                                                               ║
║  📝 Astuce: Glisser-déposer pour rééquilibrer...            ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝

Hauteur utilisable groupes: ~250px (PETIT sur 1080px)
Colonnes visibles: 3 (moyen écran)
```

---

### APRÈS MASQUAGE HEADER (État Actuel ✅)

```
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║  [📌 En-tête masqué]                         (Coin sup-droit)║ ← 40px toggle
║                                                               ║
║  ┌─────────────────────────────────────────┐                ║
║  │ Pass: "Regroupement 1" (6°1, 6°2)      │                ║
║  │ Classes: [6°1] [6°2] Config: Hétéro    │  Persistence:  ║ ← 80px
║  └─────────────────────────────────────────┘  Replace/Cont  ║
║                                                               ║
║  ┌─────────────────────────────────────────┐                ║
║  │ Actions rapides                         │                ║ ← 50px
║  │ [📊] [🔄] [📥] [💾] [✅] | [📄] [📊]    │                ║
║  └─────────────────────────────────────────┘                ║
║                                                               ║
║  ┌────────────────┬────────────────┬────────────────┐        ║
║  │    Groupe 1    │    Groupe 2    │    Groupe 3    │ ...    ║ ← 300px
║  │ [Student 1]    │ [Student 1]    │ [Student 1]    │        ║    groupes
║  │ [Student 2]    │ [Student 2]    │ [Student 2]    │        ║ (3-4 colonnes)
║  │ [Student 3]    │ [Student 3]    │ [Student 3]    │        ║
║  │ [Student 4]    │ [Student 4]    │ [Student 4]    │        ║
║  │ [Student 5]    │ [Student 5]    │ [Student 5]    │        ║
║  └────────────────┴────────────────┴────────────────┘        ║
║                                                               ║
║                    ┌──────────────────┐                       ║
║                    │   STATS Panel    │                       ║
║                    │  Distribution:   │                       ║
║                    │  F/M: 24/24 ✅   │                       ║
║                    │  Scores: 12.5±3  │                       ║
║                    └──────────────────┘                       ║
║                                                               ║
║  📝 Astuce: Glisser-déposer pour rééquilibrer...            ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝

Hauteur utilisable groupes: ~330px (+80px vs header masqué)
Colonnes visibles: 3-4
```

---

### ✨ APRÈS FOCUS MODE (NOUVEAU - Recommandé)

```
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║  ┌──────────────────┬──────────────┬──────────────┬────────┐ ║
║  │   Groupe 1       │  Groupe 2    │  Groupe 3    │Groupe4 │ ║ ← 400px+
║  │ [Student 1]      │[Student 1]   │[Student 1]   │[S1]    │ ║   groupes
║  │ [Student 2]      │[Student 2]   │[Student 2]   │[S2]    │ ║ (4-5 colonnes
║  │ [Student 3]      │[Student 3]   │[Student 3]   │[S3]    │ ║  sur 1920)
║  │ [Student 4]      │[Student 4]   │[Student 4]   │[S4]    │ ║
║  │ [Student 5]      │[Student 5]   │[Student 5]   │[S5]    │ ║
║  │ [Student 6]      │[Student 6]   │[Student 6]   │[S6]    │ ║
║  │ [Student 7]      │[Student 7]   │[Student 7]   │[S7]    │ ║
║  │ [Student 8]      │[Student 8]   │[Student 8]   │[S8]    │ ║
║  │ [Student 9]      │[Student 9]   │[Student 9]   │[S9]    │ ║
║  │ [Student 10]     │[Student 10]  │[Student 10]  │[S10]   │ ║
║  │ [Student 11]     │[Student 11]  │[Student 11]  │[S11]   │ ║
║  │ [Student 12]     │[Student 12]  │[Student 12]  │[S12]   │ ║
║  └──────────────────┴──────────────┴──────────────┴────────┘ ║
║                                                               ║
║  ┌──────────────────┬──────────────┬──────────────┬────────┐ ║
║  │   Groupe 1       │  Groupe 2    │  Groupe 3    │Groupe4 │ ║
║  │ (Scroll down)    │(Scroll down) │(Scroll down) │(Scroll)│ ║
║  └──────────────────┴──────────────┴──────────────┴────────┘ ║
║                                                               ║
║  ┌─────────────────────────────────────────────────────────┐ ║
║  │ 📊 🔄 📥 💾 ✅ | 📄 📊 |  ✕ Expand (F)                    │ ← Barre flottante
║  │ (Toolbar compact fixe en bas)                           │     30px
║  └─────────────────────────────────────────────────────────┘ ║
║                                                               ║
║  ┌─────────────────────────────────────────────────────────┐ ║
║  │ [Expand] Mode focus activé                              │ ← Toggle coin
║  │ Pressez F pour basculer                                 │
║  └─────────────────────────────────────────────────────────┘ ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝

Hauteur utilisable groupes: ~450px (+150px vs normal)
Colonnes visibles: 4-5 (excellent sur 1920)
Avantage: Vue globale complète des groupes
```

---

## PHASE 2 - COMPOSITION (Workflow Actuel vs Proposé)

### WORKFLOW ACTUEL (Confusion Phase 2-3)

```
ÉTAPE 2: Sélection des Classes
┌─────────────────────────────────────────────────────────────┐
│ Composez vos regroupements                                 │
├──────────────┬────────────────────────────────────────────┤
│ Classes:     │ Nouvelle passe                             │
│              │                                             │
│ □ 6°1        │ Label: [_________________]                 │
│ □ 6°2        │ Nombre de groupes: [3]                     │
│ ☑ 6°3        │ → Générera 3 groupe(s)                    │
│ □ 5°1        │                                             │
│ ☑ 5°2        │ [Enregistrer cette passe]                  │
│ □ 4°1        │                                             │
│              │ Regroupements créés:                        │
│ Tout sel. □  │ □ (aucun)                                  │
│ Tout désel.  │                                             │
│              │                                             │
└──────────────┴────────────────────────────────────────────┘

↓ Continuer

ÉTAPE 3: Configuration
┌─────────────────────────────────────────────────────────────┐
│ Paramétrez vos groupes                                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Type sélectionné: Groupes de Besoins                       │
│                                                             │
│ (mais type choisi en Ét.1, pas rechangeable ici)           │
│                                                             │
│ Sujet: ○ Math + FR   ● Mathématiques   ○ Français         │
│                                                             │
│ Distribution:                                               │
│ ● Hétérogène (tous niveaux mélangés)                       │
│ ○ Homogène (par niveau)                                    │
│                                                             │
│ (Aucune info sur ce que "hétéro" fait réellement)          │
│                                                             │
│ [Pas d'historique des passes précédentes]                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Problèmes:
❌ User crée une "passe" en Ét.2, puis veux en créer une 2e?
   Doit revenir à Ét.2, refaire la sélection...
❌ Ét.3 = config type, mais c'est pareil pour TOUTES les passes
❌ Pas de visualisation des passes créées avant Ét.4
❌ Config pas liée à une passe spécifique → confusion
```

---

### WORKFLOW PROPOSÉ (Phase 2 = Builder Unique)

```
ÉTAPE 2: Builder Multi-Pass
┌─────────────────────────────────────────────────────────────┐
│ Composez vos passes de regroupement                        │
│                                                             │
│ Passes: [Pass 1] [Pass 2] [+Ajouter]  ← Onglets           │
├──────────────────────────────────────────────────────────────┤
│                                                             │
│ ┌───────────────────────┐  ┌──────────────────────────┐   │
│ │ SÉLECTION CLASSES     │  │ CONFIGURATION PASS       │   │
│ │                       │  │                          │   │
│ │ ☑ 6°1                │  │ Label: [Pass 1]          │   │
│ │ ☑ 6°2                │  │ Groupes: [3] =========[3]│   │
│ │ □ 6°3                │  │                          │   │
│ │ □ 5°1                │  │ CONFIG (Type Besoins):   │   │
│ │ ☑ 5°2                │  │ Sujet: ● Math+FR         │   │
│ │ □ 4°1                │  │ Distrib: ● Hétéro        │   │
│ │                       │  │                          │   │
│ │ 3 classe(s)          │  │ STATS:                   │   │
│ │                       │  │ 48 élèves estimés        │   │
│ │ Tout sel. | Tout dés.│  │ → 3 groupes × 16 él.    │   │
│ │                       │  │                          │   │
│ │                       │  │ ℹ️ Info: Hétérogène =   │   │
│ │                       │  │ mélange tous niveaux     │   │
│ │                       │  │                          │   │
│ │ [Enregistrer] [Suppr]│  │ [Enregistrer] [Annuler]  │   │
│ └───────────────────────┘  └──────────────────────────┘   │
│                                                             │
│ PASSES ENREGISTRÉES (sidebar):                             │
│ ┌────────────────────────────────────────┐                │
│ │ Pass 1: "6°1-6°2"                      │                │
│ │ Classes: 6°1, 6°2 | 3 groupes         │                │
│ │ Config: Besoins (Hétéro, Math+FR)     │                │
│ │ Créé: 14h32                            │                │
│ │                                        │                │
│ │ [Modifier] [Dupliquer] [Supprimer]    │                │
│ └────────────────────────────────────────┘                │
│                                                             │
│ ┌────────────────────────────────────────┐                │
│ │ Pass 2: "5°1-5°2"                      │                │
│ │ Classes: 5°1, 5°2 | 2 groupes         │                │
│ │ Config: LV2 (ESP)                       │                │
│ │ Créé: 14h42                            │                │
│ └────────────────────────────────────────┘                │
│                                                             │
│ [Continuer vers validation]                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Avantages:
✅ Tout en une étape (composition + config)
✅ Visualisation immédiate des passes créées
✅ Onglets pour gérer N passes sans confusion
✅ Info contextuelle (stats, définitions)
✅ Validé avant "Continuer"
```

---

## PHASE 4 - VALIDATION (Aperçu Actuel vs Proposé)

### ÉTAT ACTUEL (Vide & Inutile)

```
ÉTAPE 4: Aperçu
┌─────────────────────────────────────────────────────────────┐
│ Vérification avant génération                              │
│                                                             │
│ Configuration:                                              │
│ ├─ Type: Groupes de Besoins                               │
│ ├─ Sujet: Math + Français                                  │
│ ├─ Distribution: Hétérogène                                │
│ └─ Classes: 6°1, 6°2, 6°3 (3 classes)                     │
│                                                             │
│ [Générer les groupes] (bouton seul)                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Problèmes:
❌ Pas de stats (combien d'élèves? taille groupes?)
❌ Pas de warnings (classe trop petite?)
❌ Pas de recommandation (hétéro approprié?)
❌ Pas d'aperçu du résultat
❌ User génère "en aveugle"
```

---

### APRÈS VALIDATION AMÉLIORÉE (Proposé)

```
ÉTAPE 3: Validation Avant Génération
┌─────────────────────────────────────────────────────────────┐
│ Vérification avant génération                              │
│                                                             │
│ PASSE 1: "6°1 + 6°2"                                      │
│ ┌─────────────────────────────────────────────────────────┐│
│ │ Classes: 6°1, 6°2                                       ││
│ │ Élèves: ~48    │ Groupes: 3    │ Taille/grp: ~16     ││
│ │                                                         ││
│ │ Config: Besoins (Hétéro, Math+FR)                      ││
│ │                                                         ││
│ │ ⚠️ WARNINGS:                                            ││
│ │    → Taille/groupe = 16 (optimal = 12-20) ✅            ││
│ │                                                         ││
│ │ 💡 RECOMMANDATION:                                      ││
│ │    → Hétérogène RECOMMANDÉ pour équilibre niveau       ││
│ │      Parité F/M estimée: 24/24 ✅                       ││
│ └─────────────────────────────────────────────────────────┘│
│                                                             │
│ PASSE 2: "5°1 + 5°2"                                      │
│ ┌─────────────────────────────────────────────────────────┐│
│ │ Classes: 5°1, 5°2                                       ││
│ │ Élèves: ~44    │ Groupes: 2    │ Taille/grp: ~22     ││
│ │                                                         ││
│ │ Config: LV2 (ESP)                                       ││
│ │                                                         ││
│ │ ⚠️ WARNINGS:                                            ││
│ │    → Groupes un peu grands (22 > 20) ⚠️                 ││
│ │       Considérez 3 groupes = ~14 él./groupe            ││
│ │                                                         ││
│ │ ℹ️ LV2: Équilibre par participation automatique        ││
│ └─────────────────────────────────────────────────────────┘│
│                                                             │
│ RÉSUMÉ GLOBAL:                                             │
│ ┌─────────────────────────────────────────────────────────┐│
│ │ Total élèves: 92      │ Total groupes: 5                ││
│ │ Taille moyenne: 18.4  │ Temps estimé: ~8 secondes      ││
│ │                                                         ││
│ │ État: ✅ PRÊT À GÉNÉRER                                  ││
│ └─────────────────────────────────────────────────────────┘│
│                                                             │
│ [Retour à Config] [Générer tous les groupes]              │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Avantages:
✅ Stats claires par passe
✅ Warnings détectent problèmes
✅ Recommandations pédagogiques
✅ Estimation taille groupes
✅ User génère "les yeux ouverts"
```

---

## PHASE 5 - STATISTIQUES GROUPES (Avant vs Après)

### ÉTAT ACTUEL (Basique)

```
STATS PANEL (Droit)
┌─────────────────────┐
│ Distribution:       │
│ F/M: 24/24 ✅       │
│                     │
│ Scores:             │
│ Moy: 12.5           │
│ StdDev: 3.2         │
│                     │
│ Participation:      │
│ Moy: 7.5 /10        │
│                     │
│ Communication:      │
│ Moy: 6.8 /10        │
│                     │
│ Détail par groupe:  │
│ G1: 12 él, 6F/6M    │
│ G2: 12 él, 6F/6M    │
│ G3: 12 él, 6F/6M    │
│                     │
└─────────────────────┘

Manque:
❌ Audit de l'équilibre réel
❌ Quality score global
❌ Chi-square test F/M
❌ Variance taille groupes
```

---

### APRÈS AUDIT QUALITÉ ENRICHI (Proposé)

```
STATS & QUALITY PANEL
┌──────────────────────────────────────┐
│ 📊 RAPPORT QUALITÉ                   │
├──────────────────────────────────────┤
│                                      │
│ PARITÉ F/M PAR GROUPE                │
│ ✅ Équilibrée (p=0.67)               │
│ χ² = 0.8, df=2                       │
│                                      │
│ VARIANCE TAILLE GROUPES              │
│ ✅ Bon (CV=4.2%)                     │
│ 12 ± 0.5 élèves/groupe               │
│                                      │
│ DISTRIBUTION SCORES                  │
│ ✅ Équilibrée (±0.6 du global)       │
│ Écart max: 0.6/20                    │
│                                      │
│ ┌──────────────────────────────────┐ │
│ │ SCORE QUALITÉ GLOBAL: 87/100      │ │
│ │ ████████░░░░░░░░░░░░░░ 87%        │ │
│ │                                  │ │
│ │ ⭐ EXCELLENT - Groupes bien      │ │
│ │   équilibrés sur tous critères   │ │
│ └──────────────────────────────────┘ │
│                                      │
│ DÉTAIL PAR GROUPE:                   │
│ ┌────────────────────────────────┐  │
│ │ Gr│ Él │ F/M   │ Score │ PART   │  │
│ ├────────────────────────────────┤  │
│ │ 1 │ 12 │ 6/6   │ 12.6  │ 7.4    │  │
│ │ 2 │ 12 │ 6/6   │ 12.3  │ 7.5    │  │
│ │ 3 │ 12 │ 6/6   │ 12.5  │ 7.6    │  │
│ └────────────────────────────────┘  │
│                                      │
│ Statistiques globales:               │
│ Total: 36 él, 18F/18M                │
│ Score moy: 12.5 ± 3.1                │
│ Parité: Excellente                   │
│                                      │
└──────────────────────────────────────┘

Avantages:
✅ Validation statistique claire
✅ Quality score pour décision
✅ Détails par groupe lisibles
✅ Confiance dans la répartition
```

---

## RÉSUMÉ VISUELS

### Gain d'Espace Phase 5

```
Résolution: 1920 x 1080

Mode Normal:
┌─────────────────────────────────┐
│ Header: 100px                   │ ← Consomme espace
│ Stepper: 40px                   │ ← Utile mais limité
│ Controls: 80px                  │ ← Persistance
│ Toolbar: 50px                   │ ← Actions
│ ────────────────────────────────│
│ Groupes: 250px (3 colonnes)     │ ← Petit!
│ Stats: 360px (côté)             │ ← Réduit grille
└─────────────────────────────────┘

Mode Focus (NOUVEAU):
┌─────────────────────────────────┐
│ (Header: 0px - masqué)          │ ← Libère espace
│ (Controls: 0px - masqué)        │ ← Libère espace
│ (Toolbar: 30px - flottant)      │ ← Réduit
│ ────────────────────────────────│
│ Groupes: 450px (4-5 colonnes)   │ ← GRAND!
│ Stats: 0px (toggle sur S)       │ ← Optionnel
│                                 │
│ +200px gain hauteur → 4-5 col   │ ← Meilleure vue
└─────────────────────────────────┘

Gain: +80% espace groupes disponible
```

---

## NAVIGATION SHORTCUTS (Clavier)

```
Phase 5 - Raccourcis activés:

H : Toggle header masqué/visible
    "En-tête masqué" ↔ "En-tête affiché"

F : Toggle Focus mode normal/focus
    "Mode focus activé" ↔ "Mode normal"

S : Toggle Statistiques visible/caché
    "Stats affichées" ↔ "Stats masquées"

? : Afficher aide shortcuts (optionnel)

Avantages:
✅ Experts utilisent keyboard workflow complet
✅ Pas besoin de chercher boutons
✅ Fluide et rapide
```

---

## ITÉRATION RECOMMANDÉE

```
SPRINT 1 (1-2 jours):
├─ Masquage header amélioré + animation
├─ Focus mode implémentée
├─ Validation Phase 4 (stats + warnings)
└─ Test multi-viewport ✅

SPRINT 2 (2-3 jours):
├─ Refactor Phase 2-3 en Builder
├─ Audit algo (chi-square, variance)
├─ Quality report en stats panel
└─ Test multi-scenarios ✅

SPRINT 3 (1 jour):
├─ Weighted scores + critères pédagos
├─ Comparaison hétéro vs homo
└─ Polish & perf ✅

Résultat Final:
✅ Workflow clair (4 phases logiques)
✅ Phase 5 optimisée (focus mode)
✅ Validation solide (pré-génération)
✅ Audit qualité (post-génération)
✅ Algo plus intelligent (weighted scores)
```

