# Kristine's portfolio

A simple portfolio built with HTML, CSS, and JavaScript. No build step or dependencies.

## Preview

Open index.html in a browser, or use Live Server in VS Code.

## Customize

- Content: Edit index.html for the introduction, name, email links, and projects. Each project has data-title and data-description attributes for its preview. Project content is currently placeholder text.
- Drawings: Add your images to assets/img/ and replace the img src paths in index.html. Transparent PNG, WebP, or SVG images work well. Update the alt text too. The current illustrations use the transparent *-crayon.png assets, generated with a wax-crayon texture. The original SVG placeholders remain available.
- About: Edit the biography and illustration path in assets/js/main.js.
- Appearance: Edit assets/css/style.css. Colors are at the top; .page sets the content width and .work sets the grid.
- Interactions: assets/js/main.js opens project and About previews. Close them with Escape, the close button, or a click outside.

The grid uses three columns on desktop and two on mobile. Titles appear on hover, keyboard focus, and touch devices. Animations respect reduced-motion preferences.

Keep CNAME to preserve your custom domain configuration.
