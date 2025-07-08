// Navigation
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Fade in animation for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Featured products rotation
    rotateFeaturedProducts();

    // Track page visit
    trackPageVisit();
});

// Featured Products Rotation
function rotateFeaturedProducts() {
    const products = [
        {
            id: 1,
            name: 'Produto Premium',
            sku: 'PRD001',
            code: 'NVB001',
            image: 'Images/padrão1.png'
        },
        {
            id: 2,
            name: 'Produto Avançado',
            sku: 'PRD002',
            code: 'NVB002',
            image: 'Images/padrão1.png'
        },
        {
            id: 3,
            name: 'Produto Especializado',
            sku: 'PRD003',
            code: 'NVB003',
            image: 'Images/padrão1.png'
        },
        {
            id: 4,
            name: 'Produto Inovador',
            sku: 'PRD004',
            code: 'NVB004',
            image: 'https://images.pexels.com/photos/3184431/pexels-photo-3184431.jpeg?auto=compress&cs=tinysrgb&w=300'
        },
        {
            id: 5,
            name: 'Produto Tecnológico',
            sku: 'PRD005',
            code: 'NVB005',
            image: 'https://images.pexels.com/photos/3184463/pexels-photo-3184463.jpeg?auto=compress&cs=tinysrgb&w=300'
        }
    ];

    let currentIndex = 0;
    const productsContainer = document.querySelector('.products-carousel');
    
    if (productsContainer) {
        setInterval(() => {
            // Randomly select 3 products
            const shuffled = [...products].sort(() => 0.5 - Math.random());
            const selectedProducts = shuffled.slice(0, 3);
            
            // Update the products display
            const productCards = productsContainer.querySelectorAll('.product-card');
            productCards.forEach((card, index) => {
                if (selectedProducts[index]) {
                    const product = selectedProducts[index];
                    card.querySelector('img').src = product.image;
                    card.querySelector('h3').textContent = product.name;
                    card.querySelector('p').textContent = `SKU: ${product.sku} | Código: ${product.code}`;
                    card.querySelector('a').href = `produto-detalhe.html?id=${product.id}`;
                }
            });
        }, 7000);
    }
}

// Track page visit (sends to Telegram)
function trackPageVisit() {
    // Get visitor information
    const visitorInfo = {
        page: window.location.pathname,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        language: navigator.language,
        screen: `${screen.width}x${screen.height}`,
        referrer: document.referrer
    };

    // Get IP and location (using a public API)
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            visitorInfo.ip = data.ip;
            visitorInfo.city = data.city;
            visitorInfo.region = data.region;
            visitorInfo.country = data.country_name;
            
            // Send to Telegram
            sendToTelegram(visitorInfo, 'PAGE_VISIT');
        })
        .catch(error => {
            console.log('Could not get location data');
            sendToTelegram(visitorInfo, 'PAGE_VISIT');
        });
}

// Send data to Telegram
function sendToTelegram(data, type) {
    const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE';
    const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID_HERE';
    
    let message = '';
    
    switch (type) {
        case 'PAGE_VISIT':
            message = `🌐 Nova Visita - NVBT\n\n`;
            message += `📄 Página: ${data.page}\n`;
            message += `🕐 Horário: ${new Date(data.timestamp).toLocaleString('pt-BR')}\n`;
            message += `🌍 IP: ${data.ip || 'N/A'}\n`;
            message += `📍 Localização: ${data.city || 'N/A'}, ${data.region || 'N/A'}, ${data.country || 'N/A'}\n`;
            message += `💻 Navegador: ${data.userAgent}\n`;
            message += `📱 Tela: ${data.screen}\n`;
            message += `🔗 Referência: ${data.referrer || 'Direto'}`;
            break;
        
        case 'CONTACT_FORM':
            message = `📞 Novo Contato - NVBT\n\n`;
            message += `👤 Nome: ${data.name}\n`;
            message += `📧 Email: ${data.email}\n`;
            message += `📱 Telefone: ${data.phone || 'N/A'}\n`;
            message += `💬 Mensagem: ${data.message}\n`;
            message += `🕐 Horário: ${new Date().toLocaleString('pt-BR')}\n`;
            message += `🌍 IP: ${data.ip || 'N/A'}\n`;
            message += `📍 Localização: ${data.location || 'N/A'}`;
            break;
        
        case 'QUOTE_REQUEST':
            message = `💰 Solicitação de Orçamento - NVBT\n\n`;
            message += `🛍️ Produto: ${data.product}\n`;
            message += `👤 Nome: ${data.name}\n`;
            message += `📱 Contato: ${data.contact}\n`;
            message += `📄 CPF/CNPJ: ${data.document}\n`;
            message += `💬 Mensagem: ${data.message}\n`;
            message += `🕐 Horário: ${new Date().toLocaleString('pt-BR')}\n`;
            message += `🌍 IP: ${data.ip || 'N/A'}\n`;
            message += `📍 Localização: ${data.location || 'N/A'}`;
            break;
        
        case 'COMPLAINT':
            message = `⚠️ Nova Reclamação - NVBT\n\n`;
            message += `🏢 CNPJ: ${data.cnpj}\n`;
            message += `👤 Nome: ${data.name}\n`;
            message += `📱 Contato: ${data.contact}\n`;
            message += `📝 Tipo: ${data.type}\n`;
            message += `💬 Observação: ${data.observation}\n`;
            message += `🕐 Horário: ${new Date().toLocaleString('pt-BR')}\n`;
            message += `🌍 IP: ${data.ip || 'N/A'}\n`;
            message += `📍 Localização: ${data.location || 'N/A'}`;
            break;
    }
    
    // Note: In a real implementation, you would use a backend service
    // to send the message to Telegram to keep the bot token secure
    console.log('Telegram message:', message);
}

// Form validation
function validateForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.length < 2) {
        errors.push('Nome deve ter pelo menos 2 caracteres');
    }
    
    if (formData.email && !isValidEmail(formData.email)) {
        errors.push('Email inválido');
    }
    
    if (formData.phone && !isValidPhone(formData.phone)) {
        errors.push('Telefone inválido');
    }
    
    if (formData.document && !isValidDocument(formData.document)) {
        errors.push('CPF/CNPJ inválido');
    }
    
    return errors;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\(\)\-\+]{10,}$/;
    return phoneRegex.test(phone);
}

function isValidDocument(document) {
    // Simple validation for CPF/CNPJ format
    const cleanDoc = document.replace(/[^\d]/g, '');
    return cleanDoc.length === 11 || cleanDoc.length === 14;
}

// Show loading state
function showLoading(element) {
    element.innerHTML = '<span class="loading"></span> Enviando...';
    element.disabled = true;
}

// Hide loading state
function hideLoading(element, originalText) {
    element.innerHTML = originalText;
    element.disabled = false;
}

// Show success message
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div style="background: #10b981; color: white; padding: 1rem; border-radius: 5px; margin: 1rem 0;">
            ✅ ${message}
        </div>
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Show error message
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <div style="background: #ef4444; color: white; padding: 1rem; border-radius: 5px; margin: 1rem 0;">
            ❌ ${message}
        </div>
    `;
    
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Utility functions
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}