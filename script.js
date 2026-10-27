
document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-menu a");

    const home = document.getElementById("home");
    const pengalaman = document.getElementById("pengalaman");
    const year = document.getElementById("currentYear");

    // Tahun otomatis
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // Menu HP
    function closeMenu() {
        if (!menuBtn || !navMenu) return;

        navMenu.classList.remove("open");
        menuBtn.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
    }

    if (menuBtn && navMenu) {
        menuBtn.addEventListener("click", function () {
            const isOpen = navMenu.classList.toggle("open");

            menuBtn.classList.toggle("open", isOpen);
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

    // Navbar aktif berdasarkan posisi scroll
    function updateActiveNav() {
        const marker = window.scrollY + 180;
        let activeId = "home";

        if (pengalaman && marker >= pengalaman.offsetTop) {
            activeId = "pengalaman";
        } else if (home) {
            activeId = "home";
        }

        navLinks.forEach(function (link) {
            const isActive =
                link.getAttribute("href") === "#" + activeId;

            link.classList.toggle("active", isActive);
        });
    }

    window.addEventListener("scroll", updateActiveNav, {
        passive: true
    });

    window.addEventListener("resize", updateActiveNav);

    window.addEventListener("hashchange", updateActiveNav);

    // Perbarui status setelah klik menu
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

    updateActiveNav();
});
