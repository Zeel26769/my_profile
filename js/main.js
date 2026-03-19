// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const backToTopButton = document.getElementById('back-to-top');
const navLinks = document.querySelectorAll('a[href^="#"]');
const currentYear = document.getElementById('current-year');

// Project modals
const projectModals = document.querySelectorAll('.project-modal');
const viewProjectButtons = document.querySelectorAll('.view-project-btn');
const closeModalButtons = document.querySelectorAll('.close-modal');

// Skills filter
const skillsFilter = document.getElementById('skills-filter');
const skillsGrid = document.getElementById('skills-grid');
const skillCards = document.querySelectorAll('.skill-card');

// Projects filter
const projectsFilter = document.getElementById('projects-filter');
const projectsGrid = document.getElementById('projects-grid');
const projectCards = document.querySelectorAll('.project-card');

// Set current year in footer
if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

// Theme Toggle
if (themeToggle) {
  // Check for saved user preference, if any, on load & toggle accordingly 
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    document.documentElement.classList.remove('dark');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }

  // Toggle theme on button click
  themeToggle.addEventListener('click', () => {
    // Toggle the 'dark' class on the html element
    document.documentElement.classList.toggle('dark');
    
    // Update the button icon
    const isDark = document.documentElement.classList.contains('dark');
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    
    // Save the user's preference to localStorage
    localStorage.theme = isDark ? 'dark' : 'light';
  });
}

// Mobile Menu Toggle
if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener('click', () => {
    const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
    mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.classList.toggle('hidden');
    
    // Toggle between menu and close icon
    const menuIcon = mobileMenuButton.querySelector('i');
    if (menuIcon) {
      menuIcon.className = isExpanded ? 'fas fa-bars' : 'fas fa-times';
    }
  });
}

// Smooth Scrolling for Anchor Links
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      // Close mobile menu if open
      if (!mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        const menuIcon = mobileMenuButton.querySelector('i');
        if (menuIcon) menuIcon.className = 'fas fa-bars';
      }
      
      // Scroll to the target element
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Adjust for fixed header
        behavior: 'smooth'
      });
      
      // Update URL without jumping
      history.pushState(null, null, targetId);
    }
  });
});

// Back to Top Button
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.remove('opacity-0', 'invisible');
    backToTopButton.classList.add('opacity-100', 'visible');
  } else {
    backToTopButton.classList.remove('opacity-100', 'visible');
    backToTopButton.classList.add('opacity-0', 'invisible');
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Project Modals
viewProjectButtons.forEach(button => {
  button.addEventListener('click', () => {
    const projectId = button.getAttribute('data-project');
    const modal = document.getElementById(`${projectId}-modal`);
    if (modal) {
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    }
  });
});

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.project-modal');
    if (modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = ''; // Re-enable scrolling
    }
  });
});

// Close modal when clicking outside the modal content
window.addEventListener('click', (e) => {
  projectModals.forEach(modal => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = ''; // Re-enable scrolling
    }
  });
});

