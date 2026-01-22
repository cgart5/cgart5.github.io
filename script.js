// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const targetElement = document.querySelector(href);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Email Modal Functionality
const emailLink = document.getElementById('email-link');
const emailModal = document.getElementById('email-modal');
const modalClose = document.querySelector('.modal-close');
const copyEmailBtn = document.getElementById('copy-email-btn');

// Open modal when email link is clicked
if (emailLink) {
    emailLink.addEventListener('click', (e) => {
        e.preventDefault();
        emailModal.classList.add('active');
    });
}

// Close modal when close button is clicked
if (modalClose) {
    modalClose.addEventListener('click', () => {
        emailModal.classList.remove('active');
    });
}

// Close modal when clicking outside the modal content
window.addEventListener('click', (e) => {
    if (e.target === emailModal) {
        emailModal.classList.remove('active');
    }
});

// Copy email to clipboard
if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
        const emailText = 'chasegartner5@gmail.com';
        navigator.clipboard.writeText(emailText).then(() => {
            // Change button text to show it was copied
            const originalText = copyEmailBtn.textContent;
            copyEmailBtn.textContent = 'Copied!';
            copyEmailBtn.classList.add('copied');
            
            // Reset button after 2 seconds
            setTimeout(() => {
                copyEmailBtn.textContent = originalText;
                copyEmailBtn.classList.remove('copied');
            }, 2000);
        });
    });
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe project cards and skill categories
document.querySelectorAll('.project-card, .skill-category, .experience-card, .education-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Active navigation link highlighting
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

console.log('Portfolio loaded successfully!');
