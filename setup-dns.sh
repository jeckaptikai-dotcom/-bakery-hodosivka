#!/bin/bash

# 🌐 Налаштування DNS сервера для всіх пристроїв
# Створено: @mm.slmn

echo "🌐 Налаштування DNS сервера для Пекарні в Ходосівці"
echo "====================================================="

# Перевірка чи встановлений Homebrew
if ! command -v brew &> /dev/null; then
    echo "❌ Homebrew не встановлений"
    echo "📋 Встановіть Homebrew: https://brew.sh"
    exit 1
fi

echo "📦 Перевіряю dnsmasq..."

# Перевірка чи встановлений dnsmasq
if ! brew list dnsmasq &> /dev/null; then
    echo "📦 Встановлюю dnsmasq..."
    brew install dnsmasq
else
    echo "✅ dnsmasq вже встановлений"
fi

# Створення конфігурації
echo "🔧 Створюю конфігурацію dnsmasq..."

# Створити директорію якщо не існує
sudo mkdir -p /usr/local/etc

# Створити конфігурацію
cat > /tmp/dnsmasq.conf << EOF
# Конфігурація dnsmasq для Пекарні в Ходосівці
# Створено: @mm.slmn

# Основні налаштування
port=53
domain-needed
bogus-priv
no-resolv
no-poll

# Локальний домен
address=/bakery.hodosivka.local/192.168.0.101

# DNS сервери
server=8.8.8.8
server=8.8.4.4
EOF

# Копіювати конфігурацію
sudo cp /tmp/dnsmasq.conf /usr/local/etc/dnsmasq.conf

echo "✅ Конфігурація створена"

# Зупинити dnsmasq якщо запущений
echo "🛑 Зупиняю dnsmasq..."
sudo brew services stop dnsmasq 2>/dev/null || true

# Запустити dnsmasq
echo "🚀 Запускаю dnsmasq..."
sudo brew services start dnsmasq

if [ $? -eq 0 ]; then
    echo "✅ dnsmasq успішно запущений!"
    echo ""
    echo "🌐 DNS сервер налаштований!"
    echo "📱 Тепер налаштуйте DNS на інших пристроях:"
    echo ""
    echo "📋 Для iPhone/iPad:"
    echo "1. Settings → Wi-Fi → (i) → Configure DNS"
    echo "2. Manual → DNS: 192.168.0.101"
    echo ""
    echo "📋 Для Android:"
    echo "1. Settings → Wi-Fi → (i) → Advanced"
    echo "2. IP Settings → Static → DNS: 192.168.0.101"
    echo ""
    echo "🎯 Перевірка:"
    echo "ping bakery.hodosivka.local"
    echo "curl http://bakery.hodosivka.local:8000"
    echo ""
    echo "🌐 Тепер домен працює для всіх пристроїв!"
else
    echo "❌ Помилка при запуску dnsmasq"
    echo "📋 Перевірте права доступу"
fi

echo ""
echo "📋 Додаткова інформація:"
echo "- Файл конфігурації: /usr/local/etc/dnsmasq.conf"
echo "- Логи: /usr/local/var/log/dnsmasq.log"
echo "- Зупинити: sudo brew services stop dnsmasq"
echo "- Запустити: sudo brew services start dnsmasq" 