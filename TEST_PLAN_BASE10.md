# 🧪 Plan de Test - BASE 10 REMIX

## 📋 Pré-Requis de Test

Avant de tester, s'assurer que:
1. ✅ Des onglets de classes avec suffixe **FIN** existent dans le spreadsheet (ex: 6°1FIN, 6°2FIN)
2. ✅ Ces onglets contiennent les colonnes:
   - `NOM`, `PRENOM`, `CLASSE`, `SEXE`
   - `SCORE M` (Mathématiques)
   - `SCORE F` (Français)
   - `COM` (Comportement), `TRA` (Travail), `PART` (Participation), `ABS` (Absentéisme)
3. ✅ Au moins 2-3 classes avec 15+ élèves chacune

---

## 🎯 Scénarios de Test

### Scénario 1: Accès via Menu Admin ✅
**Objectif:** Vérifier que l'interface est accessible uniquement via Menu Admin

**Étapes:**
1. Charger InterfaceV2
2. Cliquer sur bouton `Admin` (rouge)
3. Déverrouiller avec mot de passe si nécessaire
4. Chercher section "Groupes"
5. Vérifier que les boutons sont présents:
   - "Créer des groupes"
   - "Gérer les groupes"

**Résultat Attendu:**
- ✅ Menu Admin déverrouille
- ✅ Section "Groupes" visible
- ✅ Deux boutons présents et cliquables

**Problèmes Possibles:**
- Menu Admin ne déverrouille pas → Demander mot de passe admin
- Boutons "Groupes" manquants → Vérifier InterfaceV2.html lignes 1758-1772
- Clic inefficace → Vérifier `openGroupsInterface()` définie

---

### Scénario 2: Vérification du Flux Complet ✅
**Objectif:** Tester le parcours de configuration guidée

**Étapes:**
1. Cliquer "Créer des groupes"
2. **Step 1:** Sélectionner "Groupes de Besoins"
3. **Step 2:** Sélectionner "Hétérogène"
4. **Step 3:** Composition du regroupement
   - Cocher 2-3 classes (ex: 6°1, 6°2)
   - Entrer label: "Passe 1 - 6°1/6°2"
   - Définir nb groupes: 3
   - Cliquer "Ajouter ce regroupement"
5. **Step 4:** Cliquer "Générer les groupes"
6. **Step 5:** Observer les groupes générés

**Résultat Attendu (À Chaque Étape):**
- ✅ Step 1: Trois cartes (Besoins, LV2, Options) visibles
- ✅ Step 2: Deux options (Hétérogène, Homogène) cliquables
- ✅ Step 3: Classes listées, contrôles de groupe présents
- ✅ Step 4: Génération sans erreur
- ✅ Step 5: 3 groupes créés avec élèves

**Validation des Données Step 5:**
```
Groupe 1: [nombre d'élèves] élèves
Groupe 2: [nombre d'élèves] élèves
Groupe 3: [nombre d'élèves] élèves

Chaque groupe doit avoir:
- Élèves des deux classes (6°1 et 6°2)
- Équilibre F/M proche
- Scores SCORE M et SCORE F variés
```

---

### Scénario 3: Statistiques Temps Réel ✅
**Objectif:** Vérifier le calcul et l'affichage des statistiques

**Étapes:**
1. Arriver à Step 5 (après génération)
2. Vérifier le panneau statistiques sur la droite
3. Pour chaque groupe, vérifier:
   - ✅ Parité F/M
   - ✅ Distribution Français (graphique en barres)
   - ✅ Distribution Maths (graphique en barres)
   - ✅ COM, TRA, PART, ABS (moyennes en chiffres)

**Résultat Attendu:**
- ✅ Chaque groupe a un panneau stats avec:
  ```
  Groupe 1
  Parité: 3F / 5M
  Distribution Français: [graphique]
  Distribution Maths: [graphique]
  COM (Comportement): 2.5
  TRA (Travail): 3.1
  PART (Participation): 2.8
  ABS (Absentéisme): 1.2
  ```

**Problèmes Possibles:**
- Stats manquantes → Vérifier `calculateGroupStats()` en console
- Valeurs = 0 → Vérifier que SCORE M/F/COM/TRA/PART/ABS existent dans les données
- NaN affiché → Erreur de parsing des nombres

---

### Scénario 4: Drag & Drop avec Contrainte de Bloc ✅
**Objectif:** Vérifier que le swap respecte le bloc

**Étapes:**
1. Arriver à Step 5
2. Observer le message: "🔒 Glisser-déposer activé (contraint au bloc)"
3. Glisser un élève d'un groupe à un autre
4. Observer:
   - ✅ L'élève se déplace correctement
   - ✅ Les stats se recalculent instantanément
   - ✅ Toast "déplacé vers [groupe]" s'affiche
5. Vérifier que l'élève ne sort pas du bloc

**Résultat Attendu:**
```
Avant swap: Groupe 1: 5 élèves, Groupe 2: 4 élèves
Après swap: Groupe 1: 4 élèves, Groupe 2: 5 élèves

Stats mises à jour pour les deux groupes immédiatement.
Toast d'info: "Jean Martin déplacé vers Groupe 2"
```

**Test d'Erreur (Optionnel):**
- Si tentative de swap impossible → Message d'erreur
- Si regroupement invalide → Toast rouge

---

### Scénario 5: Associations Multi-Blocs ✅
**Objectif:** Vérifier qu'on peut créer plusieurs regroupements

