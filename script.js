// ==============================
// MENU HP (buka / tutup)
// ==============================
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const links = document.querySelectorAll(".nav-menu a");

function toggleMenu(open) {
    navMenu.classList.toggle("open", open);
    menuBtn.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", open);
}

menuBtn.addEventListener("click", () => {
    toggleMenu(!navMenu.classList.contains("open"));
});

// Tutup menu setelah salah satu link diklik
links.forEach(link => {
    link.addEventListener("click", () => toggleMenu(false));
});


// ==============================
// MENANDAI MENU YANG SEDANG AKTIF
// ==============================
const sections = document.querySelectorAll("main section[id]");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            links.forEach(link => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === "#" + entry.target.id
                );
            });
        }
    });
}, { rootMargin: "-45% 0px -50% 0px" });

sections.forEach(section => observer.observe(section));