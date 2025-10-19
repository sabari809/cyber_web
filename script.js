
document.addEventListener('DOMContentLoaded', () => {
    console.log('Global Cyber Works website loaded successfully');

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');


    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');


            const bars = hamburger.querySelectorAll('.bar');
            if (hamburger.classList.contains('active')) {
                bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            }
        });

        
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.querySelectorAll('.bar').forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            });
        });
    }

    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (!navbar) return;
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = '#FFFFFF';
            navbar.style.backdropFilter = 'none';
        }
    });


    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();

            const formData = {
                name: contactForm.querySelector('input[type="text"]')?.value.trim(),
                email: contactForm.querySelector('input[type="email"]')?.value.trim(),
                company: contactForm.querySelector('input[placeholder="Company Name"]')?.value.trim(),
                phone: contactForm.querySelector('input[type="tel"]')?.value.trim(),
                service: contactForm.querySelector('select')?.value,
                message: contactForm.querySelector('textarea')?.value.trim()
            };

            // Validation
            if (!formData.name || !formData.email || !formData.message) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            showNotification('Sending your message...', 'loading');

            setTimeout(() => {
                showNotification('Thank you for your message! We’ll get back to you within 24 hours.', 'success');
                contactForm.reset();
            }, 2000);

            console.log('Form submitted:', formData);
        });
    }


    const newsletterSection = document.querySelector('.newsletter');
    if (newsletterSection) {
        const button = newsletterSection.querySelector('button');
        const emailInput = newsletterSection.querySelector('input[type="email"]');
        if (button && emailInput) {
            button.addEventListener('click', () => {
                const email = emailInput.value.trim();
                if (!email) {
                    showNotification('Please enter your email address', 'error');
                    return;
                }
                showNotification('Subscribed to newsletter successfully!', 'success');
                emailInput.value = '';
            });
        }
    }


    initAnimations();


    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        footerYear.innerHTML = footerYear.innerHTML.replace(/\d{4}/, new Date().getFullYear());
    }
});


function showNotification(message, type = 'success') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '15px 25px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '350px'
    });

    const colors = {
        success: '#06D6A0',
        error: '#E63946',
        loading: '#0A192F'
    };
    notification.style.background = colors[type] || '#06D6A0';

    document.body.appendChild(notification);


    setTimeout(() => (notification.style.transform = 'translateX(0)'), 100);


    if (type !== 'loading') {
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
}


function initAnimations() {
    const animateElements = document.querySelectorAll(
        '.service-card, .pricing-card, .testimonial, .about-stat, .methodology, .contact-info, .contact-form'
    );

    if (!animateElements.length) return;

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.05 }
    );

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    setTimeout(() => {
        animateElements.forEach(el => {
            if (el.style.opacity === '0') {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }, 2000);
}
