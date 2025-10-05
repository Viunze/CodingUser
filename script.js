document.addEventListener('DOMContentLoaded', () => {
    // Scroll-triggered Animations
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

    // Logika Tab untuk Konsep Lua
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

    // Logika Accordion untuk FAQ
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('.accordion-icon');
            const isExpanded = header.getAttribute('aria-expanded') === 'true';

            // Tutup semua yang terbuka (untuk mode single-open)
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
                // Gunakan scrollHeight untuk mendapatkan tinggi konten aktual
                content.style.maxHeight = content.scrollHeight + 'px'; 
                icon.style.transform = 'rotate(45deg)'; 
            } else {
                header.setAttribute('aria-expanded', 'false');
                content.style.maxHeight = '0';
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
});
