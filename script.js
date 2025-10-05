document.addEventListener('DOMContentLoaded', () => {
    // 5. Fitur UI Modern Secara Keseluruhan: Scroll-triggered Animations (Same as before)
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
        // Asumsi .content-card memiliki transform: translateY(20px) dan opacity: 0 di CSS
        observer.observe(card);
    });

    // =========================================================
    // FITUR BARU 1: Logika Tab untuk Konsep Lua
    // =========================================================
    window.showLuaConcept = function(conceptId) {
        // Sembunyikan semua konten tab
        document.querySelectorAll('.tab-content').forEach(content => {
            content.style.display = 'none';
        });
        
        // Nonaktifkan semua tombol
        document.querySelectorAll('.tab-button').forEach(button => {
            button.classList.remove('active');
        });

        // Tampilkan konten yang dipilih
        const activeContent = document.getElementById(conceptId);
        if (activeContent) {
            activeContent.style.display = 'block';
        }
        
        // Aktifkan tombol yang diklik
        document.querySelector(`.tab-buttons button[onclick*="${conceptId}"]`).classList.add('active');
    };

    // Panggil fungsi untuk memastikan tab pertama aktif saat dimuat
    // showLuaConcept('metatable'); // Sudah disetel di HTML/CSS awal

    // =========================================================
    // FITUR BARU 2: Logika Accordion untuk FAQ
    // =========================================================
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('.accordion-icon');
            const isExpanded = header.getAttribute('aria-expanded') === 'true';

            // Tutup semua accordion yang terbuka (Optional: hanya buka 1)
            document.querySelectorAll('.accordion-header').forEach(h => {
                if (h !== header && h.getAttribute('aria-expanded') === 'true') {
                    h.setAttribute('aria-expanded', 'false');
                    h.nextElementSibling.style.maxHeight = '0';
                    h.querySelector('.accordion-icon').style.transform = 'rotate(0deg)';
                }
            });

            // Toggle accordion yang sedang diklik
            if (!isExpanded) {
                header.setAttribute('aria-expanded', 'true');
                content.style.maxHeight = content.scrollHeight + 'px';
                icon.style.transform = 'rotate(45deg)'; // Ikon "+" berubah menjadi "X"
            } else {
                header.setAttribute('aria-expanded', 'false');
                content.style.maxHeight = '0';
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
});
