// ===================================
// NAVIGATION
// ===================================
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll spy for active links
window.addEventListener('scroll', () => {
    // Navbar shadow on scroll
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update active link based on scroll position
    let current = '';
    const sections = document.querySelectorAll('.section, .hero');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling
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

// ===================================
// PROJECT CARDS & MODALS
// ===================================
const projectButtons = document.querySelectorAll('[data-project]');
const modals = document.querySelectorAll('.modal');
const modalCloses = document.querySelectorAll('.modal-close');
const modalOverlays = document.querySelectorAll('.modal-overlay');

// Open modal
projectButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = button.getAttribute('data-project');
        const modal = document.getElementById(`modal-${projectId}`);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal on click close button
modalCloses.forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    });
});

// Close modal on click overlay
modalOverlays.forEach(overlay => {
    overlay.addEventListener('click', () => {
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    });
});

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }
});

// ===================================
// FORM SUBMISSION
// ===================================
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Construct mailto link
        const mailtoLink = `mailto:akafou.amine@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        
        // Open default email client
        window.location.href = mailtoLink;
        
        // Show success message
        showNotification('Votre client email va s\'ouvrir...', 'success');
        
        // Reset form
        contactForm.reset();
    });
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success-color)' : 'var(--error-color)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===================================
// CERTIFICATIONS CAROUSEL (If exists)
// ===================================
const certCarousel = document.querySelector('.cert-carousel');
if (certCarousel) {
    const certTrack = certCarousel.querySelector('.cert-track');
    const certCards = certCarousel.querySelectorAll('.cert-card');
    const prevBtn = certCarousel.querySelector('.cert-prev');
    const nextBtn = certCarousel.querySelector('.cert-next');
    
    let currentIndex = 0;
    
    if (prevBtn && nextBtn && certCards.length > 0) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % certCards.length;
            updateCarousel();
        });
        
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + certCards.length) % certCards.length;
            updateCarousel();
        });
        
        function updateCarousel() {
            const offset = -currentIndex * 100;
            certTrack.style.transform = `translateX(${offset}%)`;
        }
    }
}

// ===================================
// INTEREST CARDS INTERACTION
// ===================================
const interestCards = document.querySelectorAll('.interest-card');

interestCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// ===================================
// SKILLS PROGRESS ANIMATION
// ===================================
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target;
            const targetWidth = progress.style.width;
            progress.style.width = '0%';
            
            setTimeout(() => {
                progress.style.width = targetWidth;
                progress.style.transition = 'width 1.5s ease-in-out';
            }, 100);
            
            skillObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// ===================================
// STATS COUNTER ANIMATION
// ===================================
const stats = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const finalValue = parseInt(target.textContent);
            let currentValue = 0;
            const increment = finalValue / 50;
            
            const counter = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue) {
                    target.textContent = finalValue;
                    clearInterval(counter);
                } else {
                    target.textContent = Math.floor(currentValue);
                }
            }, 30);
            
            counterObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

stats.forEach(stat => {
    counterObserver.observe(stat);
});

// ===================================
// TIMELINE ANIMATION
// ===================================
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.2
});

timelineItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `all 0.6s ease ${index * 0.2}s`;
    timelineObserver.observe(item);
});

// ===================================
// SCROLL TO TOP BUTTON
// ===================================
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
});

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// SIMPLE AOS (Animate On Scroll)
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// ===================================
// EASTER EGG (KONAMI CODE)
// ===================================
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    // Create confetti effect
    const colors = ['#1E40AF', '#3B82F6', '#0EA5E9', '#F59E0B', '#10B981'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            createConfetti(colors[Math.floor(Math.random() * colors.length)]);
        }, i * 30);
    }
    
    // Show message
    const message = document.createElement('div');
    message.textContent = '🎉 Bravo ! Code secret trouvé ! 🎉';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #1E40AF, #0EA5E9);
        color: white;
        padding: 2rem 4rem;
        border-radius: 1rem;
        font-size: 2rem;
        font-weight: 800;
        z-index: 9999;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
        animation: pulse 0.5s ease;
    `;
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

