(function () {
  'use strict';

  function projectUrl(project) {
    return `project.html?project=${encodeURIComponent(project.id)}`;
  }

  function absoluteProjectUrl(project) {
    return new URL(projectUrl(project), window.location.href).href;
  }

  function cardTemplate(project) {
    return `
      <article class="project-card" data-category="${project.category}" data-reveal>
        <a class="project-card__link" href="${projectUrl(project)}" aria-label="Открыть ${project.title}">
          <div class="project-card__image-wrap">
            <img class="project-card__image" src="${project.image}" alt="${project.title}: ${project.summary}" loading="lazy">
            <span class="project-card__number">${project.number}</span>
            <span class="project-card__open" aria-hidden="true">↗</span>
          </div>
          <div class="project-card__content">
            <p>${project.categoryLabel}</p>
            <h3>${project.title}</h3>
            <span>${project.summary}</span>
            <strong>Открыть проект</strong>
          </div>
        </a>
        <button class="project-card__share" type="button" data-share-project="${project.id}" aria-label="Скопировать ссылку на ${project.title}">
          Скопировать ссылку
        </button>
      </article>
    `;
  }

  function initCatalog() {
    const grid = document.querySelector('[data-project-grid]');
    const count = document.querySelector('[data-catalog-count]');
    const filters = Array.from(document.querySelectorAll('[data-filter]'));
    const projects = window.VELES_PROJECTS || [];
    if (!grid) return;

    grid.innerHTML = projects.map(cardTemplate).join('');

    const cards = Array.from(grid.querySelectorAll('.project-card'));
    const updateCount = () => {
      const visible = cards.filter((card) => !card.hidden).length;
      if (count) count.textContent = `Проектов: ${visible}`;
    };

    filters.forEach((button) => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        filters.forEach((item) => item.classList.toggle('is-active', item === button));
        cards.forEach((card) => {
          card.hidden = filter !== 'all' && card.dataset.category !== filter;
        });
        updateCount();
      });
    });

    grid.addEventListener('click', (event) => {
      const button = event.target.closest('[data-share-project]');
      if (!button) return;
      const project = projects.find((item) => item.id === button.dataset.shareProject);
      if (project) window.VelesSite.copyLink(absoluteProjectUrl(project));
    });

    updateCount();

    requestAnimationFrame(() => {
      cards.forEach((card, index) => {
        card.style.setProperty('--reveal-delay', `${Math.min(index, 5) * 70}ms`);
        card.classList.add('is-revealed');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', initCatalog);
})();