**Étapes:**
1. À Step 3, après créer "Passe 1" (2 classes → 3 groupes)
2. Ajouter "Passe 2":
   - Cocher 3 autres classes (ex: 6°3, 6°4, 6°5)
   - Label: "Passe 2 - 6°3/6°4/6°5"
   - Nb groupes: 4
   - Cliquer "Ajouter ce regroupement"
3. Vérifier section "Regroupements définis"
4. Voir deux regroupements listés
5. Cliquer sur "Passe 2" pour l'activer
6. Générer les groupes

**Résultat Attendu:**
- ✅ Deux regroupements visibles dans la liste
- ✅ Possibilité de basculer entre eux (onglets à Step 5)
- ✅ Chaque regroupement a ses propres groupes
- ✅ Statistiques différentes pour chaque regroupement

**Validation:**
```
Passe 1 (2 classes):
- Groupe 1, Groupe 2, Groupe 3

Passe 2 (3 classes):
- Groupe 1, Groupe 2, Groupe 3, Groupe 4
```

---

## 🔧 Tests Techniques (Console)

Ouvrir F12 et exécuter ces commandes:

### Test 1: Vérifier le Module
```javascript
console.log('=== Vérification BASE 10 ===');
console.log('✅ GroupsModuleComplete chargé?', !!window.GroupsModuleComplete);
console.log('✅ Sortable.js chargé?', !!window.Sortable);
console.log('✅ Bouton btnBase10 supprimé?', document.getElementById('btnBase10') === null);
console.log('✅ Bouton btnFinaliser présent?', !!document.getElementById('btnFinaliser'));
```

### Test 2: Vérifier les Données
```javascript
console.log('=== Vérification Données ===');
console.log('Élèves chargés:', state.students?.length || 'N/A');
console.log('Classes disponibles:', state.availableClasses || 'N/A');
console.log('Regroupements créés:', state.regroupements?.length || 0);
console.log('Groupes générés:', state.generatedGroups?.length || 0);
```

### Test 3: Vérifier les Scores
```javascript
console.log('=== Vérification Scores ===');
const student = state.students?.[0];
if (student) {
  console.log('Premier élève:', student.nom);
  console.log('SCORE M:', student.scores?.M);
  console.log('SCORE F:', student.scores?.F);
  console.log('COM:', student.com);
  console.log('TRA:', student.tra);
  console.log('PART:', student.part);
  console.log('ABS:', student.abs);
  console.log('SEXE:', student.sexe);
} else {
  console.warn('⚠️ Pas d\'élèves chargés');
}
```

### Test 4: Vérifier le Swap
```javascript
console.log('=== Vérification Swap ===');
console.log('Regroupement actif:', state.activeRegroupementId);
console.log('Nombre de groupes:', state.generatedGroups?.length || 0);
console.log('Sortables initialisés:', state.sortables?.length || 0);

// Simuler un swap
if (state.generatedGroups?.length >= 2) {
  console.log('Test swap possible');
  moveStudent(
    state.generatedGroups[0].students[0].id,
    0,
    1
  );
}
```

---

## ✅ Checklist de Validation

### Interface
- [ ] Bouton BASE 10 n'existe pas dans le header
- [ ] Menu Admin > Groupes présent
- [ ] Deux boutons (Créer/Gérer) fonctionnels
- [ ] Pas d'erreur 404 sur ressources

### Flux
- [ ] Step 1: Cartes scénario affichées
- [ ] Step 2: Options mode de répartition visibles
- [ ] Step 3: Classes listées, controls présents
- [ ] Step 4: Génération sans erreur
- [ ] Step 5: Groupes affichés, stats visibles

### Données
- [ ] Élèves chargés correctement
- [ ] SCORE M/F présents et numériques
- [ ] COM/TRA/PART/ABS présents
- [ ] SEXE détecté (F/M)
- [ ] Au moins 3 classes trouvées

### Stats
- [ ] Parité affichée (n F / m M)
- [ ] Distribution Français OK
- [ ] Distribution Maths OK
- [ ] COM/TRA/PART/ABS affichées
- [ ] Stats recalculées lors swaps

### Swap
- [ ] Drag & drop fonctionnel
- [ ] Élèves se déplacent correctement
- [ ] Toast d'info s'affiche
- [ ] Stats se mettent à jour
- [ ] Contrôle de bloc respecté

### Multi-Blocs
- [ ] Création de plusieurs regroupements OK
- [ ] Liste des regroupements affichée
- [ ] Basculement entre regroupements OK
- [ ] Groupes distincts par regroupement

---

## 🐛 Signalement de Bugs

Si un test échoue:

1. **Noter les détails:**
   - Scénario exact (étapes)
   - Résultat observé vs attendu
   - Logs de la console (F12)

2. **Copier le log d'erreur:**
   ```javascript
   // Dans console
   copy(console);  // Copie les logs
   ```

3. **Créer un rapport avec:**
   - Titre du test
   - Étapes à reproduire
   - Erreur exact (si quelconque)
   - Console logs
   - Version du navigateur

---

## 📊 Résultats Attendus

| Scénario | Étapes | Résultat |
|---|---|---|
| 1. Accès Admin | 5 | ✅ Menu fonctionne |
| 2. Flux Complet | 6 | ✅ 3 groupes générés |
| 3. Stats | 5 | ✅ Tous les scores affichés |
| 4. Drag & Drop | 5 | ✅ Swap et stats OK |
| 5. Multi-Blocs | 6 | ✅ 2 regroupements OK |

**Taux de Réussite Requis:** 100% (5/5 scénarios)

---

**Durée Estimée:** 20-30 minutes
**Testeurs Recommandés:** 1-2 personnes (1 sur Firefox, 1 sur Chrome)
**Date de Test:** À définir

Bon test! 🚀
