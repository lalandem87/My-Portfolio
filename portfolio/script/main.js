async function getData() {
  try {
    const request = await fetch("./data.json");
    if (!request.ok) {
      console.log("There's an error when you try to grab data!");
    }
    const data = await request.json();
    return data;
  } catch (e) {
    console.error(`Error: ${e}`);
  }
}

async function setHero() {
  const data = await getData();
  const heroStatNum = document.querySelector(".hero-stat-num");
  if (data) {
    const dataProjects = data["projects"];
    heroStatNum.innerText = `0${dataProjects.length}`;
  }
}

async function setSkillsBar() {
  const data = await getData();
  const container = document.querySelector(".brand");
  if (data) {
    const allSkills = [
      ...data["skills"]["cybersecurity"],
      ...data["skills"]["devweb"],
    ];

    [...allSkills, ...allSkills].forEach((skill) => {
      container.insertAdjacentHTML(
        "beforeend",
        `
        <span class="skill">${skill.name}</span>
        <span class="dot-sep">.</span>
        `,
      );
    });
  }
}

async function setComp() {
  const data = await getData();
  const container = document.querySelector(".comp-container");
  if (data) {
    const compData = [
      ...data["skills"]["cybersecurity"],
      ...data["skills"]["devweb"],
    ].slice(0, 11);

    compData.forEach((comp) => {
      container.insertAdjacentHTML(
        "beforeend",
        `
            <div class="skill-pill ${comp.category}">
                <span>${comp.name}</span>
            </div>
        `,
      );
    });
  }
}

async function setProjectsCard() {
  const data = await getData();
  const projectsData = data["projects"];
  const container = document.querySelector(".projs-card-container");
  projectsData.forEach((project, index) => {
    container.insertAdjacentHTML(
      "beforeend",
      `
      <div class="card">
        <em class="index">0${index + 1}</em>
        <h3>${project.name}</h3>
        <div class="project-stack">${project.langages}</div>
        <div class="project-card-bottom">
          <p>${project.desc}</p>
          <a href="${project.github}"><i class="fa-brands fa-github"></i></a>
        </div>
        
        <span class="project-badge">${project.type}</span>
      </div>
        `,
    );
  });
}

async function setParcoursCard() {
  const data = await getData();
  if (data) {
    const parcoursData = data["parcours"];
    const container = document.querySelector(".parcs-card-container");

    parcoursData.forEach((parcour) => {
      if (parcour.desc) {
        container.insertAdjacentHTML(
          "beforeend",
          `
        <div class="parcour-card">
          <em class="parcour-date">${parcour.date}</em>
          <h3>${parcour.name}</h3>
          <div>${parcour.école}</div>
          <p>${parcour.desc}</p>
        </div>
        `,
        );
      } else {
        container.insertAdjacentHTML(
          "beforeend",
          `
        <div class="parcour-card">
          <em class="parcour-date">${parcour.date}</em>
          <h3>${parcour.name}</h3>
          <div>${parcour.école}</div>
        </div>
        `,
        );
      }
    });
  }
}

async function setSocialLinks() {
  const data = await getData();
  if (data) {
    const socialsData = data["social-links"];
    const container = document.querySelector(".social-links");

    Object.entries(socialsData).forEach(([key, value]) => {
      container.insertAdjacentHTML(
        "beforeend",
        `
        <a href="${value}">${key}</a>
        `,
      );
    });
  }
}

setHero();
setSkillsBar();
setComp();
setProjectsCard();
setParcoursCard();
setSocialLinks();
