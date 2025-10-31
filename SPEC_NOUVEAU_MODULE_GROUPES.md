# SPÉCIFICATION: Nouveau Module de Groupes (Option B - Complet)

**Date**: 31 octobre 2025  
**Status**: 🎯 En Conception  
**Objectif**: Implémenter un module multi-passes avec algorithme de répartition intelligent et interface ergonomique 3 panneaux

---

## 1. Architecture Générale

### 1.1 Flux Utilisateur Cible

```
┌─────────────────────────────────────────────────────────────────┐
│ PANNEAU 1: Sélection Scénario (Vertical, 3 colonnes)           │
├─────────────────────────────────────────────────────────────────┤
│ [Groupes de Besoins] [Groupes LV2] [Groupes d'Options]        │
│ (Cartes cliquables, une seule sélectionnée)                    │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PANNEAU 2: Mode de Répartition (Accordéon déroulant)           │
├─────────────────────────────────────────────────────────────────┤
│ ▼ Mode de Répartition                                           │
│   ├─ [○ Hétérogène] Tous niveaux mélangés (recommandé)        │
│   └─ [○ Homogène] Regrouper par niveau                         │
│                                                                  │
│ ▼ Associations Classes ↔ Groupes                               │
│   ├─ Classe A + B → 3 groupes [Modifier]                      │
│   ├─ Classe C + D + E → 4 groupes [Modifier]                  │
│   └─ [+ Ajouter Association]                                   │
│                                                                  │
│ [Générer les groupes]                                          │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PANNEAU 4: Manipulation & Swap (Hauteur maximale)              │
├─────────────────────────────────────────────────────────────────┤
│ [Passe 1] [Passe 2] [Passe 3]  [Stats ▼]                      │
│                                                                  │
│ ┌──────────────┬──────────────┬──────────────┐                 │
│ │ Groupe 1     │ Groupe 2     │ Groupe 3     │                 │
│ │ (grBe1)      │ (grBe2)      │ (grBe3)      │                 │
│ ├──────────────┼──────────────┼──────────────┤                 │
│ │ 15 élèves    │ 15 élèves    │ 14 élèves    │                 │
│ │ 8F/7M        │ 7F/8M        │ 8F/6M ⚠️     │                 │
│ │ Moy: 14.2    │ Moy: 14.1    │ Moy: 13.8    │                 │
│ ├──────────────┼──────────────┼──────────────┤                 │
│ │ • Élève 1    │ • Élève 16   │ • Élève 31   │                 │
│ │ • Élève 2    │ • Élève 17   │ • Élève 32   │                 │
│ │ • ...        │ • ...        │ • ...        │                 │
│ │ (Drag/Drop)  │ (Drag/Drop)  │ (Drag/Drop)  │                 │
│ └──────────────┴──────────────┴──────────────┘                 │
│                                                                  │
│ [Régénérer] [Undo] [Redo] [Sauvegarder TEMP] [Finaliser]     │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 Élimination du Système 1 (Legacy)

**À supprimer complètement**:
- Propriétés state: `selectedClasses`, `numGroups`, `generatedGroups` (remplacées par regroupements)
- Logique Step 2 simple (remplacée par composer)
- Rendu Step 5 plat (remplacé par tabs + colonnes)

**À conserver et adapter**:
- Utilitaires: `qs()`, `qsa()`, `escapeHtml()`, `showToast()`, `formatDate()`
- Normalisation élèves: `normalizeStudentFromSheet()`
- Drag & Drop: logique de swap (à durcir)
- Export: PDF, CSV, JSON

---

## 2. Données & État

### 2.1 State Object (Nouveau)

```javascript
const state = {
  // Navigation
  currentStep: 1,
  totalSteps: 4,  // Réduit à 4 (Scénario, Mode, Associations, Manipulation)

  // Scénario pédagogique
  groupType: null,  // 'needs' | 'language' | 'option'

  // Mode de répartition
  distributionMode: 'heterogeneous',  // 'heterogeneous' | 'homogeneous'

  // Regroupements (multi-passes)
  regroupements: [
    {
      id: 'reg_1',
      label: 'Passe 1',
      classes: ['6°1', '6°2'],
      groupCount: 3,
      offsetStart: 1,
      offsetEnd: null,
      lastTempRange: null,
      lastFinalRange: null
    }
  ],
  activeRegroupementId: 'reg_1',

  // Données brutes
  classesData: {},  // { "6°1FIN": { eleves: [...] }, ... }
  classKeyMap: {},  // "6°1" → "6°1FIN"

  // Élèves du regroupement actif
  students: [],
  studentsById: new Map(),

  // Groupes générés (par regroupement)
  groupsByRegroupement: {
    'reg_1': {
      groups: [
        {
          id: 'grp_1',
          number: 1,
          students: [{ id, nom, prenom, scores: {...}, sexe, ... }],
          stats: { avgScoreM, avgScoreF, avgCom, avgTra, avgPart, absCount, ratioF }
        }
      ],
      timestamp: '2025-10-31T12:00:00Z'
    }
  },

  // Historique des swaps (pour undo/redo)
  swapHistory: [],
  swapHistoryIndex: -1,

  // Configuration spécifique au scénario
  config: {
    subject: 'both',  // 'both' | 'maths' | 'french' (pour Besoins)
    selectedLanguage: null,  // Pour LV2
    selectedOption: null  // Pour Options
  },

  // Métadonnées
  availableLanguages: [],
  availableOptions: [],
  
  // UI
  isLoading: false,
  loadError: null,
  modal: null
};
```

### 2.2 Regroupement Object

```javascript
{
  id: 'reg_1',                    // Identifiant unique
  label: 'Passe 1',               // Nom lisible
  classes: ['6°1', '6°2'],        // Classes incluses
  groupCount: 3,                  // Nombre de groupes à créer
  offsetStart: 1,                 // Numéro du premier groupe
  offsetEnd: null,                // Numéro du dernier groupe (après génération)
  lastTempRange: null,            // { start, end } après saveTempGroups
  lastFinalRange: null            // { start, end } après finalizeTempGroups
}
```

### 2.3 Student Object (Enrichi)

```javascript
{
  id: 'eleve_123',
  nom: 'Dupont',
  prenom: 'Jean',
  classe: '6°1',
  sexe: 'M',  // 'F' | 'M'
  
  // Scores académiques (source unique)
  scoreM: 14.5,  // Mathématiques
  scoreF: 13.2,  // Français
  
  // Scores comportementaux
  com: 8,        // Communication
  tra: 7,        // Travail
  part: 9,       // Participation
  abs: 2,        // Absences
  
  // Métadonnées
  lv2: 'ESP',    // Langue vivante 2
  opt: 'Art',    // Option
  
  // Normalisé (calculé)
  z_scoreM: 0.5,
  z_scoreF: -0.3,
  z_com: 0.2,
  z_tra: -0.1,
  z_part: 0.8,
  z_abs: -0.4,
  
  // Indice composite (calculé)
  indice: 0.42
}
```

---

## 3. Algorithme de Répartition

### 3.1 Normalisation & Pondération

**Étape 1: Centrage-Réduction (Z-score)**

Pour chaque colonne (scoreM, scoreF, com, tra, part, abs):
```javascript
z_value = (value - mean) / stdDev
```

Où `mean` et `stdDev` sont calculés sur TOUS les élèves du regroupement actif.

**Étape 2: Pondérations Dynamiques**

```javascript
const weights = {
  needs: {
    scoreM: 0.35,
    scoreF: 0.35,
    com: 0.15,
    tra: 0.10,
    part: 0.05,
    abs: -0.10  // Négatif: décourager concentration absents
  },
  language: {
    scoreM: 0.20,
    scoreF: 0.40,  // Renforcé pour LV2
    com: 0.10,
    tra: 0.10,
    part: 0.15,    // Renforcé pour participation
    abs: -0.05
  },
  option: {
    scoreM: 0.25,
    scoreF: 0.25,
    com: 0.15,
    tra: 0.15,
    part: 0.10,
    abs: -0.10
  }
};
```

**Étape 3: Indice Composite**

```javascript
indice = (
  weights.scoreM * z_scoreM +
  weights.scoreF * z_scoreF +
  weights.com * z_com +
  weights.tra * z_tra +
  weights.part * z_part +
  weights.abs * z_abs
)
```

### 3.2 Stratégie Hétérogène

1. **Tri par indice décroissant** (meilleur au pire)
2. **Distribution serpentine** (round-robin inverse):
   ```
   Groupe 1: [Élève 1, Élève 4, Élève 7, ...]
   Groupe 2: [Élève 2, Élève 5, Élève 8, ...]
   Groupe 3: [Élève 3, Élève 6, Élève 9, ...]
   ```
3. **Ajustement parité F/M**: Si écart > 1, swap local pour rapprocher 50/50
4. **Vérification équilibre comportemental**: Alerter si écart > ±10%

### 3.3 Stratégie Homogène

1. **Tri par indice décroissant**
2. **Regroupement par quantiles**:
   ```
   Groupe 1 (Forts): Élèves 1-5 (top 25%)
   Groupe 2 (Moyens-Forts): Élèves 6-10 (25-50%)
   Groupe 3 (Moyens-Faibles): Élèves 11-15 (50-75%)
   Groupe 4 (Faibles): Élèves 16-20 (75-100%)
   ```
3. **Ajustement parité** dans chaque quantile
4. **Alertes** si déséquilibre comportemental

---

## 4. Interface & Composants

### 4.1 Panneau 1: Sélection Scénario

```html
<div class="grid grid-cols-3 gap-4">
  <div class="card cursor-pointer" data-scenario="needs">
    <div class="icon">📊</div>
    <h3>Groupes de Besoins</h3>
    <p>Hétérogènes basés sur scores Math/Français</p>
  </div>
  <div class="card cursor-pointer" data-scenario="language">
    <div class="icon">🗣️</div>
    <h3>Groupes LV2</h3>
    <p>Langues (ESP/ITA) avec priorité participation</p>
  </div>
  <div class="card cursor-pointer" data-scenario="option">
    <div class="icon">🎨</div>
    <h3>Groupes d'Options</h3>
    <p>Basés sur options choisies (Art, Musique...)</p>
  </div>
