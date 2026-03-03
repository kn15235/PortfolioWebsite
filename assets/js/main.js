function initLoadingOverlay() {
  const pretext = "One moment please...";
  const questionText = "Are you sure you want to visit Kristine's site?";
  const typeDelayMs = 34;
  const preQuestionPauseMs = 1700;
  const overlay = document.createElement("div");
  overlay.className = "loading-overlay";
  overlay.innerHTML = `
    <div class="loading-overlay-inner">
      <p class="loading-pretext" aria-live="polite"></p>
      <img class="loading-gif" src="assets/img/loading.gif" alt="Loading" />
      <p class="loading-text" aria-live="polite"></p>
      <button class="loading-continue" type="button">Yes, continue!</button>
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
    "test-project": {
      date: "Tuesday, March 3, 2026",
      title: "Test Project",
      subtitle: "Placeholder project entry for testing the projects section.",
      about: [
        "This is a test project entry used to verify the project explorer layout.",
        "The content is intentionally minimal and will be replaced later.",
        "All project panels should render correctly with this single item."
      ],
      tags: ["test"],
      repo: { label: "github.com/yourusername/test-project", url: "https://github.com/yourusername" },
      docs: { label: "Test docs", url: "https://github.com/yourusername" },
      lang: "Test Stack",
      commits: "1",
      stars: "0",
      created: "Mar 3, 2026",
      updated: "Mar 3, 2026",
      comment:
        "This test entry is here to validate UI structure before real project details are added.",
      examples: [
        {
          title: "Test Preview",
          type: "image",
          src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80",
          alt: "Test project preview",
          caption: "Placeholder preview image for testing."
        },
        {
          title: "Test Snippet",
          type: "code",
          code: "const status = 'test';\nconsole.log(status);"
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

  renderProject("test-project");
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
  const trackEl = root.querySelector("#blogTrack");
  const artistEl = root.querySelector("#blogArtist");

  const blogData = {
    "test-blog": {
      title: "Test Blog",
      date: "Tuesday, March 3, 2026",
      tags: ["test"],
      track: "Test Track",
      artist: "Test Artist",
      image:
        "https://images.unsplash.com/photo-1516431883659-655d41c09bf9?auto=format&fit=crop&w=1600&q=80",
      p1:
        "This is a test blog entry used to verify the layout and blog rendering behavior.",
      p2:
        "Additional placeholder text for testing. This section will be replaced with real content later."
    }
  };

  const renderBlog = (key) => {
    const item = blogData[key];
    if (!item || !titleEl || !dateEl || !heroEl || !p1El || !p2El || !trackEl || !artistEl) return;
    titleEl.textContent = item.title;
    dateEl.textContent = item.date;
    if (tagsEl) {
      tagsEl.innerHTML = (item.tags || [])
        .map((tag) => `<span class="pexp-tag">${tag}</span>`)
        .join("");
    }
    trackEl.textContent = item.track;
    artistEl.textContent = item.artist;
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
