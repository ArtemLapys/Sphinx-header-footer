/**
 * Sphinx Custom Navigation Injector
 * 
 * Задача этого скрипта:
 * 1. Содержать актуальную верстку Шапки и Футера (или логику их получения).
 * 2. Внедрять их в страницу Sphinx, не ломая стандартную навигацию.
 * 3. Обеспечивать минимальную интерактивность (мобильное меню, дропдауны).
 * 
 * Как это работает:
 * Сайт документации — это статическая генерация (HTML файлы).
 * Скрипт custom.js срабатывает при загрузке страницы и "инъектирует" HTML-код шапки в начало <body> и футера в конец <body>.
 * Стили лежат в custom.css (используется Flexbox layout для body, чтобы прижать футер).
 */

document.addEventListener("DOMContentLoaded", function() {

    // ========================================================================
    // 1. КОНФИГУРАЦИЯ И ДАННЫЕ
    // ========================================================================
    const CONFIG = {
        domain: "https://rdb.red-soft.ru",
        logoUrl: "https://rdb.red-soft.ru/local/templates/rdb/img/logo.svg"
    };

    // ========================================================================
    // 2. ШАБЛОНЫ HTML (Frontend разработчик работает здесь)
    //
    // Что нужно делать фронтенду:
    // HTML: Редактировать функции getHeaderHTML() и getFooterHTML(). Можно вставлять туда любую верстку.
    // CSS: Следить, чтобы у #global-header был фиксированный height (сейчас 90px), так как в custom.css прописаны отступы для контента Sphinx, опирающиеся на эту высоту. Если меняется высота шапки, нужно поправить top у .wy-nav-side в CSS.
    // JS: В блоке initInteractivity находится логика для мобильного меню (бургер) и кликов по дропдаунам на тач-скринах.
    //
    // Важно:
    // Не удалять методы document.body.insertAdjacentHTML, так как это единственный надежный способ встроить навигацию в тему ReadTheDocs без переписывания её шаблонов.
    // ========================================================================
    
    function getHeaderHTML() {
        return `
        <header id="global-header">
            <div class="header-container">
                
                <!-- Логотип -->
                <div class="header-logo">
                    <a href="${CONFIG.domain}/">
                        <img src="${CONFIG.logoUrl}" alt="РЕД БАЗА ДАННЫХ">
                    </a>
                </div>

                <!-- Бургер (Mobile Trigger) -->
                <div class="burger-btn" id="js-burger-btn">
                    <span></span><span></span><span></span>
                </div>

                <!-- Навигация -->
                <nav class="header-nav" id="js-header-nav">
                    <ul class="nav-list">
                        <!-- Пример выпадающего списка -->
                        <li class="has-dropdown">
                            <a href="${CONFIG.domain}/product/">
                                О ПРОДУКТЕ
                                <!-- SVG стрелка -->
                                <svg class="arrow-icon" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            </a>
                            <ul class="dropdown-menu">
                                <li><a href="${CONFIG.domain}/product/">Описание</a></li>
                                <li><a href="${CONFIG.domain}/product/advantages/">Преимущества</a></li>
                                <li><a href="${CONFIG.domain}/product/certificates/">Сертификаты</a></li>
                            </ul>
                        </li>

                        <li><a href="${CONFIG.domain}/product/docs/" class="current">ДОКУМЕНТАЦИЯ</a></li>
                        <li><a href="${CONFIG.domain}/downloads/">СКАЧАТЬ</a></li>
                        <li><a href="${CONFIG.domain}/support/">ПОДДЕРЖКА</a></li>
                        <li><a href="${CONFIG.domain}/contacts/">КОНТАКТЫ</a></li>
                    </ul>

                    <a href="${CONFIG.domain}/auth/" class="login-btn">ВХОД</a>
                </nav>
            </div>
        </header>
        `;
    }

    function getFooterHTML() {
        const year = new Date().getFullYear();
        return `
        <footer id="global-footer">
            <div class="footer-container">
                <div class="footer-row">
                    <div class="footer-col">
                        <h4 class="footer-title">О КОМПАНИИ</h4>
                        <ul class="footer-links">
                            <li><a href="https://red-soft.ru/about/" target="_blank">РЕД СОФТ</a></li>
                            <li><a href="${CONFIG.domain}/contacts/">Контакты</a></li>
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h4 class="footer-title">ПРОДУКТЫ</h4>
                        <ul class="footer-links">
                            <li><a href="https://redos.red-soft.ru/" target="_blank">РЕД ОС</a></li>
                            <li><a href="${CONFIG.domain}/">РЕД База Данных</a></li>
                        </ul>
                    </div>
                    <div class="footer-col contacts">
                        <h4 class="footer-title">КОНТАКТЫ</h4>
                        <div class="contact-item phone"><a href="tel:+74952850218">+7 (495) 285-02-18</a></div>
                        <div class="contact-item email"><a href="mailto:info@red-soft.ru">info@red-soft.ru</a></div>
                    </div>
                </div>
                <div class="footer-bottom">
                    <div class="copyright">© 2014 - ${year} ООО «РЕД СОФТ». Все права защищены.</div>
                </div>
            </div>
        </footer>
        `;
    }

    // ========================================================================
    // 3. ЛОГИКА ВНЕДРЕНИЯ (Не менять без необходимости)
    // ========================================================================
    
    function injectLayout() {
        // Вставляем Header в начало <body>
        document.body.insertAdjacentHTML("afterbegin", getHeaderHTML());
        
        // Вставляем Footer в конец <body>
        document.body.insertAdjacentHTML("beforeend", getFooterHTML());
    }

    // ========================================================================
    // 4. ИНТЕРАКТИВНОСТЬ (Обработчики событий)
    // ========================================================================

    function initInteractivity() {
        const burgerBtn = document.getElementById('js-burger-btn');
        const navMenu = document.getElementById('js-header-nav');
        
        // 1. Мобильное меню (открытие/закрытие)
        if (burgerBtn && navMenu) {
            burgerBtn.addEventListener('click', function() {
                this.classList.toggle('active');
                navMenu.classList.toggle('open');
            });
        }

        // 2. Мобильный аккордеон для выпадающих списков
        // (На десктопе работает через CSS :hover, на мобильном нужен клик)
        const dropdownLinks = document.querySelectorAll('.has-dropdown > a');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Проверяем ширину экрана (991px - точка перелома в CSS)
                if (window.innerWidth <= 991) {
                    e.preventDefault(); // Отменяем переход по ссылке
                    this.parentElement.classList.toggle('mobile-open');
                }
            });
        });
    }

    // ========================================================================
    // ЗАПУСК
    // ========================================================================
    try {
        injectLayout();
        initInteractivity();
        console.log("Sphinx Custom Layout: Loaded successfully");
    } catch (error) {
        console.error("Sphinx Custom Layout: Error injecting header/footer", error);
    }

});