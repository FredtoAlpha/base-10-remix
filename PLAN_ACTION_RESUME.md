# PLAN D'ACTION RÉSUMÉ: Option B

**Durée**: 5 jours | **Objectif**: Nouveau module multi-passes avec algorithme intelligent

---

## 🎯 Résumé Exécutif

**À FAIRE**:
1. Créer `groupsModuleV2.html` (nouveau module complet)
2. Créer `groupsAlgorithm.js` (normalisation, pondération, stratégies)
3. Créer `groupsSwap.js` (drag & drop avec contraintes)
4. Refactoriser `saveTempGroups()` et `finalizeTempGroups()` dans Code.js
5. Mettre à jour `InterfaceV2.html` pour charger nouveau module

**À SUPPRIMER**:
- `groupsModuleComplete.html` (ancien module)
- `GROUPINGS_IMPLEMENTATION_PLAN.md` (obsolète)

---

## 📋 Phase 1: Fondations (Jour 1)

### Créer groupsModuleV2.html
- Copier structure de base de groupsModuleComplete.html
- Copier utilitaires (qs, qsa, escapeHtml, showToast, formatDate)
- Copier constantes (GROUP_TYPES, SUBJECTS, DISTRIBUTION_TYPES)
- Implémenter nouveau state object (voir SPEC_NOUVEAU_MODULE_GROUPES.md)
- Implémenter functions: init(), open(), setState(), getState()

### Créer groupsAlgorithm.js
- `normalizeStudent(student, stats)` - Z-scores
- `calculateIndice(student, scenario)` - Indice composite
- `distributeHeterogeneous(students, groupCount)` - Round-robin inverse
- `distributeHomogeneous(students, groupCount)` - Quantiles
- `generateGroups(students, groupCount, mode, scenario, blockId)` - Orchestration

### Mettre à jour InterfaceV2.html
- Remplacer import groupsModuleComplete.html par groupsModuleV2.html
- Ajouter imports groupsAlgorithm.js, groupsUI.js, groupsSwap.js
- Remplacer appel GroupsModuleComplete.open() par GroupsModuleV2.open()

---

## 📋 Phase 2: UI Panneaux (Jour 2)

### Panneau 1: Sélection Scénario
- Implémenter renderStep1() - 3 cartes cliquables
- Implémenter selectScenario(scenarioId)
- Tester navigation vers Panneau 2

### Panneau 2: Mode & Associations
- Implémenter renderStep2() - Accordéon
- Section 1: Radio buttons Hétérogène/Homogène
- Section 2: Liste associations + modal édition
- Implémenter createRegroupement(), editAssociation(), deleteAssociation()
- Bouton "Générer les Groupes" → Panneau 4

### Navigation
- Implémenter updateUI() - Switch entre panneaux
- Implémenter goToStep(stepNumber) - Validations
- Tester transitions

---

## 📋 Phase 3: Génération & Swap (Jour 3)

### Génération Groupes
- Implémenter generateGroupsForActiveRegroupement()
- Charger élèves via loadStudentsFromClasses()
- Appeler generateGroups() de groupsAlgorithm.js
- Stocker dans state.groupsByRegroupement[regroupementId]
- Aller à Panneau 4

### Panneau 4: Manipulation (Colonnes)
- Implémenter renderStep4() - Layout 3+ colonnes
- Header: Sélecteur regroupement (tabs)
- Colonnes: Groupes avec élèves
- Footer: Barre d'actions (Régénérer, Undo, Redo, Temp, Finalize)
- Maximiser hauteur pour swaps

### Drag & Drop (groupsSwap.js)
- handleDragStart() - Capturer élève
- handleDragOver() - Autoriser drop
- handleDrop() - Valider et effectuer swap
- canSwap() - Vérifier bloc, parité F/M
- performSwap() - Déplacer élève, enregistrer historique
- undo() / redo() - Historique

---

## 📋 Phase 4: Sauvegarde (Jour 4)

### Refactoriser Code.js

**saveTempGroups()**:
- Ajouter payload.regroupementId
- Adapter création sheets: grBe1TEMP → grBeA1TEMP (avec suffix)
- Adapter métadonnées: stocker par regroupement
- Tester multi-regroupements

**finalizeTempGroups()**:
- Ajouter payload.regroupementId
- Trouver TEMP sheets pour ce regroupement uniquement
- Renommer grBeA1TEMP → grBeA1 (laisser autres intacts)
- Adapter métadonnées
- Tester finalization per-regroupement

**Helpers**:
- extractRegroupementSuffix_(regroupementId) - 'reg_1' → 'A'
- saveMetadata_(key, data) - PropertiesService
- loadMetadata_(key) - PropertiesService

---

## 📋 Phase 5: Polish (Jour 5)

### Stats Panel
- Implémenter showStatsPanel()
- Afficher moyennes SCORE M, SCORE F, COM, TRA, PART, ABS
- Afficher ratio F/M
- Afficher alertes déséquilibre

### Alertes & Feedback
- Surligner groupes avec écart > seuil
- Messages clairs pour swaps bloqués
- Suggestions d'actions (créer nouvelle association)

### Tests
- Test multi-regroupements
- Test undo/redo
- Test sauvegarde TEMP
- Test finalization
- Test continuation mode

### Documentation
- Commenter code
- Documenter API module
- Documenter algorithme

---

## 🔧 Fichiers à Créer

1. **groupsModuleV2.html** - Nouveau module (remplace groupsModuleComplete.html)
2. **groupsAlgorithm.js** - Algorithme de répartition
3. **groupsUI.js** - Composants UI (panneaux, modals)
4. **groupsSwap.js** - Drag & drop avec contraintes

## 🔧 Fichiers à Modifier

1. **Code.js** - Refactoriser saveTempGroups(), finalizeTempGroups()
2. **InterfaceV2.html** - Charger nouveau module

## 🔧 Fichiers à Supprimer

1. **groupsModuleComplete.html** - Ancien module
2. **GROUPINGS_IMPLEMENTATION_PLAN.md** - Obsolète

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

**Prochaine Étape**: Commencer Phase 1 - Créer groupsModuleV2.html
