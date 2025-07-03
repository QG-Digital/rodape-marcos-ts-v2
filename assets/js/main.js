document.addEventListener('DOMContentLoaded', () => {
    let currentLang = 'pt';

    const loadPartials = async () => {
        const header = fetch('assets/partials/header.html').then(res => res.text());
        const footer = fetch('assets/partials/footer.html').then(res => res.text());
        const [headerHTML, footerHTML] = await Promise.all([header, footer]);
        
        document.getElementById('header').innerHTML = headerHTML;
        document.getElementById('footer').innerHTML = footerHTML;
    };

    const applyTranslations = () => {
        const langTexts = TEXTS[currentLang];
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            if (langTexts[key]) el.innerHTML = langTexts[key];
        });
        document.documentElement.lang = currentLang;
        
        // Atualiza o botão de idioma
        const langDisplay = document.getElementById('current-lang-display');
        if (langDisplay) {
            langDisplay.textContent = TEXTS[currentLang][`lang_${currentLang}`];
        }

        document.querySelectorAll('.lang-option').forEach(opt => {
            opt.classList.toggle('active', opt.getAttribute('data-lang') === currentLang);
        });
    };

    // O resto do main.js pode continuar o mesmo da resposta anterior.
    // Cole o código completo aqui para garantir.
    const setLanguage = (lang) => {
        currentLang = ['pt', 'en', 'es'].includes(lang) ? lang : 'pt';
        localStorage.setItem('preferredLanguage', currentLang);
        applyTranslations();
    };
    const initLanguage = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const langFromURL = urlParams.get('lang');
        const langFromStorage = localStorage.getItem('preferredLanguage');
        setLanguage(langFromURL || langFromStorage || 'pt');
    };
    const initGlobalConfigs = () => {
        const socialContainer = document.getElementById('footer-social-icons');
        if (socialContainer) {
            socialContainer.innerHTML = Object.entries(GLOBAL_CONFIG.social).map(([key, url]) => `<a href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${key}">${getSocialIcon(key)}</a>`).join('');
        }
        const devEl = document.getElementById('footer-developer');
        if (devEl) devEl.innerHTML = `<a href="${GLOBAL_CONFIG.developer.url}" target="_blank" rel="noopener noreferrer">${GLOBAL_CONFIG.developer.text}</a>`;
        const emailEl = document.getElementById('footer-contact-email');
        const phoneEl = document.getElementById('footer-contact-phone');
        if(emailEl) emailEl.innerHTML = `<a href="mailto:${GLOBAL_CONFIG.contact.email}">${GLOBAL_CONFIG.contact.email}</a>`;
        if(phoneEl) phoneEl.innerHTML = `<a href="tel:${GLOBAL_CONFIG.contact.phone.replace(/\D/g,'')}">${GLOBAL_CONFIG.contact.phone}</a>`;
        const catalogLink = document.getElementById('catalog-link');
        // Este link agora está na página catalogo.html, então o main.js não precisa mais gerenciá-lo.
    };
    const initMobileMenu = () => {
        const menuToggle = document.getElementById('menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        const desktopNav = document.querySelector('.desktop-nav');
        mobileMenu.innerHTML = desktopNav.innerHTML;
        const langSwitcher = document.querySelector('.language-switcher').cloneNode(true);
        mobileMenu.appendChild(langSwitcher);
        const catalogButton = document.querySelector('.header-actions .cta-button').cloneNode(true);
        mobileMenu.appendChild(catalogButton);
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
        mobileMenu.querySelectorAll('.nav-item-with-submenu').forEach(item => {
            const link = item.querySelector('.nav-link');
            const submenu = item.querySelector('.submenu');
            link.addEventListener('click', (e) => {
                if(window.innerWidth <= 992) {
                    e.preventDefault();
                    submenu.classList.toggle('open');
                }
            });
        });
    };
    const initDropdowns = () => {
        document.addEventListener('click', (e) => {
            const langSwitcher = document.querySelector('.language-switcher');
            if (langSwitcher && langSwitcher.contains(e.target)) {
                langSwitcher.classList.toggle('open');
            } else if(langSwitcher) {
                langSwitcher.classList.remove('open');
            }
        });
    };
    const getSocialIcon = (key) => {
        const icons = {
            instagram: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>`,
            facebook: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>`,
            linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>`
        };
        return icons[key] || `<span>${key.charAt(0).toUpperCase()}</span>`;
    };
    loadPartials().then(() => {
        initLanguage();
        initGlobalConfigs();
        initMobileMenu();
        initDropdowns();
    });
});