#!/bin/bash

# 🔧 Виправлення домену для сайту пекарні
# Створено: @mm.slmn

echo "🔧 Виправлення домену для Пекарні в Ходосівці"
echo "================================================"

# Перевірка операційної системи
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    HOSTS_FILE="/etc/hosts"
    echo "📱 Виявлено macOS"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    HOSTS_FILE="/etc/hosts"
    echo "🐧 Виявлено Linux"
else
    echo "❌ Непідтримувана операційна система"
    exit 1
fi

echo "🔧 Видаляю неправильний домен..."

# Видалення неправильного домену
sudo sed -i '' '/bakery.hodosivka$/d' "$HOSTS_FILE"

echo "✅ Неправильний домен видалено!"

echo "🔧 Додаю правильний домен..."

# Додавання правильного домену
echo "192.168.0.101 bakery.hodosivka.local" | sudo tee -a "$HOSTS_FILE"

if [ $? -eq 0 ]; then
    echo "✅ Правильний домен успішно додано!"
    echo "🌐 Тепер можете відкрити: http://bakery.hodosivka.local"
else
    echo "❌ Помилка при додаванні домену"
    echo "📋 Додайте вручну в $HOSTS_FILE:"
    echo "192.168.0.101 bakery.hodosivka.local"
fi

echo ""
echo "📱 Для доступу з телефону:"
echo "1. Переконайтеся, що телефон підключений до тієї ж Wi-Fi мережі"
echo "2. Відкрийте: http://bakery.hodosivka.local"
echo "3. Або відскануйте QR код з qr.html"

echo ""
echo "🎯 Домен виправлено!"
echo "🌐 http://bakery.hodosivka.local" 