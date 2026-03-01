// ===== PORTFOLIO HARIZO - ANIMATIONS AVANCÉES =====

document.addEventListener('DOMContentLoaded', () => {
    initTypedText();
    initParticles();
    initNavbar();
    initRevealAnimations();
    initSkillsAnimation();
    initProjectsFilter();
    initContactForm();
    initPhoneReveal();
    initMenuToggle();
});

// ===== 1. TEXTE TYPÉ =====
function initTypedText() {
    const typedElement = document.querySelector('.typed-text');
    if (!typedElement) return;
    
    const phrases = [
        'Étudiant en L1 Informatique',
        'Passionné d\'électronique',
        'Développeur en devenir',
        'Créateur de projets IoT'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let speed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            speed = 500;
        }
        
        setTimeout(type, speed);
    }
    
    setTimeout(type, 1000);
}

// ===== 2. PARTICULES CANVAS =====
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    
    function createParticles() {
        particles = [];
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                color: `rgba(0, 188, 212, ${Math.random() * 0.3})`
            });
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            
            p.x += p.speedX;
            p.y += p.speedY;
            
            if (p.x < 0 || p.x > width) p.speedX *= -1;
            if (p.y < 0 || p.y > height) p.speedY *= -1;
        });
        
        requestAnimationFrame(animate);
    }
    
    window.addEventListener('resize', () => {
        resize();
        createParticles();
    });
    
    resize();
    createParticles();
    animate();
}

// ===== 3. NAVIGATION =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
        
        lastScroll = currentScroll;
        updateActiveLink();
    });
}

function updateActiveLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===== 4. ANIMATIONS AU SCROLL =====
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .project-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal', 'reveal-left', 'reveal-right');
                
                if (entry.target.classList.contains('skill-item')) {
                    entry.target.classList.add('revealed');
                }
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
    
    revealElements.forEach(el => observer.observe(el));
}

// ===== 5. ANIMATIONS DES COMPÉTENCES =====
function initSkillsAnimation() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const level = item.getAttribute('data-level');
        const progress = item.querySelector('.skill-progress');
        
        if (progress) {
            progress.style.setProperty('--level', level + '%');
        }
    });
}

// ===== 6. FILTRES DES PROJETS =====
function initProjectsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            projects.forEach(project => {
                if (filter === 'all' || project.getAttribute('data-category').includes(filter)) {
                    project.style.display = 'block';
                    setTimeout(() => {
                        project.style.opacity = '1';
                        project.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    project.style.opacity = '0';
                    project.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        project.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===== 7. FORMULAIRE DE CONTACT =====
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const messageDiv = document.getElementById('formMessage');
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !message) {
            showFormMessage('Veuillez remplir tous les champs', 'error');
            return;
        }
        
        if (!validateEmail(email)) {
            showFormMessage('Email invalide', 'error');
            return;
        }
        
        showFormMessage('Message envoyé avec succès !', 'success');
        form.reset();
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showFormMessage(text, type) {
    const messageDiv = document.getElementById('formMessage');
    messageDiv.textContent = text;
    messageDiv.className = 'form-message ' + type;
    
    setTimeout(() => {
        messageDiv.textContent = '';
        messageDiv.className = 'form-message';
    }, 5000);
}

// ===== 8. RÉVÉLATION TÉLÉPHONE =====
function initPhoneReveal() {
    window.revealPhone = function() {
        const phoneElement = document.querySelector('.phone-hidden');
        if (!phoneElement) return;
        
        const realPhone = '+261 38 18 107 11';
        
        if (phoneElement.textContent === '🔒 Cliquer pour voir') {
            phoneElement.textContent = realPhone;
            
            setTimeout(() => {
                phoneElement.textContent = '🔒 Cliquer pour voir';
            }, 10000);
        }
    };
}

// ===== 9. MENU MOBILE =====
function initMenuToggle() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
}

// ===== 10. SCROLL DOUX =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});// ===== 11. AJOUT POUR LIENS SOCIAUX =====
// À ajouter à la fin du fichier script.js

// Animation pour les nouveaux liens
document.querySelectorAll('.contact-item a[target="_blank"]').forEach(link => {
    link.addEventListener('click', (e) => {
        console.log('Lien cliqué :', link.href);
    });
});

// Mise à jour de la fonction revealPhone (gardez l'originale)
// Vérifiez que votre numéro est correct
function initPhoneReveal() {
    window.revealPhone = function() {
        const phoneElement = document.querySelector('.phone-hidden');
        if (!phoneElement) return;
        
        const realPhone = '+261 38 18 107 11'; // Votre vrai numéro
        
        if (phoneElement.textContent === '🔒 Cliquer pour voir') {
            phoneElement.textContent = realPhone;
            
            setTimeout(() => {
                phoneElement.textContent = '🔒 Cliquer pour voir';
            }, 10000);
        }
    };
}