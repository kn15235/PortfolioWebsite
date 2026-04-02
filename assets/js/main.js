function initLoadingOverlay() {
  const pretext = "One moment please...";
  const questionText = "Are you sure you want to visit the site?";
  const typeDelayMs = 34;
  const preQuestionPauseMs = 1700;
  const overlay = document.createElement("div");
  overlay.className = "loading-overlay";
  overlay.innerHTML = `
    <div class="loading-overlay-inner">
      <div class="loading-terminal" role="presentation">
        <div class="loading-terminal-bar">
          <span class="loading-terminal-dots" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </span>
          <p class="loading-terminal-title">kristinen-terminal.exe</p>
        </div>
        <div class="loading-terminal-body">
          <p class="loading-pretext" aria-live="polite"></p>
          <img class="loading-gif" src="assets/img/loading.gif" alt="Loading" />
          <p class="loading-text" aria-live="polite"></p>
          <button class="loading-continue" type="button">Continue</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  const pretextEl = overlay.querySelector(".loading-pretext");
  const questionEl = overlay.querySelector(".loading-text");
  const continueBtn = overlay.querySelector(".loading-continue");
  const typeText = (el, text, done) => {
    if (!el) return;
    let i = 0;
    el.classList.add("typing");
    const tick = () => {
      el.textContent = text.slice(0, i);
      if (i < text.length) {
        i += 1;
        window.setTimeout(tick, typeDelayMs);
        return;
      }
      el.classList.remove("typing");
      done?.();
    };
    tick();
  };

  typeText(pretextEl, pretext, () => {
    window.setTimeout(() => {
      typeText(questionEl, questionText, () => {
        continueBtn?.classList.add("is-ready");
      });
    }, preQuestionPauseMs);
  });

  continueBtn?.addEventListener("click", () => {
    sessionStorage.setItem("initialSiteLoaderShown", "1");
    overlay.classList.add("is-hidden");
    window.setTimeout(() => overlay.remove(), 260);
  });
}

// Work / Education Tabs
function initExpTabs() {
  document.querySelectorAll(".panel-exp").forEach((panel) => {
    const buttons = panel.querySelectorAll(".tab-btn");
    const contents = panel.querySelectorAll(".tab-content");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.tab;

        buttons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        btn.classList.remove("select-pop");
        void btn.offsetWidth;
        btn.classList.add("select-pop");

        contents.forEach((c) => c.classList.remove("active"));
        const targetContent = panel.querySelector(`#tab-${target}`);
        targetContent?.classList.add("active");
        if (targetContent) {
          targetContent.classList.remove("switch-in");
          void targetContent.offsetWidth;
          targetContent.classList.add("switch-in");
        }
      });
    });
  });
}

function initProjectsExplorer() {
  const root = document.querySelector(".pexp");
  if (!root) return;

  const projectData = {
    "portfolio-website": {
      date: "Saturday, March 7, 2026",
      title: "Portfolio Website",
      subtitle: " My first personal portfolio built with HTML, CSS, and JavaScript!",
      about: [
        "Designed and built a multi-page personal website.",
        "Includes overview, projects explorer, resume viewer, and blog page.",
        "Added custom styling, animations, and responsive layout."
      ],
      tags: ["html", "css", "javascript", "portfolio"],
      repo: { label: "github.com/kn15235/PortfolioWebsite", url: "https://github.com/kn15235/PortfolioWebsite" },
      docs: { label: "Live Site", url: "#" },
      lang: "HTML / CSS / JavaScript",
      commits: "20+",
      stars: "TBD",
      created: "2026",
      updated: "2026",
      comment:
        "This is a project where I share my work, experiments, and design updates all with in one place! I will be updating more later in my free time",
      examples: [
        {
          title: "Homepage Preview",
          type: "image",
          src: "assets/img/previewpage.png",
          alt: "Portfolio homepage preview",
          caption: "Overview page with profile, experience, and highlights."
        }
      ]
    }
  };

  const navItems = root.querySelectorAll(".project-nav-item");
  const searchInput = root.querySelector("#projectSearch");

  const dateEl = root.querySelector("#projectCurrentDate");
  const titleEl = root.querySelector("#projectTitle");
  const subtitleEl = root.querySelector("#projectSubtitle");
  const aboutEl = root.querySelector("#projectAbout");
  const tagsEl = root.querySelector("#projectTags");
  const repoEl = root.querySelector("#projectRepo");
  const docsEl = root.querySelector("#projectDocs");
  const langEl = root.querySelector("#projectLang");
  const commitsEl = root.querySelector("#projectCommits");
  const starsEl = root.querySelector("#projectStars");
  const createdEl = root.querySelector("#projectCreated");
  const updatedEl = root.querySelector("#projectUpdated");
  const commentEl = root.querySelector("#projectComment");
  const examplesEl = root.querySelector("#projectExamples");

  if (!dateEl || !titleEl || !subtitleEl || !aboutEl || !tagsEl || !repoEl || !docsEl || !langEl || !commitsEl || !starsEl || !createdEl || !updatedEl || !commentEl || !examplesEl) {
    return;
  }

  const renderProject = (projectKey) => {
    const project = projectData[projectKey];
    if (!project) return;
    const mainPanel = root.querySelector(".pexp-main");

    navItems.forEach((item) => {
      item.classList.toggle("active", item.dataset.project === projectKey);
    });

    dateEl.textContent = project.date;
    titleEl.textContent = project.title;
    subtitleEl.textContent = project.subtitle;

    aboutEl.innerHTML = `
      <ul>
        ${project.about.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    `;

    tagsEl.innerHTML = project.tags.map((tag) => `<span class="pexp-tag">${tag}</span>`).join("");

    repoEl.textContent = project.repo.label;
    repoEl.href = project.repo.url;
    docsEl.textContent = project.docs.label;
    docsEl.href = project.docs.url;
    langEl.textContent = project.lang;
    commitsEl.textContent = project.commits;
    starsEl.textContent = project.stars;
    createdEl.textContent = project.created;
    updatedEl.textContent = project.updated;
    commentEl.textContent = project.comment;

    examplesEl.innerHTML = project.examples
      .map((example) => {
        if (example.type === "image") {
          return `
            <article class="pexp-example-card">
              <div class="pexp-example-head">${example.title}</div>
              <img src="${example.src}" alt="${example.alt}" loading="lazy" />
              <p>${example.caption}</p>
            </article>
          `;
        }

        return `
          <article class="pexp-example-card">
            <div class="pexp-example-head">${example.title}</div>
            <pre><code>${example.code}</code></pre>
          </article>
        `;
      })
      .join("");

    if (mainPanel) {
      mainPanel.classList.remove("switch-in");
      void mainPanel.offsetWidth;
      mainPanel.classList.add("switch-in");
    }
  };

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      const key = item.dataset.project;
      item.classList.remove("select-pop");
      void item.offsetWidth;
      item.classList.add("select-pop");
      renderProject(key);
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const q = searchInput.value.trim().toLowerCase();
      navItems.forEach((item) => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(q) ? "" : "none";
      });
    });
  }

  renderProject("portfolio-website");
}

