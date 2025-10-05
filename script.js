document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================================
    // 1. Scroll-triggered Animations (Fade-in Cards)
    // =========================================================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1, 
        rootMargin: '0px 0px -50px 0px' 
    });

    document.querySelectorAll('.content-card').forEach(card => {
        observer.observe(card);
    });

    // =========================================================
    // 2. Dynamic Sticky Header (Shrink/Fade)
    // =========================================================
    const header = document.querySelector('.sticky-nav');
    const scrollThreshold = 50; 

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // =========================================================
    // 3. Logika Tab untuk Konsep Lua
    // =========================================================
    window.showLuaConcept = function(conceptId) {
        document.querySelectorAll('.tab-content').forEach(content => {
            content.style.display = 'none';
        });
        document.querySelectorAll('.tab-button').forEach(button => {
            button.classList.remove('active');
        });

        const activeContent = document.getElementById(conceptId);
        if (activeContent) {
            activeContent.style.display = 'block';
        }
        document.querySelector(`.tab-buttons button[onclick*="${conceptId}"]`).classList.add('active');
    };

    // =========================================================
    // 4. Logika Accordion untuk FAQ
    // =========================================================
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('.accordion-icon');
            const isExpanded = header.getAttribute('aria-expanded') === 'true';

            // Tutup semua yang terbuka
            document.querySelectorAll('.accordion-header').forEach(h => {
                if (h !== header && h.getAttribute('aria-expanded') === 'true') {
                    h.setAttribute('aria-expanded', 'false');
                    h.nextElementSibling.style.maxHeight = '0';
                    h.querySelector('.accordion-icon').style.transform = 'rotate(0deg)';
                }
            });

            // Toggle yang sedang diklik
            if (!isExpanded) {
                header.setAttribute('aria-expanded', 'true');
                content.style.maxHeight = content.scrollHeight + 30 + 'px'; // Tambah padding sedikit
                icon.style.transform = 'rotate(45deg)'; 
            } else {
                header.setAttribute('aria-expanded', 'false');
                content.style.maxHeight = '0';
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
});
