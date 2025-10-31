# AUDIT: Ce Qui Est Récupérable du Module Actuel

**Date**: 31 octobre 2025  
**Objectif**: Identifier les composants, fonctions et logiques à conserver du module legacy

---

## 1. Utilitaires (À Conserver)

### 1.1 Sélecteurs DOM
```javascript
// ✅ À conserver tel quel
function qs(selector, scope = documentRef) {
  return scope?.querySelector(selector);
}

function qsa(selector, scope = documentRef) {
  return Array.from(scope?.querySelectorAll(selector) || []);
}
```

### 1.2 Échappement HTML
```javascript
// ✅ À conserver tel quel
function escapeHtml(value) {
  if (typeof value !== 'string') return '';
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
```

### 1.3 Toast Notifications
```javascript
// ✅ À conserver et améliorer
function showToast(message, type = 'info', duration = 3500) {
  // Logique existante OK
  // Ajouter: support pour actions (undo, retry)
}
```

### 1.4 Formatage Date
```javascript
// ✅ À conserver tel quel
function formatDate(date) {
  return new Date(date).toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
```

---

## 2. Normalisation Élèves (À Adapter)

### 2.1 Fonction Actuelle
```javascript
// ✅ À conserver et enrichir
function normalizeStudentFromSheet(student, fallbackPrefix = 'eleve', fallbackIndex = 0) {
  // Logique de mapping des colonnes OK
  // Ajouter: calcul z-scores, indice composite
}
```

### 2.2 Enrichissements Nécessaires

**Ajouter au student normalisé**:
```javascript
// Scores z (calculés après chargement tous élèves)
z_scoreM: 0,
z_scoreF: 0,
z_com: 0,
z_tra: 0,
z_part: 0,
z_abs: 0,

// Indice composite (calculé selon scénario)
indice: 0,

// Bloc d'association (pour contraintes swap)
associationBlockId: 'block_1'
```

---

## 3. Chargement Données (À Adapter)

### 3.1 Fonction `loadStudentsFromClasses()`
```javascript
// ✅ À conserver la logique générale
// Modifications:
// - Charger depuis regroupement actif (pas selectedClasses)
// - Enrichir avec z-scores et indice
// - Assigner associationBlockId
```

### 3.2 Détection Langues & Options
```javascript
// ✅ À conserver
function detectAvailableLanguages() { ... }
function detectAvailableOptions() { ... }

// Utiliser pour filtrer élèves selon scénario
```

---

## 4. Drag & Drop (À Durcir)

### 4.1 Logique Actuelle
```javascript
// ⚠️ À conserver mais RENFORCER les contraintes
// Problèmes actuels:
// - Pas de vérification bloc d'association
// - Pas de vérification parité F/M
// - Pas de feedback utilisateur clair
```

### 4.2 Améliorations Requises

**Ajouter**:
```javascript
function canSwap(studentId, fromGroupId, toGroupId) {
  // Vérifier bloc d'association
  const student = state.studentsById.get(studentId);
  const fromGroup = getGroupById(fromGroupId);
  const toGroup = getGroupById(toGroupId);
  
  if (student.associationBlockId !== fromGroup.blockId) {
    return { allowed: false, reason: 'Élève hors bloc' };
  }
  
  if (toGroup.blockId !== fromGroup.blockId) {
    return { allowed: false, reason: 'Bloc cible différent' };
  }
  
  // Vérifier parité F/M
  const newFCount = toGroup.students.filter(s => s.sexe === 'F').length + (student.sexe === 'F' ? 1 : 0);
  const newMCount = toGroup.students.filter(s => s.sexe === 'M').length + (student.sexe === 'M' ? 1 : 0);
  
  if (Math.abs(newFCount - newMCount) > 2) {
    return { allowed: false, reason: 'Déséquilibre F/M' };
  }
  
  return { allowed: true };
}
```

---

## 5. Export (À Conserver)

### 5.1 Export PDF
```javascript
// ✅ À conserver la logique générale
// Adapter pour afficher par regroupement
```

### 5.2 Export CSV
```javascript
// ✅ À conserver la logique générale
// Adapter pour exporter par regroupement
```

### 5.3 Export JSON
```javascript
// ✅ À conserver la logique générale
// Inclure metadata regroupement
```

---

## 6. Sauvegarde Backend (À Refactoriser)

### 6.1 `saveTempGroups()` (Code.js ligne 2229)

**État Actuel**:
```javascript
function saveTempGroups(payload) {
  // ✅ Logique générale OK
  // ❌ Problèmes:
  // - Pas de distinction par regroupement
  // - Crée grBe1TEMP au lieu de grBeA1TEMP
  // - Métadonnées globales
}
```

**À Refactoriser**:
```javascript
function saveTempGroups(payload) {
  // Entrée: payload.regroupementId, payload.groups, payload.offsetStart
  
  // 1. Déterminer prefix avec regroupement
  const typePrefix = getGroupTypePrefix_(payload.type);
  const regroupementSuffix = extractRegroupementSuffix_(payload.regroupementId);
  const sheetPrefix = typePrefix + regroupementSuffix;  // grBe + A
  
  // 2. Créer sheets: grBeA1TEMP, grBeA2TEMP, ...
  // 3. Stocker metadata par regroupement
  // 4. Retourner { success, tempSheets, offsetRange }
}
```

