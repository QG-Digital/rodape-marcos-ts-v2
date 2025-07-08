// Catalogs page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Setup download tracking
    setupDownloadTracking();
    
    // Track page visit
    trackPageVisit('catalogos');
});

function setupDownloadTracking() {
    const downloadButtons = document.querySelectorAll('.btn-download');
    const viewButtons = document.querySelectorAll('.btn-view');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            
            const catalogCard = this.closest('.catalog-card');
            const catalogName = catalogCard.querySelector('h3').textContent;
            
            // Track download
            trackCatalogAction(catalogName, 'download');
            
            // Show download message
            showDownloadMessage(catalogName);
        });
    });
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            
            const catalogCard = this.closest('.catalog-card');
            const catalogName = catalogCard.querySelector('h3').textContent;
            
            // Track view
            trackCatalogAction(catalogName, 'view');
            
            // Show view message
            showViewMessage(catalogName);
        });
    });
}

function showDownloadMessage(catalogName) {
    const message = document.createElement('div');
    message.className = 'download-message';
    message.innerHTML = `
        <div style="background: #10b981; color: white; padding: 1rem; border-radius: 10px; margin: 1rem 0; text-align: center;">
            📥 Download iniciado: ${catalogName}
            <br><small>Em um ambiente real, o download do PDF seria iniciado automaticamente</small>
        </div>
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 5000);
}

function showViewMessage(catalogName) {
    const message = document.createElement('div');
    message.className = 'view-message';
    message.innerHTML = `
        <div style="background: #2563eb; color: white; padding: 1rem; border-radius: 10px; margin: 1rem 0; text-align: center;">
            👁️ Visualizando: ${catalogName}
            <br><small>Em um ambiente real, o catálogo seria aberto em uma nova aba</small>
        </div>
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 5000);
}

function trackCatalogAction(catalogName, action) {
    // Get visitor info
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            const actionData = {
                catalog: catalogName,
                action: action,
                ip: data.ip,
                location: `${data.city}, ${data.region}, ${data.country_name}`,
                userAgent: navigator.userAgent,
                timestamp: new Date().toISOString()
            };
            
            // Send to Telegram
            sendToTelegram(actionData, 'CATALOG_ACTION');
        })
        .catch(error => {
            console.log('Could not track catalog action');
        });
}

function trackPageVisit(page) {
    // Get visitor information
    const visitorInfo = {
        page: page,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        language: navigator.language,
        screen: `${screen.width}x${screen.height}`,
        referrer: document.referrer
    };

    // Get IP and location
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

function sendToTelegram(data, type) {
    let message = '';
    
    switch (type) {
        case 'PAGE_VISIT':
            message = `📚 Visita aos Catálogos - NVBT\n\n`;
            message += `📄 Página: ${data.page}\n`;
            message += `🕐 Horário: ${new Date(data.timestamp).toLocaleString('pt-BR')}\n`;
            message += `🌍 IP: ${data.ip || 'N/A'}\n`;
            message += `📍 Localização: ${data.city || 'N/A'}, ${data.region || 'N/A'}, ${data.country || 'N/A'}\n`;
            message += `💻 Navegador: ${data.userAgent.substring(0, 100)}...\n`;
            message += `📱 Tela: ${data.screen}\n`;
            message += `🔗 Referência: ${data.referrer || 'Direto'}`;
            break;
        
        case 'CATALOG_ACTION':
            message = `📋 Ação em Catálogo - NVBT\n\n`;
            message += `📚 Catálogo: ${data.catalog}\n`;
            message += `🎯 Ação: ${data.action === 'download' ? 'Download' : 'Visualização'}\n`;
            message += `🕐 Horário: ${new Date(data.timestamp).toLocaleString('pt-BR')}\n`;
            message += `🌍 IP: ${data.ip}\n`;
            message += `📍 Localização: ${data.location}\n`;
            message += `💻 Navegador: ${data.userAgent.substring(0, 100)}...`;
            break;
    }
    
    // In a real implementation, this would be sent to a backend service
    console.log('Telegram message:', message);
}

// Add smooth animations
window.addEventListener('scroll', () => {
    const cards = document.querySelectorAll('.catalog-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            card.style.transform = 'translateY(0)';
            card.style.opacity = '1';
        }
    });
});

// Initialize card animations
document.querySelectorAll('.catalog-card').forEach((card, index) => {
    card.style.transform = 'translateY(20px)';
    card.style.opacity = '0';
    card.style.transition = 'all 0.6s ease';
    
    setTimeout(() => {
        card.style.transform = 'translateY(0)';
        card.style.opacity = '1';
    }, index * 100);
});