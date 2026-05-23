/* ================================
   Data Science Club - Main JavaScript
   ================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.action-carousel, .flyer-carousel, .leader-card, .meeting-card, .project-card, .minutes-item, .contact-item'
    );

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });

    // Add animation class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Stagger animation for grid items
    const staggerContainers = document.querySelectorAll(
        '.leadership-grid, .meeting-info, .projects-grid'
    );

    staggerContainers.forEach(container => {
        const items = container.children;
        Array.from(items).forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
        });
    });

    // Club in Action carousel
    const carousel = document.querySelector('.action-carousel');
    if (carousel) {
        const track = carousel.querySelector('.carousel-track');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevButton = carousel.querySelector('.carousel-prev');
        const nextButton = carousel.querySelector('.carousel-next');
        const dots = document.querySelectorAll('.carousel-dot');
        let currentSlide = 0;
        let autoAdvance;

        const showSlide = (index) => {
            currentSlide = (index + slides.length) % slides.length;
            track.style.transform = `translateX(-${currentSlide * 100}%)`;

            slides.forEach((slide, slideIndex) => {
                slide.classList.toggle('active', slideIndex === currentSlide);
            });

            dots.forEach((dot, dotIndex) => {
                dot.classList.toggle('active', dotIndex === currentSlide);
            });
        };

        const startAutoAdvance = () => {
            autoAdvance = window.setInterval(() => {
                showSlide(currentSlide + 1);
            }, 10000);
        };

        const stopAutoAdvance = () => {
            window.clearInterval(autoAdvance);
        };

        prevButton.addEventListener('click', () => {
            showSlide(currentSlide - 1);
            stopAutoAdvance();
        });

        nextButton.addEventListener('click', () => {
            showSlide(currentSlide + 1);
            stopAutoAdvance();
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                stopAutoAdvance();
            });
        });

        carousel.addEventListener('mouseenter', () => window.clearInterval(autoAdvance));
        startAutoAdvance();
    }

    // Event flyer carousel
    const flyerCarousel = document.querySelector('.flyer-carousel');
    if (flyerCarousel) {
        const track = flyerCarousel.querySelector('.flyer-track');
        const slides = flyerCarousel.querySelectorAll('.flyer-slide');
        const prevButton = flyerCarousel.querySelector('.flyer-prev');
        const nextButton = flyerCarousel.querySelector('.flyer-next');
        const dots = document.querySelectorAll('.flyer-dot');
        let currentSlide = 0;

        const showSlide = (index) => {
            currentSlide = (index + slides.length) % slides.length;
            track.style.transform = `translateX(-${currentSlide * 100}%)`;

            slides.forEach((slide, slideIndex) => {
                slide.classList.toggle('active', slideIndex === currentSlide);
            });

            dots.forEach((dot, dotIndex) => {
                dot.classList.toggle('active', dotIndex === currentSlide);
            });
        };

        prevButton.addEventListener('click', () => {
            showSlide(currentSlide - 1);
        });

        nextButton.addEventListener('click', () => {
            showSlide(currentSlide + 1);
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
            });
        });
    }
});
