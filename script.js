const projectDetails = {
    safepath: {
        title: 'SafePath',
        description: 'A web-based campus navigation system built for Gordon College. Provides smart pathfinding using Dijkstra and A* algorithms, PWD-accessible route options, emergency exit routing for campus safety, secure login with OTP verification and QR code support, navigation history tracking, and comprehensive report generation for users and administrators.',
        process: 'Built with React frontend and Node.js backend, implemented pathfinding algorithms (Dijkstra & A*) for optimal campus routing, integrated Maps API for spatial visualization, added secure OTP authentication with QR support for seamless access, and created comprehensive admin dashboard for incident reporting and route analysis.',
        tags: ['React', 'Node.js', 'Pathfinding', 'OTP Auth', 'Maps API', 'QR Code', 'Accessibility']
    },
    dashboard: {
        title: 'Client Dashboard',
        description: 'A responsive admin experience built to keep information organized, accessible, and easy to manage for everyday users.',
        process: 'Developed with React and modern UI patterns, focused on accessibility compliance (WCAG), implemented responsive grid layouts for multi-device support, created intuitive data visualization, and ensured fast load times with optimized components.',
        tags: ['Dashboard', 'Accessibility', 'React']
    },
    booking: {
        title: 'Service Portal',
        description: 'A streamlined experience focused on simplifying user flow and creating a more confident first interaction.',
        process: 'Built with vanilla JavaScript for lightweight performance, designed intuitive UX flows through user research, implemented accessibility best practices, created smooth transitions and interactions, and optimized for mobile-first experience.',
        tags: ['Accessibility', 'User Flow', 'JavaScript']
    }
};

const loaderScreen = document.getElementById('loaderScreen');
const mainContent = document.getElementById('mainContent');
const loaderPercent = document.getElementById('loaderPercent');
const loaderStatus = document.getElementById('loaderStatus');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const viewPanels = document.querySelectorAll('.view-panel');
const navItems = document.querySelectorAll('.nav-link, .logo, .brand-pill, .btn, .card-link, .text-link, .project-btn');

window.addEventListener('load', () => {
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 16) + 8;
        if (progress >= 100) {
            progress = 100;
            loaderPercent.textContent = '100%';
            loaderStatus.textContent = 'Dashboard ready. Opening your portfolio...';
            clearInterval(interval);
            setTimeout(() => {
                loaderScreen?.classList.add('hidden');
                mainContent?.classList.add('ready');
            }, 500);
        } else {
            loaderPercent.textContent = `${progress}%`;
            loaderStatus.textContent = 'Loading interfaces and content...';
        }
    }, 180);
});

menuToggle?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
});

function showView(viewName) {
    viewPanels.forEach(panel => {
        panel.classList.toggle('active', panel.id === `view-${viewName}`);
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.dataset.view === viewName);
    });
}

navItems.forEach(item => {
    item.addEventListener('click', event => {
        const viewName = item.dataset.view;
        if (!viewName) return;

        event.preventDefault();
        showView(viewName);
        navLinks.classList.remove('open');
        menuToggle?.setAttribute('aria-expanded', 'false');
    });
});

const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalProcess = document.getElementById('modalProcess');
const modalTags = document.getElementById('modalTags');
const closeModal = document.querySelector('.modal-close');

function openProjectModal(projectKey) {
    const details = projectDetails[projectKey];
    if (!details) return;

    modalTitle.textContent = details.title;
    modalDescription.textContent = details.description;
    modalProcess.textContent = details.process;
    modalTags.innerHTML = details.tags.map(tag => `<span>${tag}</span>`).join('');
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
}

document.querySelectorAll('.project-btn').forEach(button => {
    button.addEventListener('click', () => openProjectModal(button.dataset.project));
});

showView('dashboard');

function closeProjectModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
}

closeModal?.addEventListener('click', closeProjectModal);
modal?.addEventListener('click', event => {
    if (event.target === modal) closeProjectModal();
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeProjectModal();
});

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm?.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get('name')?.toString().trim() || 'there';

    formStatus.textContent = `Thanks, ${name}! Your message is ready to send. I will reply shortly.`;
    contactForm.reset();
});