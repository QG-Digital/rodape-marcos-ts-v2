// Products page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Sample products data
    const products = [
        {
            id: 1,
            name: 'Produto Premium A1',
            sku: 'PRD001',
            code: 'NVB001',
            image: 'Images/padrão1.png',
            tamanho: 'Grande',
            linha: 'Linha A',
            characteristics: ['premium', 'profissional'],
            type: 'eletronico',
            collection: '2024',
            altura: 'grande',
            largura: 'padrao',
            cor: 'azul',
            lancamento: true,
            destaque: true,
            price: 1299.99
        },
        {
            id: 2,
            name: 'Produto Avançado B2',
            sku: 'PRD002',
            code: 'NVB002',
            image: 'Images/padrão1.png',
            tamanho: 'Médio',
            linha: 'Linha B',
            characteristics: ['avancado', 'basico'],
            type: 'mecanico',
            collection: '2024',
            altura: 'medio',
            largura: 'estreito',
            cor: 'branco',
            lancamento: false,
            destaque: true,
            price: 899.99
        },
        {
            id: 3,
            name: 'Produto Especializado C3',
            sku: 'PRD003',
            code: 'NVB003',
            image: 'Images/padrão1.png',
            tamanho: 'Pequeno',
            linha: 'Linha C',
            characteristics: ['premium', 'avancado'],
            type: 'software',
            collection: '2023',
            altura: 'pequeno',
            largura: 'largo',
            cor: 'cinza',
            lancamento: true,
            destaque: false,
            price: 599.99
        },
        {
            id: 4,
            name: 'Produto Inovador D4',
            sku: 'PRD004',
            code: 'NVB004',
            image: 'https://images.pexels.com/photos/3184431/pexels-photo-3184431.jpeg?auto=compress&cs=tinysrgb&w=300',
            tamanho: 'Grande',
            linha: 'Linha D',
            characteristics: ['profissional', 'premium'],
            type: 'acessorio',
            collection: 'especial',
            altura: 'grande',
            largura: 'largo',
            cor: 'preto',
            lancamento: false,
            destaque: true,
            price: 1599.99
        },
        {
            id: 5,
            name: 'Produto Tecnológico E5',
            sku: 'PRD005',
            code: 'NVB005',
            image: 'https://images.pexels.com/photos/3184463/pexels-photo-3184463.jpeg?auto=compress&cs=tinysrgb&w=300',
            tamanho: 'Médio',
            linha: 'Linha A',
            characteristics: ['basico', 'avancado'],
            type: 'eletronico',
            collection: '2024',
            altura: 'medio',
            largura: 'padrao',
            cor: 'vermelho',
            lancamento: true,
            destaque: false,
            price: 799.99
        },
        {
            id: 6,
            name: 'Produto Compacto F6',
            sku: 'PRD006',
            code: 'NVB006',
            image: 'https://images.pexels.com/photos/3184635/pexels-photo-3184635.jpeg?auto=compress&cs=tinysrgb&w=300',
            tamanho: 'Pequeno',
            linha: 'Linha B',
            characteristics: ['basico'],
            type: 'mecanico',
            collection: '2023',
            altura: 'pequeno',
            largura: 'estreito',
            cor: 'azul',
            lancamento: false,
            destaque: false,
            price: 399.99
        },
        {
            id: 7,
            name: 'Produto Robusto G7',
            sku: 'PRD007',
            code: 'NVB007',
            image: 'Images/padrão1.png',
            tamanho: 'Grande',
            linha: 'Linha C',
            characteristics: ['profissional', 'premium'],
            type: 'eletronico',
            collection: 'limitada',
            altura: 'grande',
            largura: 'largo',
            cor: 'cinza',
            lancamento: false,
            destaque: true,
            price: 1899.99
        },
        {
            id: 8,
            name: 'Produto Versátil H8',
            sku: 'PRD008',
            code: 'NVB008',
            image: 'Images/padrão1.png',
            tamanho: 'Médio',
            linha: 'Linha D',
            characteristics: ['avancado', 'basico'],
            type: 'acessorio',
            collection: '2024',
            altura: 'medio',
            largura: 'padrao',
            cor: 'branco',
            lancamento: true,
            destaque: false,
            price: 699.99
        }
    ];

    let currentProducts = [...products];
    let currentPage = 1;
    const productsPerPage = 15;
    let currentFilters = {};
    let currentSort = 'nome';

    // Initialize page
    initializePage();

    function initializePage() {
        // Check for URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const filter = urlParams.get('filter');
        
        if (filter) {
            applyInitialFilter(filter);
        }

        renderProducts();
        setupEventListeners();
    }

    function applyInitialFilter(filter) {
        switch (filter) {
            case 'lancamentos':
                currentProducts = products.filter(product => product.lancamento);
                break;
            case 'destaques':
                currentProducts = products.filter(product => product.destaque);
                break;
            default:
                currentProducts = [...products];
        }
    }

    function setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('search-input');
        const searchBtn = document.getElementById('search-btn');
        const searchResults = document.getElementById('search-results');

        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            if (query.length > 0) {
                const results = products.filter(product => 
                    product.name.toLowerCase().includes(query) ||
                    product.sku.toLowerCase().includes(query) ||
                    product.code.toLowerCase().includes(query)
                );
                showSearchResults(results);
            } else {
                hideSearchResults();
            }
        });

        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        // Filter functionality
        const filterCheckboxes = document.querySelectorAll('.filter-options input[type="checkbox"]');
        filterCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', updateFilters);
        });

        document.getElementById('apply-filters').addEventListener('click', applyFilters);
        document.getElementById('clear-filters').addEventListener('click', clearFilters);

        // Sort functionality
        document.getElementById('sort-select').addEventListener('change', function() {
            currentSort = this.value;
            sortProducts();
            renderProducts();
        });

        // Pagination
        document.getElementById('prev-page').addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderProducts();
            }
        });

        document.getElementById('next-page').addEventListener('click', () => {
            const totalPages = Math.ceil(currentProducts.length / productsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderProducts();
            }
        });
    }

    function showSearchResults(results) {
        const searchResults = document.getElementById('search-results');
        searchResults.innerHTML = '';
        
        if (results.length > 0) {
            results.slice(0, 5).forEach(product => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                resultItem.innerHTML = `
                    <strong>${product.name}</strong>
                    <br>
                    <small>SKU: ${product.sku} | Código: ${product.code}</small>
                `;
                resultItem.addEventListener('click', () => {
                    window.location.href = `produto-detalhe.html?id=${product.id}`;
                });
                searchResults.appendChild(resultItem);
            });
        } else {
            searchResults.innerHTML = '<div class="search-result-item">Nenhum produto encontrado</div>';
        }
        
        searchResults.style.display = 'block';
    }

    function hideSearchResults() {
        document.getElementById('search-results').style.display = 'none';
    }

    function performSearch() {
        const query = document.getElementById('search-input').value.toLowerCase();
        if (query.length > 0) {
            currentProducts = products.filter(product => 
                product.name.toLowerCase().includes(query) ||
                product.sku.toLowerCase().includes(query) ||
                product.code.toLowerCase().includes(query)
            );
            currentPage = 1;
            renderProducts();
            hideSearchResults();
        }
    }

    function updateFilters() {
        const filterGroups = document.querySelectorAll('.filter-group');
        currentFilters = {};

        filterGroups.forEach(group => {
            const groupName = group.querySelector('h4').textContent.toLowerCase();
            const checkedBoxes = group.querySelectorAll('input[type="checkbox"]:checked');
            
            if (checkedBoxes.length > 0) {
                currentFilters[groupName] = Array.from(checkedBoxes).map(cb => cb.value);
            }
        });
    }

    function applyFilters() {
        updateFilters();
        
        currentProducts = products.filter(product => {
            let matches = true;

            // Apply each filter
            Object.keys(currentFilters).forEach(filterType => {
                const filterValues = currentFilters[filterType];
                
                switch (filterType) {
                    case 'características':
                        matches = matches && filterValues.some(value => product.characteristics.includes(value));
                        break;
                    case 'tipo de produto':
                        matches = matches && filterValues.includes(product.type);
                        break;
                    case 'linha do produto':
                        matches = matches && filterValues.includes(product.linha.toLowerCase().replace(' ', '-'));
                        break;
                    case 'coleção':
                        matches = matches && filterValues.includes(product.collection);
                        break;
                    case 'altura':
                        matches = matches && filterValues.includes(product.altura);
                        break;
                    case 'largura':
                        matches = matches && filterValues.includes(product.largura);
                        break;
                    case 'cor':
                        matches = matches && filterValues.includes(product.cor);
                        break;
                }
            });

            return matches;
        });

        currentPage = 1;
        sortProducts();
        renderProducts();
    }

    function clearFilters() {
        // Uncheck all checkboxes
        const checkboxes = document.querySelectorAll('.filter-options input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });

        // Reset filters and products
        currentFilters = {};
        currentProducts = [...products];
        currentPage = 1;
        
        // Clear search
        document.getElementById('search-input').value = '';
        
        sortProducts();
        renderProducts();
    }

    function sortProducts() {
        switch (currentSort) {
            case 'nome':
                currentProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'preco':
                currentProducts.sort((a, b) => a.price - b.price);
                break;
            case 'data':
                currentProducts.sort((a, b) => b.id - a.id); // Assuming higher ID = newer
                break;
            case 'popularidade':
                currentProducts.sort((a, b) => (b.destaque ? 1 : 0) - (a.destaque ? 1 : 0));
                break;
        }
    }

    function renderProducts() {
        const grid = document.getElementById('products-grid');
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const productsToShow = currentProducts.slice(startIndex, endIndex);

        // Show loading state
        grid.innerHTML = '<div class="loading-products"><div class="loading-spinner"></div>Carregando produtos...</div>';

        // Simulate loading time
        setTimeout(() => {
            if (productsToShow.length === 0) {
                grid.innerHTML = '<div class="no-products">Nenhum produto encontrado com os filtros aplicados.</div>';
                return;
            }

            grid.innerHTML = productsToShow.map(product => `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <div class="product-info">
                        <h3 class="product-name">${product.name}</h3>
                        <div class="product-details">
                            <p><strong>Tamanho:</strong> ${product.tamanho}</p>
                            <p><strong>Linha:</strong> ${product.linha}</p>
                            <p><strong>SKU:</strong> ${product.sku} | <strong>Código:</strong> ${product.code}</p>
                        </div>
                        <div class="product-specs">
                            ${product.characteristics.map(char => `<span class="product-spec">${char}</span>`).join('')}
                            ${product.lancamento ? '<span class="product-spec" style="background: #10b981; color: white;">Lançamento</span>' : ''}
                            ${product.destaque ? '<span class="product-spec" style="background: #f59e0b; color: white;">Destaque</span>' : ''}
                        </div>
                        <div class="product-actions">
                            <a href="produto-detalhe.html?id=${product.id}" class="product-link">Ver Mais</a>
                        </div>
                    </div>
                </div>
            `).join('');

            // Update products count
            updateProductsCount();
            
            // Update pagination
            updatePagination();
        }, 500);
    }

    function updateProductsCount() {
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = Math.min(startIndex + productsPerPage, currentProducts.length);
        const countElement = document.getElementById('products-count');
        
        countElement.textContent = `Mostrando ${startIndex + 1}-${endIndex} de ${currentProducts.length} produtos`;
    }

    function updatePagination() {
        const totalPages = Math.ceil(currentProducts.length / productsPerPage);
        const pageNumbers = document.getElementById('page-numbers');
        const prevBtn = document.getElementById('prev-page');
        const nextBtn = document.getElementById('next-page');

        // Update button states
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;

        // Update page numbers
        pageNumbers.innerHTML = '';
        
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, currentPage + 2);

        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `page-number ${i === currentPage ? 'active' : ''}`;
            pageBtn.textContent = i;
            pageBtn.addEventListener('click', () => {
                currentPage = i;
                renderProducts();
            });
            pageNumbers.appendChild(pageBtn);
        }

        // Add ellipsis if needed
        if (startPage > 1) {
            const ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            pageNumbers.insertBefore(ellipsis, pageNumbers.firstChild);
        }

        if (endPage < totalPages) {
            const ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            pageNumbers.appendChild(ellipsis);
        }
    }

    // Hide search results when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-section')) {
            hideSearchResults();
        }
    });
});