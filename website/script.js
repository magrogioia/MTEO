// -----------------------------
// Navigation Menu - Nasconde su scroll
// -----------------------------
let lastScrollY = window.scrollY;
let ticking = false;

function updateNavbar() {
  const navbar = document.querySelector('.navbar');
  const scrollY = window.scrollY;
  
  if (scrollY > 100) {
    navbar.classList.add('hidden');
  } else {
    navbar.classList.remove('hidden');
  }
  
  lastScrollY = scrollY;
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateNavbar);
    ticking = true;
  }
});

// Navigation links scroll behavior
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      // Update active class
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
});


// -----------------------------
// Main Carousel fade in/out
// -----------------------------
const slides = document.querySelectorAll('.carousel-slide');
let current = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
  });
  slides[index].classList.add('active');
}

setInterval(() => {
  current = (current + 1) % slides.length;
  showSlide(current);
}, 4000);

// -----------------------------
// Comparison Carousel
// -----------------------------
const comparisonSlides = document.querySelectorAll('.comparison-slide');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
let currentComparison = 0;

function showComparisonSlide(index) {
  comparisonSlides.forEach(slide => slide.classList.remove('active'));
  comparisonSlides[index].classList.add('active');
}

prevBtn.addEventListener('click', () => {
  currentComparison = (currentComparison - 1 + comparisonSlides.length) % comparisonSlides.length;
  showComparisonSlide(currentComparison);
});

nextBtn.addEventListener('click', () => {
  currentComparison = (currentComparison + 1) % comparisonSlides.length;
  showComparisonSlide(currentComparison);
});

// Keyboard navigation for comparison carousel
document.addEventListener('keydown', (e) => {
  if (document.querySelector('.comparison-carousel-section')?.contains(document.activeElement)) {
    if (e.key === 'ArrowLeft') {
      prevBtn.click();
    } else if (e.key === 'ArrowRight') {
      nextBtn.click();
    }
  }
});
