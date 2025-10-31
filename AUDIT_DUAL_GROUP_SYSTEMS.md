# AUDIT: Deux Systèmes de Création de Groupes Cohabitent

**Date**: 31 octobre 2025  
**Status**: 🔴 CRITIQUE - Cohabitation non maîtrisée  
**Objectif**: Identifier et documenter les deux systèmes et leurs points de friction

---

## 1. Vue d'Ensemble

Le codebase contient **deux architectures concurrentes** pour la création de groupes :

### Système 1: Legacy (Ancien) - Modèle Plat
- **Localisation**: `groupsModuleComplete.html` (état initial)
- **Concept**: Un seul ensemble de groupes par type
- **Données**: 
  - `selectedClasses[]` - Classes sélectionnées
  - `numGroups` - Nombre de groupes
  - `generatedGroups[]` - Groupes générés
- **Sauvegarde**: Tous les groupes à la fois, offset global unique
- **Limitation**: Impossible de créer plusieurs passes sur le même niveau

### Système 2: Nouveau - Modèle Multi-Passes (Regroupements)
- **Localisation**: `groupsModuleComplete.html` (état actuel) + `ARCHITECTURE_GROUPINGS_REDESIGN.md`
- **Concept**: Multiples "regroupements" (passes) avec configurations indépendantes
- **Données**:
  - `regroupements[]` - Array de passes
  - `activeRegroupementId` - Pass active
  - `groupsByRegroupement{}` - Groupes par pass
  - `pendingClasses[]` - Sélection temporaire
- **Sauvegarde**: Par regroupement, offsets séparés
- **Avantage**: Support multi-passes natif

---

## 2. Analyse Détaillée

### 2.1 État Global (State Object)

#### Système 1 (Legacy) - Propriétés Actives
```javascript
selectedClasses: []           // Classes pour regroupement actif
numGroups: 3                  // Nombre de groupes
generatedGroups: []           // Groupes générés
```

**Problème**: Ces propriétés sont toujours utilisées mais leur rôle est ambigu quand `regroupements[]` existe.

#### Système 2 (Nouveau) - Propriétés Ajoutées
```javascript
regroupements: []             // [{ id, label, classes, groupCount, persistMode, offsetStart, offsetEnd }]
activeRegroupementId: null    // Quel regroupement est actif?
pendingClasses: []            // Sélection temporaire lors étape 2
newRegroupementLabel: ''      // Formulaire nouveau regroupement
newRegroupementGroupCount: 3  // Formulaire nouveau regroupement
groupsByRegroupement: {}      // id -> { groups, timestamp }
```

**Problème**: Deux sources de vérité pour "classes sélectionnées" et "nombre de groupes".

---

### 2.2 Étape 2: Composition des Classes

#### Système 1 (Legacy)
```javascript
// Sélection simple des classes
selectedClasses = ['6°1', '6°2', '6°3']
numGroups = 3
// → Directement vers étape 3
```

#### Système 2 (Nouveau)
```javascript
// Composition de regroupements
regroupements = [
  { id: 'reg_1', label: 'Passe 1', classes: ['6°1', '6°2'], groupCount: 3 },
  { id: 'reg_2', label: 'Passe 2', classes: ['6°3', '6°4'], groupCount: 4 }
]
activeRegroupementId = 'reg_1'
// → Sélectionner regroupement actif avant étape 3
```

**Friction Point**: 
- Le code Step 2 doit gérer DEUX modes de composition
- `pendingClasses[]` vs `selectedClasses[]` - confusion sur laquelle utiliser
- Pas de migration automatique entre les deux systèmes

---

### 2.3 Étape 3-4: Configuration

#### Système 1 (Legacy)
```javascript
// Configuration unique, globale
config = {
  subject: 'both',
  distribution: 'heterogeneous',
  language: null
}
// Appliquée à selectedClasses
```

#### Système 2 (Nouveau)
```javascript
// Configuration par regroupement
groupingConfig = {
  'reg_1': { subject: 'both', distribution: 'heterogeneous', language: 'ESP' },
  'reg_2': { subject: 'maths', distribution: 'homogeneous', language: 'ITA' }
}
// Appliquée au regroupement actif
```

