//* REFERÊNCIAS
const mobileNav = document.querySelector('.mobile-nav');
const navLinks = document.getElementById('mobile-nav-links');
const skillsProgress = document.querySelectorAll('[name="skillProgress"]');
const projectGrid = document.querySelector('.project-grid')

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


//* HABILIDADES
async function getApiGitHub()
{
    try
    {
        const res = await fetch('https://api.github.com/users/FHumberto/repos');
        if (!res.ok)
        {
            throw new Error(res.status);
        }

        const data = await res.json();

        // filtra os repositórios
        const filteredData = data.filter(data => data.name.startsWith("PES-PF"));

        // faz uma requisição para cada repositório filtrado
        for (const repo of filteredData)
        {
            const projectInfoRes = await fetch(`https://raw.githubusercontent.com/FHumberto/${repo.name}/main/project/info.json`);
            const projectInfo = await projectInfoRes.json();

            projectGrid.innerHTML += `
                <div class="project-card">
                <h3 class="project-card-tittle">${projectInfo.name}</h3>
                <img class="project-card-img" src="https://raw.githubusercontent.com/FHumberto/${repo.name}/main/project/demo.gif" alt="Screen do ${projectInfo.name}" />
                <div class="project-card-inner">
                    <p>${projectInfo.description}</p>
                    <h4>Tecnologias Utilizadas:</h4>
                    <p>${projectInfo.tech}</p>
                    <a class="project-card-inner-link" href="https://github.com/FHumberto/${repo.name}/">Visualizar</a>
                </div>
                </div>`;
        }
    } catch (e)
    {
        console.log(e);
    }
}

getApiGitHub();