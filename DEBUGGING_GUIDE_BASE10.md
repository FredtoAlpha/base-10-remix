# 🐛 Guide de Débogage - Interface BASE 10 REMIX

## 📋 Table des matières
1. [Points de Contrôle à Vérifier](#points-de-contrôle)
2. [Tests Manuels du Flux](#tests-manuels)
3. [Problèmes Courants & Solutions](#problèmes-courants)
4. [Console Logs de Vérification](#console-logs)
5. [Checklist Pré-Déploiement](#checklist)

---

## ✅ Points de Contrôle à Vérifier

### 1️⃣ Vérification du Bouton Header
**Fichier:** `InterfaceV2.html` ligne 911

**À vérifier:**
- ❌ Le bouton `btnBase10` doit être SUPPRIMÉ du header
- ✅ Le bouton `btnFinaliser` doit être présent avec le style émeraude
- ✅ Pas d'appel à `Base10UI.open()` au démarrage

**Commande debug (F12 > Console):**
```javascript
// Vérifier que le bouton n'existe pas
console.log('btnBase10 existe?', document.getElementById('btnBase10'));  // doit être null
console.log('btnFinaliser existe?', document.getElementById('btnFinaliser'));  // doit être object
```

---

### 2️⃣ Vérification du Menu Admin
**Fichier:** `InterfaceV2.html` lignes 1758-1772

**À vérifier:**
- ✅ Deux boutons doivent être présents:
  - "Créer des groupes" → `onclick="openGroupsInterface('creator')"`
  - "Gérer les groupes" → `onclick="openGroupsInterface('manager')"`
- ✅ Les deux appellent `openGroupsInterface()`

**Commande debug (F12 > Console):**
```javascript
// Vérifier les boutons
const createBtn = document.getElementById('menuOpenGroupsAdmin');
const manageBtn = document.getElementById('menuManageGroupsAdmin');
console.log('Bouton Créer:', createBtn ? createBtn.textContent : 'NOT FOUND');
console.log('Bouton Gérer:', manageBtn ? manageBtn.textContent : 'NOT FOUND');
```

---

### 3️⃣ Vérification du Module GroupsModuleComplete
**Fichier:** `groupsModuleComplete.html`

**À vérifier:**
- ✅ Module s'initialise au chargement de la page
- ✅ `window.GroupsModuleComplete` est exposé globalement
- ✅ Les 5 étapes sont présentes

**Commande debug (F12 > Console):**
```javascript
// Vérifier le module
console.log('GroupsModuleComplete charge?', typeof window.GroupsModuleComplete !== 'undefined');
console.log('Méthodes disponibles:', Object.keys(window.GroupsModuleComplete || {}).slice(0, 10));
```

---

## 🧪 Tests Manuels du Flux

### Test 1: Ouverture du Menu Admin
1. Ouvrir InterfaceV2
2. Cliquer sur bouton `Admin` (rouge) dans le header
3. ✅ Le menu Admin doit s'ouvrir
4. ✅ La section "Groupes" doit être visible avec les deux boutons

**Si problème:**
- Vérifier que le menu Admin se déverrouille (demander mot de passe si nécessaire)
- Vérifier que `toggleSection('groupesSection')` fonctionne

---

### Test 2: Ouverture du Module Groupes
1. Dans le Menu Admin > Groupes > Cliquer "Créer des groupes"
2. ✅ GroupsModuleComplete doit s'ouvrir (modale ou panneau)
3. ✅ Step 1 doit afficher les 3 cartes: Besoins, LV2, Options

**Si problème:**
```javascript
// Debug d'ouverture
console.log('Calling openGroupsInterface...');
openGroupsInterface('creator');
// Vérifier les logs dans la console
```

---

### Test 3: Flux Complet d'une Génération
1. **Step 1:** Sélectionner "Groupes de Besoins"
2. **Step 2:** Sélectionner "Hétérogène"
3. **Step 3:**
   - Cocher quelques classes (ex. 6°1, 6°2)
   - Entrer un nom: "Passe 1"
   - Définir nb groupes: 3
   - Cliquer "Ajouter ce regroupement"
4. **Step 4:** Cliquer "Générer les groupes"
5. **Step 5:**
   - Les groupes doivent s'afficher avec les élèves
   - Les statistiques doivent être visibles

**Si problème à Step 3:**
```javascript
console.log('Classes disponibles:', state.availableClasses);
console.log('Regroupements créés:', state.regroupements);
```

---

## 🚨 Problèmes Courants & Solutions

### Problème 1: GroupsModuleComplete n'ouvre pas
**Symptôme:** Menu Admin cliqué mais rien ne se passe

**Causes possibles:**
1. `groupsModuleComplete.html` n'est pas inclus dans InterfaceV2.html
2. `window.GroupsModuleComplete` n'existe pas

**Solution:**
```javascript
// Vérifier inclusion
if (!window.GroupsModuleComplete) {
  console.error('❌ GroupsModuleComplete pas chargé. Vérifier:');
  console.log('- Script est-il inclus dans InterfaceV2.html?');
  console.log('- Le fichier groupsModuleComplete.html existe-t-il?');
}
```

---

### Problème 2: Les élèves ne sont pas chargés
**Symptôme:** "Aucun élève disponible" ou liste vide

**Causes possibles:**
1. Pas de classes avec suffixe "FIN" dans les onglets
2. Fonction `loadStudentsFromClasses()` échoue

**Solution:**
```javascript
// Vérifier les classes disponibles
console.log('Onglets disponibles:', Object.keys(window.SPREADSHEET_DATA || {}));
console.log('Onglets FIN:', Object.keys(window.SPREADSHEET_DATA || {}).filter(k => k.endsWith('FIN')));
```

---

### Problème 3: Swap ne fonctionne pas
**Symptôme:** Drag & drop ne bouge rien ou erreur

**Causes possibles:**
1. SortableJS non chargé
2. `initializeDragAndDrop()` pas appelée
3. Regroupement non valide

**Solution:**
```javascript
// Vérifier SortableJS
console.log('Sortable disponible?', typeof Sortable !== 'undefined');

// Vérifier regroupement actif
console.log('Regroupement actif:', state.activeRegroupementId);
console.log('Groupes générés:', state.generatedGroups?.length || 0);
```

---

### Problème 4: Statistiques ne s'actualisent pas
**Symptôme:** Swap réussi mais stats ne changent pas

**Causes possibles:**
1. `updateGroupStats()` pas appelée
2. Rendu pas rafraîchi

**Solution:**
```javascript
// Vérifier si stats recalculées
function calculateGroupStats(group) {
  console.log('Calcul stats pour:', group.name);
  const stats = {
    girls: group.students.filter(s => (s.sexe || '').toUpperCase() === 'F').length,
    boys: group.students.filter(s => (s.sexe || '').toUpperCase() === 'M').length,
    avgM: group.students.reduce((s, st) => s + (parseFloat(st.scores?.M) || 0), 0) / group.students.length,
    avgF: group.students.reduce((s, st) => s + (parseFloat(st.scores?.F) || 0), 0) / group.students.length
  };
  console.log('Stats calculées:', stats);
  return stats;
}
```

---

## 🔍 Console Logs de Vérification

Ajoute ces logs à la console (F12) pour vérifier chaque étape:

### Au démarrage:
```javascript
console.group('🚀 Initialisation BASE 10');
console.log('GroupsModuleComplete chargé?', !!window.GroupsModuleComplete);
console.log('Sortable.js chargé?', !!window.Sortable);
console.log('InterfaceV2 chargée?', !!window.updateUI);
console.groupEnd();
```

### À chaque génération:
```javascript
console.group('📊 Génération Groupes');
console.log('Scénario:', state.groupType);
console.log('Mode:', state.distributionType);
console.log('Regroupement actif:', state.activeRegroupementId);
console.log('Élèves chargés:', state.students?.length || 0);
console.log('Groupes générés:', state.generatedGroups?.length || 0);
console.groupEnd();
```

### À chaque swap:
```javascript
console.group('🔄 Swap Étudiant');
console.log('De groupe:', fromGroupIndex);
console.log('Vers groupe:', toGroupIndex);
console.log('Élève:', studentId);
console.groupEnd();
```

---

## ✅ Checklist Pré-Déploiement

### Code
- [ ] Bouton BASE 10 du header supprimé
- [ ] `Base10UI.open()` au démarrage supprimé
- [ ] Menu Admin > Groupes fonctionnel
- [ ] `openGroupsInterface()` appelée correctement

### Flux
- [ ] Step 1 (Scénario) OK
- [ ] Step 2 (Mode) OK
- [ ] Step 3 (Associations) OK
- [ ] Step 4 (Génération) OK
- [ ] Step 5 (Édition) OK

### Données
- [ ] Classes avec suffixe FIN détectées
- [ ] Élèves chargés correctement
- [ ] SCORE M, SCORE F présents
- [ ] COM, TRA, PART, ABS présents
- [ ] SEXE détecté (F/M)

### Interactions
- [ ] Drag & drop fonctionne
- [ ] Stats s'actualisent
- [ ] Alertes d'erreur s'affichent
- [ ] Swap limité au bloc

### Affichage
- [ ] UI responsive
- [ ] Styles corrects
- [ ] Icônes FontAwesome visibles
- [ ] Pas d'erreurs CSS

---

## 📞 Support

Si tu rencontres des problèmes:
1. **Ouvre F12 (Console)**
2. **Copie les logs d'erreur**
3. **Teste les commandes debug ci-dessus**
4. **Compare avec les fichiers modifiés**

Fichiers modifiés:
- ✏️ `InterfaceV2.html` (bouton, menu, orchestration)
- ✏️ `groupsModuleComplete.html` (swap contraint, UI améliorée)

---

**Dernière mise à jour:** 2025-10-30
**Version:** Base 10 REMIX - Octobre 2025