### 6.2 `finalizeTempGroups()` (Code.js ~ligne 2500)

**État Actuel**:
```javascript
function finalizeTempGroups(payload) {
  // ❌ Finalise TOUS les TEMP sheets
  // ❌ Pas de paramètre regroupementId
}
```

**À Refactoriser**:
```javascript
function finalizeTempGroups(payload) {
  // Entrée: payload.regroupementId, payload.type
  
  // 1. Trouver tous les TEMP sheets pour ce regroupement
  // 2. Renommer grBeA1TEMP → grBeA1, grBeA2TEMP → grBeA2, ...
  // 3. Laisser les autres regroupements intacts
  // 4. Mettre à jour metadata
}
```

### 6.3 Métadonnées PropertiesService

**État Actuel**:
```javascript
// Globales, pas par regroupement
GROUPING_grBe_metadata = {
  lastTempIndex: 3,
  lastFinalIndex: 5,
  lastRegroupementId: 'reg_1'  // Ignoré
}
```

**À Refactoriser**:
```javascript
// Par regroupement
GROUPING_grBe_reg_1_metadata = {
  regroupementId: 'reg_1',
  label: 'Passe 1',
  classes: ['6°1', '6°2'],
  lastTempIndex: 3,
  lastTempRange: { start: 1, end: 3 },
  lastFinalIndex: 3,
  lastFinalRange: { start: 1, end: 3 },
  timestamp: '2025-10-31T12:00:00Z'
}

GROUPING_grBe_reg_2_metadata = {
  regroupementId: 'reg_2',
  label: 'Passe 2',
  classes: ['6°3', '6°4', '6°5'],
  lastTempIndex: 4,
  lastTempRange: { start: 4, end: 7 },
  lastFinalIndex: null,
  lastFinalRange: null,
  timestamp: '2025-10-31T12:30:00Z'
}
```

---

## 7. Constantes & Configurations (À Conserver)

### 7.1 Types de Groupes
```javascript
// ✅ À conserver
const GROUP_TYPES = {
  needs: { ... },
  language: { ... },
  option: { ... }
};
```

### 7.2 Sujets (Besoins)
```javascript
// ✅ À conserver
const SUBJECTS = {
  both: { ... },
  maths: { ... },
  french: { ... }
};
```

### 7.3 Types de Distribution
```javascript
// ✅ À conserver et renommer
const DISTRIBUTION_TYPES = {
  heterogeneous: { ... },
  homogeneous: { ... }
};
```

---

## 8. Composants UI (À Adapter)

### 8.1 Cartes Scénario
```javascript
// ✅ À conserver la structure
// Adapter pour Panneau 1
```

### 8.2 Accordéons
```javascript
// ✅ À conserver la logique
// Adapter pour Panneau 2 (Mode + Associations)
```

### 8.3 Colonnes Groupes
```javascript
// ✅ À conserver la structure générale
// Adapter pour Panneau 4 (hauteur maximale)
```

### 8.4 Cartes Élèves
```javascript
// ✅ À conserver la structure
// Ajouter: indice, z-scores, bloc d'association
```

---

## 9. Logique État (À Adapter)

### 9.1 Synchronisation Regroupement Actif
```javascript
// ✅ Fonction syncActiveRegroupementState() existe
// À adapter pour nouveau state
```

### 9.2 Gestion Regroupements
```javascript
// ✅ Fonctions existent:
// - createRegroupementFromSelection()
// - deleteRegroupement()
// - activateRegroupement()
// À adapter pour nouveau workflow
```

---

## 10. Résumé Récupération

| Composant | État | Action |
|-----------|------|--------|
| Utilitaires DOM | ✅ OK | Copier tel quel |
| Normalisation élèves | ✅ OK | Enrichir z-scores + indice |
| Chargement données | ✅ OK | Adapter pour regroupements |
| Détection LV2/Options | ✅ OK | Conserver |
| Drag & Drop | ⚠️ Faible | Durcir contraintes |
| Export (PDF/CSV/JSON) | ✅ OK | Adapter pour regroupements |
| saveTempGroups() | ❌ Cassée | Refactoriser |
| finalizeTempGroups() | ❌ Cassée | Refactoriser |
| Métadonnées | ❌ Cassées | Refactoriser |
| Constantes | ✅ OK | Conserver |
| UI Composants | ✅ OK | Adapter pour 4 panneaux |
| Gestion regroupements | ✅ OK | Adapter pour nouveau workflow |

---

## 11. Stratégie Migration

### Phase 1: Extraction
1. Copier utilitaires dans `groupsModuleV2.html`
2. Copier constantes
3. Copier logique normalisation élèves

### Phase 2: Adaptation
1. Adapter chargement données pour regroupements
2. Adapter drag & drop avec contraintes
3. Adapter export pour regroupements

### Phase 3: Refactorisation Backend
1. Refactoriser `saveTempGroups()` avec regroupementId
2. Refactoriser `finalizeTempGroups()` avec regroupementId
3. Refactoriser métadonnées PropertiesService

### Phase 4: Suppression
1. Supprimer `groupsModuleComplete.html`
2. Supprimer `GROUPINGS_IMPLEMENTATION_PLAN.md`
3. Mettre à jour `InterfaceV2.html`

---

**Prochaine Étape**: Commencer extraction et création de `groupsModuleV2.html`
