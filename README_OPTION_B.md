# 🚀 OPTION B: Nouveau Module de Groupes - Guide Complet

**Décision**: ✅ Compléter le Système 2 (Nouveau) avec élimination du Système 1  
**Date**: 31 octobre 2025  
**Durée**: 5 jours  
**Status**: 📋 Prêt à commencer

---

## 📚 Documentation Créée

### 1. **SYNTHESE_OPTION_B.md** ⭐ LIRE EN PREMIER
- Vue d'ensemble complète
- Comparaison Option A vs B
- Vision cible avec diagrams
- Checklist implémentation

### 2. **SPEC_NOUVEAU_MODULE_GROUPES.md** - Spécification Détaillée
- Architecture générale
- Data structures complètes
- Algorithme de répartition (normalisation, pondération, stratégies)
- Interface & composants
- Contraintes de swap
- Historique undo/redo
- Sauvegarde & finalization

### 3. **AUDIT_RECUPERABLE.md** - Ce Qui Est Récupérable
- Utilitaires à conserver (qs, qsa, escapeHtml, etc.)
- Normalisation élèves à adapter
- Chargement données à adapter
- Drag & drop à durcir
- Export à adapter
- Backend à refactoriser

### 4. **PLAN_ACTION_RESUME.md** - Plan Jour par Jour
- Phase 1: Fondations (Jour 1)
- Phase 2: UI Panneaux (Jour 2)
- Phase 3: Génération & Swap (Jour 3)
- Phase 4: Sauvegarde (Jour 4)
- Phase 5: Polish (Jour 5)

### 5. **AUDIT_DUAL_GROUP_SYSTEMS.md** - Audit Initial
- Deux systèmes cohabitants
- Points de friction critiques
- Matrice de compatibilité

---

## 🎯 Vision Cible en 30 Secondes

### Architecture 4 Panneaux

```
Panneau 1: Sélection Scénario
├─ [Groupes de Besoins] [Groupes LV2] [Groupes d'Options]
│
Panneau 2: Mode & Associations (Accordéon)
├─ Mode: [○ Hétérogène] [○ Homogène]
├─ Associations: [Classe A+B → 3] [Classe C+D+E → 4]
│
Panneau 4: Manipulation (Colonnes, Hauteur Maximale)
├─ [Passe 1] [Passe 2] [Stats ▼]
├─ Colonnes groupes avec élèves (Drag & Drop)
└─ Actions: [Régénérer] [Undo] [Redo] [Temp] [Finaliser]
```

### Algorithme Intelligent

```
Élèves bruts
    ↓
Normalisation (Z-scores)
    ↓
Pondération dynamique (selon scénario)
    ↓
Indice composite
    ↓
Stratégie (Hétérogène ou Homogène)
    ↓
Groupes équilibrés
```

### Contraintes Strictes

- ✅ Bloc d'association: élèves restent dans leur bloc
- ✅ Parité F/M: |F - M| ≤ 1
- ✅ Équilibre académique: écart ≤ ±10%
- ✅ Messages clairs et suggestions

---

## 📁 Fichiers à Créer

