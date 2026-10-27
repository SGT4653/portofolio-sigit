
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
    menuBtn.setAttribute(
        "aria-label",
        open ? "Tutup menu" : "Buka menu"
    );
}

if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", () => {
        const isOpen = navMenu.classList.contains("open");
        toggleMenu(!isOpen);
    });

    // Tutup menu setelah link diklik
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            toggleMenu(false);
        });
    });

    // Tutup menu jika klik di luar navigasi
    document.addEventListener("click", event => {
        const clickedInsideMenu = navMenu.contains(event.target);
        const clickedButton = menuBtn.contains(event.target);

        if (!clickedInsideMenu && !clickedButton) {
            toggleMenu(false);
        }
    });

    // Tutup menu ketika layar kembali ke desktop
    window.addEventListener("resize", () => {
        if (window.innerWidth > 680) {
            toggleMenu(false);
        }
    });
}

// Menandai menu berdasarkan bagian yang terlihat
function setActiveLink(sectionId) {
    navLinks.forEach(link => {
        const isActive =
            link.getAttribute("href") === `#${sectionId}`;

        link.classList.toggle("active", isActive);

        if (isActive) {
            link.setAttribute("aria-current", "location");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

// Pantau bagian halaman yang terlihat
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

// Atur menu saat halaman pertama kali dibuka
window.addEventListener("load", () => {
    const currentId = window.location.hash.slice(1);

    if (currentId && document.getElementById(currentId)) {
        setActiveLink(currentId);
    } else {
        setActiveLink("home");
    }
});
