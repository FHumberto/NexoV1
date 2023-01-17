//* REFERÊNCIAS
const mobileNav = document.querySelector('.mobile-nav');
const navLinks = document.getElementById('mobile-nav-links');
const skillsGrid = document.querySelector('.skill-grid');
const projectGrid = document.querySelector('.project-grid');

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
        const filteredData = data.filter(data => data.name.startsWith("PES-"));
        // requisição ao repositório principal
        const fhumbertoData = await (await fetch(`https://raw.githubusercontent.com/FHumberto/FHumberto/main/src/data/skills.json`)).json();

        fhumbertoData.forEach(skill =>
        {
            skillsGrid.innerHTML += `
            <div class="skill-grid">
                <div class="skill-card">
                    <img class="skill-card-img" src="${skill.icon}" />
                    <p class="skill-card-desc">${skill.name}</p>
                </div>
            </div>
            `
        });

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
                    <div class="project-card-inner-desc">
                    <p>${projectInfo.description}</p>
                    <h4>Tecnologias Utilizadas:</h4>
                    <p>${projectInfo.tech}</p>
                </div>
                    <a class="project-card-inner-link" href="https://github.com/FHumberto/${repo.name}/">Visualizar Repositório</a>
                </div>
                </div>`;
        }
    } catch (e)
    {
        console.log(e);
    }
}

getApiGitHub();