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

function initExperienceStories() {
  const root = document.querySelector(".experience-stories");
  if (!root) return;

  const storyData = {
    devsprite: {
      title: "DevSprite.io",
      date: "Mar 2026 - Present",
      tags: ["founder", "software", "community"],
      image: "assets/img/devsprite-logo.png",
      alt: "DevSprite logo",
      p1: "DevSprite.io started as a passion project built around a simple idea: small local businesses deserve a clean and approachable online presence too. I wanted to practice building real software while also creating something useful for people around me.",
      p2: "What makes this experience meaningful is the mix of ownership and learning. I am not only thinking about code, but also about design decisions, communication, and how to turn an idea into something people can actually use.",
      highlights: [
        "Leading the vision, planning, and development direction from the ground up.",
        "Designing sites and digital experiences that are approachable for local businesses.",
        "Learning how product decisions, branding, and engineering work together in real projects."
      ]
    },
    buildify: {
      title: "Buildify",
      date: "Jan 2026 - Present",
      tags: ["internship", "engineering ops", "systems"],
      image: "assets/img/buildify-logo.png",
      alt: "Buildify logo",
      p1: "At Buildify, I have been able to see how engineering work supports a larger product organization. Being part of the Engineering Ops side has helped me think beyond individual features and pay attention to how teams work, coordinate, and scale.",
      p2: "This experience has been especially valuable because it gives me a closer look at the systems behind product development. I get to learn how internal processes, tooling, and engineering habits help a company move faster and more effectively.",
      highlights: [
        "Supporting engineering operations in a professional team environment.",
        "Learning how internal workflows and systems influence product delivery.",
        "Growing more comfortable with collaborative software development."
      ]
    },
    openai: {
      title: "OpenAI",
      date: "Sept 2025 - Present",
      tags: ["ambassador", "ai", "campus"],
      image: "assets/img/ethics-at-the-beach.png",
      alt: "Ethics at the Beach event",
      p1: "As a ChatGPT Ambassador, I get to help students explore how AI can support the way they learn, create, and ask questions. That means sharing tools in a way that feels practical, thoughtful, and grounded in real student experiences.",
      p2: "I enjoy this role because it blends communication with technology. It is not just about showing what AI can do, but helping people feel confident experimenting with it in a way that is responsible and meaningful.",
      highlights: [
        "Speaking with peers about real student uses for AI tools.",
        "Helping shape conversations around learning, creativity, and responsible use.",
        "Participating in campus events such as Ethics at the Beach."
      ]
    },
    microsoft: {
      title: "Microsoft Emerging Leader",
      date: "Jul 2025 - Sept 2025",
      tags: ["leadership", "security", "growth"],
      image: "assets/img/microsoft-logo.png",
      alt: "Microsoft logo",
      p1: "Microsoft's Emerging Leaders in Cybersecurity program gave me a chance to grow beyond technical skills alone. It focused on confidence, communication, and the ability to tell my story as someone early in her journey.",
      p2: "Being selected into the program reminded me that technical growth and leadership growth go together. The experience pushed me to think more intentionally about how I show up, contribute, and build confidence in professional spaces.",
      highlights: [
        "Selected from a large applicant pool for a leadership-focused student program.",
        "Developed confidence in storytelling, communication, and professional growth.",
        "Explored cybersecurity and leadership through a Microsoft-led initiative."
      ]
    },
    wic: {
      title: "Women In Computing",
      date: "Feb 2025 - May 2025",
      tags: ["community", "web", "outreach"],
      image: "assets/img/wic-logo.png",
      alt: "Women in Computing logo",
      p1: "Working with Women In Computing gave me the chance to support a community-centered organization through web updates and digital communication. It was a reminder that even small web improvements can make a group feel more visible and more welcoming.",
      p2: "This role also helped me think about technology as a way to support people, not just products. Through website work and social media support, I got to contribute to how the organization presented itself and connected with others.",
      highlights: [
        "Updated the organization website to keep information current and accessible.",
        "Supported online visibility through social media and digital presence work.",
        "Contributed to a community that encourages women in tech."
      ]
    },
    codecheck: {
      title: "CodeCheck (CodeDay)",
      date: "Jun 2024 - Nov 2024",
      tags: ["opensource", "backend", "documentation"],
      image: "assets/img/codeday-logo.png",
      alt: "CodeDay logo",
      p1: "At CodeCheck, I worked on an open-source educational platform and got to contribute in ways that felt both technical and practical. That included implementing JDBC and PostgreSQL integration while also writing deployment documentation for AWS.",
      p2: "This experience was important because it pushed me to work across both code and documentation. I learned that useful engineering work is not only about building features, but also about making systems easier for others to understand and maintain.",
      highlights: [
        "Implemented JDBC and PostgreSQL integration work.",
        "Authored AWS deployment documentation to support maintainability.",
        "Contributed to an educational open-source platform under mentorship."
      ]
    },
    oed: {
      title: "Open Energy Dashboard",
      date: "Oct 2023 - Dec 2023",
      tags: ["opensource", "javascript", "testing"],
      image: "assets/img/codeday-logo.png",
      alt: "CodeDay logo",
      p1: "Open Energy Dashboard was one of my earlier technical experiences, and it gave me exposure to collaborative open-source work. I contributed JavaScript refactoring for unit conversions and also helped strengthen the codebase through testing.",
      p2: "Looking back, this role helped me become more comfortable reading existing systems and improving them carefully. It also showed me how testing can support confidence when making changes in a shared codebase.",
      highlights: [
        "Refactored JavaScript to improve unit conversion accuracy.",
        "Added Mocha-based tests to strengthen reliability.",
        "Contributed to a cross-institution platform focused on energy data access."
      ]
    },
    csulb: {
      title: "California State University, Long Beach",
      date: "Aug 2024 - Present",
      tags: ["education", "engineering", "coursework"],
      image: "assets/img/csulongbeach-logo.png",
      alt: "California State University Long Beach logo",
      p1: "My time at CSULB has helped me deepen both my programming knowledge and my engineering mindset. The coursework has strengthened how I think about data structures, logic design, probability, and computer engineering foundations.",
      p2: "What stands out most is how the academic work connects to my hands-on projects. The more I learn in class, the more context I gain for the decisions I make in my personal and professional technical work.",
      highlights: [
        "Pursuing a B.S. in Computer Engineering and Computer Science.",
        "Building stronger fundamentals in systems, software, and problem solving.",
        "Connecting classroom learning with project and internship experience."
      ]
    },
    occ: {
      title: "Orange Coast College",
      date: "Jun 2022 - May 2024",
      tags: ["education", "foundation", "computer science"],
      image: "assets/img/occ-logo.png",
      alt: "Orange Coast College logo",
      p1: "Orange Coast College gave me the academic base that shaped the beginning of my technical journey. It was where I built confidence in programming, mathematics, and the discipline of working through challenging concepts step by step.",
      p2: "That foundation still matters a lot to me. Many of the classes I took there gave me the structure and problem-solving habits that I continue to rely on in my projects and newer opportunities.",
      highlights: [
        "Completed an A.S. in Computer Science.",
        "Studied Java, C++, discrete structures, calculus, and physics.",
        "Built the academic foundation that supported later engineering work."
      ]
    }
  };

  const titleEl = root.querySelector("#experienceStoryTitle");
  const dateEl = root.querySelector("#experienceStoryDate");
  const tagsEl = root.querySelector("#experienceStoryTags");
  const heroEl = root.querySelector("#experienceStoryHero");
  const p1El = root.querySelector("#experienceStoryP1");
  const p2El = root.querySelector("#experienceStoryP2");
  const highlightsEl = root.querySelector("#experienceStoryHighlights");
  const libraryEl = root.querySelector("#experienceLibrary");
  const storyViewEl = root.querySelector("#experienceStoryView");
  const backBtn = root.querySelector("#experienceBackBtn");
  const panelTitle = root.querySelector(".exp-header h2");
  const tabButtons = root.querySelectorAll(".exp-header .tab-btn");
  const tabContents = root.querySelectorAll(".experience-library .tab-content");
  const navItems = root.querySelectorAll(".experience-nav-item");

  if (!titleEl || !dateEl || !tagsEl || !heroEl || !p1El || !p2El || !highlightsEl || !libraryEl || !storyViewEl || !backBtn) {
    return;
  }

  const renderStory = (key) => {
    const story = storyData[key];
    if (!story) return;

    titleEl.textContent = story.title;
    dateEl.textContent = story.date;
    tagsEl.innerHTML = story.tags.map((tag) => `<span class="pexp-tag">${tag}</span>`).join("");
    heroEl.src = story.image;
    heroEl.alt = story.alt;
    p1El.textContent = story.p1;
    p2El.textContent = story.p2;
    highlightsEl.innerHTML = story.highlights.map((item) => `<li>${item}</li>`).join("");
  };

  const setListView = () => {
    libraryEl.hidden = false;
    libraryEl.classList.add("active");
    storyViewEl.hidden = true;
    root.classList.remove("experience-reading");
    if (panelTitle) panelTitle.textContent = "Stories";
  };

  const setStoryView = () => {
    libraryEl.hidden = true;
    libraryEl.classList.remove("active");
    storyViewEl.hidden = false;
    root.classList.add("experience-reading");
    if (panelTitle) panelTitle.textContent = "Story";
    storyViewEl.classList.remove("switch-in");
    void storyViewEl.offsetWidth;
    storyViewEl.classList.add("switch-in");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showTab = (tabName) => {
    if (!tabName) return;
    tabButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.tab === tabName));
    tabContents.forEach((content) => content.classList.toggle("active", content.id === `tab-${tabName}`));
  };

  const setActiveNav = (key) => {
    navItems.forEach((item) => item.classList.toggle("active", item.dataset.exp === key));
  };

  const activateCard = (card, openStory = false) => {
    const container = card.closest(".experience-preview-grid");
    if (!container) return;
    container.querySelectorAll(".experience-card").forEach((item) => item.classList.remove("active"));
    card.classList.add("active");
    const parentTab = card.closest(".tab-content");
    if (parentTab?.id === "tab-education") {
      showTab("education");
    } else {
      showTab("work");
    }
    setActiveNav(card.dataset.exp);
    renderStory(card.dataset.exp);
    if (openStory) setStoryView();
  };

  root.querySelectorAll(".experience-card").forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.remove("select-pop");
      void card.offsetWidth;
      card.classList.add("select-pop");
      activateCard(card, true);
    });
  });

  root.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      setListView();
      const targetContent = root.querySelector(`#tab-${btn.dataset.tab}`);
      const firstCard = targetContent?.querySelector(".experience-card");
      if (firstCard) {
        window.setTimeout(() => activateCard(firstCard), 0);
      }
    });
  });

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      item.classList.remove("select-pop");
      void item.offsetWidth;
      item.classList.add("select-pop");
      showTab(item.dataset.tab);
      const targetCard = root.querySelector(`.experience-card[data-exp="${item.dataset.exp}"]`);
      if (targetCard) {
        activateCard(targetCard, true);
      } else {
        setActiveNav(item.dataset.exp);
        renderStory(item.dataset.exp);
        setStoryView();
      }
    });
  });

  backBtn.addEventListener("click", () => {
    setListView();
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  });

  const activeCard =
    root.querySelector("#tab-work .experience-card") ||
    root.querySelector(".experience-card");

  const storyFromHash = window.location.hash ? window.location.hash.slice(1) : "";
  const hashCard = storyFromHash
    ? root.querySelector(`.experience-card[data-exp="${storyFromHash}"]`)
    : null;

  if (hashCard) {
    activateCard(hashCard, true);
  } else if (activeCard) {
    activateCard(activeCard);
  }
  setListView();
  if (hashCard) {
    setStoryView();
  }
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
  initExperienceStories();
  initSiteAnimations();
  initPageNavigationTransition();
});
