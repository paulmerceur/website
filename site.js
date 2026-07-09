const currentPage = document.body.dataset.page;

function linkFor(type, item) {
  return `${type}.html?${type}=${encodeURIComponent(item.id)}`;
}

function renderHeader() {
  const header = document.querySelector("[data-site-header]");
  if (!header) return;

  header.innerHTML = `
    <h1><a href="index.html">Paul Merceur</a></h1>
    <h2 class="title-row">software engineer <a href="https://github.com/paulmerceur">github</a></h2>
    <nav aria-label="main navigation">
      <a href="projects.html"${currentPage === "projects" ? ' aria-current="page"' : ""}>projects</a>
      <a href="notes.html"${currentPage === "notes" ? ' aria-current="page"' : ""}>notes</a>
    </nav>
  `;
}

function renderList(selector, items, type) {
  document.querySelectorAll(selector).forEach((list) => {
    const limit = Number(list.dataset.limit) || items.length;
    list.innerHTML = items.slice(0, limit).map((item) => `
      <article>
        <h3><a href="${linkFor(type, item)}">${item.title}</a></h3>
        ${item.description ? `<p>${item.description}</p>` : ""}
      </article>
    `).join("");
  });
}

function renderDetail(selector, items, type) {
  const container = document.querySelector(selector);
  if (!container) return;

  const id = new URLSearchParams(location.search).get(type);
  const item = items.find((entry) => entry.id === id);

  if (!item) {
    container.innerHTML = `<h2>${type} not found</h2>`;
    return;
  }

  document.title = `${item.title} — Paul Merceur`;
  container.innerHTML = `<h2>${item.title}</h2>${item.content || ""}`;
}

renderHeader();
renderList("[data-project-list]", site.projects, "project");
renderList("[data-note-list]", site.notes, "note");
renderDetail("[data-project]", site.projects, "project");
renderDetail("[data-note]", site.notes, "note");