</div>
```

### 4.2 Panneau 2: Mode & Associations (Accordéon)

**Section 1: Mode de Répartition**
```html
<div class="accordion-item">
  <h4>Mode de Répartition</h4>
  <div class="radio-group">
    <label>
      <input type="radio" name="distribution" value="heterogeneous" checked>
      Hétérogène (tous niveaux mélangés) ✓ Recommandé
    </label>
    <label>
      <input type="radio" name="distribution" value="homogeneous">
      Homogène (regrouper par niveau)
    </label>
  </div>
</div>
```

**Section 2: Associations Classes ↔ Groupes**
```html
<div class="accordion-item">
  <h4>Associations Classes ↔ Groupes</h4>
  <div class="associations-list">
    <div class="association-card">
      <span>Classe A + B → 3 groupes</span>
      <button data-action="edit-association">Modifier</button>
      <button data-action="delete-association">Supprimer</button>
    </div>
    <!-- Plus d'associations -->
  </div>
  <button data-action="add-association">+ Ajouter Association</button>
</div>
```

**Modal: Éditer Association**
```html
<div class="modal">
  <h3>Éditer Association</h3>
  <div class="class-selector">
    <!-- Checkboxes des classes -->
  </div>
  <input type="number" placeholder="Nombre de groupes" min="1" max="10">
  <button>Sauvegarder</button>
