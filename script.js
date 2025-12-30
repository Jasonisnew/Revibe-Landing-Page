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

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
            mobileToggle.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                mobileToggle.setAttribute('aria-expanded', 'false');
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
                mobileToggle.setAttribute('aria-expanded', 'false');
                navLinks.classList.remove('active');
            }
        });
    }
}

// Fetch and display signup count from Supabase
async function fetchSignupCount() {
    try {
        const { count, error } = await supabaseClient
            .from('emails')
            .select('*', { count: 'exact', head: true });

        if (error) {
            console.error('Error fetching count:', error);
            return;
        }

        boostCount = count + 100;

        updateSignupCountDisplay(boostCount || 0);
    } catch (error) {
        console.error('Error fetching signup count:', error);
    }
}

// Update all signup count displays
function updateSignupCountDisplay(count) {
    const navCounter = document.getElementById('signup-count');
    const heroCounter = document.getElementById('signup-count-hero');
    
    // Animate the number
    if (navCounter) {
        animateCounter(navCounter, count);
    }
    if (heroCounter) {
        animateCounter(heroCounter, count);
    }
}

// Animate counter from 0 to target
function animateCounter(element, target) {
    const duration = 1000;
    const start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (target - start) * easeOutQuart);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Email Form Handler with Supabase
function initEmailForm() {
    const emailForm = document.getElementById('email-form');
    if (emailForm) {
        emailForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const emailInput = document.getElementById('email-input');
            const submitBtn = emailForm.querySelector('.email-submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const email = emailInput.value.trim();
            
            if (!email) {
                showMessage('Please enter a valid email address', 'error');
                return;
            }

            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage('Please enter a valid email address', 'error');
                return;
            }

            // Disable button and show loading state
            submitBtn.disabled = true;
            const originalText = btnText.textContent;
            btnText.textContent = 'Submitting...';
            
            try {
                // Insert email into Supabase
                const { data, error } = await supabaseClient
                    .from('emails')
                    .insert([
                        { email: email }
                    ])
                    .select();

                if (error) {
                    // Handle specific Supabase errors
                    if (error.code === '23505') { // Unique constraint violation
                        showMessage('This email is already subscribed!', 'error');
                    } else {
                        console.error('Supabase error:', error);
                        showMessage('Something went wrong. Please try again.', 'error');
                    }
                } else {
                    // Success!
                    showMessage('Thank you for subscribing! We\'ll keep you updated on Revibe updates.', 'success');
                    emailInput.value = '';
                    // Refresh the signup count
                    fetchSignupCount();
                }
            } catch (error) {
                console.error('Error:', error);
                showMessage('Network error. Please check your connection and try again.', 'error');
            } finally {
                // Re-enable button
                submitBtn.disabled = false;
                btnText.textContent = originalText;
            }
        });
    }
}

// Helper function to show messages
function showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.email-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create message element
    const messageEl = document.createElement('p');
    messageEl.className = `email-message ${type}`;
    messageEl.textContent = message;
    messageEl.style.cssText = `
        margin-top: 1rem;
        padding: 0.75rem 1rem;
        border-radius: 8px;
        font-size: 0.9rem;
        font-weight: 500;
        text-align: center;
        animation: fadeIn 0.3s ease-in;
        ${type === 'success' 
            ? 'background: rgba(16, 185, 129, 0.15); color: #059669; border: 1px solid rgba(16, 185, 129, 0.3);' 
            : 'background: rgba(239, 68, 68, 0.15); color: #dc2626; border: 1px solid rgba(239, 68, 68, 0.3);'
        }
    `;

    // Insert after form
    const emailForm = document.getElementById('email-form');
    emailForm.parentNode.insertBefore(messageEl, emailForm.nextSibling);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (messageEl.parentNode) {
            messageEl.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => messageEl.remove(), 300);
        }
    }, 5000);
}

// Add smooth scrolling to navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize first entry gradient transition
    initFirstEntryGradient();
    
    // Initialize hero entrance animation
    initHeroEntrance();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize email form
    initEmailForm();

    // Fetch initial signup count
    fetchSignupCount();

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
});

