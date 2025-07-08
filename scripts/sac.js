// SAC page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Setup form submission
    setupSACForm();
    
    // Track page visit
    trackPageVisit('sac');
});

function setupSACForm() {
    const sacForm = document.getElementById('sac-form');
    const successModal = document.getElementById('success-modal');
    
    sacForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const sacData = {
            name: formData.get('name'),
            contact: formData.get('contact'),
            product: formData.get('product'),
            type: formData.get('type'),
            description: formData.get('description'),
            timestamp: new Date().toISOString()
        };

        // Validate form
        const errors = validateSACForm(sacData);
        if (errors.length > 0) {
            showError('Erro no formulário:\n' + errors.join('\n'));
            return;
        }

        // Show loading state
        const submitBtn = e.target.querySelector('.btn-primary');
        const originalText = submitBtn.textContent;
        showLoading(submitBtn);

        // Simulate API call
        setTimeout(() => {
            hideLoading(submitBtn, originalText);
            
            // Generate protocol number
            const protocolNumber = generateSACProtocol();
            document.getElementById('sac-protocol').textContent = protocolNumber;
            
            // Show success modal
            successModal.style.display = 'block';
            
            // Reset form
            e.target.reset();
            
            // Track SAC submission
            trackSACSubmission({...sacData, protocol: protocolNumber});
        }, 1500);
    });

    // Modal close functionality
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

    // Format phone input
    const contactInput = document.getElementById('sac-contact');
    contactInput.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        
        if (value.length <= 10) {
            value = value.replace(/(\d{2})(\d)/, '($1) $2');
            value = value.replace(/(\d{4})(\d)/, '$1-$2');
        } else {
            value = value.replace(/(\d{2})(\d)/, '($1) $2');
            value = value.replace(/(\d{5})(\d)/, '$1-$2');
        }
        
        this.value = value;
    });
}

function validateSACForm(data) {
    const errors = [];
    
    if (!data.name || data.name.length < 2) {
        errors.push('Nome deve ter pelo menos 2 caracteres');
    }
    
    if (!data.contact || data.contact.length < 10) {
        errors.push('Número de contato inválido');
    }
    
    if (!data.type) {
        errors.push('Selecione o tipo de atendimento');
    }
    
    if (!data.description || data.description.length < 10) {
        errors.push('Descrição deve ter pelo menos 10 caracteres');
    }
    
    return errors;
}

function generateSACProtocol() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    
    return `SAC${year}${month}${day}${random}`;
}

function showLoading(element) {
    element.innerHTML = '<span class="loading-spinner"></span> Enviando...';
    element.disabled = true;
}

function hideLoading(element, originalText) {
    element.innerHTML = originalText;
    element.disabled = false;
}

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

function trackSACSubmission(sacData) {
    // Get visitor info
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            const submissionData = {
                ...sacData,
                ip: data.ip,
                location: `${data.city}, ${data.region}, ${data.country_name}`,
                userAgent: navigator.userAgent
            };
            
            // Send to Telegram
            sendToTelegram(submissionData, 'SAC_REQUEST');
        })
        .catch(error => {
            console.log('Could not track SAC submission');
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
            message = `🎧 Visita ao SAC - NVBT\n\n`;
            message += `📄 Página: ${data.page}\n`;
            message += `🕐 Horário: ${new Date(data.timestamp).toLocaleString('pt-BR')}\n`;
            message += `🌍 IP: ${data.ip || 'N/A'}\n`;
            message += `📍 Localização: ${data.city || 'N/A'}, ${data.region || 'N/A'}, ${data.country || 'N/A'}\n`;
            message += `💻 Navegador: ${data.userAgent.substring(0, 100)}...\n`;
            message += `📱 Tela: ${data.screen}\n`;
            message += `🔗 Referência: ${data.referrer || 'Direto'}`;
            break;
        
        case 'SAC_REQUEST':
            message = `🔧 Nova Solicitação SAC - NVBT\n\n`;
            message += `📋 Protocolo: ${data.protocol}\n`;
            message += `👤 Nome: ${data.name}\n`;
            message += `📱 Contato: ${data.contact}\n`;
            message += `🛍️ Produto: ${data.product || 'Não informado'}\n`;
            message += `🎯 Tipo: ${data.type}\n`;
            message += `📝 Descrição: ${data.description}\n`;
            message += `🕐 Horário: ${new Date(data.timestamp).toLocaleString('pt-BR')}\n`;
            message += `🌍 IP: ${data.ip}\n`;
            message += `📍 Localização: ${data.location}\n\n`;
            message += `⚡ Prioridade: ${getPriority(data.type)}`;
            break;
    }
    
    // In a real implementation, this would be sent to a backend service
    console.log('Telegram message:', message);
}

function getPriority(type) {
    const priorities = {
        'suporte-tecnico': 'ALTA',
        'garantia': 'ALTA',
        'instalacao': 'MÉDIA',
        'manutencao': 'MÉDIA',
        'treinamento': 'BAIXA',
        'outros': 'BAIXA'
    };
    
    return priorities[type] || 'MÉDIA';
}

// Add CSS for loading spinner
const style = document.createElement('style');
style.textContent = `
    .loading-spinner {
        width: 20px;
        height: 20px;
        border: 2px solid #f3f3f3;
        border-top: 2px solid #2563eb;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        display: inline-block;
        margin-right: 0.5rem;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Add working hours highlighting
document.addEventListener('DOMContentLoaded', function() {
    const now = new Date();
    const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const currentHour = now.getHours();
    
    // Check if it's a working day and time
    const isWorkingDay = currentDay >= 1 && currentDay <= 5; // Monday to Friday
    const isWorkingTime = currentHour >= 8 && currentHour < 18;
    
    if (isWorkingDay && isWorkingTime) {
        const statusDiv = document.createElement('div');
        statusDiv.className = 'working-status';
        statusDiv.innerHTML = `
            <div style="background: #10b981; color: white; padding: 1rem; border-radius: 10px; margin: 2rem 0; text-align: center;">
                🟢 SAC Online - Estamos disponíveis agora!
            </div>
        `;
        
        const container = document.querySelector('.content-wrapper');
        container.insertBefore(statusDiv, container.firstChild);
    } else {
        const statusDiv = document.createElement('div');
        statusDiv.className = 'working-status';
        statusDiv.innerHTML = `
            <div style="background: #f59e0b; color: white; padding: 1rem; border-radius: 10px; margin: 2rem 0; text-align: center;">
                🟡 SAC Offline - Fora do horário de atendimento
            </div>
        `;
        
        const container = document.querySelector('.content-wrapper');
        container.insertBefore(statusDiv, container.firstChild);
    }
});