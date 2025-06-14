/*
* 1313FOG Website - Modern 2025 Design
* www.1313fog.com
* 
* Main JavaScript File
*/

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components after DOM is loaded
    initLoader();
    initThemeToggle();
    initMobileMenu();
    initScrollAnimations();
    initStickyHeader();
    initScrollToTop();
    initCookieConsent();
    initParallaxEffect();
    initLazyLoading();
    initSmoothScroll();
    initStoreLocatorTabs();
    initFormValidation();
});

/**
 * Page Loader Animation
 * Displays a loading animation until all page content is fully loaded
 */
function initLoader() {
    const loader = document.getElementById('loader');
    
    if (!loader) return;
    
    // Hide loader after page is fully loaded with a slight delay for visual effect
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 800);
    });
    
    // Fallback to hide loader even if load event doesn't fire properly
    setTimeout(() => {
        if (loader) loader.classList.add('hidden');
    }, 3000);
}

/**
 * Theme Toggle (Dark/Light Mode)
 * Implements a user preference-based theme toggle with local storage persistence
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (!themeToggle) return;
    
    // Check for saved theme preference or respect OS preference
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    // Apply the right theme based on saved preference or OS preference
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkMode)) {
        document.body.classList.add('dark');
    }
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', () => {
        const isDarkMode = document.body.classList.toggle('dark');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        
        // Add a subtle animation when switching themes
        document.body.style.transition = 'background-color 0.3s, color 0.3s';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    });
    
    // Listen for OS theme preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            document.body.classList.toggle('dark', e.matches);
        }
    });
}

/**
 * Mobile Menu Functionality
 * Handles mobile navigation menu opening, closing, and interaction
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileClose = document.querySelector('.mobile-close');
    
    if (!menuToggle || !mobileMenu) return;
    
    // Toggle mobile menu
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        document.body.classList.toggle('mobile-menu-open');
        menuToggle.setAttribute('aria-expanded', mobileMenu.classList.contains('active'));
        
        // Prevent body scrolling when menu is open
        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            mobileMenu.setAttribute('aria-hidden', 'false');
        } else {
            document.body.style.overflow = '';
            mobileMenu.setAttribute('aria-hidden', 'true');
        }
    });
    
    // Close mobile menu with the close button
    if (mobileClose) {
        mobileClose.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.classList.remove('mobile-menu-open');
            document.body.style.overflow = '';
            menuToggle.setAttribute('aria-expanded', 'false');
            mobileMenu.setAttribute('aria-hidden', 'true');
        });
    }
    
    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.classList.remove('mobile-menu-open');
            document.body.style.overflow = '';
            menuToggle.setAttribute('aria-expanded', 'false');
            mobileMenu.setAttribute('aria-hidden', 'true');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (
            mobileMenu.classList.contains('active') &&
            !mobileMenu.contains(e.target) &&
            !menuToggle.contains(e.target)
        ) {
            mobileMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.classList.remove('mobile-menu-open');
            document.body.style.overflow = '';
            menuToggle.setAttribute('aria-expanded', 'false');
            mobileMenu.setAttribute('aria-hidden', 'true');
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.classList.remove('mobile-menu-open');
            document.body.style.overflow = '';
            menuToggle.setAttribute('aria-expanded', 'false');
            mobileMenu.setAttribute('aria-hidden', 'true');
        }
    });
}

/**
 * Scroll Animations
 * Reveals elements with animations as they scroll into the viewport
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll, [data-animation]');
    
    if (!animatedElements.length) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        // Add a small random delay for staggered animations
        const delay = Math.random() * 0.4;
        element.style.transitionDelay = `${delay}s`;
        observer.observe(element);
    });
}

/**
 * Sticky Header
 * Adds a class to the header when scrolling down to create a sticky effect
 */
function initStickyHeader() {
    const header = document.getElementById('main-header');
    
    if (!header) return;
    
    // Initial check in case page is refreshed while already scrolled down
    toggleHeaderClass();
    
    // Update header class on scroll
    window.addEventListener('scroll', toggleHeaderClass);
    
    function toggleHeaderClass() {
        // Add scroll class after scrolling 80px
        if (window.scrollY > 80) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    }
}

/**
 * Scroll to Top Button
 * Shows a button to scroll back to the top when user scrolls down the page
 */
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    if (!scrollToTopBtn) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top with smooth animation when clicking the button
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Cookie Consent Banner
 * Displays a GDPR/CCPA compliant cookie consent banner for first-time visitors
 */
function initCookieConsent() {
    const cookieConsent = document.getElementById('cookie-consent');
    const acceptBtn = document.getElementById('accept-cookies');
    const declineBtn = document.getElementById('decline-cookies');
    
    if (!cookieConsent || !acceptBtn || !declineBtn) return;
    
    // Check if user has already set cookie preference
    const cookiePreference = localStorage.getItem('cookie-consent');
    
    // Show consent banner if no preference is saved
    if (!cookiePreference) {
        setTimeout(() => {
            cookieConsent.classList.add('active');
        }, 1500);
    }
    
    // Handle accept button
    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookie-consent', 'accepted');
        cookieConsent.classList.remove('active');
        
        // Here you would initialize analytic cookies, etc.
    });
    
    // Handle decline button
    declineBtn.addEventListener('click', () => {
        localStorage.setItem('cookie-consent', 'declined');
        cookieConsent.classList.remove('active');
    });
}

