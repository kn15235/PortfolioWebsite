const root = document.documentElement;
const btn = document.getElementById("themeBtn");

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  btn.textContent = theme === "dark" ? "☾" : "☀︎";
}

const saved = localStorage.getItem("theme");
const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;

setTheme(saved || (prefersDark ? "dark" : "light"));

btn.addEventListener("click", () => {
  const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  setTheme(current === "dark" ? "light" : "dark");
});
