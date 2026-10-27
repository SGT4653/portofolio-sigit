
document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");

    const homeSection = document.getElementById("home");
    const experienceSection = document.getElementById("pengalaman");

    // Tahun otomatis pada footer
    const yearElement = document.getElementById("currentYear");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Membuka dan menutup menu mobile
    function closeMenu() {
        if (!menuBtn || !navMenu) return;

        navMenu.classList.remove("show");
        menuBtn.classList.remove("active");
        menuBtn.setAttribute("aria-expanded", "false");
    }

    if (menuBtn && navMenu) {
        menuBtn.addEventListener("click", function () {
            const isOpen = navMenu.classList.toggle("show");

            menuBtn.classList.toggle("active", isOpen);
            menuBtn.setAttribute("aria-expanded", String(isOpen));
        });

        navLinks.forEach(function (link) {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("click", function (event) {
            if (
                !navMenu.contains(event.target) &&
                !menuBtn.contains(event.target)
            ) {
                closeMenu();
            }
        });

        window.addEventListener("resize", function () {
            if (window.innerWidth > 680) {
                closeMenu();
            }
        });
    }

    // Mengatur navbar aktif berdasarkan posisi halaman
    function updateActiveNav() {
        const marker = window.scrollY + 180;

        let activeSection = "home";

        if (
            experienceSection &&
            marker >= experienceSection.offsetTop
        ) {
            activeSection = "pengalaman";
        } else if (homeSection) {
            activeSection = "home";
        }

        navLinks.forEach(function (link) {
            const target = link.getAttribute("href");

            link.classList.toggle(
                "active",
                target === "#" + activeSection
            );
        });
    }

    // Klik navigasi langsung memperbarui status aktif
    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            const target = link.getAttribute("href");

            if (target === "#home" || target === "#pengalaman") {
                navLinks.forEach(function (item) {
                    item.classList.toggle("active", item === link);
                });
            }
        });
    });

    window.addEventListener("scroll", updateActiveNav, {
        passive: true
    });

    window.addEventListener("resize", updateActiveNav);

    window.addEventListener("hashchange", updateActiveNav);

    updateActiveNav();
});