</div>
```

### 4.3 Panneau 4: Manipulation (Colonnes)

**Header avec Sélecteur Regroupement**
```html
<div class="flex gap-2 mb-4">
  <button class="tab active" data-regroupement-id="reg_1">Passe 1</button>
  <button class="tab" data-regroupement-id="reg_2">Passe 2</button>
  <button class="dropdown" data-action="show-stats">Stats ▼</button>
</div>
```

**Colonnes Groupes (Drag & Drop)**
```html
<div class="groups-container grid grid-cols-3 gap-4">
  <div class="group-column" data-group-id="grp_1">
    <div class="group-header">
      <h4>Groupe 1 (grBe1)</h4>
      <div class="stats">
        <span>15 élèves</span>
        <span>8F/7M</span>
        <span class="avg">Moy: 14.2</span>
        <span class="alert" title="Déséquilibre détecté">⚠️</span>
      </div>
    </div>
    <div class="students-list" data-droppable="true">
      <!-- Élèves draggables -->
    </div>
  </div>
  <!-- Plus de colonnes -->
</div>
```

**Barre d'Actions**
```html
<div class="actions-bar">
  <button data-action="regenerate">Régénérer</button>
  <button data-action="undo" disabled>Undo</button>
  <button data-action="redo" disabled>Redo</button>
  <button data-action="save-temp">💾 Sauvegarder TEMP</button>
  <button data-action="finalize">✅ Finaliser</button>
</div>
```

---

## 5. Contraintes de Swap

### 5.1 Règles Strictes

1. **Bloc de classe**: Un élève ne peut être swappé que dans son bloc (ex: élèves de 6°1+6°2 restent dans leurs 3 groupes)
2. **Pas de swap inter-blocs**: Tentative → message d'erreur + suggestion d'action explicite
3. **Parité F/M**: Swap bloqué si écart > 2 après l'opération
4. **Équilibre académique**: Alerte si écart moyen > ±15% après swap

### 5.2 Feedback Utilisateur

```javascript
// Tentative de drag hors bloc
if (sourceGroupBlock !== targetGroupBlock) {
  showAlert('❌ Impossible: cet élève appartient au bloc ' + sourceGroupBlock);
  showSuggestion('💡 Pour changer de bloc, créez une nouvelle association');
  return false;
}

// Parité violée
if (Math.abs(newFCount - newMCount) > 2) {
  showAlert('⚠️ Swap bloqué: déséquilibre F/M trop important');
  return false;
}

