# QUICK START - PHASE 2 (Tests & Intégration)

**Date:** 2025-10-31
**Objective:** Tester et intégrer le nouveau module

---

## 📋 CHECKLIST RAPIDE

### Step 1: Vérifier les fichiers existent
```bash
cd "C:\OUTIL 25 26\DOSSIER BASE 10 REMIX\BASE 10 REMIX"

# Vérifier ces fichiers existent:
ls Base10Algorithm.html
ls groupsModuleComplete_V2.html
ls Base10Styles.html
```

### Step 2: Créer une page test simple
Crée `TestBase10.html` et copie ceci:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Test BASE 10</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

  <!-- Charger les modules -->
  <script>
    // Mock google.script.run pour tests locaux
    window.google = {
      script: {
        run: {
          loadStudentsData: function(classNames) {
            // Retourner mock data
            const students = [
              {CLASSE: '6A', NOM: 'Dupont', PRENOM: 'Jean', SCORE M: 15, SCORE F: 14, COM: 4, TRA: 4, PART: 3, ABS: 1, SEXE: 'M', LV2: 'ESP'},
              {CLASSE: '6A', NOM: 'Martin', PRENOM: 'Marie', SCORE M: 16, SCORE F: 15, COM: 5, TRA: 4, PART: 4, ABS: 0, SEXE: 'F', LV2: 'ESP'},
              {CLASSE: '6A', NOM: 'Bernard', PRENOM: 'Pierre', SCORE M: 12, SCORE F: 11, COM: 3, TRA: 3, PART: 2, ABS: 3, SEXE: 'M', LV2: 'ITA'},
              {CLASSE: '6A', NOM: 'Durand', PRENOM: 'Sophie', SCORE M: 14, SCORE F: 13, COM: 4, TRA: 3, PART: 3, ABS: 1, SEXE: 'F', LV2: 'ESP'},
              {CLASSE: '6A', NOM: 'Girard', PRENOM: 'Luc', SCORE M: 17, SCORE F: 16, COM: 5, TRA: 5, PART: 5, ABS: 0, SEXE: 'M', LV2: 'ESP'},

              {CLASSE: '6B', NOM: 'Petit', PRENOM: 'Anne', SCORE M: 13, SCORE F: 12, COM: 3, TRA: 3, PART: 2, ABS: 2, SEXE: 'F', LV2: 'ITA'},
              {CLASSE: '6B', NOM: 'Fournier', PRENOM: 'Paul', SCORE M: 15, SCORE F: 14, COM: 4, TRA: 4, PART: 3, ABS: 1, SEXE: 'M', LV2: 'ESP'},
              {CLASSE: '6B', NOM: 'Bonnet', PRENOM: 'Isabelle', SCORE M: 16, SCORE F: 15, COM: 5, TRA: 4, PART: 4, ABS: 0, SEXE: 'F', LV2: 'ESP'},
              {CLASSE: '6B', NOM: 'Riviere', PRENOM: 'Marc', SCORE M: 11, SCORE F: 10, COM: 2, TRA: 2, PART: 1, ABS: 4, SEXE: 'M', LV2: 'ITA'},
              {CLASSE: '6B', NOM: 'Moulin', PRENOM: 'Catherine', SCORE M: 14, SCORE F: 13, COM: 4, TRA: 3, PART: 3, ABS: 1, SEXE: 'F', LV2: 'ESP'},
            ];

            // Appeler le handler de succès avec délai (simule async)
            setTimeout(() => {
              this.successHandler({
                success: true,
                students: students
              });
            }, 500);

            return this; // Retourner pour chainer
          },

          saveTempGroups: function(payload) {
            console.log('saveTempGroups called with:', payload);
            setTimeout(() => {
              this.successHandler({
                success: true,
                offsetStart: payload.offsetStart,
                offsetEnd: payload.offsetEnd
              });
            }, 500);
            return this;
          },

          finalizeTempGroups: function(payload) {
            console.log('finalizeTempGroups called with:', payload);
            setTimeout(() => {
              this.successHandler({
                success: true,
                ranges: {}
              });
            }, 500);
            return this;
          },

          withSuccessHandler: function(callback) {
            this.successHandler = callback;
            return this;
          },

          withFailureHandler: function(callback) {
            this.failureHandler = callback;
            return this;
          }
        }
      }
    };
  </script>
