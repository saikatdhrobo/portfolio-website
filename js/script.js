// ============================================================================
// JAKARIA SAIKAT DHROBO - PREMIUM PORTFOLIO
// Main JavaScript File
// ============================================================================

(function() {
  'use strict';

  // ============================================================================
  // NAVIGATION
  // ============================================================================

  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky navigation on scroll
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  // Mobile menu toggle
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });

  // Active section highlighting
  const sections = document.querySelectorAll('.section');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });

  // ============================================================================
  // HERO ROTATING TEXT
  // ============================================================================

  const rotateWords = document.querySelectorAll('.rotate-word');
  let currentWordIndex = 0;

  function rotateText() {
    rotateWords[currentWordIndex].classList.remove('active');
    currentWordIndex = (currentWordIndex + 1) % rotateWords.length;
    rotateWords[currentWordIndex].classList.add('active');
  }

  if (rotateWords.length > 0) {
    setInterval(rotateText, 3000);
  }

  // ============================================================================
  // SMOOTH SCROLLING
  // ============================================================================

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const offsetTop = target.offsetTop - 80;
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============================================================================
  // CERTIFICATE MODAL
  // ============================================================================

  const certCards = document.querySelectorAll('.cert-card');
  const certModal = document.getElementById('certModal');
  const certModalImage = document.getElementById('certModalImage');
  const certModalClose = document.getElementById('certModalClose');
  const certModalOverlay = document.getElementById('certModalOverlay');

  certCards.forEach(card => {
    card.addEventListener('click', () => {
      const certImage = card.querySelector('.cert-image');
      if (certImage) {
        certModalImage.src = certImage.src;
        certModalImage.alt = certImage.alt;
        certModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeCertModal() {
    certModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (certModalClose) {
    certModalClose.addEventListener('click', closeCertModal);
  }

  if (certModalOverlay) {
    certModalOverlay.addEventListener('click', closeCertModal);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certModal.classList.contains('active')) {
      closeCertModal();
    }
  });

  // ============================================================================
  // ANIMATIONS ON SCROLL (AOS Alternative)
  // ============================================================================

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('[data-aos]');
  animatedElements.forEach(el => observer.observe(el));

  // ============================================================================
  // SKILL CHIPS ANIMATION
  // ============================================================================

  const skillChips = document.querySelectorAll('.skill-chip-animated');
  
  skillChips.forEach((chip, index) => {
    chip.style.animationDelay = `${index * 0.05}s`;
  });

  // ============================================================================
  // PERFORMANCE OPTIMIZATION
  // ============================================================================

  // Lazy load images
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      img.src = img.dataset.src;
    });
  } else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
  }

  // ============================================================================
  // FORM VALIDATION (If contact form is added later)
  // ============================================================================

  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Add form validation logic here
      const formData = new FormData(contactForm);
      
      // Example: Send form data via fetch
      console.log('Form submitted', Object.fromEntries(formData));
      
      // Show success message
      alert('Thank you for your message! I will get back to you soon.');
      contactForm.reset();
    });
  }

  // ============================================================================
  // PREVENT FLASH OF UNSTYLED CONTENT
  // ============================================================================

  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });

  // ============================================================================
  // CONSOLE EASTER EGG
  // ============================================================================

  console.log('%c👋 Hello, Curious Developer!', 'color: #0B77FF; font-size: 20px; font-weight: bold;');
  console.log('%cInterested in the code behind this portfolio?', 'color: #6B7CFF; font-size: 14px;');
  console.log('%cFeel free to reach out: jakaria@example.com', 'color: #00C2FF; font-size: 12px;');
  console.log('%c\nBuilt with ❤️ by Jakaria Saikat Dhrobo', 'color: #666; font-size: 11px;');

})();