**Friction Point**:
- Code Step 3 doit vérifier `if (state.regroupements.length > 1)` pour savoir quel mode utiliser
- Pas de persistance claire de la config par regroupement
- Navigation entre regroupements non implémentée

---

### 2.4 Étape 5: Affichage et Actions

#### Système 1 (Legacy)
```javascript
// Affichage simple
renderGroups(generatedGroups)
// Actions globales
[Régénérer] [Statistiques] [Temp] [Finalize] [Export]
```

#### Système 2 (Nouveau)
```javascript
// Affichage avec sélecteur
[Passe 1] [Passe 2] [Passe 3]
renderGroups(groupsByRegroupement[activeRegroupementId])
// Actions hiérarchiques
[Calcul: Régénérer, Statistiques]
[Sauvegarde: Remplacer/Ajouter, Temp, Finalize]
[Exports: PDF, CSV, JSON]
```

**Friction Point**:
- Code Step 5 doit gérer deux modes d'affichage
- Actions doivent être contextuelles (quel regroupement?)
- Pas de sélecteur/tabs implémenté pour changer de regroupement

---

### 2.5 Backend: Sauvegarde

#### Système 1 (Legacy) - `saveTempGroups()`
```javascript
function saveTempGroups(payload) {
  // payload.groups[] - tous les groupes
  // payload.offsetStart - offset global unique
  // Crée: grBe1TEMP, grBe2TEMP, grBe3TEMP, ...
}
```

#### Système 2 (Nouveau) - `saveTempGroups()` Refactorisé
```javascript
function saveTempGroups(payload) {
  // payload.groups[] - groupes du regroupement actif
  // payload.regroupement.id - identifiant du regroupement
  // payload.offsetStart - offset par regroupement
  // Crée: grBeA1TEMP, grBeA2TEMP, ... ou grBeB1TEMP, grBeB2TEMP, ...
}
```

**Problème**: Le code actuel (Code.js ligne 2229) est un **hybride non fonctionnel**:
- Accepte `payload.regroupement` (Système 2)
- Mais utilise `payload.offsetStart` globalement (Système 1)
- Pas de distinction des TEMP sheets par regroupement
- `saveContinuationMetadata_()` stocke metadata globale, pas par regroupement

---

## 3. Points de Friction Critiques

### 3.1 Ambiguïté: Quelle Source de Vérité?

**Question**: Quand l'utilisateur est à l'étape 3, d'où viennent les classes?

```javascript
// Système 1 dit:
const classes = state.selectedClasses

// Système 2 dit:
const activeReg = state.regroupements.find(r => r.id === state.activeRegroupementId)
const classes = activeReg?.classes || state.selectedClasses

// Code actuel (hybride):
const classes = state.selectedClasses  // ❌ Ignore les regroupements!
```

**Impact**: Si utilisateur crée 2 regroupements, l'étape 3 configure le PREMIER, mais génère pour le SECOND.

---

### 3.2 Sauvegarde Incohérente

**Scénario**:
1. Utilisateur crée 2 regroupements: Passe A (6°1+6°2) et Passe B (6°3+6°4)
2. Configure Passe A, génère 3 groupes
3. Clique "Temp" → `saveTempGroups()` appelé

**Système 1 ferait**: Crée grBe1TEMP, grBe2TEMP, grBe3TEMP (perd info de regroupement)

**Système 2 devrait faire**: Crée grBeA1TEMP, grBeA2TEMP, grBeA3TEMP (préserve regroupement)

**Réalité**: Code hybride → **Comportement indéfini**

---

### 3.3 Pas de Finalization Per-Regroupement

**Code.js `finalizeTempGroups()`** (ligne ~2500):
```javascript
// Finalise TOUS les TEMP sheets
// Pas de paramètre groupingId
// Pas de distinction par regroupement
```

**Problème**: Si Passe A a grBeA1TEMP-A3TEMP et Passe B a grBeB1TEMP-B4TEMP:
- Finalizing Passe A devrait renommer A1TEMP→A1, A2TEMP→A2, A3TEMP→A3
- Mais laisser B1TEMP-B4TEMP intacts
- **Code actuel**: Finalise TOUT, perd contexte de regroupement

