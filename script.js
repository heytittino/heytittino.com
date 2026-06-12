console.log("heytittino portfolio loaded");

const scrollIndicator = document.querySelector('.scroll-indicator');
const hero = document.querySelector('.hero');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbar = document.querySelector('.navbar');
            const offset = navbar ? navbar.offsetHeight + 16 : 0;
            const targetTop = target.getBoundingClientRect().top + window.scrollY - offset;

            window.scrollTo({
                top: targetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 0.6s ease-out forwards`;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and items
document.querySelectorAll('.skill-card, .project-card, .building-item, .tech-tag').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

const updateScrollState = () => {
    const scrolled = window.pageYOffset;
    if (hero && !prefersReducedMotion) {
        hero.style.transform = `translateY(${Math.min(scrolled * 0.08, 24)}px)`;
    }

    if (scrollIndicator) {
        scrollIndicator.classList.toggle('is-hidden', scrolled > 80);
    }
};

// Parallax effect on scroll
window.addEventListener('scroll', updateScrollState, { passive: true });
updateScrollState();

// Add active state to navigation
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 100;
    
    document.querySelectorAll('section').forEach(section => {
        if (!section.id) {
            return;
        }

        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            
            const activeLink = document.querySelector(`.nav-links a[href="#${section.id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
});

// Typing animation for hero title
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let index = 0;
    
    const typeWriter = () => {
        if (index < text.length) {
            heroTitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 50);
        }
    };
    
    window.addEventListener('load', () => {
        if (prefersReducedMotion) {
            heroTitle.textContent = text;
            return;
        }

        setTimeout(typeWriter, 300);
    });
}