### 1. groupsModuleV2.html (Principal)
**Taille**: 3000-4000 lignes  
**Contient**:
- State object (nouveau)
- Utilitaires (copié de l'ancien)
- Constantes (copié de l'ancien)
- Fonctions UI (renderStep1-4)
- Fonctions logique (generateGroups, loadStudents, etc.)

**À faire**:
```bash
# Copier structure de base de groupsModuleComplete.html
# Adapter pour nouveau state et 4 panneaux
# Implémenter renderStep1(), renderStep2(), renderStep4()
# Implémenter generateGroupsForActiveRegroupement()
```

### 2. groupsAlgorithm.js (Algorithme)
**Taille**: 800-1000 lignes  
**Contient**:
- `normalizeStudent(student, stats)` - Z-scores
- `calculateIndice(student, scenario)` - Indice composite
- `distributeHeterogeneous(students, groupCount)` - Round-robin inverse
- `distributeHomogeneous(students, groupCount)` - Quantiles
- `generateGroups(students, groupCount, mode, scenario, blockId)` - Orchestration

### 3. groupsUI.js (Composants UI)
**Taille**: 600-800 lignes  
**Contient**:
- Panneaux (1, 2, 4)
- Modals (édition association)
- Colonnes groupes
- Stats panel

### 4. groupsSwap.js (Drag & Drop)
**Taille**: 400-500 lignes  
**Contient**:
- Handlers drag & drop
- Validation swap (bloc, parité)
- Historique undo/redo
- Recalcul stats

---

## 🔧 Fichiers à Modifier

### Code.js
```javascript
// saveTempGroups() - Ligne 2229
// Ajouter: payload.regroupementId
// Adapter: création sheets grBe1TEMP → grBeA1TEMP
// Adapter: métadonnées par regroupement

// finalizeTempGroups() - Ligne ~2500
// Ajouter: payload.regroupementId
// Adapter: recherche/renommage sheets
// Adapter: métadonnées

// Helpers (nouveaux)
extractRegroupementSuffix_(regroupementId)
saveMetadata_(key, data)
loadMetadata_(key)
```

### InterfaceV2.html
```javascript
// Remplacer imports
// DE: <script src="groupsModuleComplete.html"></script>
// VERS:
// <script src="groupsModuleV2.html"></script>
// <script src="groupsAlgorithm.js"></script>
// <script src="groupsUI.js"></script>
// <script src="groupsSwap.js"></script>

// Remplacer appel
// DE: window.GroupsModuleComplete.open()
// VERS: window.GroupsModuleV2.open()
```

---

## 🗑️ Fichiers à Supprimer

1. **groupsModuleComplete.html** - Ancien module (5259 lignes)
2. **GROUPINGS_IMPLEMENTATION_PLAN.md** - Obsolète

---

## 🚀 Commencer Maintenant

### Étape 1: Lire la Documentation
1. Lire **SYNTHESE_OPTION_B.md** (vue d'ensemble)
2. Lire **SPEC_NOUVEAU_MODULE_GROUPES.md** (détails)
3. Lire **PLAN_ACTION_RESUME.md** (plan jour par jour)

### Étape 2: Phase 1 (Jour 1)
1. Créer `groupsModuleV2.html` (squelette)
2. Créer `groupsAlgorithm.js` (algorithme)
3. Mettre à jour `InterfaceV2.html`
4. Tester chargement

### Étape 3: Phases 2-5 (Jours 2-5)
Suivre le plan d'action jour par jour

---

## ✅ Critères de Succès

- [ ] Module V2 charge sans erreurs
- [ ] Panneau 1: Sélection scénario fonctionne
- [ ] Panneau 2: Création associations fonctionne
- [ ] Panneau 4: Génération groupes fonctionne
- [ ] Drag & drop fonctionne avec contraintes
- [ ] Undo/Redo fonctionne
- [ ] Sauvegarde TEMP fonctionne
- [ ] Finalization fonctionne
- [ ] Multi-regroupements fonctionne
- [ ] Continuation mode fonctionne
- [ ] Ancien module supprimé

---

## 🎓 Apprentissage Clé

### Algorithme de Répartition

**Normalisation (Z-score)**:
```
z = (value - mean) / stdDev
```

**Pondération Dynamique**:
```
indice = w_scoreM * z_scoreM + w_scoreF * z_scoreF + ...
```

**Stratégie Hétérogène**:
```
1. Trier par indice décroissant
2. Distribution serpentine (round-robin inverse)
3. Ajustement parité F/M
```

**Stratégie Homogène**:
```
1. Trier par indice décroissant
2. Regrouper par quantiles (tranches)
3. Assigner quantiles aux groupes
4. Ajustement parité
```

### Contraintes Swap

**Bloc d'Association**:
- Élèves de 6°1+6°2 restent dans leurs 3 groupes
- Impossible de swapper vers bloc différent

**Parité F/M**:
- Chaque groupe vise 50/50
- Swap bloqué si écart > 2

**Équilibre Académique**:
- Alerte si écart moyen > ±10%
- Suggestion de swap pour rééquilibrer

---

## 📞 Support

**Questions sur la spécification?**
→ Consulter SPEC_NOUVEAU_MODULE_GROUPES.md

**Questions sur le plan?**
→ Consulter PLAN_ACTION_RESUME.md

**Questions sur ce qui est récupérable?**
→ Consulter AUDIT_RECUPERABLE.md

**Questions sur les deux systèmes?**
→ Consulter AUDIT_DUAL_GROUP_SYSTEMS.md

---

## 🎯 Prochaine Étape

**Commencer Phase 1**: Créer `groupsModuleV2.html`

Êtes-vous prêt? 🚀
