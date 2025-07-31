#!/bin/bash

echo "🍞 Швидке розгортання сайту пекарні"
echo "======================================"

# Перевірка чи є git
if ! command -v git &> /dev/null; then
    echo "❌ Git не встановлений. Встановіть Git спочатку."
    exit 1
fi

# Перехід в папку сайту
cd "$(dirname "$0")"

echo "📁 Підготовка файлів..."

# Ініціалізація git репозиторію
if [ ! -d ".git" ]; then
    git init
    echo "✅ Git репозиторій створено"
fi

# Додавання всіх файлів
git add .
git commit -m "Initial commit - Пекарня в Ходосівці" 2>/dev/null || git commit -m "Update - Пекарня в Ходосівці"

echo "✅ Файли підготовлені"

echo ""
echo "🌐 Наступні кроки:"
echo "=================="
echo ""
echo "1. Створіть репозиторій на GitHub:"
echo "   - Зайдіть на github.com"
echo "   - Натисніть 'New repository'"
echo "   - Назвіть 'bakery-hodosivka'"
echo "   - НЕ створюйте README.md"
echo ""
echo "2. Підключіть локальний репозиторій:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/bakery-hodosivka.git"
echo "   git push -u origin main"
echo ""
echo "3. Увімкніть GitHub Pages:"
echo "   - В репозиторії виберіть Settings"
echo "   - Прокрутіть до 'Pages'"
echo "   - Виберіть 'Deploy from a branch'"
echo "   - Виберіть 'main' branch"
echo "   - Натисніть 'Save'"
echo ""
echo "4. Дочекайтеся розгортання (2-5 хвилин)"
echo ""
echo "🌍 Сайт буде доступний за адресою:"
echo "   https://YOUR_USERNAME.github.io/bakery-hodosivka"
echo ""
echo "📱 Для доступу з телефону:"
echo "   - Відкрийте сайт на телефоні"
echo "   - Додайте на головний екран"
echo "   - Використовуйте як додаток"
echo ""
echo "🔄 Для оновлення сайту:"
echo "   git add ."
echo "   git commit -m 'Update'"
echo "   git push origin main"
echo ""
echo "✅ Сайт буде працювати 24/7!" 