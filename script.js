// Typewriter effect function with continuous loop
function typeWriter(element, text, speed = 150, pauseTime = 2000) {
    let i = 0;
    let isDeleting = false;
    element.textContent = '';
    
    function type() {
        if (!isDeleting && i < text.length) {
            // Typing forward
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (!isDeleting && i >= text.length) {
            // Finished typing, wait then start deleting
            setTimeout(function() {
                isDeleting = true;
                type();
            }, pauseTime);
        } else if (isDeleting && i > 0) {
            // Deleting backward
            element.textContent = text.substring(0, i - 1);
            i--;
            setTimeout(type, speed / 2); // Delete faster than typing
        } else {
            // Finished deleting, wait then start typing again
            isDeleting = false;
            setTimeout(type, pauseTime / 2);
        }
    }
    
    type();
}

// Smooth scrolling function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Stop pulse animation on CTA interaction
function stopCTAPulse() {
    const heroCTA = document.querySelector('.hero-cta');
    if (heroCTA) {
        heroCTA.style.animation = 'none';
    }
}

// First Entry Gradient Transition
function initFirstEntryGradient() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        const gradient = document.getElementById('first-entry-gradient');
        if (gradient) {
            gradient.classList.add('hidden');
        }
        return;
    }

    // Check if user has visited before
    const hasVisited = localStorage.getItem('revibe-has-visited');
    const gradient = document.getElementById('first-entry-gradient');
    const hero = document.querySelector('.hero');

    if (!gradient) return;

    if (hasVisited) {
        // Hide immediately if returning visitor
        gradient.classList.add('hidden');
    } else {
        // First visit - show gradient and transition
        const body = document.body;
        if (body) {
            body.classList.add('first-load');
        }
        
        gradient.style.opacity = '1';
        
        // Mark as visited immediately (before animation completes)
        localStorage.setItem('revibe-has-visited', 'true');
        
        // Start fade-out transition after a visible delay so user can see the blue gradient
        requestAnimationFrame(() => {
            setTimeout(() => {
                gradient.classList.add('fade-out');
                
                // Transition body background back to dark theme
                if (body) {
                    setTimeout(() => {
                        body.classList.remove('first-load');
                    }, 100);
                }
                
                // Show subtle hero gradient after transition starts
                setTimeout(() => {
                    if (hero) {
                        hero.classList.add('gradient-visible');
                    }
                }, 600);
                
                // Remove overlay element after transition completes
                setTimeout(() => {
                    gradient.classList.add('hidden');
                }, 1500);
            }, 600); // 600ms delay so user can clearly see the blue gradient first
        });
    }
}

// Hero Entrance Animation
function initHeroEntrance() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const heroItems = document.querySelectorAll('.hero-entrance-item');
    
    if (prefersReducedMotion || heroItems.length === 0) {
        // Show immediately if reduced motion
        heroItems.forEach(item => item.classList.add('entered'));
        return;
    }
    
    // Staggered entrance animation
    heroItems.forEach((item, index) => {
        const delay = parseInt(item.getAttribute('data-entrance-delay')) || index * 100;
        
        setTimeout(() => {
            item.classList.add('entered');
        }, delay);
    });
}

// Active Navigation Link Detection
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-100px 0px -50% 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => sectionObserver.observe(section));
}

// Add smooth scrolling to navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize first entry gradient transition
    initFirstEntryGradient();
    
    // Initialize hero entrance animation
    initHeroEntrance();
    
    // Update active nav link on scroll
    updateActiveNavLink();
    
    // Typewriter effect for hero title (delayed to work with entrance)
    const typewriterTitle = document.getElementById('typewriter-title');
    if (typewriterTitle) {
        setTimeout(() => {
            typeWriter(typewriterTitle, 'Revibe', 150);
        }, 100);
    }
    
    // Stop pulse animation when user interacts with CTA
    const heroCTA = document.querySelector('.hero-cta');
    if (heroCTA) {
        heroCTA.addEventListener('mouseenter', stopCTAPulse);
        heroCTA.addEventListener('focus', stopCTAPulse);
        heroCTA.addEventListener('click', stopCTAPulse);
    }
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle anchor links
            if (href.startsWith('#')) {
                e.preventDefault();
                const sectionId = href.substring(1);
                scrollToSection(sectionId);
            }
        });
    });

    // Add scroll effect to header
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const staggerDelay = prefersReducedMotion ? 0 : 75; // 75ms stagger, or 0 if reduced motion

    // Enhanced scroll-in animations for section headings
    const headingObserverOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const headingObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if (prefersReducedMotion) {
                    entry.target.classList.add('visible');
                } else {
                    entry.target.classList.add('visible');
                }
                headingObserver.unobserve(entry.target);
            }
        });
    }, headingObserverOptions);

    // Observe section titles
    const sectionTitles = document.querySelectorAll('.section-title.fade-in-up');
    sectionTitles.forEach(title => {
        headingObserver.observe(title);
    });

    // Enhanced scroll-in animations for body content
    const contentObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    };

    const contentObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                if (prefersReducedMotion) {
                    entry.target.classList.add('visible');
                } else {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 60);
                }
                contentObserver.unobserve(entry.target);
            }
        });
    }, contentObserverOptions);

    // Observe body text and other fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in-up:not(.section-title)');
    fadeElements.forEach(element => {
        contentObserver.observe(element);
    });

    // Enhanced card animations with stagger effect (left-to-right, top-to-bottom)
    const cardObserverOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -80px 0px'
    };

    const cardObserver = new IntersectionObserver(function(entries) {
        // Group entries by their parent container for better stagger
        const entriesByContainer = new Map();
        entries.forEach(entry => {
            const container = entry.target.closest('.features-grid, .team-grid, .flow-steps');
            const key = container ? container : 'root';
            if (!entriesByContainer.has(key)) {
                entriesByContainer.set(key, []);
            }
            entriesByContainer.get(key).push(entry);
        });

        entriesByContainer.forEach((containerEntries) => {
            containerEntries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    if (prefersReducedMotion) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    } else {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 90); // 90ms stagger for premium feel
                    }
                    cardObserver.unobserve(entry.target);
                }
            });
        });
    }, cardObserverOptions);

    // Observe feature cards and team cards for enhanced animations
    if (!prefersReducedMotion) {
        const cards = document.querySelectorAll('.feature-card, .team-card, .flow-step');
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(18px)';
            card.style.transition = 'opacity 0.5s cubic-bezier(0.4, 0.0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)';
            cardObserver.observe(card);
        });
    }

    // Update demo and GitHub links (placeholder - update with actual URLs)
    const demoLink = document.getElementById('demo-link');
    const githubLink = document.getElementById('github-link');
    
    // You can update these URLs when you have the actual links
    if (demoLink) {
        demoLink.addEventListener('click', function(e) {
            // Uncomment and update when you have the actual demo URL
            // window.location.href = 'https://your-demo-url.com';
            // For now, just prevent default and show alert
            e.preventDefault();
            alert('Demo link will be updated with your actual Revibe app URL!');
        });
    }

    if (githubLink) {
        githubLink.addEventListener('click', function(e) {
            // Uncomment and update when you have the actual GitHub URL
            // window.location.href = 'https://github.com/your-username/revibe';
            // For now, just prevent default and show alert
            e.preventDefault();
            alert('GitHub link will be updated with your actual repository URL!');
        });
    }
});

