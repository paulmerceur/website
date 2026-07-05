const pages = document.querySelectorAll("[data-page]");
const links = document.querySelectorAll("[data-link]");

function showPage() {
  const page = location.hash.slice(1) || "home";
  const knownPage = [...pages].some((section) => section.dataset.page === page) ? page : "home";

  pages.forEach((section) => {
    section.hidden = section.dataset.page !== knownPage;
  });

  links.forEach((link) => {
    link.toggleAttribute("aria-current", link.dataset.link === knownPage);
  });
}

window.addEventListener("hashchange", showPage);
showPage();
