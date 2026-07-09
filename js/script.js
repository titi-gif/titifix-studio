// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== BURGER MENU =====
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    navLinks.classList.toggle('open');
});

// Ferme menu au clic sur un lien
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('open');
        navLinks.classList.remove('open');
    });
});

// ===== PARTICULES =====
function createParticles() {
    const container = document.getElementById('particles');
    const colors = ['#7c3aed', '#a855f7', '#06b6d4', '#c084fc'];

    for (let i = 0; i < 45; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        const size = Math.random() * 3 + 1;
        p.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${Math.random() * 100}%;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            animation-duration: ${Math.random() * 15 + 8}s;
            animation-delay: ${Math.random() * 10}s;
            box-shadow: 0 0 ${size * 4}px currentColor;
        `;
        container.appendChild(p);
    }
}

// ===== FADE IN AU SCROLL =====
function initFadeIn() {
    const elements = document.querySelectorAll('.fade-in, .news-card, .jeu-card, .comp-item, .screenshot-item, .stat-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, i * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    elements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// ===== COMPTEURS ANIMÉS =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                let count = 0;
                const duration = 1500;
                const step = target / (duration / 16);
                const timer = setInterval(() => {
                    count += step;
                    if (count >= target) {
                        count = target;
                        clearInterval(timer);
                    }
                    entry.target.textContent = Math.floor(count);
                }, 16);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
}

// ===== LIGHTBOX SCREENSHOTS =====
function initLightbox() {
    const items = document.querySelectorAll('.screenshot-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightboxClose');

    items.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const caption = item.querySelector('.screenshot-overlay span');
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxCaption.textContent = caption ? caption.textContent : '';
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

// ===== SMOOTH SCROLL =====
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ===== NAV ACTIVE LINK =====
function activeNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 200) {
                current = section.getAttribute('id');
            }
        });
        links.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${current}`) {
                link.style.color = 'var(--primary-light)';
            }
        });
    });
}

// ===== HOVER EFFET CARD =====
function cardTiltEffect() {
    document.querySelectorAll('.jeu-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            card.style.transform = `translateY(-8px) rotateX(${-y / 20}deg) rotateY(${x / 20}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initFadeIn();
    animateCounters();
    initLightbox();
    smoothScroll();
    activeNavLink();
    cardTiltEffect();
});

// ===== MODALE SCREENSHOTS =====
function openScreenshots() {
    document.getElementById('screenshotsModal').classList.add('active');
    document.body.style.overflow = 'hidden';
    // Init lightbox sur les images de la modale
    initModalLightbox();
}

function closeScreenshots(e) {
    if (!e || e.target === document.getElementById('screenshotsModal')) {
        document.getElementById('screenshotsModal').classList.remove('active');
        document.body.style.overflow = '';
    }
}

function initModalLightbox() {
    const items = document.querySelectorAll('.modal-item');
    items.forEach(item => {
        item.onclick = (e) => {
            e.stopPropagation();
            const img = item.querySelector('img');
            const caption = item.querySelector('span');
            const lightboxImg = document.getElementById('lightbox-img');
            const lightboxCaption = document.getElementById('lightbox-caption');
            const lightbox = document.getElementById('lightbox');
            lightboxImg.src = img.src;
            lightboxCaption.textContent = caption ? caption.textContent : '';
            lightbox.classList.add('active');
        };
    });
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}
