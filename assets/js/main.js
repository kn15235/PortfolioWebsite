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

function addProjectPicker(isBlog = false) {
  const posts = [...previewEntries.querySelectorAll('.project-post')];
  if (!posts.length) return;

  const picker = document.createElement('div');
  picker.className = 'project-picker';
  const label = document.createElement('label');
  label.htmlFor = 'project-select';
  label.textContent = isBlog ? 'Choose a blog post' : 'Choose a project';
  const select = document.createElement('select');
  select.id = 'project-select';
  select.setAttribute('aria-controls', 'preview-entries');

  posts.forEach((post, index) => {
    const option = document.createElement('option');
    option.value = String(index);
    option.textContent = post.querySelector('h3').textContent.trim();
    select.append(option);
    post.hidden = index !== 0;
  });

  select.addEventListener('change', () => {
    posts.forEach((post, index) => {
      post.hidden = index !== Number(select.value);
    });
    preview.querySelector('.preview-content').scrollTop = 0;
  });

  picker.append(label, select);
  previewEntries.prepend(picker);
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
    if (project.dataset.content === 'projects') addProjectPicker();
    if (project.dataset.content === 'blog') addProjectPicker(true);
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
  //replace w/  own bio.
  previewDescription.textContent = 'Welcome! This is a collection of my projects, ideas, and things I enjoy making.';
  openPreview();
});

preview.querySelector('.close').addEventListener('click', () => preview.close());
preview.addEventListener('click', (event) => {
  const bounds = preview.getBoundingClientRect();
  if (event.target === preview && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) {
    preview.close();
  }
});
