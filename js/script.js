// Menu mobile toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Fermer le menu quand on clique sur un lien
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Animation au scroll pour la navbar
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
});

// Slider projets
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.project-card');
const prevBtn = document.querySelector('.slider-btn-prev');
const nextBtn = document.querySelector('.slider-btn-next');
const dotsContainer = document.querySelector('.slider-dots');

let currentSlide = 0;
const totalSlides = slides.length;

function getSlidesPerView() {
    return window.innerWidth >= 769 ? 3 : 1;
}

function getTotalPages() {
    return Math.ceil(totalSlides / getSlidesPerView());
}

function createDots() {
    dotsContainer.innerHTML = '';
    const pages = getTotalPages();
    for (let i = 0; i < pages; i++) {
        const dot = document.createElement('button');
        dot.classList.add('slider-dot');
        dot.setAttribute('aria-label', `Page ${i + 1}`);
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
}

createDots();

function updateSlider() {
    const slidesPerView = getSlidesPerView();
    const slideWidth = 100 / slidesPerView;
    slider.style.transform = `translateX(-${currentSlide * slideWidth * slidesPerView}%)`;

    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });

    // Masquer/afficher les boutons selon la position
    const maxSlide = getTotalPages() - 1;
    prevBtn.classList.toggle('hidden', currentSlide === 0);
    nextBtn.classList.toggle('hidden', currentSlide >= maxSlide);
}

function goToSlide(index) {
    const maxSlide = getTotalPages() - 1;
    currentSlide = Math.max(0, Math.min(index, maxSlide));
    updateSlider();
}

function nextSlide() {
    const maxSlide = getTotalPages() - 1;
    currentSlide = currentSlide >= maxSlide ? 0 : currentSlide + 1;
    updateSlider();
}

function prevSlide() {
    const maxSlide = getTotalPages() - 1;
    currentSlide = currentSlide <= 0 ? maxSlide : currentSlide - 1;
    updateSlider();
}

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Initial state
updateSlider();

// Recalculer au resize
window.addEventListener('resize', () => {
    createDots();
    currentSlide = 0;
    updateSlider();
});

// Swipe support
let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (diff > swipeThreshold) {
        nextSlide();
    } else if (diff < -swipeThreshold) {
        prevSlide();
    }
}

// Animation d'apparition des sections au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});
