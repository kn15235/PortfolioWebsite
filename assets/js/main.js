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
    portfolio: {
      date: "Wednesday, May 8, 2024",
      title: "Portfolio Website",
      subtitle: "GitHub-inspired portfolio with a custom multi-page layout and polished UI components.",
      about: [
        "Built as a personal showcase site focused on clean structure and fast navigation.",
        "Uses reusable panels and section-based components so each page stays consistent.",
        "Designed to make project storytelling easy with dedicated About, Repo, Notes, and Examples sections."
      ],
      tags: ["featured", "web", "github-theme"],
      repo: { label: "github.com/kn15235/PortfolioWebsite", url: "https://github.com/yourusername" },
      docs: { label: "README.md", url: "https://github.com/yourusername" },
      lang: "HTML / CSS / JavaScript",
      commits: "176",
      stars: "12",
      created: "Feb 10, 2026",
      updated: "Feb 22, 2026",
      comment:
        "This project is my design sandbox. I use it to test layout ideas, improve frontend consistency, and practice presenting work clearly.",
      examples: [
        {
          title: "Main Overview",
          type: "image",
          src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80",
          alt: "Portfolio overview mockup",
          caption: "Responsive top-level layout and project panel composition."
        },
        {
          title: "Section Rendering Logic",
          type: "code",
          code: "const sections = ['about', 'repo', 'comments', 'showcase'];\nsections.forEach((id) => renderSection(id));"
        }
      ]
    },
    devsprite: {
      date: "Tuesday, May 14, 2024",
      title: "DevSprite.io",
      subtitle: "Developer-focused utility site for quick tools, snippets, and lightweight UI helpers.",
      about: [
        "Created to bundle tiny utilities into one clean experience.",
        "Prioritizes fast interaction, no-clutter screens, and keyboard-friendly workflows.",
        "Structured as a modular frontend so tools can be added independently."
      ],
      tags: ["featured", "tooling", "frontend"],
      repo: { label: "github.com/yourusername/devsprite", url: "https://github.com/yourusername" },
      docs: { label: "docs.devsprite.io", url: "https://github.com/yourusername" },
      lang: "TypeScript / React",
      commits: "91",
      stars: "31",
      created: "Mar 3, 2026",
      updated: "Feb 20, 2026",
      comment:
        "This one taught me restraint: fewer features, better defaults, and cleaner visual hierarchy usually wins.",
      examples: [
        {
          title: "Tool Library",
          type: "image",
          src: "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1400&q=80",
          alt: "Tooling interface screenshot",
          caption: "Utility cards grouped by workflows."
        },
        {
          title: "Tool Registration",
          type: "code",
          code: "registerTool({ id: 'json-pretty', group: 'formatting', run: prettyPrintJson });"
        }
      ]
    },
    matcha: {
      date: "Friday, May 17, 2024",
      title: "matcha.css",
      subtitle: "Minimal semantic styling layer that keeps plain HTML readable and attractive.",
      about: [
        "Targets semantic elements directly so content pages look good without extra classes.",
        "Great for quick prototypes and docs where speed matters more than custom components.",
        "Includes balanced typography scale and subtle contrast tuning."
      ],
      tags: ["css", "ui", "featured"],
      repo: { label: "github.com/yourusername/matcha-css", url: "https://github.com/yourusername" },
      docs: { label: "matcha.css docs", url: "https://github.com/yourusername" },
      lang: "CSS",
      commits: "176",
      stars: "1926",
      created: "May 8, 2024",
      updated: "Feb 20, 2026",
      comment:
        "I like using this when I want visual consistency without adding utility classes everywhere.",
      examples: [
        {
          title: "Default Styling Preview",
          type: "image",
          src: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&w=1400&q=80",
          alt: "Code preview",
          caption: "Readable defaults for headers, lists, tables, and forms."
        },
        {
          title: "Typography Tokens",
          type: "code",
          code: ":root { --font-body: 15px; --line-height: 1.6; }\narticle h2 { margin-top: 1.25rem; }"
        }
      ]
    },
    api: {
      date: "Monday, June 3, 2024",
      title: "API Service",
      subtitle: "REST service built for reliable CRUD operations and clean deployment.",
      about: [
        "Implements clear route boundaries between auth, resources, and admin operations.",
        "Uses request validation and standardized error responses.",
        "Deployed with logging and environment-based configuration."
      ],
      tags: ["backend", "api", "python"],
      repo: { label: "github.com/yourusername/api-service", url: "https://github.com/yourusername" },
      docs: { label: "OpenAPI spec", url: "https://github.com/yourusername" },
      lang: "Python",
      commits: "124",
      stars: "19",
      created: "Jun 3, 2024",
      updated: "Jan 30, 2026",
      comment:
        "I focused on clean error handling and maintainability over clever architecture here.",
      examples: [
        {
          title: "Endpoint Health",
          type: "image",
          src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80",
          alt: "Service dashboard",
          caption: "Monitoring status and response timings."
        },
        {
          title: "Sample Endpoint",
          type: "code",
          code: "app.get('/v1/projects/:id', auth, async (req, res) => {\n  const project = await repo.find(req.params.id);\n  res.json(project);\n});"
        }
      ]
    },
    dashboard: {
      date: "Saturday, July 20, 2024",
      title: "Data Dashboard",
      subtitle: "Interactive dashboard for project metrics, usage trends, and release health.",
      about: [
        "Created to surface weekly trends and key project KPIs in one view.",
        "Supports filterable time windows and component-level drill-downs.",
        "A practical exercise in balancing data density with readability."
      ],
      tags: ["react", "charts", "analytics"],
      repo: { label: "github.com/yourusername/data-dashboard", url: "https://github.com/yourusername" },
      docs: { label: "Dashboard notes", url: "https://github.com/yourusername" },
      lang: "React / TypeScript",
      commits: "88",
      stars: "27",
      created: "Jul 20, 2024",
      updated: "Feb 12, 2026",
      comment:
        "This project improved my ability to simplify complex metrics into useful, actionable UI.",
      examples: [
        {
          title: "KPI Overview",
          type: "image",
          src: "https://images.unsplash.com/photo-1551281044-8d8d7f80b2b3?auto=format&fit=crop&w=1400&q=80",
          alt: "Dashboard analytics",
          caption: "Summary cards and trend chart layout."
        },
        {
          title: "Chart Config",
          type: "code",
          code: "const chartOptions = { xaxis: { type: 'datetime' }, stroke: { width: 2 }, grid: { borderColor: '#30363d' } };"
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

  renderProject("portfolio");
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
    "about-you": {
      title: "About You",
      date: "Monday, January 19, 2026",
      tags: ["featured", "music", "reflection"],
      track: "About You",
      artist: "The 1975",
      image:
        "https://images.unsplash.com/photo-1516431883659-655d41c09bf9?auto=format&fit=crop&w=1600&q=80",
      p1:
        "Stargate SG-1 S03E06 is probably one of my favorite episodes so far. Imagine fleeing to an alternate reality to escape your own, ravaged by a plague you are unable to fight against and which has decimated your world, your family, your friends, and your love.",
      p2:
        "Outside of coding, I keep a small blog like this to capture moments, songs, and scenes that make a week memorable. It helps me slow down and keep a creative rhythm."
    },
    "point-of-view": {
      title: "Point of View",
      date: "Sunday, December 28, 2025",
      tags: ["journal", "late-night", "mindset"],
      track: "Nights",
      artist: "Frank Ocean",
      image:
        "https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=1600&q=80",
      p1:
        "Random late-night thought dump: sometimes perspective changes faster than circumstance. The same street can feel heavy one day and cinematic the next, just because your headspace shifted.",
      p2:
        "I wrote this entry after a long walk and too much coffee. Placeholder text for now, but this is the kind of mini-journal format I want to keep filling in over time."
    },
    "autumn-twilight": {
      title: "Autumn Twilight",
      date: "Wednesday, October 22, 2025",
      tags: ["seasonal", "autumn", "photo-note"],
      track: "Sweater Weather",
      artist: "The Neighbourhood",
      image:
        "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?auto=format&fit=crop&w=1600&q=80",
      p1:
        "Another placeholder entry: leaves, cold air, and that very specific 5:30 PM glow where everything looks like a film still. Good weather for quiet playlists and no-notification mode.",
      p2:
        "I want this section to read like a personal timeline of snapshots. Not polished essays, just short observations that feel real and easy to revisit later."
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
