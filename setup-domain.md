# 🌐 Налаштування красивого домену для сайту пекарні

## 📱 Поточний доступ:
- **IP адреса:** `192.168.0.101:8000`
- **Красивий домен:** `bakery.hodosivka.local:8000`

## 🔧 Варіанти налаштування:

### 1. **Локальний домен (рекомендовано)**

#### На Mac/Linux:
```bash
# Додати в /etc/hosts
echo "192.168.0.101 bakery.hodosivka.local" | sudo tee -a /etc/hosts
```

#### На Windows:
```cmd
# Додати в C:\Windows\System32\drivers\etc\hosts
192.168.0.101 bakery.hodosivka.local
```

### 2. **Ngrok (для доступу з інтернету)**
```bash
# Встановити ngrok
brew install ngrok  # Mac
# або завантажити з ngrok.com

# Запустити тунель
ngrok http 8000
```

### 3. **Localtunnel (альтернатива)**
```bash
# Встановити
npm install -g localtunnel

# Запустити
lt --port 8000 --subdomain bakery-hodosivka
```

## 🎯 Результат:
- ✅ **Красивий URL:** `bakery.hodosivka.local:8000`
- ✅ **Легко запам'ятовується**
- ✅ **Професійний вигляд**
- ✅ **QR код з красивим доменом**

## 📋 Перевірка:
1. Відкрийте `bakery.hodosivka.local` в браузері
2. Переконайтеся, що сайт завантажується
3. Оновіть QR код з новим доменом

## 🔄 Оновлення QR коду:
Після налаштування домену оновіть QR код в `qr.html`:
```html
<img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=http://bakery.hodosivka.local:8000" alt="QR код">
```

---
*Створено: @mm.slmn* 