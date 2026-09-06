const preview = document.querySelector('#preview');
const previewImage = document.querySelector('#preview-image');
const previewTitle = document.querySelector('#preview-title');
const previewDescription = document.querySelector('#preview-description');
const previewKind = document.querySelector('#preview-kind');
const previewEntries = document.querySelector('#preview-entries');

function openPreview() {
  preview.showModal();
  preview.querySelector('.preview-content').scrollTop = 0;
}

document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelectorAll('.project').forEach((project) => {
  project.addEventListener('click', () => {
    const drawing = project.querySelector('img');
    previewImage.src = drawing.getAttribute('src');
    previewTitle.textContent = project.querySelector('.project-label').textContent;
    previewDescription.hidden = true;
    const content = document.getElementById(project.dataset.content);
    previewEntries.replaceChildren(content.content.cloneNode(true));
    previewKind.textContent = content.dataset.kind || 'A little collection';
    openPreview();
  });
});

document.querySelector('[data-about]').addEventListener('click', () => {
  previewImage.src = 'assets/img/girl.svg';
  previewKind.textContent = 'A little introduction';
  previewTitle.textContent = "Hi, I'm Kristine.";
  previewEntries.replaceChildren();
  previewDescription.hidden = false;
  // Replace this with your own bio.
  previewDescription.textContent = 'Welcome! This is a collection of my projects, ideas, and things I enjoy making. Still in progress haha';
  openPreview();
});

preview.querySelector('.close').addEventListener('click', () => preview.close());
preview.addEventListener('click', (event) => {
  const bounds = preview.getBoundingClientRect();
  if (event.target === preview && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) {
    preview.close();
  }
});
