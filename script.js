// Language Switching
document.addEventListener('DOMContentLoaded', function() {
    // Language dropdown handlers
    const langSwitcher = document.querySelector('.lang-switcher');
    const langDropdownBtn = document.getElementById('langDropdownBtn');
    const langDropdownMenu = document.getElementById('langDropdownMenu');
    const langCurrent = document.querySelector('.lang-current');
    const langOptions = document.querySelectorAll('.lang-option');

    // Function to update dropdown button text
    function updateLangButton(lang) {
        const langText = lang === 'sq' ? 'SQ' : lang === 'en' ? 'EN' : 'IT';
        langCurrent.textContent = langText;
        
        // Update active state in dropdown
        langOptions.forEach(opt => {
            opt.classList.remove('active');
            if (opt.getAttribute('data-lang') === lang) {
                opt.classList.add('active');
            }
        });
    }

    // Toggle dropdown
    langDropdownBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        langSwitcher.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!langSwitcher.contains(e.target)) {
            langSwitcher.classList.remove('active');
        }
    });

    // Handle language selection
    langOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            
            // Update dropdown button
            updateLangButton(lang);
            
            // Translate page
            translatePage(lang);
            
            // Close dropdown
            langSwitcher.classList.remove('active');
        });
    });

    // Override translatePage to also update dropdown button
    const originalTranslatePage = window.translatePage;
    window.translatePage = function(lang) {
        originalTranslatePage(lang);
        updateLangButton(lang);
    };

    // Initialize language
    translatePage('sq');

    // Hero Slider
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        if (index >= totalSlides) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = index;
        }
        slides[currentSlide].classList.add('active');
    }

    window.changeSlide = function(direction) {
        showSlide(currentSlide + direction);
    };

    // Auto-slide every 5 seconds
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);

    // Menu Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    const menuCategories = document.querySelectorAll('.menu-category');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            menuItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });

            // Hide/show categories based on visible items
            menuCategories.forEach(category => {
                const categoryType = category.getAttribute('data-category');
                const visibleItems = Array.from(category.querySelectorAll('.menu-item')).filter(
                    item => !item.classList.contains('hidden')
                );
                
                if (filter === 'all' || (categoryType === filter && visibleItems.length > 0)) {
                    category.classList.remove('hidden');
                } else if (filter !== 'all' && categoryType === filter && visibleItems.length === 0) {
                    category.classList.add('hidden');
                } else if (filter !== 'all' && categoryType !== filter) {
                    category.classList.add('hidden');
                }
            });
        });
    });

    // Gallery Carousel
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentGalleryItem = document.querySelector('.gallery-item--main');
    const galleryLeftBtn = document.getElementById('galleryLeftBtn');
    const galleryRightBtn = document.getElementById('galleryRightBtn');

    galleryRightBtn.addEventListener('click', function() {
        currentGalleryItem = document.querySelector('.gallery-item--right');
        const leftItem = document.querySelector('.gallery-item--main');
        
        galleryItems.forEach((item) => {
            item.classList = 'gallery-item';
        });
        
        currentGalleryItem.classList.add('gallery-item--main');
        leftItem.classList.add('gallery-item--left');
        
        const currentId = Array.from(galleryItems).indexOf(currentGalleryItem);
        const rightItem = currentId === galleryItems.length - 1 ? galleryItems[0] : galleryItems[currentId + 1];
        rightItem.classList.add('gallery-item--right');
    });

    galleryLeftBtn.addEventListener('click', function() {
        currentGalleryItem = document.querySelector('.gallery-item--left');
        const rightItem = document.querySelector('.gallery-item--main');
        
        galleryItems.forEach((item) => {
            item.classList = 'gallery-item';
        });
        
        currentGalleryItem.classList.add('gallery-item--main');
        rightItem.classList.add('gallery-item--right');
        
        const currentId = Array.from(galleryItems).indexOf(currentGalleryItem);
        const leftItem = currentId === 0 ? galleryItems[galleryItems.length - 1] : galleryItems[currentId - 1];
        leftItem.classList.add('gallery-item--left');
    });

    // Auto-advance gallery every 5 seconds
    setInterval(() => {
        galleryRightBtn.click();
    }, 5000);

    // Gallery Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    let currentLightboxIndex = 0;

    galleryItems.forEach((item) => {
        const img = item.querySelector('img');
        img.addEventListener('click', function() {
            const mainItem = document.querySelector('.gallery-item--main');
            currentLightboxIndex = Array.from(galleryItems).indexOf(mainItem);
            openLightbox();
        });
    });

    function openLightbox() {
        lightbox.classList.add('active');
        const mainItem = document.querySelector('.gallery-item--main');
        const img = mainItem.querySelector('img');
        lightboxImg.src = img.src;
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    function showNextLightboxImage() {
        const mainItem = document.querySelector('.gallery-item--main');
        currentLightboxIndex = Array.from(galleryItems).indexOf(mainItem);
        currentLightboxIndex = (currentLightboxIndex + 1) % galleryItems.length;
        const img = galleryItems[currentLightboxIndex].querySelector('img');
        lightboxImg.src = img.src;
    }

    function showPrevLightboxImage() {
        const mainItem = document.querySelector('.gallery-item--main');
        currentLightboxIndex = Array.from(galleryItems).indexOf(mainItem);
        currentLightboxIndex = (currentLightboxIndex - 1 + galleryItems.length) % galleryItems.length;
        const img = galleryItems[currentLightboxIndex].querySelector('img');
        lightboxImg.src = img.src;
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxNext.addEventListener('click', showNextLightboxImage);
    lightboxPrev.addEventListener('click', showPrevLightboxImage);

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', function(e) {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowRight') {
                showNextLightboxImage();
            } else if (e.key === 'ArrowLeft') {
                showPrevLightboxImage();
            }
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    let lastScroll = 0;
    const nav = document.querySelector('nav');

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.menu-item, .testimonial-card').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Add fade-in to gallery section
    const gallerySection = document.querySelector('.gallery-section');
    const galleryCarousel = document.querySelector('.gallery-carousel');
    if (gallerySection) {
        gallerySection.classList.add('fade-in');
        observer.observe(gallerySection);
    }
    if (galleryCarousel) {
        galleryCarousel.classList.add('fade-in');
        observer.observe(galleryCarousel);
    }


    // Testimonials Slider
    const testimonialsTrack = document.querySelector('.testimonials-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentTestimonialIndex = 0;
    let cardsPerView = window.innerWidth > 768 ? 4 : (window.innerWidth > 480 ? 2 : 1);
    const totalTestimonials = testimonialCards.length;
    let isTestimonialTransitioning = false;

    function getCardsPerView() {
        if (window.innerWidth > 1200) return 4;
        if (window.innerWidth > 768) return 3;
        if (window.innerWidth > 480) return 2;
        return 1;
    }

    function updateTestimonialsSlider() {
        if (isTestimonialTransitioning) return;
        isTestimonialTransitioning = true;

        cardsPerView = getCardsPerView();
        const cardWidth = testimonialsTrack.offsetWidth / cardsPerView;
        const translateX = -currentTestimonialIndex * cardWidth * cardsPerView;
        
        testimonialsTrack.style.transform = `translateX(${translateX}px)`;

        setTimeout(() => {
            isTestimonialTransitioning = false;
        }, 600);
    }

    window.changeTestimonialsSlide = function(direction) {
        if (isTestimonialTransitioning) return;
        
        cardsPerView = getCardsPerView();
        const maxIndex = Math.ceil(totalTestimonials / cardsPerView) - 1;
        
        if (direction === 1) {
            if (currentTestimonialIndex < maxIndex) {
                currentTestimonialIndex++;
            } else {
                currentTestimonialIndex = 0;
            }
        } else {
            if (currentTestimonialIndex > 0) {
                currentTestimonialIndex--;
            } else {
                currentTestimonialIndex = maxIndex;
            }
        }
        
        updateTestimonialsSlider();
    };

    // Initialize testimonials slider
    updateTestimonialsSlider();

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const newCardsPerView = getCardsPerView();
            if (newCardsPerView !== cardsPerView) {
                currentTestimonialIndex = 0;
            }
            updateTestimonialsSlider();
        }, 250);
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
});

