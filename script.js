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

// Add smooth scrolling to navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Typewriter effect for hero title
    const typewriterTitle = document.getElementById('typewriter-title');
    if (typewriterTitle) {
        typeWriter(typewriterTitle, 'Revibe', 150);
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

    // Add fade-in animation on scroll for feature cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards and team cards
    const cards = document.querySelectorAll('.feature-card, .team-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

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

