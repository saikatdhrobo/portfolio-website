/* ==========================================================================
   JAKARIA SAIKAT DHROBO - PORTFOLIO INTERACTIVE CONTROLLER
   Google Stitch Social Feed Architecture & Dark Mode Support
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Dark Mode Toggle Logic
  function setDarkMode(isDark) {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    updateDarkModeIcons(isDark);
  }

  function updateDarkModeIcons(isDark) {
    const darkModeBtns = document.querySelectorAll('.dark-mode-toggle');
    darkModeBtns.forEach(btn => {
      const icon = btn.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.textContent = isDark ? 'light_mode' : 'dark_mode';
      }
      btn.setAttribute('title', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    });
  }

  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialDark = savedTheme ? savedTheme === 'dark' : prefersDark;
  setDarkMode(initialDark);

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.dark-mode-toggle');
    if (btn) {
      e.preventDefault();
      const isCurrentlyDark = document.documentElement.classList.contains('dark');
      setDarkMode(!isCurrentlyDark);
    }
  });

  // Mobile Nav Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    document.querySelectorAll('#mobileMenu a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Lightbox Modal Implementation
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  function openLightbox(src, captionText) {
    if (!lightboxModal || !lightboxImg || !src) return;
    lightboxImg.src = src;
    lightboxImg.alt = captionText || 'Enlarged view';
    lightboxImg.style.display = 'block';
    if (lightboxCaption) {
      lightboxCaption.textContent = captionText || '';
      lightboxCaption.style.display = captionText ? 'block' : 'none';
    }
    lightboxModal.style.display = 'flex';
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    lightboxModal.style.display = 'none';
    if (lightboxImg) {
      lightboxImg.removeAttribute('src');
      lightboxImg.style.display = 'none';
    }
    document.body.style.overflow = '';
  }

  // Ensure lightbox modal is hidden by default on load
  if (lightboxModal) {
    lightboxModal.style.display = 'none';
    if (lightboxImg) {
      lightboxImg.style.display = 'none';
    }
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal || e.target.classList.contains('lightbox-content')) {
        closeLightbox();
      }
    });
  }

  // ESC Key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal && (lightboxModal.classList.contains('active') || lightboxModal.style.display === 'flex')) {
      closeLightbox();
    }
  });

  // Attach Lightbox triggers to zoomable images or cards with data-lightbox-src
  document.body.addEventListener('click', (e) => {
    if (e.target.closest('a[target="_blank"]') || e.target.closest('a[download]') || e.target.closest('.dark-mode-toggle')) {
      return;
    }

    const zoomImg = e.target.closest('.zoomable-image');
    if (zoomImg) {
      const src = zoomImg.getAttribute('src') || zoomImg.getAttribute('data-src');
      const caption = zoomImg.getAttribute('alt') || zoomImg.getAttribute('title');
      if (src) {
        openLightbox(src, caption);
      }
      return;
    }

    const lightboxCard = e.target.closest('[data-lightbox-src]');
    if (lightboxCard) {
      e.preventDefault();
      const src = lightboxCard.getAttribute('data-lightbox-src');
      const caption = lightboxCard.getAttribute('data-caption') || lightboxCard.getAttribute('data-title');
      if (src) {
        openLightbox(src, caption);
      }
    }
  });

  // ScrollSpy for Top Header & Profile Tabs
  const sections = document.querySelectorAll('section[id], article[id]');
  const topNavLinks = document.querySelectorAll('header nav a[href^="#"]');
  const profileTabLinks = document.querySelectorAll('.profile-tab-bar a[href^="#"]');

  function updateActiveNavOnScroll() {
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const id = section.getAttribute('id');

      if (id && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        topNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('bg-[#f0f2f5]', 'text-[#0866ff]', 'font-bold');
            link.classList.remove('text-[#65676b]');
          } else {
            link.classList.remove('bg-[#f0f2f5]', 'text-[#0866ff]', 'font-bold');
            link.classList.add('text-[#65676b]');
          }
        });

        profileTabLinks.forEach(tab => {
          if (tab.getAttribute('href') === `#${id}`) {
            tab.classList.add('text-[#0866ff]', 'border-b-[3px]', 'border-[#0866ff]', 'font-bold');
            tab.classList.remove('text-[#65676b]');
          } else {
            tab.classList.remove('text-[#0866ff]', 'border-b-[3px]', 'border-[#0866ff]', 'font-bold');
            tab.classList.add('text-[#65676b]');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavOnScroll);
  updateActiveNavOnScroll();
});
