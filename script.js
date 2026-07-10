const projectDetails = {
    luxury: {
        title: 'Luxury Brand Landing Page',
        description: 'A premium landing experience designed to highlight services, elevate visual storytelling, and increase confidence at first glance.',
        tags: ['Luxury UI', 'Conversion Focus', 'Visual Storytelling']
    },
    dashboard: {
        title: 'Analytics Dashboard',
        description: 'A modern analytics experience with clean hierarchy, focused insights, and a polished interface for business teams.',
        tags: ['React', 'Data Design', 'Dashboard UX']
    },
    booking: {
        title: 'Booking & Scheduling Platform',
        description: 'An intuitive scheduling experience tailored to simplify decision-making and create a smoother user journey.',
        tags: ['Accessibility', 'User Flow', 'Booking System']
    }
};

const loaderScreen = document.getElementById('loaderScreen');
const mainContent = document.getElementById('mainContent');
const loaderPercent = document.getElementById('loaderPercent');
const loaderStatus = document.getElementById('loaderStatus');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const viewPanels = document.querySelectorAll('.view-panel');
const navItems = document.querySelectorAll('.nav-link, .logo, .brand-pill, .btn, .card-link, .text-link');

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
const modalTags = document.getElementById('modalTags');
const closeModal = document.querySelector('.modal-close');

function openProjectModal(projectKey) {
    const details = projectDetails[projectKey];
    if (!details) return;

    modalTitle.textContent = details.title;
    modalDescription.textContent = details.description;
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