</head>

<body class="bg-gray-100 p-4">
  <div class="max-w-6xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Test BASE 10 Module V2</h1>

    <div class="bg-white rounded-lg shadow p-6 mb-6">
      <h2 class="text-xl font-bold mb-4">Étape 1: Tester l'algorithme</h2>
      <button onclick="testAlgorithm()" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
        Tester Algorithm
      </button>
      <pre id="algorithmOutput" class="mt-4 bg-gray-100 p-4 rounded text-sm overflow-auto max-h-96"></pre>
    </div>

    <div class="bg-white rounded-lg shadow p-6 mb-6">
      <h2 class="text-xl font-bold mb-4">Étape 2: Lancer le module UI</h2>
      <button onclick="launchModule()" class="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
        Ouvrir Module BASE 10 V2
      </button>
    </div>

    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-bold mb-4">Logs Console</h2>
      <pre id="consoleLogs" class="bg-gray-100 p-4 rounded text-xs font-mono overflow-auto max-h-96"></pre>
    </div>
  </div>

  <!-- Charger nos modules -->
  <?!= include('Base10Algorithm'); ?>
  <?!= include('Base10Styles'); ?>
  <?!= include('groupsModuleComplete_V2'); ?>

  <script>
    // Capture console.log pour affichage
    const originalLog = console.log;
    const logs = [];

    console.log = function(...args) {
      originalLog.apply(console, args);
      logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' '));
      document.getElementById('consoleLogs').textContent = logs.slice(-50).join('\n');
    };

    function testAlgorithm() {
      const mockStudents = [
        {CLASSE: '6A', NOM: 'Dupont', SCORE M: 15, SCORE F: 14, COM: 4, TRA: 4, PART: 3, ABS: 1, SEXE: 'M'},
        {CLASSE: '6A', NOM: 'Martin', SCORE M: 16, SCORE F: 15, COM: 5, TRA: 4, PART: 4, ABS: 0, SEXE: 'F'},
        {CLASSE: '6A', NOM: 'Bernard', SCORE M: 12, SCORE F: 11, COM: 3, TRA: 3, PART: 2, ABS: 3, SEXE: 'M'},
        {CLASSE: '6A', NOM: 'Durand', SCORE M: 14, SCORE F: 13, COM: 4, TRA: 3, PART: 3, ABS: 1, SEXE: 'F'},
        {CLASSE: '6A', NOM: 'Girard', SCORE M: 17, SCORE F: 16, COM: 5, TRA: 5, PART: 5, ABS: 0, SEXE: 'M'},
      ];

      try {
        const groups = window.Base10Algorithm.generateGroups({
          students: mockStudents,
          scenarioType: 'needs',
          distributionType: 'heterogeneous',
          numGroups: 3
        });

        const output = {
          success: true,
          groupsCount: groups.length,
          groups: groups.map(g => ({
            name: g.name,
            studentCount: g.students.length,
            parityRatio: g.stats?.parityRatio,
            avgMath: g.detailedStats?.avgMath,
            avgFrench: g.detailedStats?.avgFrench
          }))
        };

        document.getElementById('algorithmOutput').textContent = JSON.stringify(output, null, 2);
        console.log('✅ Algorithm test successful:', output);
      } catch (error) {
        document.getElementById('algorithmOutput').textContent = `❌ Error: ${error.message}`;
        console.error('❌ Algorithm test failed:', error);
      }
    }

    function launchModule() {
      try {
        if (typeof window.Base10ModuleV2 === 'undefined') {
          alert('❌ Base10ModuleV2 not loaded');
          console.error('Base10ModuleV2 not available');
          return;
        }

        window.Base10ModuleV2.init('creator');
        window.Base10ModuleV2.open();
        console.log('✅ Module opened');
      } catch (error) {
        alert(`❌ Error: ${error.message}`);
        console.error('Module error:', error);
      }
    }

    // Initial check
    console.log('Test page loaded');
    console.log('Base10Algorithm available:', typeof window.Base10Algorithm !== 'undefined');
    console.log('Base10ModuleV2 available:', typeof window.Base10ModuleV2 !== 'undefined');
  </script>
