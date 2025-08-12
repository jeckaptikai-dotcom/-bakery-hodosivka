// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Load categories from localStorage
function loadCategories() {
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');
    const categoriesContainer = document.getElementById('menu-categories');
    
    if (categoriesContainer) {
        // Keep the "All" button
        let categoriesHTML = '<button class="category-btn active" data-category="all">Всі</button>';
        
        // Add dynamic categories
        categories.forEach(category => {
            categoriesHTML += `<button class="category-btn" data-category="${category.code}">${category.name}</button>`;
        });
        
        categoriesContainer.innerHTML = categoriesHTML;
        
        // Re-attach event listeners
        attachCategoryListeners();
        
        // Show message if no categories
        if (categories.length === 0) {
            console.log('Категорії не знайдено. Відкрийте sync-categories.html для налаштування.');
        }
    }
}

// Function to refresh categories (can be called from admin panel)
function refreshCategories() {
    loadCategories();
    loadMenuItems();
    
    // Re-attach category listeners after refresh
    setTimeout(() => {
        attachCategoryListeners();
    }, 200);
    
    console.log('Категорії та продукти оновлено!');
}

// Function to get proper image URL
function getImageUrl(imagePath) {
    if (!imagePath || imagePath === 'default-food.jpg') {
        // Return a better default image
        return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRkZGRkZGIi8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iODAiIGZpbGw9IiNGRkQ3MDAiLz4KPHN2ZyB4PSI2MCIgeT0iNjAiIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjRkZGRkZGIj4KPHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgMThjLTQuNDEgMC04LTMuNTktOC04czMuNTktOCA4LTggOCAzLjU5IDggOC0zLjU5IDgtOCA4em0tMS0xM2gtMnY2aDJ2LTZ6bTAgOGgtMnYyaDJ2LTJ6Ii8+Cjwvc3ZnPgo8L3N2Zz4K';
    }
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
    }
    
    // If it's a local file, try to load from the same directory
    if (imagePath.includes('.jpg') || imagePath.includes('.png') || imagePath.includes('.jpeg')) {
        return imagePath;
    }
    
    // Default fallback
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRkZGRkZGIi8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iODAiIGZpbGw9IiNGRkQ3MDAiLz4KPHN2ZyB4PSI2MCIgeT0iNjAiIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjRkZGRkZGIj4KPHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgMThjLTQuNDEgMC04LTMuNTktOC04czMuNTktOCA4LTggOCAzLjU5IDggOC0zLjU5IDgtOCA4em0tMS0xM2gtMnY2aDJ2LTZ6bTAgOGgtMnYyaDJ2LTJ6Ii8+Cjwvc3ZnPgo8L3N2Zz4K';
}