function initHobbiesExplorer() {
  const root = document.querySelector(".hobbies-explorer");
  if (!root) return;

  const items = root.querySelectorAll(".side-item");
  const search = root.querySelector(".projects-search");
  const blogPanel = root.querySelector(".blog-panel");
  const titleEl = root.querySelector("#blogTitle");
  const dateEl = root.querySelector("#blogDate");
  const tagsEl = root.querySelector("#blogMetaTags");
  const heroEl = root.querySelector("#blogHero");
  const p1El = root.querySelector("#blogP1");
  const p2El = root.querySelector("#blogP2");

  const blogData = {
    "test-blog": {
      title: "testing 123",
      date: "Friday, March 6, 2026",
      tags: ["test", "blog", "placeholder"],
      image:
        "https://images.unsplash.com/photo-1516431883659-655d41c09bf9?auto=format&fit=crop&w=1600&q=80",
      p1:
        "This is a test blog entry, I will update this with real content later!",
      p2:
        "Additional placeholder text for testing. This section will be replaced with real content later"
    }
  };

  const renderBlog = (key) => {
    const item = blogData[key];
    if (!item || !titleEl || !dateEl || !heroEl || !p1El || !p2El) return;
    titleEl.textContent = item.title;
    dateEl.textContent = item.date;
    if (tagsEl) {
      tagsEl.innerHTML = (item.tags || [])
        .map((tag) => `<span class="pexp-tag">${tag}</span>`)
        .join("");
    }
    heroEl.src = item.image;
    heroEl.alt = item.title;
    p1El.textContent = item.p1;
    p2El.textContent = item.p2;
  };

  items.forEach((item) => {
    item.addEventListener("click", () => {
      items.forEach((x) => x.classList.remove("active"));
      item.classList.add("active");
      item.classList.remove("select-pop");
      void item.offsetWidth;
      item.classList.add("select-pop");
      renderBlog(item.dataset.blog);
      if (blogPanel) {
        blogPanel.classList.remove("switch-in");
        void blogPanel.offsetWidth;
        blogPanel.classList.add("switch-in");
      }
    });
  });

  if (search) {
    search.addEventListener("input", () => {
      const q = search.value.trim().toLowerCase();
      items.forEach((item) => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(q) ? "" : "none";
      });
    });
  }

  const active = root.querySelector(".side-item.active");
  if (active?.dataset.blog) renderBlog(active.dataset.blog);
}

function initSiteAnimations() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.body.classList.add("is-ready");
    return;
  }

  const animated = document.querySelectorAll(
    ".header-banner, .profile-pic-row, .panel, .hobby-entry, .blog-panel, .pexp-main > .panel"
  );

  animated.forEach((el, i) => {
    el.classList.add("reveal");
    el.style.animationDelay = `${Math.min(i * 45, 420)}ms`;
  });

  requestAnimationFrame(() => {
    document.body.classList.add("is-ready");
  });
}

function initPageNavigationTransition() {
  const links = document.querySelectorAll(".nav-link[href]");
  let isNavigating = false;
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      if (isNavigating) {
        e.preventDefault();
        return;
      }

      const href = link.getAttribute("href");
      if (!href) return;

      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      if (href.startsWith("#")) return;
      const targetUrl = new URL(href, window.location.href);
      if (targetUrl.origin !== window.location.origin) return;
      if (targetUrl.pathname === window.location.pathname && targetUrl.hash === window.location.hash) return;

      e.preventDefault();
      isNavigating = true;
      document.body.classList.add("page-leave");
      window.setTimeout(() => {
        window.location.href = targetUrl.href;
      }, 140);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const loaderKey = "initialSiteLoaderShown";
  if (!sessionStorage.getItem(loaderKey)) {
    initLoadingOverlay();
  }
  initExpTabs();
  initProjectsExplorer();
  initHobbiesExplorer();
  initSiteAnimations();
  initPageNavigationTransition();
});
