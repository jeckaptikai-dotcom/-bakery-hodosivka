// Tab switching
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all tabs
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab
        btn.classList.add('active');
        document.getElementById(btn.getAttribute('data-tab')).classList.add('active');
    });
});

// Load saved data from localStorage
function loadSavedData() {
    const savedData = localStorage.getItem('bakeryData');
    if (savedData) {
        const data = JSON.parse(savedData);
        
        // Load content
        if (data.heroTitle) document.getElementById('hero-title').value = data.heroTitle;
        if (data.heroSubtitle) document.getElementById('hero-subtitle').value = data.heroSubtitle;
        if (data.aboutText) document.getElementById('about-text').value = data.aboutText;
        
        // Load contact info
        if (data.phone) document.getElementById('phone').value = data.phone;
        if (data.address) document.getElementById('address').value = data.address;
        if (data.hours) document.getElementById('hours').value = data.hours;
        
        // Load settings
        if (data.siteTitle) document.getElementById('site-title').value = data.siteTitle;
        if (data.themeColor) document.getElementById('theme-color').value = data.themeColor;
        
        // Load menu items
        if (data.menuItems) {
            loadMenuItems(data.menuItems);
        }
    }
}

// Save changes to localStorage
function saveChanges() {
    const data = {
        heroTitle: document.getElementById('hero-title').value,
        heroSubtitle: document.getElementById('hero-subtitle').value,
        aboutText: document.getElementById('about-text').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        hours: document.getElementById('hours').value,
        siteTitle: document.getElementById('site-title').value,
        themeColor: document.getElementById('theme-color').value,
        menuItems: getMenuItems()
    };
    
    localStorage.setItem('bakeryData', JSON.stringify(data));
    showSuccessMessage('Зміни збережено!');
}

// Get menu items from DOM
function getMenuItems() {
    const menuItems = [];
    document.querySelectorAll('.menu-item').forEach(item => {
        menuItems.push({
            name: item.querySelector('.menu-item-title').textContent,
            description: item.querySelector('.menu-item-details').textContent,
            price: item.querySelector('.menu-item-price')?.textContent || '',
            category: item.getAttribute('data-category'),
            image: item.querySelector('.menu-item-image')?.src || ''
        });
    });
    return menuItems;
}

// Load menu items to DOM
function loadMenuItems(items) {
    const container = document.getElementById('menu-items');
    container.innerHTML = '';
    
    items.forEach(item => {
        const menuItem = createMenuItemElement(item);
        container.appendChild(menuItem);
    });
}

// Create menu item element
function createMenuItemElement(item) {
    const div = document.createElement('div');
    div.className = 'menu-item';
    div.setAttribute('data-category', item.category);
    
    const imageHtml = item.image ? `<img src="${item.image}" alt="${item.name}" class="menu-item-image" style="max-width: 100px; max-height: 100px; border-radius: 8px; object-fit: cover; margin: 10px 0;">` : '';
    
    div.innerHTML = `
        <div class="menu-item-header">
            <div class="menu-item-title">${item.name}</div>
            <div class="menu-item-actions">
                <button class="btn btn-secondary" onclick="editMenuItem(this)">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-secondary" onclick="deleteMenuItem(this)">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
        ${imageHtml}
        <div class="menu-item-details">${item.description}</div>
        <div class="menu-item-price">${item.price}</div>
    `;
    
    return div;
}

// Add menu item
function addMenuItem() {
    document.getElementById('menu-modal').classList.add('active');
}

// Close modal
function closeModal() {
    document.getElementById('menu-modal').classList.remove('active');
    // Clear form
    document.getElementById('item-name').value = '';
    document.getElementById('item-description').value = '';
    document.getElementById('item-price').value = '';
    document.getElementById('item-category').value = 'bread';
    document.getElementById('item-image-file').value = '';
    document.getElementById('item-image-url').value = '';
    
    // Reset image preview
    const imagePreview = document.getElementById('image-preview');
    if (imagePreview) {
        imagePreview.innerHTML = '<p>Перетягніть фото сюди або натисніть для вибору</p>';
    }
    
    // Reset radio buttons
    const fileRadio = document.querySelector('input[value="file"]');
    if (fileRadio) {
        fileRadio.checked = true;
    }
    
    // Show file input, hide URL input
    const imageFileInput = document.getElementById('item-image-file');
    const imageUrlInput = document.getElementById('item-image-url');
    if (imageFileInput && imageUrlInput) {
        imageFileInput.style.display = 'block';
        imageUrlInput.style.display = 'none';
    }
}

// Save menu item
function saveMenuItem() {
    const name = document.getElementById('item-name').value;
    const description = document.getElementById('item-description').value;
    const price = document.getElementById('item-price').value;
    const category = document.getElementById('item-category').value;
    const image = getImageData();
    
    if (!name || !description || !price) {
        alert('Будь ласка, заповніть всі обов\'язкові поля');
        return;
    }
    
    const item = {
        name,
        description,
        price: `${price} грн`,
        category,
        image
    };
    
    const container = document.getElementById('menu-items');
    const menuItem = createMenuItemElement(item);
    container.appendChild(menuItem);
    
    closeModal();
    showSuccessMessage('Продукт додано!');
}

