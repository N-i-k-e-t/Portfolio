// DOM Elements
const nav = document.getElementById('nav');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const contactForm = document.getElementById('contact-form');

// Mobile Navigation Toggle
function toggleMobileNav() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
}

// Close mobile nav when clicking on a link
function closeMobileNav() {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
}

// Event Listeners
if (navToggle) {
    navToggle.addEventListener('click', toggleMobileNav);
}

// Close mobile nav when clicking on nav links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = 'none';
    }
});

// Smooth scrolling for anchor links
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

// Scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animated');
        }
    });
}

// Add scroll animation class to elements
function addScrollAnimationClass() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const children = section.querySelectorAll('h2, h3, .project-card, .service-card, .testimonial-card, .step');
        children.forEach((child, index) => {
            child.classList.add('animate-on-scroll');
            child.style.animationDelay = `${index * 0.1}s`;
        });
    });
}

// Load dynamic content
function loadProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;

    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card animate-on-scroll';
        projectCard.innerHTML = `
            <div class="project-image">
                ${project.name.split(' ')[0]}
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.name}</h3>
                <p class="project-summary">${project.summary}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="project-buttons">
                    ${project.liveUrl ? `<a href="${project.liveUrl}" class="btn btn-secondary project-btn" target="_blank">Live Demo</a>` : ''}
                    ${project.repoUrl ? `<a href="${project.repoUrl}" class="btn btn-primary project-btn" target="_blank">Code</a>` : ''}
                </div>
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });
}

function loadServices() {
    const servicesGrid = document.getElementById('services-grid');
    if (!servicesGrid) return;

    services.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card animate-on-scroll';
        serviceCard.innerHTML = `
            <h3 class="service-title">${service.title}</h3>
            <p class="service-outcome">${service.outcome}</p>
            <div class="service-deliverables">
                <h4>Deliverables:</h4>
                <ul>
                    ${service.deliverables.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            <div class="service-meta">
                <span class="service-timeline">${service.timelineWeeks} weeks</span>
                <span class="service-price">$${service.priceFromUSD}${service.priceToUSD ? `-$${service.priceToUSD}` : '+'}</span>
            </div>
            <a href="${service.cta}" class="btn btn-primary service-cta" target="_blank">Book a Call</a>
        `;
        servicesGrid.appendChild(serviceCard);
    });
}

function loadBlogPosts() {
    const blogGrid = document.getElementById('blog-grid');
    if (!blogGrid) return;

    blogPosts.forEach(post => {
        const blogCard = document.createElement('div');
        blogCard.className = 'blog-card animate-on-scroll';
        blogCard.innerHTML = `
            <div class="blog-image">
                ${post.title.split(' ')[0]}
            </div>
            <div class="blog-content">
                <h3 class="blog-title">${post.title}</h3>
                <p class="blog-excerpt">${post.excerpt}</p>
                <div class="blog-meta">
                    <span>${post.date}</span>
                    <span>${post.readTime}</span>
                </div>
            </div>
        `;
        blogGrid.appendChild(blogCard);
    });
}

function loadTestimonials() {
    const testimonialsGrid = document.getElementById('testimonials-grid');
    if (!testimonialsGrid) return;

    testimonials.forEach(testimonial => {
        const testimonialCard = document.createElement('div');
        testimonialCard.className = 'testimonial-card animate-on-scroll';
        testimonialCard.innerHTML = `
            <p class="testimonial-quote">"${testimonial.quote}"</p>
            <div class="testimonial-author">${testimonial.author}</div>
            <div class="testimonial-role">${testimonial.role}</div>
        `;
        testimonialsGrid.appendChild(testimonialCard);
    });
}

// Security: Input sanitization
function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    return input
        .replace(/[<>]/g, '') // Remove potential HTML tags
        .replace(/javascript:/gi, '') // Remove javascript: protocol
        .replace(/on\w+=/gi, '') // Remove event handlers
        .trim()
        .substring(0, 1000); // Limit length
}

// Security: Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
}

// Security: Rate limiting
const formSubmissionTimes = [];
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_SUBMISSIONS = 3;

function isRateLimited() {
    const now = Date.now();
    const recentSubmissions = formSubmissionTimes.filter(time => now - time < RATE_LIMIT_WINDOW);
    
    if (recentSubmissions.length >= MAX_SUBMISSIONS) {
        return true;
    }
    
    formSubmissionTimes.push(now);
    return false;
}

// Contact form handling with security
function handleContactForm(e) {
    e.preventDefault();
    
    // Rate limiting check
    if (isRateLimited()) {
        alert('Too many submissions. Please wait a moment before trying again.');
        return;
    }
    
    const formData = new FormData(contactForm);
    const rawData = Object.fromEntries(formData);
    
    // Sanitize all inputs
    const data = {
        name: sanitizeInput(rawData.name),
        company: sanitizeInput(rawData.company),
        email: sanitizeInput(rawData.email),
        problem: sanitizeInput(rawData.problem),
        success: sanitizeInput(rawData.success),
        timeline: sanitizeInput(rawData.timeline)
    };
    
    // Validation
    if (!data.name || data.name.length < 2) {
        alert('Please enter a valid name (at least 2 characters).');
        return;
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    if (!data.problem || data.problem.length < 10) {
        alert('Please describe your problem in at least 10 characters.');
        return;
    }
    
    if (!data.success || data.success.length < 10) {
        alert('Please describe what success looks like in at least 10 characters.');
        return;
    }
    
    // Create mailto link with sanitized data
    const subject = `Portfolio Contact: ${data.problem.substring(0, 50)}...`;
    const body = `
Name: ${data.name}
Company: ${data.company || 'Not provided'}
Email: ${data.email}

Problem: ${data.problem}

Success looks like: ${data.success}

Timeline/Budget: ${data.timeline || 'Not specified'}
    `.trim();
    
    const mailtoLink = `mailto:niketpatil1624@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open in new tab for security
    const newWindow = window.open(mailtoLink, '_blank', 'noopener,noreferrer');
    if (!newWindow) {
        // Fallback if popup blocked
        window.location.href = mailtoLink;
    }
    
    // Clear form after successful submission
    contactForm.reset();
    alert('Thank you! Your message has been prepared. Please send it from your email client.');
}

