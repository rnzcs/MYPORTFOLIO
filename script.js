const projectDetails = {
    safepath: {
        title: 'SafePath',
        description: 'A campus navigation app for Gordon College with accessible routes and emergency routing.',
        process: 'Built with React frontend and Node.js backend, implemented pathfinding algorithms (Dijkstra & A*) for optimal campus routing, integrated Maps API for spatial visualization, added secure OTP authentication with QR support for seamless access, and created comprehensive admin dashboard for incident reporting and route analysis.',
        tags: ['React', 'Node.js', 'Pathfinding', 'OTP Auth', 'Maps API', 'QR Code', 'Accessibility']
    }
};

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const viewPanels = document.querySelectorAll('.view-panel');
const viewLinks = document.querySelectorAll('[data-view]');
const navItems = document.querySelectorAll('.nav-link');

menuToggle?.addEventListener('click', () => {
    const isOpen = navLinks?.classList.toggle('open') ?? false;
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

function showView(viewName, focusHeading = true) {
    const activePanel = document.getElementById(`view-${viewName}`);
    if (!activePanel) return;

    viewPanels.forEach(panel => panel.classList.toggle('active', panel === activePanel));

    navItems.forEach(link => {
        const isActive = link.dataset.view === viewName;
        link.classList.toggle('active', isActive);
        if (isActive) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (focusHeading) {
        activePanel.querySelector('h1, h2')?.focus({ preventScroll: true });
    }
}

viewLinks.forEach(item => {
    item.addEventListener('click', event => {
        const viewName = item.dataset.view;
        if (!viewName) return;

        event.preventDefault();
        showView(viewName);
        navLinks?.classList.remove('open');
        menuToggle?.setAttribute('aria-expanded', 'false');
        menuToggle?.setAttribute('aria-label', 'Open navigation');
    });
});

const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalProcess = document.getElementById('modalProcess');
const modalTags = document.getElementById('modalTags');
const closeModal = document.querySelector('.modal-close');
let modalTrigger = null;

function openProjectModal(projectKey) {
    const details = projectDetails[projectKey];
    if (!details || !modal) return;

    modalTrigger = document.activeElement;
    modalTitle.textContent = details.title;
    modalDescription.textContent = details.description;
    modalProcess.textContent = details.process;
    modalTags.innerHTML = details.tags.map(tag => `<span>${tag}</span>`).join('');
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    closeModal?.focus();
}

document.querySelectorAll('.project-btn').forEach(button => {
    button.addEventListener('click', () => openProjectModal(button.dataset.project));
});

showView('dashboard', false);

function closeProjectModal() {
    if (!modal?.classList.contains('open')) return;

    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    modalTrigger?.focus();
}

closeModal?.addEventListener('click', closeProjectModal);
modal?.addEventListener('click', event => {
    if (event.target === modal) closeProjectModal();
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        closeProjectModal();
        navLinks?.classList.remove('open');
        menuToggle?.setAttribute('aria-expanded', 'false');
        menuToggle?.setAttribute('aria-label', 'Open navigation');
    }

    if (event.key === 'Tab' && modal?.classList.contains('open')) {
        event.preventDefault();
        closeModal?.focus();
    }
});

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm?.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();
    const subject = `Portfolio inquiry from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;

    formStatus.textContent = 'Opening your email app with your message. Review it there, then send it.';
    window.location.href = `mailto:renzsabeniano1426@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});