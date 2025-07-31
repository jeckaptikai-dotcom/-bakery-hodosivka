# 🌐 Налаштування домену для всіх пристроїв

## 🎯 Мета
Зробити так, щоб `bakery.hodosivka.local` працював на всіх пристроях в мережі.

## 📋 Варіанти налаштування:

### 1. **DNS сервер на роутері (найкращий варіант)**

#### Для роутерів TP-Link:
1. Відкрийте налаштування роутера (зазвичай `192.168.0.1`)
2. Перейдіть в **Advanced Settings** → **Network** → **DHCP**
3. Знайдіть **DHCP Reservation** або **Static IP**
4. Додайте запис:
   - **IP Address:** `192.168.0.101`
   - **MAC Address:** вашого MacBook
5. Перейдіть в **Advanced Settings** → **Network** → **DNS**
6. Додайте в **Local DNS**:
   - **Domain:** `bakery.hodosivka.local`
   - **IP Address:** `192.168.0.101`

#### Для роутерів ASUS:
1. Відкрийте `192.168.1.1`
2. Перейдіть в **LAN** → **DHCP Server**
3. Додайте **Static IP** для вашого MacBook
4. Перейдіть в **LAN** → **Route**
5. Додайте маршрут:
   - **Network/Host:** `bakery.hodosivka.local`
   - **Gateway:** `192.168.0.101`

### 2. **Pi-hole DNS сервер (професійний варіант)**

```bash
# Встановити Pi-hole на Raspberry Pi або віртуальну машину
curl -sSL https://install.pi-hole.net | bash

# Додати домен в Pi-hole
echo "192.168.0.101 bakery.hodosivka.local" >> /etc/pihole/custom.list
```

### 3. **dnsmasq на MacBook (тимчасове рішення)**

```bash
# Встановити dnsmasq
brew install dnsmasq

# Створити конфігурацію
echo "address=/bakery.hodosivka.local/192.168.0.101" > /usr/local/etc/dnsmasq.conf

# Запустити dnsmasq
sudo brew services start dnsmasq

# Налаштувати DNS на інших пристроях
# DNS: 192.168.0.101
```

### 4. **Ngrok (для доступу з інтернету)**

```bash
# Встановити ngrok
brew install ngrok

# Запустити тунель
ngrok http 8000

# Результат: https://random-name.ngrok.io
```

### 5. **Localtunnel (альтернатива Ngrok)**

```bash
# Встановити localtunnel
npm install -g localtunnel

# Запустити тунель
lt --port 8000 --subdomain bakery-hodosivka

# Результат: https://bakery-hodosivka.loca.lt
```

## 🎯 Рекомендований підхід:

### **Для домашньої мережі:**
1. ✅ **Налаштувати DNS на роутері** (варіант 1)
2. ✅ **Або використати Pi-hole** (варіант 2)

### **Для публічного доступу:**
1. ✅ **Використати Ngrok** (варіант 4)
2. ✅ **Або Localtunnel** (варіант 5)

## 📱 Перевірка роботи:

### **На MacBook:**
```bash
ping bakery.hodosivka.local
curl http://bakery.hodosivka.local:8000
```

### **На телефоні:**
1. Підключитися до тієї ж Wi-Fi мережі
2. Відкрити: `http://bakery.hodosivka.local:8000`

## 🔧 Швидке рішення (dnsmasq):

```bash
# Встановити та налаштувати dnsmasq
brew install dnsmasq
echo "address=/bakery.hodosivka.local/192.168.0.101" > /usr/local/etc/dnsmasq.conf
sudo brew services start dnsmasq

# На телефоні змінити DNS на 192.168.0.101
```

## 📋 Інструкція для користувачів:

### **Налаштування DNS на телефоні:**
1. **iOS:** Settings → Wi-Fi → (i) → Configure DNS → Manual → DNS: `192.168.0.101`
2. **Android:** Settings → Wi-Fi → (i) → Advanced → IP Settings → Static → DNS: `192.168.0.101`

### **Перевірка:**
- Відкрити: `http://bakery.hodosivka.local:8000`
- Повинно працювати на всіх пристроях!

---
*Створено: @mm.slmn* 