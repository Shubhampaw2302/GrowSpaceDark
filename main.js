// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: false,
    mirror: true,
    anchorPlacement: 'center-bottom'
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    if (scrollIndicator) {
        scrollIndicator.style.width = scrolled + '%';
    }

    // if (window.scrollY > 50) {
    //     navbar.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
    //     navbar.style.padding = '0.5rem 0';
    //     navbar.style.boxShadow = '0 2px 20px var(--glow-color)';
    // } else {
    //     navbar.style.backgroundColor = 'rgba(26, 26, 26, 0.9)';
    //     navbar.style.padding = '1rem 0';
    //     navbar.style.boxShadow = 'none';
    // }
});

// Add scroll indicator
const scrollIndicator = document.createElement('div');
scrollIndicator.className = 'scroll-indicator';
document.body.appendChild(scrollIndicator);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Property hover effect with 3D tilt
document.querySelectorAll('.property-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 30;
        const angleY = (centerX - x) / 30;
        
        this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.05)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// Form submission handling with animation
const contactForm = document.querySelector('#contact form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Add success animation
        const button = this.querySelector('button');
        button.innerHTML = '<i class="fas fa-check"></i> Sent!';
        button.style.backgroundColor = '#27ae60';
        
        // Animate form fields
        this.querySelectorAll('.form-control').forEach(input => {
            input.style.transform = 'scale(0.98)';
            input.style.opacity = '0.5';
        });
        
        setTimeout(() => {
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
            button.innerHTML = 'Send Message';
            button.style.backgroundColor = '';
            
            // Reset form fields
            this.querySelectorAll('.form-control').forEach(input => {
                input.style.transform = '';
                input.style.opacity = '';
            });
        }, 1500);
    });
}

// Counter animation with easing
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
    const target = parseInt(counter.innerText);
    let count = 0;
    
    const easeOutQuad = t => t * (2 - t);
    
    const updateCounter = () => {
        const progress = count / target;
        const ease = easeOutQuad(progress);
        const current = Math.ceil(target * ease);
        
        if (count < target) {
            counter.innerText = current + '+';
            count += 1;
            requestAnimationFrame(updateCounter);
        } else {
            counter.innerText = target + '+';
        }
    };
    
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            updateCounter();
            observer.unobserve(counter);
        }
    });
    
    observer.observe(counter);
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
});

// Add floating effect to specific elements
document.querySelectorAll('.stats h3, .contact-info h4').forEach(element => {
    element.classList.add('float-element');
});

// Cursor trail effect
document.addEventListener('mousemove', function(e) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = e.pageX + 'px';
    trail.style.top = e.pageY + 'px';
    document.body.appendChild(trail);
    
    setTimeout(() => {
        trail.remove();
    }, 1000);
});

document.getElementById('year').textContent = new Date().getFullYear();