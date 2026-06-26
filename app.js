const data = window.AI_RESOURCE_DATA;

const byId = (id) => document.getElementById(id);
const externalAttrs = 'target="_blank" rel="noreferrer"';
const page = document.body.dataset.page || "home";
const isHome = page === "home";

function renderBasics() {
  if (byId("basicsGrid")) {
    byId("basicsGrid").innerHTML = data.basics.map((item) => `
    <article class="info-card">
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    </article>
    `).join("");
  }

  if (byId("ethicsGrid")) {
    byId("ethicsGrid").innerHTML = data.ethics.map((item) => `
    <article class="info-card">
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    </article>
    `).join("");
  }
}

function bookTypeLabel(type) {
  return type === "ebook" ? "電子書" : "實體館藏";
}

function renderBooks(filter = "all") {
  if (!byId("bookGrid")) return;
  const allBooks = filter === "all" ? data.books : data.books.filter((book) => book.type === filter);
  const books = isHome ? allBooks.slice(0, 5) : allBooks;
  byId("bookGrid").innerHTML = books.map((book) => `
    <article class="book-card">
      <a class="book-cover" href="${book.url}" ${externalAttrs}>
        <img src="${book.image}" alt="${book.title}">
      </a>
      <div class="book-body">
        <span class="book-type">${bookTypeLabel(book.type)}</span>
        <h3>${book.title}</h3>
        <p class="book-meta">${book.author ? `作者：${book.author}<br>` : ""}${book.publisher ? `出版社：${book.publisher}<br>` : ""}${book.code ? `條碼：${book.code}` : "UDN 電子書"}</p>
        <a class="button small" href="${book.url}" ${externalAttrs}>開啟連結</a>
      </div>
    </article>
  `).join("");
}

function renderVideos() {
  if (!byId("videoGrid")) return;
  const videos = isHome ? data.videos.slice(0, 5) : data.videos;
  byId("videoGrid").innerHTML = videos.map((video) => `
    <article class="video-card">
      <a class="video-thumb" href="https://www.youtube.com/watch?v=${video.id}" ${externalAttrs} aria-label="播放 ${video.title}">
        <img src="https://i.ytimg.com/vi/${video.id}/hq720.jpg" alt="${video.title}">
        <span class="play-mark">▶</span>
      </a>
      ${isHome ? `<div class="video-body"><h3>${video.title}</h3><p class="video-channel">頻道：${video.channel}</p></div>` : ""}
    </article>
  `).join("");
}

function favicon(domain) {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
}

function renderResources(id, items, label) {
  if (!byId(id)) return;
  const visibleItems = isHome ? items.slice(0, id === "toolGrid" ? 6 : 3) : items;
  byId(id).innerHTML = visibleItems.map((item) => `
    <article class="resource-card">
      <div class="resource-top">
        ${item.domain ? `<img class="resource-logo" src="${favicon(item.domain)}" alt="">` : ""}
        <h3>${item.title}</h3>
      </div>
      <span class="tag">${item.tag}</span>
      <p>${item.text}</p>
      <a class="button small" href="${item.url}" ${externalAttrs}>${label}</a>
    </article>
  `).join("");
}

function renderStats() {
  if (!byId("statBooks")) return;
  byId("statBooks").textContent = data.books.length;
  byId("statVideos").textContent = data.videos.length;
  byId("statTools").textContent = data.tools.length;
}

function bindControls() {
  document.querySelectorAll("[data-book-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-book-filter]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderBooks(button.dataset.bookFilter);
    });
  });

  const menuButton = document.querySelector(".menu-toggle");
  const nav = byId("siteNav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
    });
  }
}

renderStats();
renderBasics();
renderBooks();
renderVideos();
renderResources("courseGrid", data.courses, "前往學習");
renderResources("toolGrid", data.tools, "前往使用");
bindControls();
