// script.js - External JavaScript for CyberShield Pentest Website

// Mobile Menu Toggle Functionality
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

if (hamburger) {
    hamburger.addEventListener("click", mobileMenu);
}

// Close mobile menu when a link is clicked
const navLink = document.querySelectorAll(".nav-link");

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}

navLink.forEach(n => n.addEventListener("click", closeMenu));

// Form submission handling (only on contact.html)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: this.querySelector('input[type="text"]').value,
            email: this.querySelector('input[type="email"]').value,
            company: this.querySelector('input[placeholder="Company Name"]').value,
            phone: this.querySelector('input[type="tel"]').value,
            service: this.querySelector('select').value,
            message: this.querySelector('textarea').value
        };
        
        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Sending your message...', 'loading');
        
        setTimeout(() => {
            showNotification('Thank you for your message! We will get back to you within 24 hours.', 'success');
            this.reset();
        }, 2000);
        
        console.log('Form submitted:', formData);
    });
}

// Newsletter subscription handling (in footer)
const newsletterButton = document.querySelector('.newsletter button');
if (newsletterButton) {
    newsletterButton.addEventListener('click', function() {
        const emailInput = this.parentElement.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        if (email) {
            showNotification('Subscribed to newsletter successfully!', 'success');
            emailInput.value = '';
        } else {
            showNotification('Please enter your email address', 'error');
        }
    });
}

// Notification system
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 350px;
    `;
    
    if (type === 'success') {
        notification.style.background = '#06D6A0'; // var(--accent-green)
    } else if (type === 'error') {
        notification.style.background = '#E63946'; // var(--accent-red)
    } else if (type === 'loading') {
        notification.style.background = '#0A192F'; // var(--primary-blue)
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    if (type !== 'loading') {
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
}

// Animation on scroll for cards
function initAnimations() {
    const animateElements = document.querySelectorAll('.service-card, .pricing-card, .testimonial, .about-stat, .methodology, .contact-info, .contact-form');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('Animating:', entry.target.className); // Debug log
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Stop observing after animation
            }
        });
    }, { threshold: 0.05 }); // Lowered threshold for earlier triggering
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // Fallback to ensure visibility if observer fails
    setTimeout(() => {
        animateElements.forEach(element => {
            if (element.style.opacity === '0') {
                console.log('Fallback triggered for:', element.className); // Debug log
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }, 2000); // Fallback after 2 seconds
}

// Initialize when document is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('CyberShield Pentest website loaded successfully');
    
    // Initialize animations
    initAnimations();
    
    // Add current year to footer
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace(/\d{4}/, currentYear);
    }
});

// Sticky header on scroll
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar && window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else if (navbar) {
        navbar.style.background = '#FFFFFF'; // var(--white)
        navbar.style.backdropFilter = 'none';
    }
    
    lastScrollY = window.scrollY;
});

// Hamburger animation for mobile
if (hamburger) {
    hamburger.addEventListener('click', function() {
        const bars = this.querySelectorAll('.bar');
        if (this.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
}