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

// Menu category filtering
const categoryBtns = document.querySelectorAll('.category-btn');
const menuItems = document.querySelectorAll('.menu-item');

categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const category = btn.getAttribute('data-category');
        
        menuItems.forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.style.display = 'block';
                item.style.animation = 'fadeInUp 0.6s ease forwards';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

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
        adminLink.textContent = isAdmin.level === 'admin' ? 'Адмін' : 'Модератор';
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