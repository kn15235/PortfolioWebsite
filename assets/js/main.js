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

        contents.forEach((c) => c.classList.remove("active"));
        panel.querySelector(`#tab-${target}`)?.classList.add("active");
      });
    });
  });
}

// Dark mode
function initThemeToggle() {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  const saved = localStorage.getItem("theme");
  if (saved === "dark") document.body.classList.add("dark");

  btn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
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
  };

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      const key = item.dataset.project;
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

document.addEventListener("DOMContentLoaded", () => {
  initExpTabs();
  initThemeToggle();
  initProjectsExplorer();
});
