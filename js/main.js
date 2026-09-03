/* ==========================================================================
   JAKARIA SAIKAT DHROBO - PORTFOLIO INTERACTIVE CONTROLLER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    // Close menu when link clicked
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // Active Navigation Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll);

  // Certificate Modal Handlers
  const modal = document.getElementById('certModal');
  const modalClose = document.getElementById('modalClose');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');

  document.querySelectorAll('[data-cert]').forEach(card => {
    card.addEventListener('click', (e) => {
      // If user clicked directly on an external link inside card, allow link navigation
      if (e.target.closest('a[target="_blank"]')) {
        return;
      }
      e.preventDefault();

      const certTitleText = card.getAttribute('data-title') || 'Certificate Details';
      const certImg = card.getAttribute('data-img');
      const certUrl = card.getAttribute('data-url');
      const certDetail = card.getAttribute('data-detail') || 'Verified Credential.';

      if (modalTitle && modalBody && modal) {
        modalTitle.textContent = certTitleText;
        let html = '';
        if (certImg) {
          html += `<div style="margin-bottom: 20px; text-align: center;">
            <img src="${certImg}" alt="${certTitleText}" style="max-width: 100%; max-height: 400px; border-radius: 8px; border: 1px solid var(--border-glass); box-shadow: 0 8px 24px rgba(0,0,0,0.6);">
          </div>`;
        }
        html += `<p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 20px;">${certDetail}</p>`;
        if (certUrl && certUrl !== '#') {
          html += `<div style="text-align: center;">
            <a href="${certUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="display: inline-flex; align-items: center; gap: 8px;">
              Verify Credential Online ↗
            </a>
          </div>`;
        }
        modalBody.innerHTML = html;
        modal.classList.add('active');
      }
    });
  });

  if (modalClose && modal) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }
});
