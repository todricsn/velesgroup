(function () {
  'use strict';

  function setText(selector, value) {
    const element = document.querySelector(selector);
    if (element) element.textContent = value;
  }

  function initProject() {
    const projects = window.VELES_PROJECTS || [];
    if (!projects.length) return;

    const requestedId = new URLSearchParams(window.location.search).get('project');
    const projectIndex = Math.max(0, projects.findIndex((item) => item.id === requestedId));
    const project = projects[projectIndex];
    const nextProject = projects[(projectIndex + 1) % projects.length];

    document.title = `${project.title} — Велес Групп`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.content = `${project.title}. ${project.summary} Велес Групп.`;

    setText('[data-project-category]', project.categoryLabel);
    setText('[data-project-title]', project.title);
    setText('[data-project-summary]', project.summary);
    setText('[data-project-description]', project.description);
    setText('[data-project-heading]', `${project.categoryLabel}: адаптируем под ваш участок`);

    const heroImage = document.querySelector('[data-project-image]');
    if (heroImage) {
      heroImage.src = project.image;
      heroImage.alt = `${project.title}: ${project.summary}`;
    }

    const gallery = document.querySelector('[data-project-gallery]');
    if (gallery) {
      gallery.innerHTML = project.gallery
        .map(
          (image, index) => `
            <figure class="project-gallery__item ${index === 0 ? 'project-gallery__item--wide' : ''}" data-reveal>
              <img src="${image}" alt="${project.title}, ракурс ${index + 1}" loading="lazy">
            </figure>
          `
        )
        .join('');
      requestAnimationFrame(() => {
        gallery.querySelectorAll('[data-reveal]').forEach((item, index) => {
          item.style.setProperty('--reveal-delay', `${index * 90}ms`);
          item.classList.add('is-revealed');
        });
      });
    }

    const nextLink = document.querySelector('[data-next-project]');
    if (nextLink) {
      nextLink.href = `project.html?project=${encodeURIComponent(nextProject.id)}`;
      nextLink.textContent = `${nextProject.title} →`;
    }

    const shareButton = document.querySelector('[data-share-current]');
    if (shareButton) {
      shareButton.addEventListener('click', () => window.VelesSite.copyLink(window.location.href));
    }
  }

  document.addEventListener('DOMContentLoaded', initProject);
})();
