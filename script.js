
/* =================================
   PORTOFOLIO MUHAMMAD SIGIT ARIZKY
   Navigasi sederhana dan ringan
================================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-menu a");
const sections = document.querySelectorAll("main section[id]");

// Buka dan tutup menu HP
function toggleMenu(open) {
    if (!menuBtn || !navMenu) return;

    navMenu.classList.toggle("open", open);
    menuBtn.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
}

if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", () => {
        const isOpen = navMenu.classList.contains("open");
        toggleMenu(!isOpen);
    });

    // Tutup menu setelah tautan diklik
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            toggleMenu(false);
        });
    });

    // Tutup menu jika pengguna mengeklik area di luar menu
    document.addEventListener("click", event => {
        const clickedInsideMenu = navMenu.contains(event.target);
        const clickedButton = menuBtn.contains(event.target);

        if (!clickedInsideMenu && !clickedButton) {
            toggleMenu(false);
        }
    });

    // Tutup menu jika layar berubah menjadi desktop
    window.addEventListener("resize", () => {
        if (window.innerWidth > 680) {
            toggleMenu(false);
        }
    });
}

// Menandai navbar berdasarkan bagian yang terlihat
function setActiveLink(sectionId) {
    navLinks.forEach(link => {
        const isActive = link.getAttribute("href") === `#${sectionId}`;

        link.classList.toggle("active", isActive);

        if (isActive) {
            link.setAttribute("aria-current", "location");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

// Gunakan IntersectionObserver jika tersedia
if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
        entries => {
            const visibleSections = entries
                .filter(entry => entry.isIntersecting)
                .sort(
                    (a, b) =>
                        b.intersectionRatio - a.intersectionRatio
                );

            if (visibleSections.length > 0) {
                setActiveLink(visibleSections[0].target.id);
            }
        },
        {
            rootMargin: "-20% 0px -60% 0px",
            threshold: [0, 0.1, 0.25, 0.5]
        }
    );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// Jika halaman dibuka melalui tautan seperti #kontak
window.addEventListener("load", () => {
    const currentId = window.location.hash.slice(1);

    if (currentId && document.getElementById(currentId)) {
        setActiveLink(currentId);
    } else {
        setActiveLink("home");
    }
});
