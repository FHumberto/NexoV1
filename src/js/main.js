const mobileNav = document.querySelector('.mobile-nav');
const navLinks = document.getElementById('mobile-nav-links');

function toggleMobileNav() {
    if (
        mobileNav.style.display === 'block' &&
        navLinks.style.display === 'block'
    ) {
        mobileNav.style.display = 'none';
        navLinks.style.display = 'none';
    } else {
        mobileNav.style.display = 'block';
        navLinks.style.display = 'block';
    }
}

navLinks.addEventListener('click', () => {
    toggleMobileNav();
});
