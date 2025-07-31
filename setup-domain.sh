#!/bin/bash

# 🌐 Налаштування красивого домену для сайту пекарні
# Створено: @mm.slmn

echo "🍞 Налаштування домену для Пекарні в Ходосівці"
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
    echo "📋 Будь ласка, додайте вручну в файл hosts:"
    echo "192.168.0.101 bakery.hodosivka.local"
    exit 1
fi

# Перевірка чи вже додано
if grep -q "bakery.hodosivka.local" "$HOSTS_FILE"; then
    echo "✅ Домен вже налаштований!"
    echo "🌐 Можете відкрити: http://bakery.hodosivka.local"
else
    echo "🔧 Додаю домен до файлу hosts..."
    
    # Додавання домену
    echo "192.168.0.101 bakery.hodosivka.local" | sudo tee -a "$HOSTS_FILE"
    
    if [ $? -eq 0 ]; then
        echo "✅ Домен успішно додано!"
        echo "🌐 Тепер можете відкрити: http://bakery.hodosivka.local:8000"
    else
        echo "❌ Помилка при додаванні домену"
        echo "📋 Додайте вручну в $HOSTS_FILE:"
        echo "192.168.0.101 bakery.hodosivka.local"
    fi
fi

echo ""
echo "📱 Для доступу з телефону:"
echo "1. Переконайтеся, що телефон підключений до тієї ж Wi-Fi мережі"
echo "2. Відкрийте: http://bakery.hodosivka.local:8000"
echo "3. Або відскануйте QR код з qr.html"

echo ""
echo "🎯 Красивий домен готовий!"
echo "🌐 http://bakery.hodosivka.local:8000" 