// Load menu items from localStorage
function loadMenuItems() {
    const menuItems = JSON.parse(localStorage.getItem('menuItems') || '[]');
    const container = document.getElementById('menu-grid');
    
    console.log('Loading menu items:', menuItems); // Debug log
    
    if (container) {
        if (menuItems.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; grid-column: 1 / -1; padding: 40px;">
                    <h3>Поки що немає продуктів</h3>
                    <p>Продукти будуть додані адміністратором</p>
                    <button onclick="window.location.href='debug-products.html'" style="background: #2196F3; color: white; padding: 8px 16px; border: none; border-radius: 5px; cursor: pointer; margin-top: 10px;">
                        🔍 Діагностика
                    </button>
                </div>
            `;
        } else {
            container.innerHTML = menuItems.map(item => `
                <div class="menu-item" data-category="${item.category}">
                    <img src="${getImageUrl(item.image)}" alt="${item.name}" class="menu-img" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7wn5GAPC90ZXh0Pgo8L3N2Zz4K'">
                    <div class="menu-content">
                        <h3>${item.name}</h3>
                        <p>${item.description || 'Немає опису'}</p>
                        <span class="price">${item.price}</span>
                    </div>
                </div>
            `).join('');
        }
        
        // Re-attach category listeners after loading products
        setTimeout(() => {
            attachCategoryListeners();
        }, 100);
    } else {
        console.error('Container menu-grid not found!'); // Debug log
    }
}

// Function to refresh menu items (can be called from admin panel)
function refreshMenuItems() {
    loadMenuItems();
    console.log('Продукти оновлено!');
}

// Menu category filtering
function attachCategoryListeners() {
    console.log('Attaching category listeners...');
    
    // Remove existing listeners first
    const categoryBtns = document.querySelectorAll('.category-btn');
    console.log(`Found ${categoryBtns.length} category buttons`);
    
    categoryBtns.forEach((btn, index) => {
        console.log(`Button ${index + 1}: ${btn.getAttribute('data-category')}`);
        
        // Remove any existing listeners
        btn.removeEventListener('click', handleCategoryClick);
        
        // Add new listener
        btn.addEventListener('click', handleCategoryClick);
        
        // Test if listener was added
        console.log(`Added listener to button: ${btn.getAttribute('data-category')}`);
    });
    
    console.log(`Attached listeners to ${categoryBtns.length} category buttons`);
}

// Handle category button click
function handleCategoryClick() {
    console.log('🎯 Category button clicked:', this.getAttribute('data-category'));
    
    const categoryBtns = document.querySelectorAll('.category-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    
    console.log(`Found ${categoryBtns.length} buttons and ${menuItems.length} menu items`);
    
    // Remove active class from all buttons
    categoryBtns.forEach(b => b.classList.remove('active'));
    // Add active class to clicked button
    this.classList.add('active');
    
    const category = this.getAttribute('data-category');
    console.log('🔍 Filtering by category:', category);
    
    let visibleCount = 0;
    let hiddenCount = 0;
    
    menuItems.forEach((item, index) => {
        const itemCategory = item.getAttribute('data-category');
        const itemName = item.querySelector('h3')?.textContent || `Item ${index}`;
        
        console.log(`📦 Item ${index + 1}: "${itemName}" (category=${itemCategory})`);
        
        if (category === 'all' || itemCategory === category) {
            item.style.display = 'block';
            item.style.animation = 'fadeInUp 0.6s ease forwards';
            visibleCount++;
            console.log(`  ✅ Showing item: "${itemName}"`);
        } else {
            item.style.display = 'none';
            hiddenCount++;
            console.log(`  ❌ Hiding item: "${itemName}"`);
        }
    });
    
    console.log(`📊 Filter result: ${visibleCount} visible, ${hiddenCount} hidden for category: ${category}`);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission
const contactForm = document.querySelector('.form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !phone || !message) {
            alert('Будь ласка, заповніть всі поля');
            return;
        }
        
        // Show success message
        alert('Дякуємо за замовлення! Ми зв\'яжемося з вами найближчим часом.');
        
        // Reset form
        this.reset();
    });
}

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(219, 194, 166, 0.95)';
    } else {
        header.style.backgroundColor = '#DBC2A6';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature, .menu-item, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Auth management
function checkAuthStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const authLink = document.getElementById('auth-link');
    
    if (currentUser) {
        authLink.textContent = currentUser.name;
        authLink.classList.add('logged-in');
        authLink.href = 'javascript:void(0)';
        authLink.onclick = logout;
    } else {
        authLink.textContent = 'Увійти';
        authLink.classList.remove('logged-in');
        authLink.href = 'auth.html';
        authLink.onclick = null;
    }
}

function logout() {
    if (confirm('Ви впевнені, що хочете вийти?')) {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userLoginTime');
        checkAuthStatus();
        location.reload();
    }
}

// Check auth status on page load
document.addEventListener('DOMContentLoaded', checkAuthStatus);

// Show user profile if logged in
function showUserProfile() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userProfile = document.getElementById('user-profile');
    const userInfo = document.getElementById('user-info');
    
    if (currentUser && userProfile && userInfo) {
        userProfile.style.display = 'block';
        const fullName = currentUser.surname ? `${currentUser.name} ${currentUser.surname}` : currentUser.name;
        userInfo.innerHTML = `
            <strong>${fullName}</strong><br>
            ${currentUser.phone}
        `;
    }
}

// Edit profile function
function editProfile() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        // For now, redirect to auth page to edit
        window.location.href = 'auth.html';
    }
}

// Initialize user profile
document.addEventListener('DOMContentLoaded', () => {
    checkAuthStatus();
    showUserProfile();
    checkAdminStatus();
    checkCreatorLink();
    loadCategories(); // Load categories from localStorage
    loadMenuItems(); // Load menu items from localStorage
    
    // Update copyright year automatically
    updateCopyrightYear();
});

// Update copyright year to current year
function updateCopyrightYear() {
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        const currentYear = new Date().getFullYear();
        currentYearElement.textContent = currentYear;
    }
}

// Check if current user is admin
function checkAdminStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const adminLink = document.querySelector('.admin-link');
    
    if (!currentUser || !adminLink) {
        return;
    }
    
    // Get admins list
    const admins = JSON.parse(localStorage.getItem('admins') || '[]');
    const isAdmin = admins.find(a => a.phone === currentUser.phone);
    
    if (isAdmin) {
        adminLink.style.display = 'block';
        let displayText = '';
        switch(isAdmin.level) {
            case 'owner':
                displayText = 'Власник';
                break;
            case 'admin':
                displayText = 'Адмін';
                break;
            case 'moderator':
                displayText = 'Модератор';
                break;
            default:
                displayText = 'Адмін';
        }
        adminLink.textContent = displayText;
    } else {
        adminLink.style.display = 'none';
    }
}

// Check creator link visibility for admins
function checkCreatorLink() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const creatorLink = document.getElementById('creator-link');
    const statusCreatorLink = document.getElementById('status-creator-link');

    if (!currentUser) {
        return; // Guest users see just text
    }

    // Get admins list
    const admins = JSON.parse(localStorage.getItem('admins') || '[]');
    const isAdmin = admins.find(a => a.phone === currentUser.phone);

    if (isAdmin) {
        // Make creator link clickable for admins
        if (creatorLink) {
            creatorLink.innerHTML = '<a href="https://t.me/mm.slmn" target="_blank" style="color: inherit; text-decoration: none;">@mm.slmn</a>';
        }
        if (statusCreatorLink) {
            statusCreatorLink.innerHTML = '<a href="https://t.me/mm.slmn" target="_blank" style="color: inherit; text-decoration: none;">@mm.slmn</a>';
        }
    }
} 