</body>
</html>
```

### Step 3: Ouvrir et tester

1. **Ouvrir TestBase10.html dans un navigateur**
2. **Cliquer "Tester Algorithm"**
   - Vérifier que 3 groupes sont créés
   - Vérifier que chaque groupe a élèves + stats
3. **Cliquer "Ouvrir Module BASE 10 V2"**
   - Vérifier que le modal s'ouvre
   - Vérifier accordions déployables
   - Tester sélection scénario/mode
   - Tester add regroupement
4. **Tester génération**
   - Sélectionner 6A, 6B
   - 3 groupes
   - Cliquer "Générer"
   - Vérifier groupes affichés
5. **Tester swap**
   - Drag/drop élève d'un groupe à un autre
   - Vérifier stats update

---

## 🔍 Quoi vérifier

### Algorithm
- [ ] Z-scores calculés correctement
- [ ] Indices composites différents par étudiant
- [ ] Groupes équilibrés
- [ ] Parité F/M détectée
- [ ] Stats réalistes

### UI
- [ ] Modal apparaît
- [ ] Accordions ouvrent/ferment
- [ ] Cartes scénario sélectionnables
- [ ] Boutons mode functionnels
- [ ] Table regroupements remplissable
- [ ] Grid groupes responsive

### Logique
- [ ] loadStudentsData() appelé
- [ ] Groupes générés après clic
- [ ] Offset automatique OK
- [ ] Swap bloqué inter-blocs
- [ ] Stats updated après swap
- [ ] Toasts affichés

---

## 🐛 Bugs probables à corriger

### UI
- [ ] Classes Tailwind non disponibles (vérifier CDN)
- [ ] Sortable.js non disponible (vérifier CDN)
- [ ] Sélecteurs CSS cassés (#groupsContainer, etc)
- [ ] onclick handlers sans `window.` prefix

### Logique
- [ ] google.script.run non mocké
- [ ] Variable refs manquant `window.`
- [ ] Modal DOM refs manquant
- [ ] Array map/reduce erreurs

### Algorithme
- [ ] Colonnes mal nommées (SCORE M vs SCOREM)
- [ ] Z-score NaN pour valeurs manquantes
- [ ] Poids somment pas à 1.0

---

## ✅ Avant d'intégrer à InterfaceV2

Vérifier:
- [ ] Test page fonctionnelle
- [ ] Aucun error console
- [ ] Algorithm testé seul OK
- [ ] UI modal testé seul OK
- [ ] Swap & stats testés
- [ ] Mock google.script.run OK
- [ ] Responsive OK (resize fenêtre)

---

## 🚀 Integration à InterfaceV2

Une fois tout testé, ajouter à InterfaceV2.html:

```html
<!-- Après ligne 1296 (groupsModuleComplete include) -->

<?!= include('Base10Algorithm'); ?>
<?!= include('Base10Styles'); ?>
<?!= include('groupsModuleComplete_V2'); ?>
```

Et adapter openGroupsInterface():

```javascript
function openGroupsInterface(mode = 'creator') {
  // Nouveau code V2
  if (typeof window.Base10ModuleV2 !== 'undefined') {
    window.Base10ModuleV2.init(mode);
    window.Base10ModuleV2.open();
    return;
  }

  // Fallback ancien code
  console.warn('Base10ModuleV2 not available');
}
```

---

## 📞 Questions?

- Vérifier `SPECIFICATIONS_VALIDEES.md` pour tes choix
- Vérifier `REFACTORING_STRATEGY.md` pour plan complet
- Vérifier console logs pour debug

---

**Ready?** Créé la page test et commence à tester! 🚀
