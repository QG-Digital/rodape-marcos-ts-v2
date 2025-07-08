// Institutional page functionality
document.addEventListener('DOMContentLoaded', function() {
    // FAQ functionality
    setupFAQ();
    
    // Video modal functionality
    setupVideoModals();
    
    // Smooth animations
    setupScrollAnimations();
    
    // Track page visit
    trackPageVisit('institucional');
});

function setupFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
}

function setupVideoModals() {
    const videoItems = document.querySelectorAll('.video-item');
    
    videoItems.forEach(item => {
        const playButton = item.querySelector('.play-button');
        const videoTitle = item.querySelector('h3').textContent;
        const videoId = item.dataset.videoId; // Lê o ID do vídeo do atributo data

        if (!videoId) return; // Se não tiver ID, não faz nada
        
        playButton.addEventListener('click', () => {
            const modal = createVideoModal(videoTitle, videoId);
            document.body.appendChild(modal);
            
            modal.style.display = 'block';
            
            const closeBtn = modal.querySelector('.close');
            closeBtn.addEventListener('click', () => {
                document.body.removeChild(modal);
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                }
            });
        });
    });
}

function createVideoModal(title, videoId) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex'; // Usar flex para centralizar melhor
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';

    modal.innerHTML = `
        <div class="modal-content" style="max-width: 800px; background: #000; padding: 0; border: none;">
            <span class="close" style="top: -30px; right: 0; color: #fff; font-size: 2rem;">×</span>
            <div class="video-container" style="position: relative; width: 100%; padding-bottom: 56.25%; height: 0;">
                <iframe 
                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
                    src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" 
                    title="${title}" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowfullscreen>
                </iframe>
            </div>
        </div>
    `;
    
    return modal;
}

function getVideoDescription(index) {
    const descriptions = [
        "institucional da NVBT, mostrando nossa história desde a fundação",
        "dos processos produtivos e tecnologias utilizadas na fabricação",
        "sobre nossas práticas sustentáveis e responsabilidade ambiental"
    ];
    
    return descriptions[index] || "institucional da empresa";
}

function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Special animation for timeline items
                if (entry.target.classList.contains('timeline-item')) {
                    setTimeout(() => {
                        entry.target.style.transform = 'translateX(0)';
                        entry.target.style.opacity = '1';
                    }, 100);
                }
            }
        });
    }, observerOptions);

    // Observe timeline items
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
        item.style.opacity = '0';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });

    // Observe other sections
    document.querySelectorAll('.about-section, .mvv-section, .team-section, .technology-section, .sustainability-section, .faq-section, .videos-section').forEach(section => {
        observer.observe(section);
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
            message = `🏢 Visita Institucional - NVBT\n\n`;
            message += `📄 Página: ${data.page}\n`;
            message += `🕐 Horário: ${new Date(data.timestamp).toLocaleString('pt-BR')}\n`;
            message += `🌍 IP: ${data.ip || 'N/A'}\n`;
            message += `📍 Localização: ${data.city || 'N/A'}, ${data.region || 'N/A'}, ${data.country || 'N/A'}\n`;
            message += `💻 Navegador: ${data.userAgent.substring(0, 100)}...\n`;
            message += `📱 Tela: ${data.screen}\n`;
            message += `🔗 Referência: ${data.referrer || 'Direto'}`;
            break;
    }
    
    // In a real implementation, this would be sent to a backend service
    console.log('Telegram message:', message);
}

// Add smooth scrolling for internal links
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

// Add timeline animation on scroll
window.addEventListener('scroll', () => {
    const timeline = document.querySelector('.timeline');
    if (timeline) {
        const rect = timeline.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            timeline.classList.add('animate');
        }
    }
});

// Keyboard navigation for FAQ
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        const activeElement = document.activeElement;
        if (activeElement.classList.contains('faq-question')) {
            e.preventDefault();
            activeElement.click();
        }
    }
});

// Add accessibility attributes
document.querySelectorAll('.faq-question').forEach(question => {
    question.setAttribute('tabindex', '0');
    question.setAttribute('role', 'button');
    question.setAttribute('aria-expanded', 'false');
    
    const item = question.closest('.faq-item');
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const isActive = item.classList.contains('active');
                question.setAttribute('aria-expanded', isActive.toString());
            }
        });
    });
    
    observer.observe(item, {
        attributes: true,
        attributeFilter: ['class']
    });
});