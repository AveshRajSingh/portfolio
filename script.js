// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Smooth scrolling for navigation links
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

// Typewriter Effect
function typeWriter(text, element, speed = 100) {
    let i = 0;
    element.textContent = '';
    element.classList.add('typing-effect');
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Remove typing cursor after completion
            setTimeout(() => {
                element.classList.remove('typing-effect');
            }, 1000);
        }
    }
    
    type();
}

// Initialize typewriter effect
window.addEventListener('load', () => {
    const typewriterElement = document.getElementById('typewriter');
    const text = "Full Stack Developer | MERN Stack Expert | Modern Web Solutions";
    typeWriter(text, typewriterElement, 80);
});

// Scroll Progress Indicator
window.addEventListener('scroll', () => {
    const scrollIndicator = document.getElementById('scrollIndicator');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / documentHeight) * 100;
    
    scrollIndicator.style.transform = `scaleX(${scrollPercentage / 100})`;
});

// Lazy Loading Images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    }
}

// Initialize ScrollReveal animations
function initScrollReveal() {
    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal().reveal('.card-hover', {
            delay: 200,
            distance: '50px',
            duration: 1000,
            easing: 'ease-out',
            origin: 'bottom',
            interval: 100
        });
        
        ScrollReveal().reveal('h1, h2, h3', {
            delay: 100,
            distance: '30px',
            duration: 800,
            easing: 'ease-out',
            origin: 'top'
        });
        
        ScrollReveal().reveal('p, .skill-tag', {
            delay: 200,
            distance: '20px',
            duration: 600,
            easing: 'ease-out',
            origin: 'bottom',
            interval: 50
        });
    }
}

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('backdrop-blur-md');
        nav.classList.remove('bg-gray-900/90');
        nav.classList.add('bg-gray-900/95');
    } else {
        nav.classList.remove('backdrop-blur-md');
        nav.classList.add('bg-gray-900/90');
        nav.classList.remove('bg-gray-900/95');
    }
});

// Skill tags animation on hover
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) rotate(2deg)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Add floating animation to profile image
function addFloatingAnimation() {
    const profileImg = document.querySelector('.profile-image');
    if (profileImg) {
        // Add subtle floating animation
        profileImg.style.animation = 'profileFloat 4s ease-in-out infinite';
        
        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes profileFloat {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                25% { transform: translateY(-5px) rotate(1deg); }
                50% { transform: translateY(0px) rotate(0deg); }
                75% { transform: translateY(-3px) rotate(-1deg); }
            }
            
            .profile-image-container {
                animation: containerFloat 6s ease-in-out infinite;
            }
            
            @keyframes containerFloat {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.02); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Add parallax effect to hero section
function addParallaxEffect() {
    const hero = document.getElementById('home');
    const profileContainer = document.querySelector('.profile-image-container');
    
    if (hero && profileContainer) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            const opacity = 1 - scrolled / window.innerHeight;
            
            if (scrolled < window.innerHeight) {
                profileContainer.style.transform = `translateY(${rate}px)`;
                hero.style.opacity = opacity;
            }
        });
    }
}

// Add animated counter for stats
function animateCounters() {
    const counters = document.querySelectorAll('.text-3xl.font-bold');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
                const increment = target / 50;
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    
                    const suffix = counter.textContent.replace(/[\d]/g, '');
                    counter.textContent = Math.floor(current) + suffix;
                }, 40);
                
                observer.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

// Animate progress bars
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.bg-gradient-to-r');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                
                setTimeout(() => {
                    progressBar.style.transition = 'width 2s ease-in-out';
                    progressBar.style.width = width;
                }, 200);
                
                observer.unobserve(progressBar);
            }
        });
    });
    
    progressBars.forEach(bar => {
        if (bar.parentElement.classList.contains('bg-gray-700')) {
            observer.observe(bar);
        }
    });
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    lazyLoadImages();
    initScrollReveal();
    addFloatingAnimation();
    addParallaxEffect();
    animateCounters();
    animateProgressBars();
});

// Add particle effect to hero section
function createParticles() {
    const hero = document.getElementById('home');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(59, 130, 246, 0.5);
            border-radius: 50%;
            pointer-events: none;
            opacity: 0;
            animation: particleFloat ${3 + Math.random() * 4}s infinite ease-in-out;
            animation-delay: ${Math.random() * 2}s;
        `;
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        hero.appendChild(particle);
    }
    
    // Add particle animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0%, 100% { 
                transform: translateY(0px) scale(1);
                opacity: 0;
            }
            50% { 
                transform: translateY(-20px) scale(1.1);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize particles
window.addEventListener('load', createParticles);

// Add typing sound effect (optional)
function playTypingSound() {
    // Create audio context for typing sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    function createTypingSound() {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'square';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
    
    return createTypingSound;
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScroll = debounce(() => {
    const scrollIndicator = document.getElementById('scrollIndicator');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / documentHeight) * 100;
    
    scrollIndicator.style.transform = `scaleX(${scrollPercentage / 100})`;
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Add easter egg: Konami code
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.code === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            // Easter egg activated!
            document.body.style.animation = 'rainbow 2s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// Add rainbow animation for easter egg
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        25% { filter: hue-rotate(90deg); }
        50% { filter: hue-rotate(180deg); }
        75% { filter: hue-rotate(270deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);
