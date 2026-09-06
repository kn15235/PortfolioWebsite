const preview = document.querySelector('#preview');
const previewImage = document.querySelector('#preview-image');
const previewTitle = document.querySelector('#preview-title');
const previewDescription = document.querySelector('#preview-description');
const previewKind = document.querySelector('#preview-kind');

document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelectorAll('.project').forEach((project) => {
  project.addEventListener('click', () => {
    const drawing = project.querySelector('img');
    previewImage.src = drawing.getAttribute('src');
    previewTitle.textContent = project.dataset.title;
    previewDescription.textContent = project.dataset.description;
    previewKind.textContent = 'Project preview';
    preview.showModal();
  });
});

document.querySelector('[data-about]').addEventListener('click', () => {
  previewImage.src = 'assets/img/girl.svg';
  previewKind.textContent = 'A little introduction';
  previewTitle.textContent = "Hi, I'm Kristine.";
  // Replace this with your own bio.
  previewDescription.textContent = 'Welcome! This is a collection of my projects, ideas, and things I enjoy making. Still in progress haha';
  preview.showModal();
});

preview.querySelector('.close').addEventListener('click', () => preview.close());
preview.addEventListener('click', (event) => {
  const bounds = preview.getBoundingClientRect();
  if (event.target === preview && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) {
    preview.close();
  }
});
