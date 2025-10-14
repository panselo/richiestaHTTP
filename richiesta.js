const URL = "https://classe5id.altervista.org/api.restful-api.dev/objects/";
let items = [];

function mostra() {
  const out = document.getElementById("output");
  out.innerHTML = "";

  items.forEach(function(item) {
    const div = document.createElement("div");
    div.textContent = item.name + " ";

    const mod = document.createElement("button");
    mod.textContent = "Modifica";
    mod.onclick = function() {
      const nuovoNome = prompt("Nuovo nome:", item.name);
      if (!nuovoNome) return;
      const nuovoJson = JSON.stringify({
        name: nuovoNome,
        data: item.data || {}
      });
      fetch(`${URL}/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: nuovoJson
      })
      .then(r => r.json())
      .then(() => carica());
    };

    const del = document.createElement("button");
    del.textContent = "Elimina";
    del.onclick = function() {
      if (!confirm("Vuoi eliminarlo?")) return;
      fetch(`${URL}/${item.id}`, { method: "DELETE" })
      .then(() => carica());
    };

    div.appendChild(mod);
    div.appendChild(del);
    out.appendChild(div);
  });
}

function aggiungi() {
  const nome = document.getElementById("nome").value.trim();
  const memoria = document.getElementById("memoria").value.trim();
  if (nome === "" || memoria === "") return alert("Compila tutti i campi!");

  const nuovo = JSON.stringify({
    name: nome,
    data: { memoria: memoria }
  });

  fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: nuovo
  })
  .then(r => r.json())
  .then(() => {
    document.getElementById("nome").value = "";
    document.getElementById("memoria").value = "";
    carica();
  });
}

function carica() {
  fetch(URL)
    .then(r => r.json())
    .then(dati => {
      items = dati.slice(0, 5); 
      mostra();
    })
    .catch(() => {
      document.getElementById("output").textContent = "Errore nel caricamento!";
    });
}

carica();
