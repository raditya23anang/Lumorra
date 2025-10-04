// Menjalankan script setelah seluruh konten HTML selesai dimuat
document.addEventListener('DOMContentLoaded', () => {

  // ========================================================================
  // 1. PEMILIHAN ELEMEN DOM
  // ========================================================================
  const header = document.getElementById('main-header');
  const sidebar = document.getElementById('sidebar');
  const menuBtn = document.getElementById('menu-btn');
  const closeBtn = document.getElementById('close-btn');
  const overlay = document.getElementById('overlay');
  const sidebarLinks = document.querySelectorAll('.sidebar__nav a');
  const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
  const navLinks = document.querySelectorAll('.header__nav a, .sidebar__nav a');

  // ========================================================================
  // 2. FUNGSI DAN EVENT LISTENER UNTUK SIDEBAR (MENU MOBILE)
  // ========================================================================

  const openSidebar = () => {
    sidebar.classList.add('sidebar--open');
    overlay.classList.add('overlay--active');
    menuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeSidebar = () => {
    sidebar.classList.remove('sidebar--open');
    overlay.classList.remove('overlay--active');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  menuBtn.addEventListener('click', openSidebar);
  closeBtn.addEventListener('click', closeSidebar);
  overlay.addEventListener('click', closeSidebar);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('sidebar--open')) {
      closeSidebar();
    }
  });


  // ========================================================================
  // 3. EFEK HEADER SAAT HALAMAN DI-SCROLL
  // ========================================================================
  const handleHeaderScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  };
  window.addEventListener('scroll', handleHeaderScroll);


  // ========================================================================
  // 4. ANIMASI ELEMEN SAAT MUNCUL DI LAYAR (INTERSECTION OBSERVER)
  // ========================================================================

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  elementsToAnimate.forEach(el => observer.observe(el));
    
  // ========================================================================
  // 5. PENANDA NAVIGASI AKTIF (ACTIVE LINK) -- FUNGSI BARU
  // ========================================================================
  const currentPage = window.location.pathname.split('/').pop(); // Mendapatkan nama file, misal "services.html"
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href').split('/').pop();
    // Jika halaman saat ini sama dengan href link, tambahkan class 'active-link'
    if (linkPage === currentPage) {
      link.classList.add('active-link');
    }
    // Khusus untuk halaman utama (index.html), karena currentPage bisa jadi kosong ""
    if (currentPage === '' && linkPage === 'index.html') {
        link.classList.add('active-link');
    }
  });

});