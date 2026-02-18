// Page Navigation
function initNavTabs() {
  const tabs = document.querySelectorAll(".nav-link");
  const pages = document.querySelectorAll(".page");

  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      const target = tab.dataset.page;
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      pages.forEach((p) => p.classList.remove("active"));
      document.getElementById("page-" + target)?.classList.add("active");
      window.location.hash = target;
    });
  });

  const hash = window.location.hash.replace("#", "") || "home";
  const matchTab = document.querySelector(`.nav-link[data-page="${hash}"]`);
  (matchTab || document.querySelector('.nav-link[data-page="home"]'))?.click();
}

//Work / Education Tabs 
function initExpTabs() {
  document.querySelectorAll(".panel-exp").forEach((panel) => {
    const buttons = panel.querySelectorAll(".tab-btn");
    const contents = panel.querySelectorAll(".tab-content");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.tab; // "work" or "education"

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

document.addEventListener("DOMContentLoaded", () => {
  initNavTabs();
  initExpTabs();
  initThemeToggle();


});

