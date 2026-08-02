(function () {
  'use strict';

  const PROJECT_IMAGES = Array.from({ length: 10 }, (_, index) =>
    `assets/house-${String(index + 1).padStart(2, '0')}.jpg`
  );

  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function homeTarget() {
    const pageName = window.location.pathname.split('/').pop();
    return !pageName || pageName === 'index.html' ? '#rec843022128' : 'index.html';
  }

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
    const homeHref = homeTarget();
    document.title = 'Велес Групп — модульные дома под ключ';

    const description = qs('meta[name="description"]');
    if (description) {
      description.content =
        'Велес Групп строит модульные дома под ключ: от геологии участка и проектирования до отделки и благоустройства.';
    }

    qsa('meta[property="og:title"]').forEach((meta) => {
      meta.content = 'Велес Групп — модульные дома под ключ';
    });
    qsa('meta[property="og:description"]').forEach((meta) => {
      meta.content = description ? description.content : '';
    });
    qsa('meta[property="og:image"]').forEach((meta) => {
      meta.content = 'assets/hero-light-forest.png';
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
      '#rec737865418 .t450__logoimg',
      '#rec737865458 .t464__logo'
    ].join(',');

    qsa(logoSelectors).forEach((image) => {
      setImage(image, 'assets/veles-logo.png', 'Велес Групп');

      const currentLink = image.closest('a');
      if (currentLink) {
        currentLink.href = homeHref;
        currentLink.classList.add('veles-logo-home');
        currentLink.setAttribute('aria-label', 'Велес Групп — на главную');
        return;
      }

      const homeLink = document.createElement('a');
      homeLink.className = 'veles-logo-home';
      homeLink.href = homeHref;
      homeLink.setAttribute('aria-label', 'Велес Групп — на главную');
      image.parentNode.insertBefore(homeLink, image);
      homeLink.appendChild(image);
    });

    if (!qs('#rec737865419 .veles-preloader-logo')) {
      const preloader = qs('#rec737865419 .t396__artboard');
      if (preloader) {
        const wrapper = document.createElement('div');
        wrapper.className = 'veles-preloader-logo';
        preloader.appendChild(wrapper);

        fetch('assets/veles-preloader-logo.svg?v=20260802-2', { cache: 'reload' })
          .then((response) => {
            if (!response.ok) throw new Error('Не удалось загрузить логотип прелоадера');
            return response.text();
          })
          .then((svg) => {
            if (wrapper.isConnected) wrapper.innerHTML = svg;
          })
          .catch(() => {
            wrapper.innerHTML = '<img src="assets/veles-logo.png" alt="Велес Групп">';
          });
      }
    }

    if (!qs('.veles-mobile-brand')) {
      const mobileHeader = qs('#rec737865418');
      if (mobileHeader) {
        const mobileBrand = document.createElement('a');
        mobileBrand.className = 'veles-mobile-brand';
        mobileBrand.href = homeHref;
        mobileBrand.setAttribute('aria-label', 'Велес Групп — на главную');
        mobileBrand.innerHTML = '<img src="assets/veles-logo.png" alt="Велес Групп">';
        mobileHeader.appendChild(mobileBrand);
      }
    }

    const mobileBrand = qs('.veles-mobile-brand');
    if (mobileBrand) mobileBrand.href = homeHref;

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
      'Модульные дома<br><span class="veles-hero-accent">под ключ</span>'
    );
    setAtomHTML(
      'rec843022128',
      '1734699850441',
      'Мы берём на себя всё: от геологии участка и проектирования до финишной отделки и благоустройства территории'
    );
    setAtomHTML('rec843022128', '1657823210914', 'ЗАПРОСИТЬ КОНСУЛЬТАЦИЮ');
    setAtomHTML('rec843022128', '1734687375840', 'БЕСПЛАТНАЯ АРХИТЕКТУРНАЯ КОНСУЛЬТАЦИЯ');
    setAtomHTML('rec843022128', '1734688710331', '');
    setAtomHTML('rec843022128', '1734699727744', 'Проекты домов');
    setAtomHTML('rec843022128', '1734699727761', 'Строительство под ключ');
    setAtomHTML('rec843022128', '1734699727770', 'Реализованные проекты');

    setImage(
      qs('#rec843022128 .tn-elem[data-elem-id="1734699727749"] img'),
      'assets/projects-icon.png',
      'Проекты домов'
    );
    setImage(
      qs('#rec843022128 .tn-elem[data-elem-id="1734699727764"] img'),
      'assets/turnkey-icon.png',
      'Строительство дома под ключ'
    );
    setImage(
      qs('#rec843022128 .tn-elem[data-elem-id="1734699727772"] img'),
      'assets/completed-icon.png',
      'Реализованные проекты домов'
    );

    qsa('#rec843022128 .t-submit, #rec843022128 button').forEach((button) => {
      if (button.textContent.trim()) button.textContent = 'ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ';
    });

    setBackground(qs('#rec843022128 .t396__carrier'), 'assets/hero-light-forest.png');
  }

  function removeHeroPoints() {
    qsa('#rec843022128 .veles-hero-points').forEach((points) => points.remove());
  }

  function installHeroForm() {
    const formElem = qs(
      '#rec843022128 .tn-elem[data-elem-id="1734687168225"]'
    );
    const formAtom = formElem && qs(':scope > .tn-atom', formElem);
    if (!formElem || !formAtom) return;

    const removeLegacyFormMarkup = () => {
      qsa('.tn-atom__inputs-wrapp, .t-form', formElem)
        .forEach((node) => node.remove());
    };

    removeLegacyFormMarkup();
    window.setTimeout(removeLegacyFormMarkup, 250);
    window.setTimeout(removeLegacyFormMarkup, 1000);
    if (formElem.dataset.velesFormCleanup !== 'true') {
      const observer = new MutationObserver(removeLegacyFormMarkup);
      observer.observe(formElem, { childList: true, subtree: true });
      formElem.dataset.velesFormCleanup = 'true';
    }

    if (qs('.veles-consultation-form', formAtom)) return;

    formAtom.innerHTML = `
      <form class="veles-consultation-form" novalidate>
        <label class="veles-form-field">
          <span>Имя</span>
          <input type="text" name="name" placeholder="Ваше имя" autocomplete="name" required>
        </label>
        <label class="veles-form-field">
          <span>Телефон</span>
          <input type="tel" name="phone" placeholder="+7 (___) ___-__-__" autocomplete="tel" required>
        </label>
        <label class="veles-form-field veles-form-field--comment">
          <span>Комментарий</span>
          <textarea name="comment" placeholder="Расскажите, какой дом планируете"></textarea>
        </label>
        <button type="submit">ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ</button>
        <p class="veles-form-status" aria-live="polite"></p>
      </form>`;

    const form = qs('.veles-consultation-form', formAtom);
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = qs('input[name="name"]', form);
      const phone = qs('input[name="phone"]', form);
      if (!name.value.trim() || !phone.value.trim()) {
        form.classList.add('is-invalid');
        qs('.veles-form-status', form).textContent = 'Заполните имя и телефон';
        return;
      }
      form.classList.remove('is-invalid');
      form.classList.add('is-sent');
      qs('.veles-form-status', form).textContent =
        'Заявка готова. Подключим отправку при переносе на WordPress.';
    });
  }

  function positionHeroComposition() {
    const artboard = qs('#rec843022128 .t396__artboard');
    const card = qs('#rec843022128 .tn-elem[data-elem-id="1734687515140"]');
    const note = qs('#rec843022128 .tn-elem[data-elem-id="1734688710331"]');
    if (!artboard || !card || !note) return;

    window.requestAnimationFrame(() => {
      const noteWidth = note.offsetWidth;
      const top = card.offsetTop + card.offsetHeight - note.offsetHeight - 18;
      const left = card.offsetLeft + (card.offsetWidth - noteWidth) / 2;
      note.style.setProperty('top', `${Math.round(top)}px`, 'important');
      note.style.setProperty('left', `${Math.round(left)}px`, 'important');
    });
  }

  function fitAboutSection() {
    const record = qs('#rec739080578');
    const artboard = qs('.t396__artboard', record);
    const lastParagraph = qs('.tn-elem[data-elem-id="1713870732480"]', record);
    if (!record || !artboard || !lastParagraph) return;

    window.requestAnimationFrame(() => {
      const height = Math.ceil(lastParagraph.offsetTop + lastParagraph.offsetHeight + 24);
      [artboard, qs('.t396__carrier', record), qs('.t396__filter', record)]
        .filter(Boolean)
        .forEach((element) => {
          element.style.setProperty('height', `${height}px`, 'important');
          element.style.setProperty('min-height', `${height}px`, 'important');
        });
    });
  }

  function removeAboutFacts() {
    qsa('#rec739080578 .veles-about-facts').forEach((facts) => facts.remove());
  }

  function adaptNavigation() {
    const homeHref = homeTarget();
    qsa('#rec737865899 .t-menusub, #rec737865418 .t-menusub').forEach((submenu) => {
      submenu.remove();
    });

    const desktopHome = qs(
      '#rec737865899 .t446__leftmenuwrapper .t446__list_item:first-child > .t-menu__link-item'
    );
    if (desktopHome) {
      desktopHome.textContent = 'Главная';
      desktopHome.href = homeHref;
      desktopHome.removeAttribute('data-menu-submenu-hook');
    }

    const desktopCity = qsa('#rec737865899 .t446__rightmenuwrapper .t-menu__link-item')
      .find((item) => item.textContent.replace(/\s+/g, ' ').trim() === 'Красноярск');
    if (desktopCity) {
      desktopCity.removeAttribute('href');
      desktopCity.removeAttribute('data-menu-submenu-hook');
      desktopCity.removeAttribute('target');
      desktopCity.classList.add('veles-city-label');
      desktopCity.setAttribute('aria-label', 'Красноярск');
    }

    const rightMenu = qs('#rec737865899 .t446__rightmenuwrapper');
    if (rightMenu && !qs('.veles-header-phone', rightMenu)) {
      const phone = document.createElement('span');
      phone.className = 'veles-header-phone';
      phone.textContent = '+7 (999) 000-00-00';
      phone.setAttribute('aria-label', 'Телефон');
      rightMenu.appendChild(phone);
    }

    const mobileList = qs('#rec737865418 .t450__menu > .t450__list');
    const mobileFirstItem = mobileList && mobileList.firstElementChild;
    const mobileHome = mobileFirstItem && qs('.t-menu__link-item, a', mobileFirstItem);
    if (mobileHome) {
      mobileHome.textContent = 'Главная';
      mobileHome.href = homeHref;
      mobileHome.removeAttribute('data-menu-submenu-hook');
      Array.from(mobileHome.classList).forEach((className) => {
        if (className.includes('submenu')) mobileHome.classList.remove(className);
      });
      Array.from(mobileFirstItem.classList).forEach((className) => {
        if (className.includes('submenu')) mobileFirstItem.classList.remove(className);
      });
    }
  }

  function installMortgageDetails() {
    const artboard = qs('#rec745200818 .t396__artboard');
    if (!artboard || qs('.veles-mortgage-note', artboard)) return;

    const note = document.createElement('div');
    note.className = 'veles-mortgage-note';
    note.innerHTML = `
      <div><span>Ставка по кредиту</span><strong>от 6%–12%</strong></div>
      <div><span>Срок кредита</span><strong>до 30 лет</strong></div>
      <div><span>Максимальная сумма</span><strong>до 12 млн ₽</strong></div>`;
    artboard.appendChild(note);
  }

  function removeMortgageBanks() {
    const banks = qs('#rec745200818 .tn-elem[data-elem-id="1715076908376"]');
    if (banks) banks.remove();
  }

  function positionMortgageDetails() {
    const button = qs('#rec745200818 .tn-elem[data-elem-id="1715077322122"]');
    const note = qs('#rec745200818 .veles-mortgage-note');
    if (!button || !note) return;

    window.requestAnimationFrame(() => {
      const top = button.offsetTop + button.offsetHeight + 24;
      note.style.setProperty('top', `${Math.round(top)}px`, 'important');
    });
  }

  function adaptTexts() {
    setAtomHTML('rec739097020', '1713872106742', 'Одноэтажные дома');
    setAtomHTML(
      'rec745200818',
      '1715076839210',
      'Дом можно приобрести в кредит или ипотеку. Оставьте заявку — расскажем об условиях и поможем подготовить документы.'
    );

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
      ['Дом из СИП-панелей', 'Модульный дом'],
      ['Баня из СИП-панелей', 'Модульная баня'],
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

    qsa('#rec753320289 input[type="radio"]').forEach((input) => {
      if (input.value === 'Дом из СИП-панелей') input.value = 'Модульный дом';
      if (input.value === 'Баня из СИП-панелей') input.value = 'Модульная баня';
    });

    const builtProjectsTitle = qs('#rec737865448 .t015__title');
    if (builtProjectsTitle) builtProjectsTitle.textContent = 'Реализованные проекты Велес Групп';

    const lifestyleBrand = qs(
      '#rec745111069 .tn-elem[data-elem-id="1470209944682"] .tn-atom span'
    );
    if (lifestyleBrand) {
      lifestyleBrand.textContent = 'ВЕЛЕС ГРУПП';
      lifestyleBrand.style.color = '#4f765a';
    }

    const benefitDescriptions = [
      'Мы фиксируем стоимость в договоре, и она не меняется в процессе стройки. Никаких неожиданных доплат — всё просчитываем на берегу.',
      'Благодаря отлаженной логистике и собственной бригаде строим дом за 4–8 месяцев, соблюдая календарный график.',
      'Даём письменную гарантию на конструктивные элементы дома. Если что-то пойдёт не так — это наша проблема, а не ваша.',
      'Строим тёплые дома из проверенных материалов, чтобы вы экономили на отоплении зимой и кондиционировании летом.'
    ];
    qsa('#rec739497362 .t905__descr').forEach((element, index) => {
      if (benefitDescriptions[index]) element.textContent = benefitDescriptions[index];
    });

    [
      '1594968113405',
      '1594971763337',
      '1594972460392',
      '1594972545936'
    ].forEach((elementId, index) => {
      if (benefitDescriptions[index]) {
        setAtomHTML('rec744479685', elementId, benefitDescriptions[index]);
      }
    });

    const turnkeyTitle = qs('#rec739795413 .t-section__title [data-customstyle="yes"]');
    if (turnkeyTitle) turnkeyTitle.textContent = 'Строим модульные дома под ключ';

    const turnkeyDetails = [
      'Прокладываем скрытую электрику и инженерные коммуникации.',
      'Монтируем внутреннее и наружное освещение, розетки и выключатели.',
      'Выполняем чистовую отделку внутри и снаружи.',
      'Устанавливаем окна и стеклопакеты согласно проекту.',
      'Оборудуем санузел и подключаем необходимую сантехнику.',
      'Собираем тёплый модульный дом для круглогодичного проживания.'
    ];
    qsa('#rec739795413 .t-card__title').forEach((element, index) => {
      if (turnkeyDetails[index]) element.textContent = turnkeyDetails[index];
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
        'Мы строим модульные дома под ключ и отвечаем за весь результат — от первого выезда на участок до готового дома и благоустроенной территории.';
    }

    replaceVisibleText(/ГЕОГРАФИЯ\s*HOUSE/gi, 'ВЕЛЕС ГРУПП');
    replaceVisibleText(/ГЕОГРАФИЕЙ\s*HOUSE/gi, 'ВЕЛЕС ГРУПП');
    replaceVisibleText(/ГЕОГРАФИЯ\s*house/gi, 'ВЕЛЕС ГРУПП');
    replaceVisibleText(/География\s*HOUSE/g, 'Велес Групп');
    replaceVisibleText(/География\s*House/g, 'Велес Групп');
    replaceVisibleText(/ООО\s*«ГЕОГРАФИЯ ХАУС»/g, 'ВЕЛЕС ГРУПП');
    replaceVisibleText(/�/g, '');

    const footerText = qs('#rec737865458 .t464__text');
    if (footerText) {
      footerText.innerHTML =
        '<div style="font-size:16px">ВЕЛЕС ГРУПП<br><br>Модульные дома под ключ<br>Красноярск</div>';
    }
  }

  function adaptLinks() {
    const homeHref = homeTarget();
    qsa('a').forEach((link) => {
      const label = link.textContent.replace(/\s+/g, ' ').trim().toLowerCase();
      if (link.getAttribute('href') === '/') link.href = 'index.html';
      if (label === 'каталог' || label === 'смотреть каталог' || label === 'смотреть проекты') {
        link.href = 'catalog.html';
      }
      if (label === 'главная') link.href = homeHref;
    });

    qsa('#rec843022128 a[href="#rec739097020"]').forEach((link) => {
      link.href = 'catalog.html';
    });

    qsa('#rec739097020 a').forEach((link) => {
      link.href = 'catalog.html';
    });
  }

  function adaptContactPlaceholders() {
    const contactText = qs('#rec737865457 .t555__contentwrapper .t-text');
    if (contactText) {
      contactText.innerHTML =
        '<div style="font-size:20px" data-customstyle="yes">Адрес: ХХХХХХХ<br><span aria-label="Телефон">+7 (999) 000-00-00</span></div>';
    }

    qsa('a[href^="tel:"]').forEach((link) => {
      link.href = '#';
      if (/\+?7|\d{3}/.test(link.textContent)) link.textContent = '+7 (999) 000-00-00';
      link.setAttribute('aria-label', 'Телефон будет указан позже');
    });

    const socialRoots = {
      instagram: 'https://instagram.com',
      telegram: 'https://t.me',
      whatsapp: 'https://wa.me',
      vk: 'https://vk.ru'
    };

    qsa('a').forEach((link) => {
      const href = (link.getAttribute('href') || '').toLowerCase();
      const label = (link.getAttribute('aria-label') || link.textContent || '').toLowerCase();
      const network = Object.keys(socialRoots).find((name) => href.includes(name) || label.includes(name));
      if (network) {
        link.href = socialRoots[network];
        link.target = '_blank';
        link.rel = 'nofollow noopener';
      }
    });
  }

  function removeVideoReviews() {
    ['rec745221192', 'rec745217206', 'rec745219112'].forEach((id) => {
      const record = document.getElementById(id);
      if (record) record.remove();
    });
  }

  function adaptImages() {
    const hero = qs('#rec843022128 .t396__carrier');
    setBackground(hero, 'assets/hero-light-forest.png');

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

    qsa('#rec745199205 .t500__img, #rec737865446 .t500__img').forEach((processImage) => {
      setImage(processImage, 'assets/order-phone.png', 'Заказ дома по шагам');
    });

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

  function refineLegacyBlocks() {
    const decorativeCompanyWord = qs(
      '#rec739498252 .tn-elem[data-elem-id="1715090632068"]'
    );
    if (decorativeCompanyWord) decorativeCompanyWord.remove();

    const reviewSlider = qs('#rec737865453');
    if (reviewSlider && reviewSlider.dataset.velesReviewClean !== 'true') {
      const reviewItems = qsa('.t994__item', reviewSlider);
      const instagramSlide = reviewItems.find((item) =>
        item.textContent.includes('Больше отзывов вы сможете найти')
      );
      if (instagramSlide) {
        const index = reviewItems.indexOf(instagramSlide);
        instagramSlide.remove();
        const loader = qsa('.t994__loader', reviewSlider)[index];
        if (loader) loader.remove();
      }
      reviewSlider.dataset.velesReviewClean = 'true';
      window.setTimeout(() => {
        if (typeof window.t994_goToSlide === 'function') window.t994_goToSlide(reviewSlider, 0);
      }, 120);
    }
  }

  function installInfiniteProjectsCarousel() {
    const slider = qs('#rec737865455');
    const track = qs('.t994__slidecontainer', slider);
    if (!slider || !track || slider.dataset.velesInfinite === 'true') return;

    slider.dataset.velesInfinite = 'true';
    track.dataset.sliderWithCycle = 'true';

    const move = (direction) => {
      const items = qsa('.t994__item', slider);
      if (!items.length || typeof window.t994_goToSlide !== 'function') return;
      const current = Number(track.dataset.slidePos || 0);
      const next = direction === 'left'
        ? (current - 1 + items.length) % items.length
        : (current + 1) % items.length;
      window.t994_goToSlide(slider, next);
    };

    const rightArrow = qs('.t-slds__arrow_wrapper-right', slider);
    const leftArrow = qs('.t-slds__arrow_wrapper-left', slider);
    if (rightArrow) {
      rightArrow.addEventListener('click', (event) => {
        const count = qsa('.t994__item', slider).length;
        if (Number(track.dataset.slidePos || 0) >= count - 1) {
          event.preventDefault();
          event.stopImmediatePropagation();
          move('right');
        }
      }, true);
    }
    if (leftArrow) {
      leftArrow.addEventListener('click', (event) => {
        if (Number(track.dataset.slidePos || 0) <= 0) {
          event.preventDefault();
          event.stopImmediatePropagation();
          move('left');
        }
      }, true);
    }

    let paused = false;
    slider.addEventListener('mouseenter', () => { paused = true; });
    slider.addEventListener('mouseleave', () => { paused = false; });
    slider.addEventListener('focusin', () => { paused = true; });
    slider.addEventListener('focusout', () => { paused = false; });

    window.setInterval(() => {
      if (!paused && !document.hidden) move('right');
    }, 5000);
  }

  function runAdaptation() {
    installBranding();
    adaptHero();
    removeHeroPoints();
    installHeroForm();
    positionHeroComposition();
    adaptTexts();
    removeAboutFacts();
    fitAboutSection();
    adaptLinks();
    adaptContactPlaceholders();
    removeVideoReviews();
    adaptImages();
    adaptNavigation();
    installMortgageDetails();
    removeMortgageBanks();
    positionMortgageDetails();
    installProjectClicks();
    refineLegacyBlocks();
    installInfiniteProjectsCarousel();
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

  window.addEventListener('resize', () => {
    positionHeroComposition();
    fitAboutSection();
    positionMortgageDetails();
  });
})();
