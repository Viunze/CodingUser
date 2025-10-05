document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================================
    // 1. Sticky Header & Scroll Logic
    // =========================================================
    const header = document.querySelector('.sticky-nav');
    const stickyThreshold = 50;

    window.addEventListener('scroll', () => {
        if (window.scrollY > stickyThreshold) {
            header.style.backgroundColor = 'white';
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'white';
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.05)';
        }
    });

    // =========================================================
    // 2. Hamburger Menu Toggle (untuk Mobile)
    // =========================================================
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links-desktop');
    const body = document.body;

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            // Toggle visibility/styling pada links
            navLinks.classList.toggle('active');
            
            // Mengubah ikon hamburger menjadi X
            if (navLinks.classList.contains('active')) {
                hamburger.innerHTML = '&#10005;'; // X mark
                hamburger.setAttribute('aria-expanded', 'true');
            } else {
                hamburger.innerHTML = '&#9776;'; // Hamburger icon
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // =========================================================
    // 3. Fitur Baru: Active Sidebar Navigasi (Docs Page)
    // =========================================================
    const sections = document.querySelectorAll('article h3[id]'); // Target semua h3 yang punya ID
    const navLinksSidebar = document.querySelectorAll('.docs-sidebar a');

    if (sections.length > 0 && navLinksSidebar.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50% 0px', // Aktif ketika di tengah viewport
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Hapus kelas 'active' dari semua tautan
                    navLinksSidebar.forEach(link => link.classList.remove('active'));
                    
                    // Temukan tautan yang cocok dan tambahkan kelas 'active'
                    const targetId = entry.target.getAttribute('id');
                    const activeLink = document.querySelector(`.docs-sidebar a[href="#${targetId}"]`);
                    
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // =========================================================
    // 4. Tab Switching Logic (Jika ada di index.html)
    // =========================================================
    // Tambahkan logika tab switching Anda di sini jika ada.
    
});
