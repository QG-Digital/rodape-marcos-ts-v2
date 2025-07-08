// Gallery page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Setup gallery modal
    setupGalleryModal();
    
    // Setup gallery animations
    setupGalleryAnimations();
    
    // Track page visit
    trackPageVisit('galeria');
});

function setupGalleryModal() {
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const closeBtn = modal.querySelector('.close');
    const prevBtn = document.getElementById('prev-image');
    const nextBtn = document.getElementById('next-image');
    
    let currentImageIndex = 0;
    let currentImages = [];
    
    // Get all gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Setup click handlers for gallery items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentImages = Array.from(galleryItems);
            currentImageIndex = index;
            showImage(currentImageIndex);
            modal.style.display = 'block';
            
            // Track image view
            trackImageView(item);
        });
    });
    
    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Previous image
    prevBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
        showImage(currentImageIndex);
    });
    
    // Next image
    nextBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % currentImages.length;
        showImage(currentImageIndex);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            } else if (e.key === 'Escape') {
                modal.style.display = 'none';
            }
        }
    });
    
    function showImage(index) {
        const item = currentImages[index];
        const img = item.querySelector('img');
        const overlay = item.querySelector('.gallery-overlay');
        const title = overlay.querySelector('h3').textContent;
        const description = overlay.querySelector('p').textContent;
        
        modalImage.src = img.src;
        modalImage.alt = img.alt;
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        
        // Update navigation buttons
        prevBtn.style.display = currentImages.length > 1 ? 'block' : 'none';
        nextBtn.style.display = currentImages.length > 1 ? 'block' : 'none';
    }
}

function setupGalleryAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe gallery items
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
        .gallery-item.animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

function trackImageView(item) {
    const img = item.querySelector('img');
    const overlay = item.querySelector('.gallery-overlay');
    const title = overlay.querySelector('h3').textContent;
    const category = item.dataset.category;
    
    // Get visitor info
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            const viewData = {
                image: title,
                category: category,
                imageSrc: img.src,
                ip: data.ip,
                location: `${data.city}, ${data.region}, ${data.country_name}`,
                userAgent: navigator.userAgent,
                timestamp: new Date().toISOString()
            };
            
            // Send to Telegram
            sendToTelegram(viewData, 'IMAGE_VIEW');
        })
        .catch(error => {
            console.log('Could not track image view');
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
            message = `🖼️ Visita à Galeria - NVBT\n\n`;
            message += `📄 Página: ${data.page}\n`;
            message += `🕐 Horário: ${new Date(data.timestamp).toLocaleString('pt-BR')}\n`;
            message += `🌍 IP: ${data.ip || 'N/A'}\n`;
            message += `📍 Localização: ${data.city || 'N/A'}, ${data.region || 'N/A'}, ${data.country || 'N/A'}\n`;
            message += `💻 Navegador: ${data.userAgent.substring(0, 100)}...\n`;
            message += `📱 Tela: ${data.screen}\n`;
            message += `🔗 Referência: ${data.referrer || 'Direto'}`;
            break;
        
        case 'IMAGE_VIEW':
            message = `📸 Visualização de Imagem - NVBT Galeria\n\n`;
            message += `🖼️ Imagem: ${data.image}\n`;
            message += `📂 Categoria: ${data.category}\n`;
            message += `🕐 Horário: ${new Date(data.timestamp).toLocaleString('pt-BR')}\n`;
            message += `🌍 IP: ${data.ip}\n`;
            message += `📍 Localização: ${data.location}\n`;
            message += `💻 Navegador: ${data.userAgent.substring(0, 100)}...`;
            break;
    }
    
    // In a real implementation, this would be sent to a backend service
    console.log('Telegram message:', message);
}

// Add hover effects for gallery items
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const overlay = this.querySelector('.gallery-overlay');
        overlay.style.opacity = '1';
        this.style.transform = 'scale(1.05)';
    });
    
    item.addEventListener('mouseleave', function() {
        const overlay = this.querySelector('.gallery-overlay');
        overlay.style.opacity = '0';
        this.style.transform = 'scale(1)';
    });
});