# 🏗️ **BASE 10 REMIX - SPÉCIFICATIONS ARCHITECTURE**

## 📋 **PRINCIPES FONDAMENTAUX**

### **1. SINGLE INTERFACE PRINCIPLE**
- ❌ **PAS d'interface double** (erreur BASE 9)
- ✅ **InterfaceV2.html** = Point d'entrée UNIQUE
- ✅ **groupsModuleComplete.html** = Module script SEULEMENT
- ✅ **Pas de wrapper HTML autonome**

### **2. MODULE PATTERN STRICT**
```javascript
// groupsModuleComplete.html = Script module ONLY
<script>
(function(global) {
  'use strict';
  
  // API publique
  global.GroupsModuleComplete = {
    init: function() { /* initialisation */ },
    open: function() { /* ouverture modale */ },
    close: function() { /* fermeture */ }
  };
  
})(typeof window !== 'undefined' ? window : this);
</script>
```

### **3. DEPENDENCIES CENTRALISATION**
- ✅ **InterfaceV2.html** gère TOUTES les dépendances
- ✅ Tailwind, SortableJS, Font Awesome, Chart.js
- ✅ **groupsModuleComplete.html** n'a AUCUNE dépendance

---

## 🎯 **BASE 10 UX - DEUX PANNEAUX PERMANENTS**

### **Panneau Gauche: Configuration Guidée**
```
┌─────────────────────────────────────────┐
│ 🎯 CONFIGURATION DES GROUPES             │
├─────────────────────────────────────────┤
│ 📂 ÉTAPE 1: Objectif du regroupement ▼  │
│ ┌─────────────────────────────────────┐ │
│ │ 🎲 Carte: Aléatoire                 │ │
│ │ ⚖️ Carte: Équilibre                 │ │
│ │ 🎯 Carte: Besoins                   │ │
│ │ 🌐 Carte: LV2                       │ │
│ └─────────────────────────────────────┘ │
│ Taille: [5] groupes ▼                  │
│                                         │
│ 📂 ÉTAPE 2: Participants ▼             │
│ 🔍 [Rechercher...]                     │
│ ☑ Martin Sophie  ☐ Dupont Pierre       │
│ 12 élèves sélectionnés                  │
│ [Tout sélectionner] [Tout désélectionner] │
│                                         │
│ 📂 ÉTAPE 3: Options avancées ▶          │
│                                         │
│ [🎲 Générer les groupes]                │
└─────────────────────────────────────────┘
```

### **Panneau Droit: Espace de Travail**
```
┌─────────────────────────────────────────┐
│ 📊 ESPACE DE TRAVAIL DES GROUPES         │
├─────────────────────────────────────────┤
│ [🔄 Régénérer] [💾 Sauvegarder] [✅ Finaliser] │
│                                         │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐     │
│ │ Groupe 1 │ │ Groupe 2 │ │ Groupe 3 │     │
│ │ ⚖️ 85%   │ │ ⚖️ 82%   │ │ ⚖️ 88%   │     │
│ │ 👤👤👤   │ │ 👤👤👤   │ │ 👤👤👤   │     │
│ │ [Drag]  │ │ [Drag]  │ │ [Drag]  │     │
│ └─────────┘ └─────────┘ └─────────┘     │
│                                         │
│ 📈 [Statistiques affichées] ▼           │
│ ┌─────────────────────────────────────┐ │
│ │ Distribution scores: 85/100         │ │
│ │ Équilibre genre: 92/100             │ │
│ │ Total élèves: 12                    │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

---

## 🔄 **FLOW TECHNIQUE BASE 10**

### **1. Point d'entrée**
```
Menu Apps Script → "🎯 Groupes BASE 10"
↓
Code.js showGroupsModuleV10()
↓
HtmlService.createHtmlOutputFromFile('InterfaceV2')
↓
InterfaceV2.html charge groupsModuleComplete.html
↓
InterfaceV2 appelle GroupsModuleComplete.open()
```

### **2. Cycle de vie**
```javascript
// InterfaceV2.html (contrôleur principal)
document.addEventListener('DOMContentLoaded', function() {
  // Charger le module
  loadScript('groupsModuleComplete.html', function() {
    // Initialiser le module
    window.GroupsModuleComplete.init();
    
    // Ouvrir l'interface BASE 10
    window.GroupsModuleComplete.open();
  });
});
```

### **3. Communication Apps Script**
```javascript
// TOUT passe par InterfaceV2
google.script.run
  .withSuccessHandler(handleData)
  .withFailureHandler(handleError)
  .getStudentsData();
