// Contact page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Setup form submission
    setupContactForm();
    
    // Track page visit
    trackPageVisit('contato');
});

function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    const successModal = document.getElementById('success-modal');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const contactData = {
            name: formData.get('name'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            timestamp: new Date().toISOString()
        };

        // Validate form
        const errors = validateContactForm(contactData);
        if (errors.length > 0) {
            showError('Erro no formulário:\n' + errors.join('\n'));
            return;
        }

        // Show loading state
        const submitBtn = e.target.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        showLoading(submitBtn);

        // Simulate API call
        setTimeout(() => {
            hideLoading(submitBtn, originalText);
            
            // Show success modal
            successModal.style.display = 'block';
            
            // Reset form
            e.target.reset();
            
            // Track contact submission
            trackContactSubmission(contactData);
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
}

function validateContactForm(data) {
    const errors = [];
    
    if (!data.name || data.name.length < 2) {
        errors.push('Nome deve ter pelo menos 2 caracteres');
    }
    
    if (!data.subject || data.subject.length < 5) {
        errors.push('Assunto deve ter pelo menos 5 caracteres');
    }
    
    if (!data.message || data.message.length < 10) {
        errors.push('Mensagem deve ter pelo menos 10 caracteres');
    }
    
    return errors;
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

function trackContactSubmission(contactData) {
    // Get visitor info
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            const submissionData = {
                ...contactData,
                ip: data.ip,
                location: `${data.city}, ${data.region}, ${data.country_name}`,
                userAgent: navigator.userAgent
            };
            
            // Send to Telegram
            sendToTelegram(submissionData, 'CONTACT_FORM');
        })
        .catch(error => {
            console.log('Could not track contact submission');
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
            message = `📞 Visita ao Contato - NVBT\n\n`;
            message += `📄 Página: ${data.page}\n`;
            message += `🕐 Horário: ${new Date(data.timestamp).toLocaleString('pt-BR')}\n`;
            message += `🌍 IP: ${data.ip || 'N/A'}\n`;
            message += `📍 Localização: ${data.city || 'N/A'}, ${data.region || 'N/A'}, ${data.country || 'N/A'}\n`;
            message += `💻 Navegador: ${data.userAgent.substring(0, 100)}...\n`;
            message += `📱 Tela: ${data.screen}\n`;
            message += `🔗 Referência: ${data.referrer || 'Direto'}`;
            break;
        
        case 'CONTACT_FORM':
            message = `📧 Novo Contato - NVBT\n\n`;
            message += `👤 Nome: ${data.name}\n`;
            message += `📝 Assunto: ${data.subject}\n`;
            message += `💬 Mensagem: ${data.message}\n`;
            message += `🕐 Horário: ${new Date(data.timestamp).toLocaleString('pt-BR')}\n`;
            message += `🌍 IP: ${data.ip}\n`;
            message += `📍 Localização: ${data.location}`;
            break;
    }
    
    // In a real implementation, this would be sent to a backend service
    console.log('Telegram message:', message);
}

// Add smooth animations for contact items
document.querySelectorAll('.contact-item').forEach((item, index) => {
    item.style.transform = 'translateY(20px)';
    item.style.opacity = '0';
    item.style.transition = 'all 0.6s ease';
    
    setTimeout(() => {
        item.style.transform = 'translateY(0)';
        item.style.opacity = '1';
    }, index * 200);
});

// Add hover effects for quick contact items
document.querySelectorAll('.quick-contact-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});