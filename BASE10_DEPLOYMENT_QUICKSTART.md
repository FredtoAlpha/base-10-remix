# 🚀 **BASE 10 REMIX - DÉPLOIEMENT RAPIDE**

## ⚡ **DÉPLOIEMENT EN 5 ÉTAPES**

### **Étape 1: Vérification des Fichiers**
```bash
# Vérifier que vous avez bien:
✅ InterfaceV2_Base10.html          # Interface principale BASE 10
✅ groupsModuleComplete.html        # Module (hérité BASE 8)
✅ Code.js                          # Backend modifié
✅ InterfaceV2_Styles.html          # Styles hérités
```

### **Étape 2: Configuration Apps Script**
```bash
# Si nécessaire, initialiser clasp
clasp login

# Vérifier .clasp.json
{
  "scriptId": "VOTRE_SCRIPT_ID",
  "rootDir": "C:\\OUTIL 25 26\\DOSSIER BASE 10 REMIX\\BASE 10 REMIX"
}
```

### **Étape 3: Déploiement**
```bash
# Se placer dans le bon répertoire
cd "C:\OUTIL 25 26\DOSSIER BASE 10 REMIX\BASE 10 REMIX"

# Déployer
clasp push --force
```

### **Étape 4: Test**
1. Ouvrir votre Google Sheet
2. Menu → "🎓 Répartition Classes" → "🚀 Groupes BASE 10"
3. Vérifier que l'interface s'ouvre
4. Tester la génération de groupes

### **Étape 5: Validation**
```bash
# Points à vérifier:
✅ Interface deux panneaux visible
✅ Élèves se chargent depuis feuille ELEVES
✅ Génération de groupes fonctionne
✅ Drag & drop entre groupes fonctionnel
✅ Sauvegarde crée feuille GROUPES_BASE10
```

---

## 🔧 **CONFIGURATION FEUILLE ELEVES**

### **Format Requis**
```
| Nom        | Prénom   | Classe | Genre | Maths | Français |
|------------|----------|--------|-------|-------|----------|
| Martin     | Sophie   | 3èmeA  | F     | 15    | 14       |
| Dupont     | Pierre   | 3èmeA  | M     | 13    | 12       |
| Bernard    | Marie    | 3èmeB  | F     | 11    | 13       |
```

### **Colonnes Obligatoires**
- **Nom** ou **Name**
- **Prénom** ou **First**
- **Classe** ou **Class**
- **Genre** ou **Sexe** (M/F)
- **Maths** (optionnel mais recommandé)
- **Français** ou **French** (optionnel mais recommandé)

---

## 🎯 **UTILISATION RAPIDE**

### **Scénario de Base**
1. **Ouvrir BASE 10**: Menu → "🚀 Groupes BASE 10"
2. **Choisir stratégie**: "Groupes de Besoins"
3. **Régler taille**: 5 groupes
4. **Sélectionner élèves**: Cocher les élèves voulus
5. **Générer**: Cliquer "Générer les groupes"
6. **Ajuster**: Drag & drop si nécessaire
7. **Finaliser**: Cliquer "Finaliser"

### **Raccourcis Clavier**
- **Ctrl+G**: Générer les groupes
- **Ctrl+S**: Sauvegarder
- **Ctrl+F**: Rechercher un élève

---

## 🚨 **DÉPANNAGE RAPIDE**

### **Problème: Interface blanche**
```bash
# Cause probable: groupsModuleComplete.html manquant
# Solution: Vérifier que tous les fichiers sont présents
clasp list
```

### **Problème: Élèves ne se chargent pas**
```javascript
// Vérifier la feuille ELEVES
// Colonnes mal nommées ou feuille manquante
```

### **Problème: Bouton "Générer" inactif**
```javascript
// Vérifier:
// 1. Une stratégie est sélectionnée
// 2. Au moins un élève est sélectionné
```

---

## 📊 **VÉRIFICATION POST-DÉPLOIEMENT**

### **Tests Automatiques**
```javascript
// Dans la console du navigateur:
Base10UI.state.strategy        // Doit être non null
Base10UI.state.selectedStudents.length  // Doit être > 0
Base10UI.state.groups.length    // Doit être > 0 après génération
```

### **Tests Fonctionnels**
- [ ] Interface s'ouvre en moins de 3 secondes
- [ ] Recherche d'élèves fonctionne
- [ ] Génération de groupes < 2 secondes
- [ ] Sauvegarde dans feuille GROUPES_BASE10
- [ ] Statistiques se calculent automatiquement

---

## 🔄 **MISES À JOUR**

### **Pour mettre à jour BASE 10**
```bash
# 1. Modifier les fichiers localement
# 2. Déployer
clasp push --force

# 3. Tester dans Apps Script
# Menu → "🚀 Groupes BASE 10"
```

### **Backup avant mise à jour**
```bash
# Sauvegarder la version actuelle
git add .
git commit -m "Backup BASE 10 v1.0"
git tag -a "v1.0" -m "Version stable BASE 10"
```

---

## 📞 **SUPPORT**

### **Ressources**
- **Documentation complète**: `BASE10_DOCUMENTATION_COMPLETE.md`
- **Spécifications**: `BASE10_ARCHITECTURE_SPEC.md`
- **Logs**: Console Apps Script (Exécutions)

### **Contact**
- **Console**: `console.log('BASE10_DEBUG: ...')`
- **Logs Apps Script**: Menu → Exécutions
- **Email support**: [Votre email]

---

**BASE 10 Remix est prêt ! Déployez maintenant et profitez de la nouvelle expérience de groupement !** 🚀

---

*Déploiement rapide - Version 1.0*
*Créé le 30 octobre 2025*
