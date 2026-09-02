document.addEventListener('DOMContentLoaded', () => {
  // Tahun otomatis di footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Toggle menu mobile
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Tutup menu setelah klik salah satu link (khusus mobile)
    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Form berlangganan sederhana (tanpa backend)
  const subscribeForm = document.getElementById('subscribeForm');
  const subscribeNote = document.getElementById('subscribeNote');

  if (subscribeForm) {
    subscribeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('subEmail');
      const email = emailInput.value.trim();

      if (email) {
        subscribeNote.textContent = `Terima kasih! Kami akan mengabari ${email}.`;
        subscribeForm.reset();
      } else {
        subscribeNote.textContent = 'Mohon isi email yang valid.';
      }
    });
  }
});