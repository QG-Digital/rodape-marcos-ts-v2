// Product detail page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Sample product data (in a real app, this would come from an API)
    const products = {
        1: {
            id: 1,
            name: 'Produto Premium A1',
            sku: 'PRD001',
            code: 'NVB001',
            images: [
                'Images/padrão1.png',
                'Images/padrão1.png',
                'Images/padrão1.png'
            ],
            description: 'Este produto premium oferece a mais alta qualidade e desempenho. Desenvolvido com tecnologia de ponta e materiais superiores, é ideal para aplicações que exigem máxima confiabilidade e eficiência. Sua construção robusta garante durabilidade excepcional mesmo em condições adversas.',
            specs: {
                'Dimensões': '45 x 32 x 18 cm',
                'Peso': '2.5 kg',
                'Material': 'Alumínio anodizado',
                'Cor': 'Azul',
                'Garantia': '2 anos',
                'Origem': 'Nacional',
                'Linha': 'Linha A',
                'Coleção': '2024'
            },
            related: [2, 3, 4]
        },
        2: {
            id: 2,
            name: 'Produto Avançado B2',
            sku: 'PRD002',
            code: 'NVB002',
            images: [
                'Images/padrão1.png',
                'Images/padrão1.png',
                'Images/padrão1.png'
            ],
            description: 'Produto avançado com tecnologia de última geração. Combina funcionalidade superior com design elegante, oferecendo uma experiência única ao usuário. Ideal para profissionais que buscam alta performance e versatilidade.',
            specs: {
                'Dimensões': '38 x 28 x 15 cm',
                'Peso': '1.8 kg',
                'Material': 'Composto especial',
                'Cor': 'Branco',
                'Garantia': '18 meses',
                'Origem': 'Nacional',
                'Linha': 'Linha B',
                'Coleção': '2024'
            },
            related: [1, 3, 5]
        },
        3: {
            id: 3,
            name: 'Produto Especializado C3',
            sku: 'PRD003',
            code: 'NVB003',
            images: [
                'Images/padrão1.png',
                'Images/padrão1.png',
                'Images/padrão1.png'
            ],
            description: 'Produto especializado para aplicações específicas. Desenvolvido com base em extensa pesquisa e desenvolvimento, oferece soluções precisas para necessidades particulares. Sua precisão e confiabilidade o tornam a escolha ideal para projetos exigentes.',
            specs: {
                'Dimensões': '30 x 30 x 12 cm',
                'Peso': '1.2 kg',
                'Material': 'Liga especial',
                'Cor': 'Cinza',
                'Garantia': '1 ano',
                'Origem': 'Nacional',
                'Linha': 'Linha C',
                'Coleção': '2023'
            },
            related: [1, 2, 4]
        },
        4: {
            id: 4,
            name: 'Produto Inovador D4',
            sku: 'PRD004',
            code: 'NVB004',
            images: [
                'Images/padrão1.png',
                'Images/padrão1.png',
                'Images/padrão1.png'
            ],
            description: 'Produto inovador que representa o futuro da tecnologia. Incorpora as mais recentes inovações tecnológicas para oferecer uma experiência revolucionária. Sua eficiência energética e design sustentável fazem dele uma escolha responsável.',
            specs: {
                'Dimensões': '50 x 35 x 20 cm',
                'Peso': '3.2 kg',
                'Material': 'Fibra de carbono',
                'Cor': 'Preto',
                'Garantia': '3 anos',
                'Origem': 'Nacional',
                'Linha': 'Linha D',
                'Coleção': 'Especial'
            },
            related: [1, 2, 3]
        },
        5: {
            id: 5,
            name: 'Produto Tecnológico E5',
            sku: 'PRD005',
            code: 'NVB005',
            images: [
                'Images/padrão1.png',
                'Images/padrão1.png',
                'Images/padrão1.png'
            ],
            description: 'Produto tecnológico de alta performance. Desenvolvido para atender às demandas mais exigentes do mercado, oferece recursos avançados e confiabilidade excepcional. Sua interface intuitiva facilita o uso em diversas aplicações.',
            specs: {
                'Dimensões': '42 x 30 x 16 cm',
                'Peso': '2.1 kg',
                'Material': 'Polímero avançado',
                'Cor': 'Vermelho',
                'Garantia': '2 anos',
                'Origem': 'Nacional',
                'Linha': 'Linha A',
                'Coleção': '2024'
            },
            related: [1, 2, 4]
        }
    };

    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id')) || 1;
    
    // Load product data
    loadProduct(productId);
    
    // Setup event listeners
    setupEventListeners();

    function loadProduct(id) {
        const product = products[id];
        
        if (!product) {
            document.querySelector('.main-content').innerHTML = '<div class="container"><h1>Produto não encontrado</h1></div>';
            return;
        }

        // Update page title
        document.title = `${product.name} - NVBT`;
        
        // Update breadcrumb
        document.getElementById('product-breadcrumb').textContent = product.name;
        
        // Load product images
        const mainImage = document.getElementById('main-product-image');
        const thumbnails = document.querySelectorAll('.thumbnail');
        
        mainImage.src = product.images[0];
        mainImage.alt = product.name;
        
        thumbnails.forEach((thumb, index) => {
            if (product.images[index]) {
                thumb.src = product.images[index];
                thumb.alt = `${product.name} - Imagem ${index + 1}`;
                thumb.style.display = 'block';
            } else {
                thumb.style.display = 'none';
            }
        });
        
        // Load product info
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-sku').textContent = product.sku;
        document.getElementById('product-code').textContent = product.code;
        document.getElementById('product-description').textContent = product.description;
        
        // Load specifications
        const specsTableBody = document.getElementById('specs-table-body');
        specsTableBody.innerHTML = '';
        
        Object.entries(product.specs).forEach(([key, value]) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>${key}</strong></td>
                <td>${value}</td>
            `;
            specsTableBody.appendChild(row);
        });
        
        // Load related products
        loadRelatedProducts(product.related);
        
        // Track product view
        trackProductView(product);
    }

    function loadRelatedProducts(relatedIds) {
        const relatedGrid = document.getElementById('related-products-grid');
        relatedGrid.innerHTML = '';
        
        relatedIds.forEach(id => {
            const product = products[id];
            if (product) {
                const productCard = document.createElement('div');
                productCard.className = 'related-product-card';
                productCard.innerHTML = `
                    <img src="${product.images[0]}" alt="${product.name}">
                    <div class="related-product-info">
                        <h3>${product.name}</h3>
                        <p>SKU: ${product.sku} | Código: ${product.code}</p>
                        <a href="produto-detalhe.html?id=${product.id}" class="related-product-link">Ver Detalhes</a>
                    </div>
                `;
                relatedGrid.appendChild(productCard);
            }
        });
    }

    function setupEventListeners() {
        // Thumbnail image switching
        const thumbnails = document.querySelectorAll('.thumbnail');
        const mainImage = document.getElementById('main-product-image');
        
        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => {
                mainImage.src = thumb.src;
                thumbnails.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });
        });

        // Quote button
        const quoteBtn = document.getElementById('quote-btn');
        const quoteModal = document.getElementById('quote-modal');
        const successModal = document.getElementById('success-modal');
        
        quoteBtn.addEventListener('click', () => {
            quoteModal.style.display = 'block';
        });

        // Share button
        const shareBtn = document.getElementById('share-btn');
        shareBtn.addEventListener('click', () => {
            if (navigator.share) {
                navigator.share({
                    title: document.getElementById('product-name').textContent,
                    text: document.getElementById('product-description').textContent,
                    url: window.location.href
                });
            } else {
                // Fallback: copy to clipboard
                navigator.clipboard.writeText(window.location.href).then(() => {
                    alert('Link copiado para a área de transferência!');
                });
            }
        });

        // Modal close buttons
        const closeButtons = document.querySelectorAll('.close, .btn-close');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.target.closest('.modal').style.display = 'none';
            });
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        });

        // Quote form submission
        const quoteForm = document.getElementById('quote-form');
        quoteForm.addEventListener('submit', handleQuoteSubmission);
    }

    function handleQuoteSubmission(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const quoteData = {
            product: document.getElementById('product-name').textContent,
            productId: productId,
            name: formData.get('name'),
            contact: formData.get('contact'),
            document: formData.get('document'),
            message: formData.get('message'),
            timestamp: new Date().toISOString()
        };

        // Validate form
        const errors = validateQuoteForm(quoteData);
        if (errors.length > 0) {
            alert('Erro no formulário:\n' + errors.join('\n'));
            return;
        }

        // Show loading state
        const submitBtn = e.target.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        showLoading(submitBtn);

        // Simulate API call
        setTimeout(() => {
            hideLoading(submitBtn, originalText);
            
            // Close quote modal and show success modal
            document.getElementById('quote-modal').style.display = 'none';
            document.getElementById('success-modal').style.display = 'block';
            
            // Reset form
            e.target.reset();
            
            // Track quote request
            trackQuoteRequest(quoteData);
        }, 1500);
    }

    function validateQuoteForm(data) {
        const errors = [];
        
        if (!data.name || data.name.length < 2) {
            errors.push('Nome deve ter pelo menos 2 caracteres');
        }
        
        if (!data.contact || !isValidPhone(data.contact)) {
            errors.push('Número de contato inválido');
        }
        
        if (!data.document || !isValidDocument(data.document)) {
            errors.push('CPF/CNPJ inválido');
        }
        
        if (!data.message || data.message.length < 10) {
            errors.push('Mensagem deve ter pelo menos 10 caracteres');
        }
        
        return errors;
    }

    function isValidPhone(phone) {
        const phoneRegex = /^[\d\s\(\)\-\+]{10,}$/;
        return phoneRegex.test(phone);
    }

    function isValidDocument(document) {
        const cleanDoc = document.replace(/[^\d]/g, '');
        return cleanDoc.length === 11 || cleanDoc.length === 14;
    }

    function showLoading(element) {
        element.innerHTML = '<span class="loading-spinner"></span> Enviando...';
        element.disabled = true;
    }

    function hideLoading(element, originalText) {
        element.innerHTML = originalText;
        element.disabled = false;
    }

    function trackProductView(product) {
        // Get visitor info
        fetch('https://ipapi.co/json/')
            .then(response => response.json())
            .then(data => {
                const viewData = {
                    product: product.name,
                    productId: product.id,
                    sku: product.sku,
                    ip: data.ip,
                    location: `${data.city}, ${data.region}, ${data.country_name}`,
                    userAgent: navigator.userAgent,
                    timestamp: new Date().toISOString()
                };
                
                // Send to Telegram (product view token)
                sendToTelegram(viewData, 'PRODUCT_VIEW');
            })
            .catch(error => {
                console.log('Could not track product view');
            });
    }

    function trackQuoteRequest(quoteData) {
        // Get visitor info
        fetch('https://ipapi.co/json/')
            .then(response => response.json())
            .then(data => {
                const requestData = {
                    ...quoteData,
                    ip: data.ip,
                    location: `${data.city}, ${data.region}, ${data.country_name}`,
                    userAgent: navigator.userAgent
                };
                
                // Send to Telegram (quote request token)
                sendToTelegram(requestData, 'QUOTE_REQUEST');
            })
            .catch(error => {
                console.log('Could not track quote request');
            });
    }

    function sendToTelegram(data, type) {
        let message = '';
        
        switch (type) {
            case 'PRODUCT_VIEW':
                message = `👁️ Visualização de Produto - NVBT\n\n`;
                message += `🛍️ Produto: ${data.product}\n`;
                message += `📦 SKU: ${data.sku}\n`;
                message += `🆔 ID: ${data.productId}\n`;
                message += `🕐 Horário: ${new Date(data.timestamp).toLocaleString('pt-BR')}\n`;
                message += `🌍 IP: ${data.ip}\n`;
                message += `📍 Localização: ${data.location}\n`;
                message += `💻 Navegador: ${data.userAgent.substring(0, 100)}...`;
                break;
            
            case 'QUOTE_REQUEST':
                message = `💰 Solicitação de Orçamento - NVBT\n\n`;
                message += `🛍️ Produto: ${data.product}\n`;
                message += `📦 ID: ${data.productId}\n`;
                message += `👤 Nome: ${data.name}\n`;
                message += `📱 Contato: ${data.contact}\n`;
                message += `📄 CPF/CNPJ: ${data.document}\n`;
                message += `💬 Mensagem: ${data.message}\n`;
                message += `🕐 Horário: ${new Date(data.timestamp).toLocaleString('pt-BR')}\n`;
                message += `🌍 IP: ${data.ip}\n`;
                message += `📍 Localização: ${data.location}`;
                break;
        }
        
        // In a real implementation, this would be sent to a backend service
        console.log('Telegram message:', message);
    }
});