// Skills Filter
if (skillsFilter && skillsGrid && skillCards.length > 0) {
  const filterButtons = skillsFilter.querySelectorAll('button');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active state
      filterButtons.forEach(btn => {
        btn.classList.remove('bg-gradient-to-r', 'from-teal-400', 'to-pink-400', 'text-white');
        btn.classList.add('bg-gray-100', 'dark:bg-gray-800', 'hover:bg-gray-200', 'dark:hover:bg-gray-700');
      });
      
      button.classList.add('bg-gradient-to-r', 'from-teal-400', 'to-pink-400', 'text-white');
      button.classList.remove('bg-gray-100', 'dark:bg-gray-800', 'hover:bg-gray-200', 'dark:hover:bg-gray-700');
      
      // Filter skills
      const filterValue = button.getAttribute('data-filter');
      
      skillCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
          card.style.display = 'block';
          card.classList.add('animate-fadeIn');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Projects Filter
if (projectsFilter && projectsGrid && projectCards.length > 0) {
  const filterButtons = projectsFilter.querySelectorAll('button');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active state
      filterButtons.forEach(btn => {
        btn.classList.remove('bg-gradient-to-r', 'from-teal-400', 'to-pink-400', 'text-white');
        btn.classList.add('bg-gray-100', 'dark:bg-gray-800', 'hover:bg-gray-200', 'dark:hover:bg-gray-700');
      });
      
      button.classList.add('bg-gradient-to-r', 'from-teal-400', 'to-pink-400', 'text-white');
      button.classList.remove('bg-gray-100', 'dark:bg-gray-800', 'hover:bg-gray-200', 'dark:hover:bg-gray-700');
      
      // Filter projects
      const filterValue = button.getAttribute('data-filter');
      
      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
          card.style.display = 'block';
          card.classList.add('animate-fadeIn');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Compose mailto link with form data
    const mailtoLink = `mailto:zeel.kkp@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.open(mailtoLink, '_blank');
    
    // Show success message
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = '✓ Opening email client...';
    btn.classList.add('opacity-75');
    setTimeout(() => {
      btn.textContent = originalText;
      btn.classList.remove('opacity-75');
    }, 3000);
    
    // Reset form
    this.reset();
  });
}

// Animation on Scroll (AOS) initialization
document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  
  // Animate skill bars on scroll
  const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-level-bar');
    
    skillBars.forEach(bar => {
      const width = bar.getAttribute('data-level');
      if (isInViewport(bar)) {
        bar.style.width = width;
      }
    });
  };
  
  // Check if element is in viewport
  const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };
  
  // Add scroll event listener for skill bar animation
  window.addEventListener('scroll', animateSkillBars);
  
  // Initial check in case skills are already in viewport on page load
  animateSkillBars();
  
  // Initialize tooltips
  const tooltipElements = document.querySelectorAll('[data-tooltip]');
  tooltipElements.forEach(element => {
    element.addEventListener('mouseenter', showTooltip);
    element.addEventListener('mouseleave', hideTooltip);
  });
});

// Tooltip functions
function showTooltip(e) {
  const tooltipText = this.getAttribute('data-tooltip');
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.textContent = tooltipText;
  
  document.body.appendChild(tooltip);
  
  const rect = this.getBoundingClientRect();
  const tooltipHeight = tooltip.offsetHeight;
  const tooltipWidth = tooltip.offsetWidth;
  
  // Position the tooltip above the element
  tooltip.style.position = 'fixed';
  tooltip.style.left = `${rect.left + (this.offsetWidth - tooltipWidth) / 2}px`;
  tooltip.style.top = `${rect.top - tooltipHeight - 10}px`;
  tooltip.style.opacity = '0';
  
  // Trigger reflow to ensure the initial styles are applied
  tooltip.offsetHeight;
  
  // Fade in the tooltip
  tooltip.style.transition = 'opacity 0.2s ease-in-out';
  tooltip.style.opacity = '1';
  
  // Store reference to tooltip on the element
  this._tooltip = tooltip;
}

function hideTooltip() {
  if (this._tooltip) {
    this._tooltip.style.opacity = '0';
    
    // Remove the tooltip after the fade out transition
    setTimeout(() => {
      if (this._tooltip && this._tooltip.parentNode) {
        this._tooltip.parentNode.removeChild(this._tooltip);
        this._tooltip = null;
      }
    }, 200);
  }
}

// Add animation to elements with the 'animate-on-scroll' class
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.animate-on-scroll');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (elementPosition < screenPosition) {
      element.classList.add('animate-fadeInUp');
    }
  });
};

// Add scroll event listener for animations
window.addEventListener('scroll', animateOnScroll);

// Initial check in case elements are already in viewport on page load
animateOnScroll();

// Initialize VanillaTilt for project cards
document.addEventListener('DOMContentLoaded', () => {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    VanillaTilt.init(card, {
      max: 15,
      speed: 400,
      glare: true,
      'max-glare': 0.2,
      scale: 1.02
    });
  });
});

// Close modal function (used by onclick handlers in modals)
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

// Close any modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('[id$="-modal"]').forEach(modal => {
      if (!modal.classList.contains('hidden')) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });
  }
});