// Edit menu item
function editMenuItem(button) {
    const menuItem = button.closest('.menu-item');
    const title = menuItem.querySelector('.menu-item-title').textContent;
    const description = menuItem.querySelector('.menu-item-details').textContent;
    const price = menuItem.querySelector('.menu-item-price').textContent.replace(' грн', '');
    const category = menuItem.getAttribute('data-category');
    const image = menuItem.querySelector('.menu-item-image')?.src || '';
    
    // Fill modal with current values
    document.getElementById('item-name').value = title;
    document.getElementById('item-description').value = description;
    document.getElementById('item-price').value = price;
    document.getElementById('item-category').value = category;
    
    // Handle image
    if (image) {
        if (image.startsWith('data:') || image.startsWith('http')) {
            // It's a base64 or URL image
            const imagePreview = document.getElementById('image-preview');
            if (imagePreview) {
                imagePreview.innerHTML = `<img src="${image}" alt="Preview">`;
            }
        }
    }
    
    // Show modal
    document.getElementById('menu-modal').classList.add('active');
    
    // Store reference to item being edited
    document.getElementById('menu-modal').setAttribute('data-editing', menuItem);
}

// Delete menu item
function deleteMenuItem(button) {
    if (confirm('Ви впевнені, що хочете видалити цей продукт?')) {
        const menuItem = button.closest('.menu-item');
        menuItem.remove();
        showSuccessMessage('Продукт видалено!');
    }
}

// Preview site
function previewSite() {
    // Save current changes
    saveChanges();
    
    // Open site in new tab
    window.open('index.html', '_blank');
}

// Show success message
function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Auto-save on input change
document.querySelectorAll('input, textarea, select').forEach(input => {
    input.addEventListener('change', () => {
        // Auto-save after 2 seconds of inactivity
        clearTimeout(window.autoSaveTimeout);
        window.autoSaveTimeout = setTimeout(() => {
            saveChanges();
        }, 2000);
    });
});

// Load data when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadSavedData();
    
    // Make creator link clickable in admin panel
    const creatorText = document.querySelector('.logo p');
    if (creatorText) {
        creatorText.innerHTML = '<a href="https://t.me/mm.slmn" target="_blank" style="color: #8B7355; text-decoration: none;">Творець: @mm.slmn</a>';
    }
    
    // Initialize image upload functionality
    initializeImageUpload();
});

// Initialize image upload functionality
function initializeImageUpload() {
    const imagePreview = document.getElementById('image-preview');
    const imageFileInput = document.getElementById('item-image-file');
    const imageUrlInput = document.getElementById('item-image-url');
    const radioButtons = document.querySelectorAll('input[name="image-source"]');
    
    // Handle radio button changes
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'file') {
                imageFileInput.style.display = 'block';
                imageUrlInput.style.display = 'none';
                imagePreview.style.display = 'flex';
            } else {
                imageFileInput.style.display = 'none';
                imageUrlInput.style.display = 'block';
                imagePreview.style.display = 'none';
            }
        });
    });
    
    // Handle drag and drop
    if (imagePreview) {
        imagePreview.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.parentElement.classList.add('dragover');
        });
        
        imagePreview.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.parentElement.classList.remove('dragover');
        });
        
        imagePreview.addEventListener('drop', function(e) {
            e.preventDefault();
            this.parentElement.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleImageFile(files[0]);
            }
        });
        
        // Click to select file
        imagePreview.addEventListener('click', function() {
            imageFileInput.click();
        });
    }
}

// Handle image file selection
function handleImageFile(file) {
    if (!file.type.startsWith('image/')) {
        alert('Будь ласка, виберіть зображення');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        previewImage(e.target.result);
    };
    reader.readAsDataURL(file);
}

// Preview image
function previewImage(input) {
    const imagePreview = document.getElementById('image-preview');
    
    if (input.files && input.files[0]) {
        const file = input.files[0];
        handleImageFile(file);
    } else if (typeof input === 'string') {
        // Direct URL or data URL
        imagePreview.innerHTML = `<img src="${input}" alt="Preview">`;
    }
}

// Convert image to base64 for storage
function getImageData() {
    const imagePreview = document.getElementById('image-preview');
    const img = imagePreview.querySelector('img');
    
    if (img) {
        return img.src; // This will be the base64 data URL
    }
    
    const imageUrlInput = document.getElementById('item-image-url');
    if (imageUrlInput.value) {
        return imageUrlInput.value;
    }
    
    return '';
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 's':
                e.preventDefault();
                saveChanges();
                break;
            case 'p':
                e.preventDefault();
                previewSite();
                break;
        }
    }
}); 