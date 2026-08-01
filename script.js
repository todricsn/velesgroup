(function () {
  'use strict';

  window.VELES_PROJECTS = [
    {
      id: 'vg-01',
      number: '01',
      title: 'Проект ВГ–01',
      category: 'one',
      categoryLabel: 'Одноэтажный дом',
      summary: 'Одноэтажный дом с широкой крытой террасой.',
      description: 'Светлый малоэтажный дом с большой террасой и спокойной горизонтальной архитектурой.',
      image: 'assets/house-01.jpg',
      gallery: ['assets/house-01.jpg', 'assets/house-02.jpg', 'assets/house-07.jpg']
    },
    {
      id: 'vg-02',
      number: '02',
      title: 'Проект ВГ–02',
      category: 'one',
      categoryLabel: 'Одноэтажный дом',
      summary: 'Компактный одноэтажный дом с отдельным входным узлом.',
      description: 'Практичный одноэтажный объём с простой геометрией, двускатной крышей и двумя входами.',
      image: 'assets/house-02.jpg',
      gallery: ['assets/house-02.jpg', 'assets/house-01.jpg', 'assets/house-08.jpg']
    },
    {
      id: 'vg-03',
      number: '03',
      title: 'Проект ВГ–03',
      category: 'two',
      categoryLabel: 'Двухэтажный дом',
      summary: 'Двухэтажный семейный дом с крытым крыльцом.',
      description: 'Лаконичный двухэтажный дом с классической двускатной крышей и защищённой входной зоной.',
      image: 'assets/house-03.jpg',
      gallery: ['assets/house-03.jpg', 'assets/house-04.jpg', 'assets/house-09.jpg']
    },
    {
      id: 'vg-04',
      number: '04',
      title: 'Проект ВГ–04',
      category: 'two',
      categoryLabel: 'Двухэтажный дом',
      summary: 'Двухэтажный дом с угловым обзором фасада.',
      description: 'Увеличенный семейный дом с двумя этажами, регулярной сеткой окон и небольшой крытой верандой.',
      image: 'assets/house-04.jpg',
      gallery: ['assets/house-04.jpg', 'assets/house-03.jpg', 'assets/house-06.jpg']
    },
    {
      id: 'vg-05',
      number: '05',
      title: 'Проект ВГ–05',
      category: 'one',
      categoryLabel: 'Одноэтажный дом',
      summary: 'Дом для круглогодичного проживания с большой верандой.',
      description: 'Одноэтажный дом с высоким фронтоном, панорамным остеклением и глубокой крытой террасой.',
      image: 'assets/house-05.jpg',
      gallery: ['assets/house-05.jpg', 'assets/house-07.jpg', 'assets/house-01.jpg']
    },
    {
      id: 'vg-06',
      number: '06',
      title: 'Проект ВГ–06',
      category: 'two',
      categoryLabel: 'Двухэтажный дом',
      summary: 'Двухэтажный дом с верандами на двух уровнях.',
      description: 'Дом с выразительной двухъярусной галереей, контрастным фасадом и большим количеством естественного света.',
      image: 'assets/house-06.jpg',
      gallery: ['assets/house-06.jpg', 'assets/house-10.jpg', 'assets/house-09.jpg']
    },
    {
      id: 'vg-07',
      number: '07',
      title: 'Проект ВГ–07',
      category: 'one',
      categoryLabel: 'Одноэтажный дом',
      summary: 'Одноэтажный дом с каменно-деревянным фасадом.',
      description: 'Протяжённый одноэтажный дом с двумя крыльцами и сочетанием фактур дерева и камня.',
      image: 'assets/house-07.jpg',
      gallery: ['assets/house-07.jpg', 'assets/house-08.jpg', 'assets/house-05.jpg']
    },
    {
      id: 'vg-08',
      number: '08',
      title: 'Проект ВГ–08',
      category: 'one',
      categoryLabel: 'Одноэтажный дом',
      summary: 'Одноэтажный дом с открытой террасой вдоль фасада.',
      description: 'Дом с вытянутой террасой, высоким навесом и прямой связью жилых помещений с участком.',
      image: 'assets/house-08.jpg',
      gallery: ['assets/house-08.jpg', 'assets/house-07.jpg', 'assets/house-02.jpg']
    },
    {
      id: 'vg-09',
      number: '09',
      title: 'Проект ВГ–09',
      category: 'two',
      categoryLabel: 'Двухэтажный дом',
      summary: 'Светлый двухэтажный дом с защищённой верандой.',
      description: 'Семейный дом с контрастным первым этажом, светлым верхним объёмом и крытой входной террасой.',
      image: 'assets/house-09.jpg',
      gallery: ['assets/house-09.jpg', 'assets/house-03.jpg', 'assets/house-06.jpg']
    },
    {
      id: 'vg-10',
      number: '10',
      title: 'Проект ВГ–10',
      category: 'two',
      categoryLabel: 'Двухэтажный дом',
      summary: 'Двухэтажный дом с открытыми галереями.',
      description: 'Выразительный дом с двумя уровнями открытых пространств и лёгким белым ограждением террас.',
      image: 'assets/house-10.jpg',
      gallery: ['assets/house-10.jpg', 'assets/house-06.jpg', 'assets/house-04.jpg']
    }
  ];

  function showToast(message) {
    const toast = document.querySelector('[data-toast]');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(showToast.timeout);
    showToast.timeout = window.setTimeout(() => toast.classList.remove('is-visible'), 2600);
  }

  async function copyLink(url) {
    try {
      await navigator.clipboard.writeText(url);
      showToast('Ссылка на проект скопирована');
    } catch (error) {
      const field = document.createElement('textarea');
      field.value = url;
      field.setAttribute('readonly', '');
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      document.execCommand('copy');
      field.remove();
      showToast('Ссылка на проект скопирована');
    }
  }

  function initNavigation() {
    const toggle = document.querySelector('[data-nav-toggle]');
    const nav = document.querySelector('[data-mobile-nav]');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
      const open = !nav.classList.contains('is-open');
      nav.classList.toggle('is-open', open);
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    });

    nav.addEventListener('click', (event) => {
      if (!event.target.closest('a')) return;
      nav.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  }

  function initHeader() {
    const header = document.querySelector('[data-site-header]');
    if (!header) return;
    const update = () => header.classList.toggle('is-scrolled', window.scrollY > 16);
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  function initReveal() {
    const elements = Array.from(document.querySelectorAll('[data-reveal]'));
    if (!elements.length) return;

    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach((element) => element.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px' }
    );

    elements.forEach((element) => observer.observe(element));
  }

  window.VelesSite = { showToast, copyLink };

  document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initHeader();
    initReveal();
  });
})();