```

---

## 🚨 **RÈGLES STRICTES ANTI-RÉGRESSION**

### **🚩 RED FLAGS À SURVEILLER**
- ❌ **JAMAIS** déployer `groupsModuleComplete.html` seul
- ❌ **JAMAIS** créer une "Interface V3" parallèle  
- ❌ **JAMAIS** dupliquer les dépendances
- ❌ **JAMAIS** appeler `showGroupsModule()` sur le module brut

### **✅ CHECKLIST OBLIGATOIRE**
- [ ] **InterfaceV2.html** = Point d'entrée UNIQUE
- [ ] **groupsModuleComplete.html** = Script module ONLY
- [ ] **Toutes dépendances** dans InterfaceV2
- [ ] **Appel explicite** à `GroupsModuleComplete.open()`
- [ ] **Communication Apps Script** centralisée

---

## 🎨 **COMPOSANTS TECHNIQUES**

### **1. Accordion Components**
```javascript
class Base10Accordion {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.panels = new Map();
  }
  
  addPanel(id, title, content, defaultOpen = false) {
    // Créer panneau dépliant avec animations
  }
  
  openPanel(id) {
    // Ouvrir panneau spécifique
  }
  
  validateSequence() {
    // Valider ordre d'ouverture
  }
}
```

### **2. Dual Panel Layout**
```css
.base10-container {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 20px;
  height: 100vh;
}

.base10-config-panel {
  background: #f8fafc;
  border-right: 1px solid #e2e8f0;
  overflow-y: auto;
}

.base10-workspace-panel {
  background: white;
  overflow-y: auto;
}
```

### **3. State Management**
```javascript
const Base10State = {
  config: {
    strategy: null,
    groupSize: 5,
    selectedStudents: [],
    options: {}
  },
  workspace: {
    groups: [],
    statistics: {},
    showStats: false
  },
  ui: {
    activeAccordion: 'strategy',
    workspaceMode: 'edit'
  }
};
```

---

## 📊 **HÉRITAGE BASE 8**

### **Composants réutilisés**
- ✅ **Strategy Cards** (cartes de stratégie)
- ✅ **Size Slider** (slider de taille)
- ✅ **Student Filters** (filtres élèves)
- ✅ **Group Cards** (cartes de groupe)
- ✅ **Drag & Drop** (SortableJS)
- ✅ **Statistics Panel** (statistiques)

### **Fonctions préservées**
- ✅ `renderStrategyCards()`
- ✅ `updateGroupSize()`
- ✅ `filterStudents()`
- ✅ `generateGroups()`
- ✅ `calculateStatistics()`

---

## 🚀 **IMPLÉMENTATION PLAN**

### **Phase 1: Structure BASE 10**
1. Créer `InterfaceV2_Base10.html`
2. Implémenter layout deux panneaux
3. Intégrer accordion components

### **Phase 2: Migration Module**
1. Adapter `groupsModuleComplete.html` pour BASE 10
2. Conserver API existante (`init`, `open`, `close`)
3. Ajouter nouvelles méthodes BASE 10

### **Phase 3: Intégration**
1. Modifier `Code.js` pour `showGroupsModuleV10()`
2. Tester flow complet
3. Valider compatibilité Apps Script

---

**BASE 10 Remix = Evolution de BASE 8, pas révolution !** 🎯
