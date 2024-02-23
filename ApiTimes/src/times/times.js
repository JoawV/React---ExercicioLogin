document.addEventListener("DOMContentLoaded", function () {
  carregarListaTimes();

  document
    .getElementById("formTime")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      adicionarEquipe();
    });
});

function adicionarEquipe() {
  const id = parseInt(document.getElementById("idTime").value, 10);
  const nome = document.getElementById("nomeTime").value;
  const estadio = document.getElementById("estadio").value;
  const local = document.getElementById("local").value;
  const foto = document.getElementById("foto").files[0].name;
  const resumo = document.getElementById("resumo").value;

  fetch('http://localhost:3000/times', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      nome: nome,
      estadio: estadio,
      local: local,
      foto: foto,
      resumo: resumo,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log("Equipe adicionada com sucesso:", data);
      carregarListaTimes();
    })
    .catch((error) => console.error("Erro:", error))
}

function carregarListaTimes() {
  fetch('http://localhost:3000/times')
    .then(response => response.json())
    .then(function (data) {
      let lista = document.getElementById("listaTimes")
      if (!lista) {
        console.error("Elemento listaTimes não encontrado.");
        return;
      }
      listaTimes.innerHTML = "";

      data.forEach(function (time) {
        const timeItem = document.createElement("div");

        timeItem.classList.add("time");
        timeItem.id = `time${time.id}`;

        timeItem.innerHTML = `
        <div class="times">
        <div class="foto">
          <img src="${time.foto}" alt="Foto do Time">
        </div>
        <div class="informacao">
          <div class="nome">
            <h2>${time.nome.charAt(0).toUpperCase() + time.nome.slice(1)}</h2>
          </div>
          <div class="tipo">
            <p class="tipo">${time.resumo}</p>
          </div>
          <div class="pokemon-status">
            <p class="statusAltura"><i class="bi bi-house-door-fill"></i>${time.estadio}</p>
            <p class="statusPeso"><i class="bi bi-pin-map-fill"></i>${time.local}</p>
          </div>
          <div class="buttonDiv">
            <button class="detalhesButton"><a href="atualizar.html?id=${time.id}">Atualizar</a></button>
            <button class="excluirButton" onClick="excluirTime(${time.id})">Excluir</button>
          </div> 
        </div>
        </div>
      `;

        lista.appendChild(timeItem);
      });
    });
}

function excluirTime(id) {
  fetch(`http://localhost:3000/times/${id}`, {
    method: "DELETE",
  })
    .then(response => response.json())
    .then(data => {
      console.log("Time excluído com sucesso:", data);
      carregarListaTimes();
    })
    .catch(error => console.error("Erro ao excluir time:", error));
}

function atualizarEquipe(id) {
  const novoNome = document.getElementById("novoNome").value;
  const novoEstadio = document.getElementById("novoEstadio").value;
  const novoLocal = document.getElementById("novoLocal").value;
  const novaFoto = document.getElementById("novaFoto").files[0].name;
  const novoResumo = document.getElementById("novoResumo").value;

  fetch(`http://localhost:3000/times/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome: novoNome,
      estadio: novoEstadio,
      local: novoLocal,
      foto: novaFoto,
      resumo: novoResumo,
    }),
  })
    .then(response => response.json())
    .then(data => {
      console.log("Time atualizado com sucesso:", data);
    })
    .catch(error => console.error("Erro ao atualizar o time:", error));
}