// Swap autorisé
performSwap();
updateStats();
recordHistory();
```

---

## 6. Historique & Undo/Redo

### 6.1 Structure

```javascript
swapHistory = [
  {
    timestamp: '2025-10-31T12:00:00Z',
    action: 'swap',
    studentId: 'eleve_123',
    fromGroupId: 'grp_1',
    toGroupId: 'grp_2',
    reason: 'Manual swap',
    groupsSnapshot: { /* État complet des groupes avant */ }
  }
]
```

### 6.2 Opérations

```javascript
function performSwap(studentId, fromGroupId, toGroupId) {
  // Valider
  if (!canSwap(studentId, fromGroupId, toGroupId)) return false;
  
  // Snapshot avant
  const snapshot = JSON.parse(JSON.stringify(state.groupsByRegroupement));
  
  // Effectuer
  moveStudent(studentId, fromGroupId, toGroupId);
  
  // Enregistrer
  state.swapHistory.push({
    timestamp: new Date().toISOString(),
    action: 'swap',
    studentId, fromGroupId, toGroupId,
    groupsSnapshot: snapshot
  });
  state.swapHistoryIndex = state.swapHistory.length - 1;
  
  // Recalculer stats
  updateGroupStats();
}

function undo() {
  if (state.swapHistoryIndex <= 0) return;
  state.swapHistoryIndex--;
  const entry = state.swapHistory[state.swapHistoryIndex];
  state.groupsByRegroupement = JSON.parse(JSON.stringify(entry.groupsSnapshot));
  updateGroupStats();
}

function redo() {
  if (state.swapHistoryIndex >= state.swapHistory.length - 1) return;
  state.swapHistoryIndex++;
  // Rejouer l'action
}
```

---

## 7. Sauvegarde & Finalization

### 7.1 saveTempGroups() (Refactorisé)

**Entrée**:
```javascript
{
  type: 'needs',
  regroupementId: 'reg_1',
  groups: [
    { id: 'grp_1', students: [...] },
    { id: 'grp_2', students: [...] }
  ],
  offsetStart: 1,
  persistMode: 'replace'  // ou 'continue'
}
```

**Sortie**:
```javascript
{
  success: true,
  tempSheets: ['grBe1TEMP', 'grBe2TEMP'],
  offsetRange: { start: 1, end: 2 },
  timestamp: '2025-10-31T12:00:00Z'
}
```

### 7.2 finalizeTempGroups() (Refactorisé)

**Entrée**:
```javascript
{
  type: 'needs',
  regroupementId: 'reg_1',
  persistMode: 'replace'  // ou 'continue'
}
```

**Logique**:
1. Trouver tous les TEMP sheets pour ce regroupement
2. Renommer grBe1TEMP → grBe1, grBe2TEMP → grBe2, etc.
3. Laisser les autres regroupements intacts
4. Mettre à jour metadata

---

## 8. Fichiers à Créer/Modifier

### À Créer
- `groupsModuleV2.html` - Nouveau module complet (remplace groupsModuleComplete.html)
- `groupsAlgorithm.js` - Algorithme de répartition (normalisation, pondération, stratégies)
- `groupsUI.js` - Composants UI (panneaux, modals, colonnes)
- `groupsSwap.js` - Logique drag & drop et contraintes

### À Modifier
- `Code.js` - Refactoriser `saveTempGroups()` et `finalizeTempGroups()`
- `InterfaceV2.html` - Charger le nouveau module au lieu de l'ancien

### À Supprimer
- `groupsModuleComplete.html` - Ancien module (après migration)
- `GROUPINGS_IMPLEMENTATION_PLAN.md` - Obsolète

---

## 9. Plan d'Implémentation

### Phase 1: Fondations (Jour 1)
- [x] Créer `groupsModuleV2.html` avec state et utilitaires
- [ ] Implémenter `groupsAlgorithm.js` (normalisation, pondération)
- [ ] Tester algorithme sur données réelles

### Phase 2: UI Panneaux (Jour 2)
- [ ] Panneau 1: Sélection scénario
- [ ] Panneau 2: Mode & associations (accordéon)
- [ ] Navigation entre panneaux

### Phase 3: Génération & Swap (Jour 3)
- [ ] Panneau 4: Colonnes groupes
- [ ] Drag & drop avec contraintes
- [ ] Historique undo/redo

### Phase 4: Sauvegarde & Finalization (Jour 4)
- [ ] Refactoriser `saveTempGroups()` et `finalizeTempGroups()`
- [ ] Intégration avec PropertiesService
- [ ] Tests multi-regroupements

### Phase 5: Polish & Tests (Jour 5)
- [ ] Stats panel
- [ ] Alertes & feedback
- [ ] Tests de régression
- [ ] Documentation

---

**Prochaine Étape**: Commencer Phase 1 - Créer `groupsModuleV2.html` avec state et utilitaires
