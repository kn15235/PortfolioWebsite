# Kristine's portfolio

A simple portfolio built with HTML, CSS, and JavaScript. No build step or dependencies.

## Preview

Open index.html in a browser, or use Live Server in VS Code.

## Customize

- Content: Edit index.html for the introduction, name, email links, and topic labels. Each box's data-content attribute points to a template with the same id near the bottom of the file. Replace the placeholder titles, dates, locations, and descriptions with your experiences. Copy an entire article inside that template to add another experience; remove an article to delete an entry. Rename a box's project-label to update both its visible label and window title.
- Drawings: Add your images to assets/img/ and replace the img src paths in index.html. Transparent PNG, WebP, or SVG images work well. Update the alt text too.
- About: Edit the biography and illustration path in assets/js/main.js.
- Appearance: Edit assets/css/style.css. Colors are at the top; .page sets the content width and .work sets the grid.
- Interactions: assets/js/main.js opens experience and About windows. Close them with Escape, the close button, or a click outside. Long experience lists scroll inside the window, keeping the close button available.

The grid uses three columns on desktop and two on mobile. Topic labels are always visible. Animations respect reduced-motion preferences.

Keep CNAME to preserve your custom domain configuration.

## Window content

All entries live in the `<template>` sections near the bottom of `index.html`. Edit the HTML directly; the website does not include a publishing editor or image uploader. The provided names, dates, logos, photos, technologies, and example.com links are placeholders.

| Template ID | Content |
| --- | --- |
| `work-experience` | Roles with company logos, descriptions, technology tags, photos, and links |
| `leadership` | Organization logos, roles, technology tags, event galleries, and event links |
| `education` | School logos, programs, dates, technology tags, photos, and links |
| `projects` | Blog-style posts with headings, paragraphs, lists, images, tags, and demo/source links |
| `tech-stacks` | Languages, Libraries & Frameworks, Developer Tools, and AI / ML; each icon has its name underneath |
| `interests` | Areas you want to explore or contribute to, including open source and AI / ML |

To add another role or post, copy its entire `<article>...</article>` inside the same template. For technology groups, copy a `stack-section`; for another technology, copy a `<li>` inside its `stack-grid`.

### Logos and photos

Put files in `assets/img/`. Change an `organization-logo` image's `src` to your company or school logo. Logos use an empty `alt` because the organization name is already beside them. For photos, use a descriptive `alt` and update the caption:

```html
<figure class="entry-media">
  <img src="assets/img/my-event.jpg" alt="Our team presenting at the workshop" width="800" height="480" loading="lazy">
  <figcaption>A short story about the event.</figcaption>
</figure>
```

Set width and height to your photo's actual dimensions; CSS scales it to fit. Place multiple figures in `<div class="media-gallery">` for a gallery. Photos, tags, and links can be used in any entry, including hobbies, cooking, and food reviews.

### Links and tags

Replace example.com with your destination and change the visible link text. These links open in a new tab so visitors keep their place in the window; remove `target="_blank"` to navigate in the current tab.

```html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">View the event</a>
<ul class="tech-tags" aria-label="Technologies">
  <li>Python</li>
  <li>PyTorch</li>
</ul>
```

To make an image a link, wrap its `<img>` in an `<a href="...">`. Keep meaningful alt text so the image link has an accessible name.

### Technology icons

Inside a `stack-grid`, replace both the icon path and its caption:

```html
<li>
  <img src="assets/img/python.svg" alt="" width="48" height="48" loading="lazy">
  <span>Python</span>
</li>
```

The file paths in these documentation examples are illustrative; add your own files before using them.
