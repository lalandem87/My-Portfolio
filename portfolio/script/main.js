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
        <span class="skill">${skill}</span>
        <span class="dot-sep">.</span>
        `,
      );
    });
  }
}

setHero();
setSkillsBar();
