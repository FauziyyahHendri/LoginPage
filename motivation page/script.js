document.addEventListener('DOMContentLoaded', () => {
  const dashboard = document.getElementById('dashboard');
  const touchOverlay = document.getElementById('touch-overlay');
  const motivationModal = document.getElementById('motivation-modal');
  const closeBtn = document.getElementById('close-btn');

  // =========================================================
  // MODE PENGEMBANGAN (ALWAYS SHOW ON REFRESH)
  // =========================================================
  
  // 1. Saat baru dimuat/refresh: Paksa dashboard blur & aktifkan overlay sentuhan
  dashboard.classList.add('blurred');
  touchOverlay.classList.remove('hidden');
  motivationModal.classList.add('hidden');

  // 2. Sentuhan Pertama: Hilangkan overlay & tampilkan pop-up motivasi
  touchOverlay.addEventListener('click', () => {
    touchOverlay.classList.add('hidden');
    motivationModal.classList.remove('hidden');
  });

  // 3. Klik Tombol [X]: Sembunyikan pop-up & buka blur dashboard
  closeBtn.addEventListener('click', () => {
    motivationModal.classList.add('hidden');
    dashboard.classList.remove('blurred');
  });
  
});