function createConfetti(color) {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${color};
        left: ${Math.random() * 100}vw;
        top: -10px;
        border-radius: 50%;
        animation: fall 5s linear;
        pointer-events: none;
        z-index: 9998;
    `;
    document.body.appendChild(confetti);
    
    setTimeout(() => {
        confetti.remove();
    }, 5000);
}

// Add confetti animation to document
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            top: 100vh;
            opacity: 0;
            transform: translateX(${Math.random() * 200 - 100}px) rotate(${360 + Math.random() * 360}deg);
        }
    }
`;
document.head.appendChild(style);

// ===================================
// IMAGE LIGHTBOX
// ===================================
const imageLightbox = document.getElementById('imageLightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');

// Function to open lightbox
function openLightbox(imageSrc, imageAlt) {
    lightboxImage.src = imageSrc;
    lightboxImage.alt = imageAlt || 'Image agrandie';
    imageLightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Function to close lightbox
function closeLightbox() {
    imageLightbox.classList.remove('active');
    document.body.style.overflow = '';
    lightboxImage.src = '';
}

// Add click event to all images in modals and project sections
function initializeLightbox() {
    // Select all images that should be clickable
    const clickableImages = document.querySelectorAll('.modal-body img, .project-image img, .achievement-content img');
    
    clickableImages.forEach(img => {
        // Skip video elements
        if (img.tagName === 'VIDEO') return;
        
        // Add cursor pointer
        img.style.cursor = 'zoom-in';
        
        // Add click event
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            openLightbox(img.src, img.alt);
        });
    });
}

// Close lightbox on close button click
if (lightboxClose) {
    lightboxClose.addEventListener('click', (e) => {
        e.stopPropagation();
        closeLightbox();
    });
}

// Close lightbox on background click
if (imageLightbox) {
    imageLightbox.addEventListener('click', (e) => {
        if (e.target === imageLightbox) {
            closeLightbox();
        }
    });
}

// Close lightbox on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && imageLightbox.classList.contains('active')) {
        closeLightbox();
    }
});

// Initialize lightbox when DOM is ready
document.addEventListener('DOMContentLoaded', initializeLightbox);

// Re-initialize lightbox when modals are opened (for dynamic content)
projectButtons.forEach(button => {
    button.addEventListener('click', () => {
        setTimeout(initializeLightbox, 300);
    });
});

// ===================================
// VIDEO AUTOPLAY ON SCROLL
// ===================================
const videoAutoplayObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const video = entry.target;
        
        if (entry.isIntersecting) {
            // Video entre dans le viewport - jouer
            video.play().catch(error => {
                console.log('Autoplay bloqué par le navigateur:', error);
            });
        } else {
            // Video sort du viewport - pause
            video.pause();
        }
    });
}, {
    threshold: 0.5 // La vidéo doit être visible à 50% pour se lancer
});

// Observer toutes les vidéos du site
document.addEventListener('DOMContentLoaded', () => {
    const allVideos = document.querySelectorAll('video');
    
    allVideos.forEach(video => {
        // Ajouter les attributs nécessaires
        video.setAttribute('muted', ''); // Mute pour permettre l'autoplay
        video.setAttribute('playsinline', ''); // Pour mobile
        
        // Observer la vidéo
        videoAutoplayObserver.observe(video);
    });
});

// Re-initialiser l'observer quand une modal s'ouvre (pour les vidéos dans les modals)
projectButtons.forEach(button => {
    button.addEventListener('click', () => {
        setTimeout(() => {
            const modalVideos = document.querySelectorAll('.modal.active video');
            modalVideos.forEach(video => {
                if (!video.hasAttribute('data-observed')) {
                    video.setAttribute('data-observed', 'true');
                    video.setAttribute('muted', '');
                    video.setAttribute('playsinline', '');
                    videoAutoplayObserver.observe(video);
                }
            });
        }, 300);
    });
});

