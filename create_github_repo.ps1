# 🚀 Script de Création du Dépôt GitHub BASE 10 REMIX
# Ce script aide à créer et configurer le dépôt GitHub

Write-Host "🚀 BASE 10 REMIX - Création du Dépôt GitHub" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# Demander le username GitHub
$username = Read-Host "Entrez votre username GitHub"

if ([string]::IsNullOrWhiteSpace($username)) {
    Write-Host "❌ Username requis pour continuer" -ForegroundColor Red
    exit 1
}

Write-Host "📋 Configuration du dépôt pour: $username" -ForegroundColor Green
Write-Host ""

# Mettre à jour le remote avec le vrai username
Write-Host "🔗 Configuration du remote Git..." -ForegroundColor Yellow
git remote set-url origin "https://github.com/$username/base-10-remix.git"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Remote configuré avec succès" -ForegroundColor Green
} else {
    Write-Host "❌ Erreur lors de la configuration du remote" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📤 Pousser le code vers GitHub..." -ForegroundColor Yellow

# Pousser le code
git push -u origin master

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "🎉 SUCCÈS ! Dépôt GitHub créé et synchronisé !" -ForegroundColor Green
    Write-Host ""
    Write-Host "📍 URL du dépôt: https://github.com/$username/base-10-remix" -ForegroundColor Cyan
    Write-Host "📖 Documentation: https://github.com/$username/base-10-remix/blob/main/README.md" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "🚀 BASE 10 REMIX est maintenant disponible sur GitHub !" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "❌ Erreur lors du push vers GitHub" -ForegroundColor Red
    Write-Host ""
    Write-Host "📋 Instructions manuelles:" -ForegroundColor Yellow
    Write-Host "1. Créez le dépôt sur https://github.com/new" -ForegroundColor White
    Write-Host "2. Nom du dépôt: base-10-remix" -ForegroundColor White
    Write-Host "3. Description: BASE 10 REMIX - Groupement Intelligents" -ForegroundColor White
    Write-Host "4. Visibilité: Public" -ForegroundColor White
    Write-Host "5. Puis exécutez: git push -u origin master" -ForegroundColor White
}

Write-Host ""
Write-Host "Appuyez sur une touche pour quitter..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
