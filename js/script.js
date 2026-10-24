$(document).ready(function () {

    // ---- RIPPLES ----
    setTimeout(function () {
        try {
            if (typeof $.fn.ripples === 'function') {
                $('.home').ripples({
                    dropRadius: 20,
                    perturbance: 0.03,
                    resolution: 512,
                    interactive: true
                });
                $('.home .jquery-ripples').css({
                    'z-index': '1',
                    'pointer-events': 'none',
                    'display': 'block'
                });
                $('.home .jquery-ripples canvas').css('pointer-events', 'auto');
                setInterval(function () {
                    var $el = $('.home');
                    $el.ripples('drop',
                        Math.random() * $el.outerWidth(),
                        Math.random() * $el.outerHeight(),
                        18,
                        0.05
                    );
                }, 1200);
                console.log('Ripples initialized successfully!');
            } else {
                console.warn('Ripples plugin not loaded – check CDN.');
            }
        } catch (e) {
            console.warn(' Ripples error:', e.message);
        }
    }, 200);

    // ---- MOBILE MENU ----
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.getElementById('navbar');
    if (menuIcon) {
        menuIcon.addEventListener('click', () => {
            navbar.classList.toggle('active');
        });
    }
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
        });
    });

    // ---- HEADER SCROLL ----
    const header = document.getElementById('header');
    const homeSection = document.getElementById('home');

    function updateHeader() {
        if (!homeSection) return;
        const homeBottom = homeSection.offsetTop + homeSection.offsetHeight;
        const scrollY = window.scrollY;

        if (scrollY >= homeBottom - 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', updateHeader, { passive: true });
    window.addEventListener('resize', updateHeader, { passive: true });
    setTimeout(updateHeader, 100);

    // ---- ACTIVE LINK ----
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(sec => {
            const top = sec.offsetTop - 160;
            const height = sec.offsetHeight;
            if (window.scrollY >= top && window.scrollY < top + height) {
                current = sec.getAttribute('id');
            }
        });
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
            current = 'map';
        }
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    //  TYPED.JS 
    new Typed('#typed-text', {
        strings: [
            'Tech <span style="color: gold; font-weight: 700;">Services</span>',
            'Web <span style="color: gold; font-weight: 700;">Development</span>',
            'Graphic <span style="color: gold; font-weight: 700;">Designing</span>'
        ],
        typeSpeed: 70,
        backSpeed: 35,
        loop: true,
        contentType: 'html',
        showCursor: false,
        backDelay: 2000,
        startDelay: 300,
    });

    // TEAM CAROUSEL 
    const teamTrack = document.querySelector('.team-track');
    const teamSlides = Array.from(document.querySelectorAll('.team-slide'));
    const teamPrev = document.querySelector('.team-prev');
    const teamNext = document.querySelector('.team-next');
    const teamDots = document.querySelector('.team-dots');

    let teamIndex = 0;
    let teamTimer;

    function teamVisibleSlides() {
        if (window.innerWidth <= 480) return 1;
        if (window.innerWidth <= 868) return 2;
        return 3;
    }

    function teamMaxIndex() {
        return Math.max(0, teamSlides.length - teamVisibleSlides());
    }

    function buildTeamDots() {
        if (!teamDots) return;

        teamDots.innerHTML = '';
        const pages = teamMaxIndex() + 1;

        for (let i = 0; i < pages; i++) {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'team-dot';
            dot.setAttribute('aria-label', `Show team slide ${i + 1}`);
            dot.addEventListener('click', () => {
                teamIndex = i;
                updateTeamCarousel();
                restartTeamAutoplay();
            });
            teamDots.appendChild(dot);
        }
    }

    function updateTeamCarousel() {
        if (!teamTrack || !teamSlides.length) return;

        const visible = teamVisibleSlides();
        const max = teamMaxIndex();

        teamIndex = Math.min(teamIndex, max);

        const slideWidth = 100 / visible;
        teamTrack.style.transform = `translateX(-${teamIndex * slideWidth}%)`;

        const dots = document.querySelectorAll('.team-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === teamIndex);
        });
    }

    function nextTeamSlide() {
        const max = teamMaxIndex();
        teamIndex = teamIndex >= max ? 0 : teamIndex + 1;
        updateTeamCarousel();
    }

    function previousTeamSlide() {
        const max = teamMaxIndex();
        teamIndex = teamIndex <= 0 ? max : teamIndex - 1;
        updateTeamCarousel();
    }

    function startTeamAutoplay() {
        clearInterval(teamTimer);
        teamTimer = setInterval(nextTeamSlide, 3500);
    }

    function restartTeamAutoplay() {
        startTeamAutoplay();
    }

    if (teamTrack && teamSlides.length) {
        buildTeamDots();
        updateTeamCarousel();
        startTeamAutoplay();

        teamNext.addEventListener('click', () => {
            nextTeamSlide();
            restartTeamAutoplay();
        });

        teamPrev.addEventListener('click', () => {
            previousTeamSlide();
            restartTeamAutoplay();
        });

        const teamCarousel = document.querySelector('.team-carousel');

        teamCarousel.addEventListener('mouseenter', () => {
            clearInterval(teamTimer);
        });

        teamCarousel.addEventListener('mouseleave', () => {
            startTeamAutoplay();
        });

        window.addEventListener('resize', () => {
            buildTeamDots();
            updateTeamCarousel();
        });
    }

    // ---- LOGIN MODAL ----
    const modal = document.getElementById('loginModal');
    const openBtn = document.getElementById('loginNavBtn');
    const closeBtn = document.getElementById('closeModalBtn');
    const loginTab = document.getElementById('loginTabBtn');
    const registerTab = document.getElementById('registerTabBtn');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const toggleText = document.getElementById('toggleText');

    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (openBtn) {
        openBtn.addEventListener('click', function (e) {
            e.preventDefault();
            openModal();
        });
    }
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    modal.addEventListener('click', function (e) {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeModal();
    });

    loginTab.addEventListener('click', function () {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        toggleText.innerHTML = 'Don\'t have an account? <a id="toggleLink">Sign up</a>';
        document.getElementById('toggleLink').addEventListener('click', function (e) {
            e.preventDefault();
            registerTab.click();
        });
    });

    registerTab.addEventListener('click', function () {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        toggleText.innerHTML = 'Already have an account? <a id="toggleLink">Log in</a>';
        document.getElementById('toggleLink').addEventListener('click', function (e) {
            e.preventDefault();
            loginTab.click();
        });
    });

    document.addEventListener('click', function (e) {
        if (e.target && e.target.id === 'toggleLink') {
            e.preventDefault();
            if (loginTab.classList.contains('active')) {
                registerTab.click();
            } else {
                loginTab.click();
            }
        }
    });

});

// ---- IMAGE MODAL FUNCTIONS (outside jQuery ready) ----
function openImageModal(wrapper) {
    const img = wrapper.querySelector('img');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    if (modal && modalImg && img) {
        modal.style.display = 'flex';
        modalImg.src = img.src;
    }
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) modal.style.display = 'none';
}

// Close image modal on background click & ESC
document.addEventListener('DOMContentLoaded', function () {
    const imgModal = document.getElementById('imageModal');
    if (imgModal) {
        imgModal.addEventListener('click', function (e) {
            if (e.target === imgModal) closeImageModal();
        });
    }
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeImageModal();
    });
});