// Add event listener to contact form
if (contactForm) {
    contactForm.addEventListener('submit', handleContactForm);
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    const originalHTML = element.innerHTML;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Restore original HTML with gradient text after typing is complete
            setTimeout(() => {
                element.innerHTML = originalHTML;
            }, 500);
        }
    }
    
    type();
}

// Initialize typing animation on hero title
function initTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 1000);
    }
}

// Parallax effect for hero section
function initParallax() {
    const heroGraphic = document.querySelector('.hero-graphic');
    if (!heroGraphic) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        heroGraphic.style.transform = `translateY(${rate}px)`;
    });
}

// Counter animation for stats
function animateCounters() {
    const stats = document.querySelectorAll('.stat-number[data-target]');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        if (isNaN(target)) return;
        
        let current = 0;
        const increment = target / 50;
        const suffix = stat.textContent.includes('K+') ? 'K+' : '';
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + suffix;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + suffix;
            }
        }, 30);
    });
}

// Intersection Observer for animations
function initIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Trigger counter animation for stats section
                if (entry.target.classList.contains('hero-stats')) {
                    animateCounters();
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Security: Error handling wrapper
function safeExecute(fn, context = 'Unknown') {
    try {
        return fn();
    } catch (error) {
        console.error(`Error in ${context}:`, error);
        return null;
    }
}

// Security: Validate external URLs
function isValidUrl(url) {
    try {
        const urlObj = new URL(url);
        return ['http:', 'https:', 'mailto:'].includes(urlObj.protocol);
    } catch {
        return false;
    }
}

// Security: Safe external link handling
function handleExternalLink(e) {
    const href = e.target.href;
    if (!isValidUrl(href)) {
        e.preventDefault();
        console.warn('Blocked potentially unsafe URL:', href);
        return;
    }
    
    // Add security attributes
    e.target.setAttribute('rel', 'noopener noreferrer');
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Security: Add external link protection
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', handleExternalLink);
    });
    
    // Load dynamic content with error handling
    safeExecute(() => loadProjects(), 'loadProjects');
    safeExecute(() => loadServices(), 'loadServices');
    safeExecute(() => loadBlogPosts(), 'loadBlogPosts');
    safeExecute(() => loadTestimonials(), 'loadTestimonials');
    
    // Add scroll animation classes
    safeExecute(() => addScrollAnimationClass(), 'addScrollAnimationClass');
    
    // Initialize animations with error handling
    // safeExecute(() => initTypingAnimation(), 'initTypingAnimation'); // Disabled to preserve gradient text
    safeExecute(() => initParallax(), 'initParallax');
    safeExecute(() => initIntersectionObserver(), 'initIntersectionObserver');
    
    // Add smooth scrolling to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMobileNav();
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize scroll progress
initScrollProgress();
