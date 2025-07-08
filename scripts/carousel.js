// Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentSlide = 0;
    let autoSlideInterval;
    
    // Initialize carousel
    function initCarousel() {
        showSlide(currentSlide);
        startAutoSlide();
    }
    
    // Show specific slide
    function showSlide(index) {
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active', 'prev'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current slide and indicator
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        
        // Add prev class to previous slide for animation
        if (index > 0) {
            slides[index - 1].classList.add('prev');
        } else {
            slides[slides.length - 1].classList.add('prev');
        }
        
        currentSlide = index;
    }
    
    // Next slide
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }
    
    // Previous slide
    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }
    
    // Start auto slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // 5 seconds
    }
    
    // Stop auto slide
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Restart auto slide
    function restartAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }
    
    // Add event listeners to indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            restartAutoSlide();
        });
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            restartAutoSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            restartAutoSlide();
        }
    });
    
    // Pause auto slide on hover
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoSlide();
    });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoSlide();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        }
    }
    
    // Initialize the carousel
    initCarousel();
});