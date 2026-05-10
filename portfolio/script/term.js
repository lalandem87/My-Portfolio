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

async function loadList() {
  const lists = document.getElementById("lists");
  const data = await getData();
  const whoami = data["whoami"];

  const greenWords = ["cybersécurité", "open to work"];

  Object.entries(whoami).forEach(([key, value]) => {
    let formattedValue = value;

    greenWords.forEach((word) => {
      if (value.toLowerCase().includes(word)) {
        formattedValue = formattedValue.replace(
          new RegExp(word, "gi"),
          `<span style="color: #28c840">${word}</span>`,
        );
      }
    });

    lists.insertAdjacentHTML(
      "beforeend",
      `
    <div class="list">
      <span class="key">${key} ::</span>
      <span class="value">${formattedValue}</span>
    </div>
  `,
    );
  });
}

function loadCards(data, container) {
  Object.entries(data).forEach(([key, value]) => {
    container.insertAdjacentHTML(
      "beforeEnd",
      `
        <div class="card ${value.category}">
          <div class="card-content ">${value.name}</div>
        </div>
      `,
    );
  });
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
        <span>${index + 1}</span>
        <div class="content">
          <h4>${project.name}</h4>
          <div>${project.langages}</div>
          <div>${project.desc}</div>
        </div>
        <div class="info">
          <div>${project.type}</div>
          ${project.github ? `<a href="${project.github}" target="_blank"><i class="fa-brands fa-github"></i></a>` : ""}
        </div>
      </div>
      `,
    );
  });
}

async function loadParcours() {
  const data = await getData();
  const parcours = data["parcours"];

  const containerParcours = document.querySelector(".container-parcours");

  parcours.forEach((parcour) => {
    containerParcours.insertAdjacentHTML(
      "beforeend",
      `
      <div class="parcour">
        <div class="date">${parcour.date}</div>
        <div class="middle-bar">|</div>
        <div class="desc">
          <h4>${parcour.name}</h4>
          <p>${parcour.école}</p>
          <p>${parcour.desc}</p>
        </div>
      </div>
      `,
    );
  });
}

async function loadSocialLinks() {
  const data = await getData();
  const socialLinks = data["social-links"];

  const containerSocials = document.querySelector(".social-links");

  Object.entries(socialLinks).forEach(([key, value]) => {
    containerSocials.insertAdjacentHTML(
      "beforeend",
      `
      <a href="${value}">${key}</a>
      `,
    );
  });
}

loadList();
loadSkills();
loadVignette();
loadParcours();
loadSocialLinks();
