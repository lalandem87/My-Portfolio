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

loadList();
