(function () {
  'use strict';

  const PROJECT_IMAGES = Array.from({ length: 10 }, (_, index) =>
    `assets/house-${String(index + 1).padStart(2, '0')}.jpg`
  );

  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function setAtomHTML(recordId, elementId, html) {
    const atom = qs(`#${recordId} .tn-elem[data-elem-id="${elementId}"] .tn-atom`);
    if (atom && atom.dataset.velesText !== html) {
      atom.innerHTML = html;
      atom.dataset.velesText = html;
    }
  }

  function replaceVisibleText(pattern, replacement) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];

    while (walker.nextNode()) {
      const node = walker.currentNode;
      const parent = node.parentElement;
      if (!parent || parent.closest('script, style, noscript, template')) continue;
      if (pattern.test(node.nodeValue)) nodes.push(node);
      pattern.lastIndex = 0;
    }

    nodes.forEach((node) => {
      pattern.lastIndex = 0;
      node.nodeValue = node.nodeValue.replace(pattern, replacement);
    });
  }

  function replaceExactText(oldText, newText) {
    const selectors = [
      '.tn-atom',
      '.t-title',
      '.t-heading',
      '.t-name',
      '.t-descr',
      '.t-text',
      '.t-btn',
      '.t-submit',
      '[field="title"]',
      '[field="text"]',
      '[field="descr"]'
    ].join(',');

    qsa(selectors).forEach((element) => {
      if (element.children.length > 0 && !element.classList.contains('tn-atom')) return;
      if (element.textContent.replace(/\s+/g, ' ').trim() === oldText) {
        element.textContent = newText;
      }
    });
  }

  function setBackground(element, source) {
    if (!element) return;
    element.dataset.original = source;
    element.style.backgroundImage = `url("${source}")`;
    element.style.backgroundSize = 'cover';
    element.style.backgroundPosition = 'center center';
    element.classList.add('loaded');
  }

  function setImage(image, source, alt = 'Проект дома Велес Групп') {
    if (!image) return;
    image.src = source;
    image.dataset.original = source;
    image.removeAttribute('srcset');
    image.alt = alt;
  }

  function installBranding() {
    document.title = 'Велес Групп — малоэтажные дома под ключ';

    const description = qs('meta[name="description"]');
    if (description) {
      description.content =
        'Велес Групп строит малоэтажные дома под ключ: от геологии участка и проектирования до отделки и благоустройства.';
    }

    qsa('meta[property="og:title"]').forEach((meta) => {
      meta.content = 'Велес Групп — малоэтажные дома под ключ';
    });
    qsa('meta[property="og:description"]').forEach((meta) => {
      meta.content = description ? description.content : '';
    });
    qsa('meta[property="og:image"]').forEach((meta) => {
      meta.content = 'assets/house-09.jpg';
    });

    qsa('link[rel="canonical"]').forEach((link) => {
      link.href = 'https://todricsn.github.io/velesgroup/';
    });
    qsa('meta[property="og:url"]').forEach((meta) => {
      meta.content = 'https://todricsn.github.io/velesgroup/';
    });

    const logoSelectors = [
      '#rec737865899 .t446__imglogo',
      '#rec737865418 .t450__logo img',
      '#rec737865418 .t450__logo__img',
      '#rec737865458 .t464__logo'
    ].join(',');

    qsa(logoSelectors).forEach((image) => setImage(image, 'assets/veles-logo.png', 'Велес Групп'));

    if (!qs('#rec737865419 .veles-preloader-logo')) {
      const preloader = qs('#rec737865419 .t396__artboard');
      if (preloader) {
        const wrapper = document.createElement('div');
        wrapper.className = 'veles-preloader-logo';
        wrapper.innerHTML = '<img src="assets/veles-logo.png" alt="Велес Групп">';
        preloader.appendChild(wrapper);
      }
    }

    if (!qs('.veles-mobile-brand')) {
      const mobileHeader = qs('#rec737865418');
      if (mobileHeader) {
        const mobileBrand = document.createElement('a');
        mobileBrand.className = 'veles-mobile-brand';
        mobileBrand.href = 'index.html';
        mobileBrand.setAttribute('aria-label', 'Велес Групп — на главную');
        mobileBrand.innerHTML = '<img src="assets/veles-logo.png" alt="Велес Групп">';
        mobileHeader.appendChild(mobileBrand);
      }
    }

    qsa('.t-sociallinks__wrapper').forEach((list) => {
      Array.from(list.childNodes).forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) node.remove();
      });
    });
  }

  function adaptHero() {
    setAtomHTML(
      'rec843022128',
      '1734688090232',
      'Малоэтажные дома<br><span class="veles-hero-accent">под ключ</span>'
    );
    setAtomHTML(
      'rec843022128',
      '1734699850441',
      'Мы берём на себя всё: от геологии участка и проектирования до финишной отделки и благоустройства территории'
    );
    setAtomHTML('rec843022128', '1657823210914', 'ЗАПРОСИТЬ КОНСУЛЬТАЦИЮ');
    setAtomHTML('rec843022128', '1734687375840', 'БЕСПЛАТНАЯ АРХИТЕКТУРНАЯ КОНСУЛЬТАЦИЯ');
    setAtomHTML('rec843022128', '1734688710331', 'Гарантия до 10 лет · ответим за 24 часа');
    setAtomHTML('rec843022128', '1734699727744', 'Проекты домов');
    setAtomHTML('rec843022128', '1734699727761', 'Строительство под ключ');
    setAtomHTML('rec843022128', '1734699727770', 'Реализованные проекты');

    qsa('#rec843022128 .t-submit, #rec843022128 button').forEach((button) => {
      if (button.textContent.trim()) button.textContent = 'ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ';
    });

    setBackground(qs('#rec843022128 .t396__carrier'), 'assets/house-09.jpg');
  }

  function adaptTexts() {
    setAtomHTML('rec739097020', '1713872106742', 'Одноэтажные дома');

    const brandCoverTitle = qs('#rec744061520 [field="title"]');
    if (brandCoverTitle) {
      brandCoverTitle.innerHTML =
        '<div style="font-size:46px" data-customstyle="yes"><strong>ВЕЛЕС ГРУПП — КАЧЕСТВО, КОТОРОЕ МОЖНО ПРОВЕРИТЬ.</strong><br><strong>СТРОИМ ПО СТАНДАРТАМ.</strong></div>';
    }
    const brandCoverButton = qs('#rec744061520 .t-btnflex__text');
    if (brandCoverButton) brandCoverButton.textContent = 'ЗАПРОСИТЬ КОНСУЛЬТАЦИЮ';

    const exactReplacements = [
      ['КАТАЛОГ МОДЕЛЕЙ', 'КАТАЛОГ ПРОЕКТОВ'],
      ['Модульные дома от 1 800 000₽', 'Одноэтажные дома'],
      ['Модульные бани от 1 210 000₽', 'Двухэтажные дома'],
      ['Решения для бизнеса от 2 000 000₽', 'Индивидуальные проекты'],
      ['ПЕРЕЙТИ В РАЗДЕЛ', 'СМОТРЕТЬ ПРОЕКТЫ'],
      ['Перейти в раздел', 'Смотреть проекты'],
      ['ЗАПИСАТЬСЯ НА ВСТРЕЧУ', 'ЗАПРОСИТЬ КОНСУЛЬТАЦИЮ'],
      ['Записаться на встречу', 'Запросить консультацию'],
      ['О КОМПАНИИ', 'О ВЕЛЕС ГРУПП'],
      ['ПРЕИМУЩЕСТВА', 'ПОЧЕМУ НАМ ДОВЕРЯЮТ'],
      ['МОБИЛЬНОСТЬ', 'ПРОЗРАЧНАЯ ЦЕНА БЕЗ СЮРПРИЗОВ'],
      ['ГОТОВОЕ РЕШЕНИЕ', 'СЖАТЫЕ СРОКИ'],
      ['ДЛЯ СИБИРСКОЙ ЗИМЫ', 'ГАРАНТИЯ КАЧЕСТВА ДО 10 ЛЕТ'],
      ['ГАРАНТИЯ 5 ЛЕТ!', 'ЭНЕРГОЭФФЕКТИВНОСТЬ'],
      ['Создай свой уникальный дом вместе с нами', 'Реализованные проекты Велес Групп'],
      ['СДАННЫЕ ОБЪЕКТЫ', 'ПОСТРОЕННЫЕ ДОМА'],
      ['Работаем с НДС', 'Гарантия до 10 лет'],
      ['Отзывы клиентов!', 'Отзывы клиентов'],
      ['Получить каталог', 'Смотреть каталог'],
      ['ЗАПРОСИТЬ НОВЫЙ КАТАЛОГ', 'ЗАПРОСИТЬ КОНСУЛЬТАЦИЮ'],
      ['Обзор модульного дом GEO CHALLE - 65 м2 жилой площади', 'Обзор построенного дома — 65 м² жилой площади'],
      ['Обзор модульного дом модель L 39 + тамбур.', 'Обзор строительства и внутренней отделки'],
      ['Обзор модульной бани - модель ПАР 30', 'Обзор одноэтажного дома с террасой'],
      ['Обзор модульного дома L HOUSE 42', 'Обзор двухэтажного дома']
    ];

    exactReplacements.forEach(([oldText, newText]) => replaceExactText(oldText, newText));

    const benefitDescriptions = [
      'Мы фиксируем стоимость в договоре, и она не меняется в процессе стройки. Никаких неожиданных доплат — всё просчитываем на берегу.',
      'Благодаря отлаженной логистике и собственной бригаде строим дом за 4–8 месяцев, соблюдая календарный график.',
      'Даём письменную гарантию на конструктивные элементы дома. Если что-то пойдёт не так — это наша проблема, а не ваша.',
      'Строим тёплые дома из проверенных материалов, чтобы вы экономили на отоплении зимой и кондиционировании летом.'
    ];
    qsa('#rec739497362 .t905__descr').forEach((element, index) => {
      if (benefitDescriptions[index]) element.textContent = benefitDescriptions[index];
    });

    const companyLead = qs('#rec739080578 .tn-elem .tn-atom');
    const companyTextBlocks = qsa('#rec739080578 .tn-atom').filter((element) =>
      element.textContent.includes('География HOUSE') || element.textContent.includes('Компания была создана')
    );
    if (companyTextBlocks[0]) {
      companyTextBlocks[0].textContent =
        'Велес Групп — качество, которое можно проверить. Открытые объекты и контакты клиентов для вашего контроля. Строим по стандартам.';
    } else if (companyLead) {
      companyLead.textContent =
        'Велес Групп — качество, которое можно проверить. Открытые объекты и контакты клиентов для вашего контроля. Строим по стандартам.';
    }
    if (companyTextBlocks[1]) {
      companyTextBlocks[1].textContent =
        'Берём на себя весь цикл работ: геологию участка, проектирование, строительство, инженерные сети, финишную отделку и благоустройство территории.';
    }

    const companyCycle = qsa('#rec739080578 .tn-atom').find((element) =>
      element.textContent.includes('Мы являемся компанией полного цикла')
    );
    if (companyCycle) {
      companyCycle.textContent =
        'Строим круглый год, применяя зимние технологии без потери качества. Каркасные дома, газобетон и брусовое строительство — подбираем технологию под задачу и участок.';
    }

    const fullCycle = qsa('#rec747380957 .tn-atom').find((element) =>
      element.textContent.includes('компанией полного цикла')
    );
    if (fullCycle) {
      fullCycle.textContent =
        'Мы строим малоэтажные дома под ключ и отвечаем за весь результат — от первого выезда на участок до готового дома и благоустроенной территории.';
    }

    replaceVisibleText(/ГЕОГРАФИЯ\s*HOUSE/gi, 'ВЕЛЕС ГРУПП');
    replaceVisibleText(/ГЕОГРАФИЯ\s*house/gi, 'ВЕЛЕС ГРУПП');
    replaceVisibleText(/География\s*HOUSE/g, 'Велес Групп');
    replaceVisibleText(/География\s*House/g, 'Велес Групп');
    replaceVisibleText(/ООО\s*«ГЕОГРАФИЯ ХАУС»/g, 'ВЕЛЕС ГРУПП');
    replaceVisibleText(/�/g, '');

    const footerText = qs('#rec737865458 .t464__text');
    if (footerText) {
      footerText.innerHTML =
        '<div style="font-size:16px">ВЕЛЕС ГРУПП<br><br>Малоэтажные дома под ключ<br>Красноярск</div>';
    }
  }

  function adaptLinks() {
    qsa('a').forEach((link) => {
      const label = link.textContent.replace(/\s+/g, ' ').trim().toLowerCase();
      if (link.getAttribute('href') === '/') link.href = 'index.html';
      if (label === 'каталог' || label === 'смотреть каталог' || label === 'смотреть проекты') {
        link.href = 'catalog.html';
      }
      if (label === 'проекты') link.href = 'catalog.html';
    });

    qsa('#rec843022128 a[href="#rec739097020"]').forEach((link) => {
      link.href = 'catalog.html';
    });

    qsa('#rec739097020 a').forEach((link) => {
      link.href = 'catalog.html';
    });
  }

  function adaptImages() {
    const hero = qs('#rec843022128 .t396__carrier');
    setBackground(hero, 'assets/house-09.jpg');

    qsa('#rec739097020 .t-bgimg').slice(0, 3).forEach((element, index) => {
      setBackground(element, [PROJECT_IMAGES[0], PROJECT_IMAGES[2], PROJECT_IMAGES[8]][index]);
    });

    qsa('#rec739497362 .t905__image').forEach((element, index) => {
      setBackground(element, [PROJECT_IMAGES[1], PROJECT_IMAGES[5], PROJECT_IMAGES[4], PROJECT_IMAGES[7]][index % 4]);
    });

    qsa('#rec737865449 .t603__blockimg').forEach((element, index) => {
      setBackground(element, PROJECT_IMAGES[index % PROJECT_IMAGES.length]);
    });

    qsa('#rec737865455 .t994__bgimg').forEach((element, index) => {
      setBackground(element, PROJECT_IMAGES[index % PROJECT_IMAGES.length]);
      const item = element.closest('.t-slds__item, .t994__item');
      if (item) item.dataset.projectUrl = `project.html?project=${(index % PROJECT_IMAGES.length) + 1}`;
    });

    const processImage = qs('#rec745199205 .t500__img');
    setImage(processImage, PROJECT_IMAGES[5]);

    const mortgageImage = qsa('#rec745200818 img').find((image) => image.getBoundingClientRect().width > 300);
    setImage(mortgageImage, PROJECT_IMAGES[8]);

    setBackground(qs('#rec795784078 .t396__carrier'), PROJECT_IMAGES[4]);
  }

  function installProjectClicks() {
    const slider = qs('#rec737865455');
    if (!slider || slider.dataset.velesClicks === 'true') return;
    slider.dataset.velesClicks = 'true';
    slider.addEventListener('click', (event) => {
      const item = event.target.closest('[data-project-url]');
      if (!item || event.target.closest('button')) return;
      window.location.href = item.dataset.projectUrl;
    });
  }

  function runAdaptation() {
    installBranding();
    adaptHero();
    adaptTexts();
    adaptLinks();
    adaptImages();
    installProjectClicks();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAdaptation, { once: true });
  } else {
    runAdaptation();
  }

  window.addEventListener('load', () => {
    runAdaptation();
    window.setTimeout(runAdaptation, 900);
  });
})();
