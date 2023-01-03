//* REFERÊNCIAS
const mobileNav = document.querySelector('.mobile-nav');
const navLinks = document.getElementById('mobile-nav-links');
const skillsProgress = document.querySelectorAll('[name="skillProgress"]');

function toggleMobileNav()
{
    if (mobileNav.style.display === 'block' && navLinks.style.display === 'block')
    {
        mobileNav.style.display = 'none';
        navLinks.style.display = 'none';
    }
    else
    {
        mobileNav.style.display = 'block';
        navLinks.style.display = 'block';
    }
}

navLinks.addEventListener('click', () =>
{
    toggleMobileNav();
});

//* SKILLS
const skillsLevel = [7, 6, 6, 7, 4, 7, 6];

let count = 0;
skillsProgress.forEach((sk) =>
{
    for (let i = 0; i < 10; i++)
    {
        if (i < skillsLevel[count])
        {
            sk.insertAdjacentHTML('beforeend', '<div class="bg-crimson"></div>');
        }
        else
        {
            sk.insertAdjacentHTML('beforeend', '<div class="bg-gray"></div>');
        }
    }
    count++;
});
