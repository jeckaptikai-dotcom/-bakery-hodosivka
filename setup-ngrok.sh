#!/bin/bash

# 🌐 Налаштування Ngrok для публічного доступу
# Створено: @mm.slmn

echo "🌐 Налаштування Ngrok для Пекарні в Ходосівці"
echo "==============================================="

# Перевірка чи встановлений Homebrew
if ! command -v brew &> /dev/null; then
    echo "❌ Homebrew не встановлений"
    echo "📋 Встановіть Homebrew: https://brew.sh"
    exit 1
fi

echo "📦 Перевіряю ngrok..."

# Перевірка чи встановлений ngrok
if ! command -v ngrok &> /dev/null; then
    echo "📦 Встановлюю ngrok..."
    brew install ngrok
else
    echo "✅ ngrok вже встановлений"
fi

echo ""
echo "🔧 Налаштування ngrok:"
echo "1. Зареєструйтесь на https://ngrok.com"
echo "2. Отримайте authtoken"
echo "3. Виконайте: ngrok config add-authtoken YOUR_TOKEN"
echo ""

# Перевірка авторизації
if ! ngrok config check &> /dev/null; then
    echo "⚠️  Ngrok не налаштований"
    echo "📋 Виконайте: ngrok config add-authtoken YOUR_TOKEN"
    echo "📋 Або запустіть без авторизації (обмежена функціональність)"
    echo ""
    echo "🚀 Запуск ngrok без авторизації..."
    ngrok http 8000
else
    echo "✅ Ngrok налаштований"
    echo ""
    echo "🚀 Запуск ngrok..."
    ngrok http 8000
fi

echo ""
echo "📋 Після запуску ngrok:"
echo "1. Скопіюйте URL (наприклад: https://abc123.ngrok.io)"
echo "2. Поділіться посиланням з іншими"
echo "3. Сайт буде доступний з будь-якого пристрою!"
echo ""
echo "🌐 Альтернатива: використайте localtunnel"
echo "npm install -g localtunnel"
echo "lt --port 8000 --subdomain bakery-hodosivka" 