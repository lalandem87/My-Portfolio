async function getData() {
  try {
    const request = await fetch("../back-end/data.json");
    if (!request.ok) {
      console.log("There's an error when you try to grab data!");
    }
    const data = await request.json();
    return data;
  } catch (e) {
    console.error(`Error: ${e}`);
  }
}

async function loadList() {
  const lists = document.getElementById("lists");
  const data = await getData();
  const whoami = data["whoami"];

  Object.entries(whoami).forEach(([key, value]) => {
    lists.insertAdjacentHTML(
      "beforeEnd",
      `
        <div class="list">
            <span class="key">${key} ::</span>
            <span class="value">${value}</span>
        </div>
        `,
    );
  });
}

function loadCards(data, container) {
  for (const d of data) {
    container.insertAdjacentHTML(
      "beforeEnd",
      `
        <div class="card">
          <div class="card-content">${d}</div>
        </div>
      `,
    );
  }
}

async function loadSkills() {
  const data = await getData();
  const cyberData = data["skills"]["cybersecurity"];
  const devData = data["skills"]["devweb"];

  const containerCyber = document.querySelector(".cybersec");
  const containerDev = document.querySelector(".devweb");

  loadCards(cyberData, containerCyber);
  loadCards(devData, containerDev);
}

async function loadVignette() {
  const data = await getData();
  const projects = data["projects"];

  const containerVignette = document.querySelector(".container-vignette");

  projects.forEach((project, index) => {
    containerVignette.insertAdjacentHTML(
      "beforeend",
      `
      <div class="vignette">
        <span>${index}</span>
        <div class="content">
          <h4>${project.name}</h4>
          <div>${project.langages}</div>
          <div>${project.desc}</div>
        </div>
        <div class="info">
          <div>${project.type}</div>
          <button><i class="fa-brands fa-github">${project.github}</i></button>
        </div>
      </div>
      `,
    );
  });
}

loadList();
loadSkills();
loadVignette();