---

### 3.4 Métadonnées de Continuation Cassées

**PropertiesService** stocke:
```javascript
GROUPING_grBe_metadata = {
  lastTempIndex: 3,
  lastFinalIndex: 5,
  lastRegroupementId: 'reg_1',  // ← Ajouté mais pas utilisé
  lastRegroupementLabel: 'Passe 1'  // ← Ajouté mais pas utilisé
}
```

**Problème**: 
- Métadonnées globales, pas par regroupement
- Si utilisateur switch entre Passe A et Passe B, offsets se mélangent
- Continuation mode ne sait pas quel regroupement continuer

---

## 4. Matrice de Compatibilité

| Fonctionnalité | Système 1 | Système 2 | État Actuel |
|---|---|---|---|
| Sélection simple classes | ✅ | ✅ | ✅ Fonctionne |
| Multi-passes | ❌ | ✅ | ⚠️ Partiellement |
| Config par pass | ❌ | ✅ | ❌ Cassée |
| Génération par pass | ❌ | ✅ | ⚠️ Hybride |
| Sauvegarde TEMP | ✅ | ✅ | ⚠️ Hybride |
| Finalization | ✅ | ✅ | ⚠️ Hybride |
| Continuation mode | ✅ | ✅ | ❌ Cassée |
| UI Step 2 | ✅ Simple | ✅ Composer | ⚠️ Mixte |
| UI Step 5 | ✅ Simple | ✅ Tabs | ❌ Pas implémenté |

---

## 5. Recommandations

### 5.1 Court Terme (Stabilisation)

**Option A: Revenir au Système 1 (Legacy)**
- Supprimer toutes les propriétés Système 2 du state
- Simplifier le code Step 2-5
- Perte: Multi-passes (mais jamais vraiment fonctionnel)
- Gain: Stabilité, clarté

**Option B: Compléter le Système 2 (Nouveau)**
- Finir l'implémentation des regroupements
- Refactoriser saveTempGroups() et finalizeTempGroups()
- Implémenter UI Step 5 avec tabs
- Gain: Multi-passes fonctionnel
- Effort: 2-3 jours

### 5.2 Moyen Terme (Nettoyage)

1. **Choisir UN système** (recommandé: Système 2)
2. **Supprimer l'autre** complètement
3. **Refactoriser le backend** pour être 100% cohérent
4. **Ajouter tests** pour éviter régression

### 5.3 Long Terme (Architecture)

- Implémenter **Feature Flags** pour basculer entre systèmes
- Ajouter **migration path** pour utilisateurs existants
- Documenter **state management** clairement
- Ajouter **validation** au chargement du state

---

## 6. Fichiers Affectés

### Frontend
- `groupsModuleComplete.html` - Contient les deux systèmes
  - State object (lignes 81-151)
  - Step 2 rendering (lignes 800-950)
  - Step 3-4 logic (à vérifier)
  - Step 5 rendering (à vérifier)

### Backend
- `Code.js`
  - `saveTempGroups()` (ligne 2229) - Hybride
  - `finalizeTempGroups()` (ligne ~2500) - Pas de regroupement
  - `getTempGroupsInfo()` (ligne 2394) - Pas de regroupement
  - Métadonnées PropertiesService - Globales

### Documentation
- `ARCHITECTURE_GROUPINGS_REDESIGN.md` - Spécifie Système 2
- `GROUPINGS_IMPLEMENTATION_PLAN.md` - Spécifie Système 2

---

## 7. Conclusion

**État**: Les deux systèmes cohabitent dans un état **semi-fusionné et dysfonctionnel**.

**Risques**:
- ❌ Multi-passes ne fonctionne pas correctement
- ❌ Sauvegarde peut perdre le contexte de regroupement
- ❌ Finalization peut écraser les mauvais groupes
- ❌ Continuation mode imprévisible

**Action Requise**: 
1. Décider: Système 1 (simple) ou Système 2 (complet)?
2. Nettoyer le code pour éliminer l'hybridité
3. Ajouter tests de régression

---

**Prochaine Étape**: Valider cette analyse avec le USER et décider de la stratégie de résolution.