/**
 * Parallax Effect
 * Creates a parallax scrolling effect for elements with the 'parallax' class
 */
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (!parallaxElements.length) return;
    
    // Skip parallax on mobile devices for better performance
    if (window.innerWidth < 768) return;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        
        parallaxElements.forEach(element => {
            // Get element's position relative to viewport
            const elementTop = element.getBoundingClientRect().top + scrollTop;
            const elementVisible = elementTop - window.innerHeight;
            
            // Only apply parallax when element is in view
            if (scrollTop > elementVisible) {
                // Calculate parallax offset (adjust speed with the 0.4 value)
                const offset = (scrollTop - elementVisible) * 0.4;
                
                // Apply transform for smooth parallax effect
                element.style.backgroundPositionY = `calc(50% + ${offset}px)`;
            }
        });
    });
}

/**
 * Lazy Loading
 * Loads images only when they are about to enter the viewport
 */
function initLazyLoading() {
    // Check if browser supports native lazy loading
    if ('loading' in HTMLImageElement.prototype) {
        // Use native lazy loading
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    } else {
        // Use IntersectionObserver as fallback
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        if (!lazyImages.length) return;
        
        const lazyImageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    lazyImageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(image => {
            lazyImageObserver.observe(image);
        });
    }
}

/**
 * Smooth Scroll
 * Implements smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate header height for offset
                const headerHeight = document.getElementById('main-header')?.offsetHeight || 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL hash without scrolling
                history.pushState(null, null, targetId);
            }
        });
    });
}

/**
 * Store Locator Tabs
 * Handles tab switching in the store locator section
 */
function initStoreLocatorTabs() {
    const tabButtons = document.querySelectorAll('.store-tab-button');
    const tabContents = document.querySelectorAll('.store-tab-content');
    
    if (!tabButtons.length || !tabContents.length) return;
    
    // Set first tab as active by default
    tabButtons[0]?.classList.add('active');
    tabContents[0]?.classList.add('active');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to current button and content
            button.classList.add('active');
            document.getElementById(targetId)?.classList.add('active');
        });
    });
}

/**
 * Form Validation
 * Adds custom form validation to contact and newsletter forms
 */
function initFormValidation() {
    const forms = document.querySelectorAll('form[data-validate]');
    
    if (!forms.length) return;
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            const formElements = form.elements;
            
            // Check each form element with required attribute
            for (let i = 0; i < formElements.length; i++) {
                const element = formElements[i];
                
                if (element.hasAttribute('required')) {
                    const errorMessage = element.getAttribute('data-error-message') || 'This field is required';
                    
                    // Remove any existing error messages
                    const existingError = element.parentElement.querySelector('.form-error');
                    if (existingError) {
                        existingError.remove();
                    }
                    element.classList.remove('error');
                    
                    // Validate based on element type
                    let elementIsValid = true;
                    
                    // Check for empty values
                    if (!element.value.trim()) {
                        elementIsValid = false;
                    }
                    
                    // Email validation
                    if (element.type === 'email' && element.value.trim()) {
                        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailPattern.test(element.value)) {
                            elementIsValid = false;
                        }
                    }
                    
                    // Phone validation (basic)
                    if (element.type === 'tel' && element.value.trim()) {
                        const phonePattern = /^[\d\s\+\-\(\)]{10,15}$/;
                        if (!phonePattern.test(element.value)) {
                            elementIsValid = false;
                        }
                    }
                    
                    // Add error styling and message if invalid
                    if (!elementIsValid) {
                        isValid = false;
                        element.classList.add('error');
                        
                        const errorElement = document.createElement('div');
                        errorElement.className = 'form-error';
                        errorElement.textContent = errorMessage;
                        element.parentElement.appendChild(errorElement);
                    }
                }
            }
            
            // If form is valid, either submit or show success message
            if (isValid) {
                const formType = form.getAttribute('data-form-type');
                
                if (formType === 'contact') {
                    // For contact forms, show success message (in real app, you'd submit the form)
                    const successMessage = form.getAttribute('data-success-message') || 'Thank you for your message!';
                    showFormSuccess(form, successMessage);
                } else if (formType === 'newsletter') {
                    // For newsletter forms, show success message (in real app, you'd submit the form)
                    const successMessage = form.getAttribute('data-success-message') || 'Thank you for subscribing!';
                    showFormSuccess(form, successMessage);
                } else {
                    // Regular forms can just submit normally
                    form.submit();
                }
            }
        });
    });
    
    // Helper function to show success message
    function showFormSuccess(form, message) {
        // Create success message element
        const successElement = document.createElement('div');
        successElement.className = 'form-success';
        successElement.textContent = message;
        
        // Clear the form and append the success message
        form.innerHTML = '';
        form.appendChild(successElement);
    }
}

/**
 * Detect when all animations have completed
 * Used to remove preload class after initial animations
 */
window.addEventListener('load', function() {
    setTimeout(() => {
        document.body.classList.remove('preload');
    }, 100);
});
