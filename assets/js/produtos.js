document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('products-page')) return; // Run only on products page

    const filtersSidebar = document.getElementById('filters-sidebar');
    const productsGrid = document.getElementById('products-grid');
    const noResultsMessage = document.getElementById('no-results-message');

    const renderFilters = () => { /* ...código inalterado... */ };

    const renderProducts = (products) => {
        if (products.length === 0) {
            noResultsMessage.style.display = 'block';
            productsGrid.innerHTML = '';
            return;
        }
        noResultsMessage.style.display = 'none';
        productsGrid.innerHTML = products.map(p => `
            <div class="product-card">
                <div class="product-image"><img src="${p.image}" alt="${p.name}" loading="lazy"></div>
                <div class="product-info">
                    <h3>${p.name}</h3>
                    <p class="product-desc">${p.description || ''}</p>
                </div>
            </div>
        `).join('');
    };

    const applyFilters = () => { /* ...código inalterado... */ };
    const initEventListeners = () => { /* ...código inalterado... */ };

    // A lógica interna das funções acima não precisa mudar. O código original está correto.
    // Para manter a resposta curta, vou omitir as funções que não mudaram de verdade.
    // Cole o código completo da resposta anterior aqui.
    const state = { filters: {} };
    // ... cole o resto do seu produtos.js aqui
});

// Para facilitar, aqui está o código completo do produtos.js novamente:
document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('products-page')) return;

    const filtersSidebar = document.getElementById('filters-sidebar');
    const productsGrid = document.getElementById('products-grid');
    const noResultsMessage = document.getElementById('no-results-message');

    const renderFilters = () => {
        const { items } = PRODUCTS_CONFIG;
        const filters = {
            tags: { label: TEXTS[document.documentElement.lang].filter_by_characteristic, options: {
                'destaque': TEXTS[document.documentElement.lang].filter_highlights,
                'lancamento': TEXTS[document.documentElement.lang].filter_new,
                'mais-vendido': TEXTS[document.documentElement.lang].filter_bestsellers
            }, type: 'checkbox' },
            type: { label: TEXTS[document.documentElement.lang].filter_by_type, options: [...new Set(items.map(p => p.type))], type: 'checkbox' },
            line: { label: TEXTS[document.documentElement.lang].filter_by_line, options: [...new Set(items.map(p => p.line))], type: 'checkbox' },
            material: { label: TEXTS[document.documentElement.lang].filter_by_material, options: [...new Set(items.map(p => p.material))], type: 'checkbox' },
            height_mm: { label: TEXTS[document.documentElement.lang].filter_by_height, options: [...new Set(items.map(p => p.height_mm))].sort((a,b) => a-b), type: 'checkbox' },
            width_mm: { label: TEXTS[document.documentElement.lang].filter_by_width, options: [...new Set(items.map(p => p.width_mm))].sort((a,b) => a-b), type: 'checkbox' },
            colors: { label: TEXTS[document.documentElement.lang].filter_by_color, options: [...new Set(items.flatMap(p => p.colors))], type: 'checkbox' },
        };
        let filtersHTML = '';
        for (const key in filters) {
            const filter = filters[key];
            filtersHTML += `<div class="filter-group" id="filter-group-${key}"><h4>${filter.label}</h4>`;
            if (typeof filter.options === 'object' && !Array.isArray(filter.options)) {
                 for (const value in filter.options) {
                    filtersHTML += `<div class="filter-option"><input type="checkbox" id="filter-${key}-${value}" name="${key}" value="${value}"><label for="filter-${key}-${value}">${filter.options[value]}</label></div>`;
                }
            } else {
                filter.options.forEach(option => {
                    filtersHTML += `<div class="filter-option"><input type="checkbox" id="filter-${key}-${option}" name="${key}" value="${option}"><label for="filter-${key}-${option}">${option}</label></div>`;
                });
            }
            filtersHTML += '</div>';
        }
        filtersHTML += `<button id="clear-filters-btn" class="cta-button secondary-button">${TEXTS[document.documentElement.lang].filter_clear}</button>`;
        filtersSidebar.innerHTML = filtersHTML;
    };

    const renderProducts = (products) => {
        if (products.length === 0) {
            noResultsMessage.style.display = 'block';
            productsGrid.innerHTML = '';
            return;
        }
        noResultsMessage.style.display = 'none';
        productsGrid.innerHTML = products.map(p => `
            <div class="product-card">
                <div class="product-image"><img src="${p.image}" alt="${p.name}" loading="lazy"></div>
                <div class="product-info">
                    <h3>${p.name}</h3>
                    <p class="product-desc">${p.description || ''}</p>
                </div>
            </div>
        `).join('');
    };

    const applyFilters = () => {
        const activeFilters = {};
        document.querySelectorAll('#filters-sidebar input[type="checkbox"]:checked').forEach(input => {
            if (!activeFilters[input.name]) activeFilters[input.name] = [];
            activeFilters[input.name].push(input.value);
        });
        const filteredProducts = PRODUCTS_CONFIG.items.filter(product => 
            Object.entries(activeFilters).every(([key, values]) => {
                if (values.length === 0) return true;
                if (Array.isArray(product[key])) return values.some(v => product[key].includes(v));
                return values.includes(String(product[key]));
            })
        );
        renderProducts(filteredProducts);
    };
    
    const initEventListeners = () => {
        filtersSidebar.addEventListener('change', e => { if (e.target.type === 'checkbox') applyFilters(); });
        filtersSidebar.addEventListener('click', e => {
            if (e.target.id === 'clear-filters-btn') {
                document.querySelectorAll('#filters-sidebar input[type="checkbox"]').forEach(input => input.checked = false);
                applyFilters();
            }
        });
    };

    renderFilters();
    renderProducts(PRODUCTS_CONFIG.items);
    initEventListeners();
});