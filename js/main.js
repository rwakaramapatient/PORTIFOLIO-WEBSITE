const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  const desktopMedia = window.matchMedia("(min-width: 48rem)");
  const isNavOpen = () => siteNav.classList.contains("is-open");

  const closeNav = () => {
    if (!isNavOpen()) {
      return;
    }

    siteNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isNavOpen()) {
      closeNav();
    }
  });

  document.addEventListener("click", (event) => {
    if (isNavOpen() && !siteNav.contains(event.target) && !navToggle.contains(event.target)) {
      closeNav();
    }
  });

  const syncNavOnViewportChange = () => {
    if (desktopMedia.matches) {
      closeNav();
    }
  };

  if (typeof desktopMedia.addEventListener === "function") {
    desktopMedia.addEventListener("change", syncNavOnViewportChange);
  } else {
    desktopMedia.addListener(syncNavOnViewportChange);
  }

  syncNavOnViewportChange();
}
