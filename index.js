let listaDeTeams = sessionStorage.getItem("listaDeTeams") ? JSON.parse(sessionStorage.getItem("listaDeTeams")) : [];

carregarTeams(listaDeTeams);

function mostrarOverlay() {
    let modalBG = document.querySelector("#overlay");
    modalBG.classList.remove("invisible", "opacity-0");
}

function esconderOverlay() {
    let modalBG = document.querySelector("#overlay");
    modalBG.classList.add("invisible", "opacity-0");
    esconderCriar();
    esconderEditar()
}

function mostrarCriar() {
    mostrarOverlay();
    let modalCriar = document.querySelector("#criar");
    modalCriar.classList.remove("invisible", "opacity-0");
}

function esconderCriar() {
    let modalCriar = document.querySelector("#criar");
    modalCriar.classList.add("invisible", "opacity-0");
}

function mostrarEditar(nomeDoTeam) {
    mostrarOverlay();
    let modalEditar = document.querySelector("#editar");
    modalEditar.classList.remove("invisible", "opacity-0");
    let nomeDoTeamValue = document.querySelector("#nomeDoTeam");
    nomeDoTeamValue.value = nomeDoTeam;
}

function esconderEditar() {
    let modalEditar = document.querySelector("#editar");
    modalEditar.classList.add("invisible", "opacity-0");
}

function mostrarParticipantes(nomeDoTeam) {
    mostrarOverlay();
    let modalVer = document.querySelector("#visualizar");
    modalVer.classList.remove("invisible", "opacity-0");
    carregarParticipantes(nomeDoTeam)
}

function esconderParticipantes() {
    let modalVer = document.querySelector("#visualizar"); // Seleciona o modal de participantes.
    modalVer.classList.add("invisible", "opacity-0"); // Adiciona classes para esconder o modal.
    esconderOverlay(); // Também esconde o overlay.
}

function criarTeam() {
    event.preventDefault();
    let nomeValue = document.querySelector("#nome").value;
    let capacidadeValue = document.querySelector("#capacidade").value;

    if (listaDeTeams.some(team => team.nome == nomeValue)) {
        alert("Já existe um team com esse nome!")
        return;
    }
    
    listaDeTeams.push({
        nome: nomeValue,
        capacidade: capacidadeValue,
        participantes: []
    })
    
    document.querySelector("#nome").value = "";
    document.querySelector("#capacidade").value = "";

    esconderCriar();
    esconderOverlay();
    carregarTeams(listaDeTeams);
}

function editarTeam() {
    event.preventDefault();
    // recuperando o nome do participante
    let participanteValue = document.querySelector("#participante").value;
    let nomeDoTeamValue = document.querySelector("#nomeDoTeam").value;
    // descobrindo o team que eu vou editar
    let teamParaEditar = listaDeTeams.find(team => team.nome == nomeDoTeamValue);
    // inserindo o nome do participante no array dos participantes
    teamParaEditar.participantes.push(participanteValue);
    // atualizando a lista na memoria do navegador
    sessionStorage.setItem("listaDeTeams", JSON.stringify(listaDeTeams))
    // esconder o overlay
    esconderOverlay();
    // recarregando a lista atualizada
    carregarTeams(listaDeTeams);
}

function carregarTeams(lista) {
    let teamsGrid = document.querySelector("#teams");
    teamsGrid.innerHTML = '';
    lista.map(team => {
        teamsGrid.innerHTML += `
            <div class="bg-cinza2 rounded-lg p-4">
                <div class="flex items-center justify-between">
                    <h6 class="text-white text-[18px] font-bold">${team.nome}</h6>
                    <box-icon name='show' type='solid' class="fill-white cursor-pointer duration-200 hover:fill-rosa" onclick="mostrarParticipantes('${team.nome}')"></box-icon>
                </div>
                <div class="w-[100px] h-[100px] rounded-full bg-cinza1 flex flex-col justify-center items-center m-auto my-[26px]">
                    <h1 class="text-white text-[50px] leading-[50px]">${team.participantes.length}</h1>
                    <h6 class="font-bold text-white">/ ${team.capacidade}</h6>
                </div>
                <div class="flex gap-4">
                    <button class="flex-1 h-[40px] flex items-center border-2 border-rosa rounded-lg text-white text-[12px] uppercase font-bold relative group" onclick="mostrarEditar('${team.nome}')">
                        <span class="w-0 h-full absolute top-0 left-0 bg-rosa duration-200 group-hover:w-full"></span>
                        <span class="w-full relative z-10 text-center">Adicionar</span>
                    </button>
                    <button class="w-[40px] h-[40px] flex justify-center items-center border-2 border-rosa rounded-lg text-white text-[12px] uppercase font-bold relative group" onclick="deletarTeam('${team.nome}')">
                        <span class="w-0 h-full absolute top-0 left-0 bg-rosa duration-200 group-hover:w-full"></span>
                        <box-icon name='trash' class="fill-white relative z-10"></box-icon>
                    </button>
                </div>
            </div>
        `;
    })
}

function carregarParticipantes(nomeDoTeam) {
    let teamSelecionado = listaDeTeams.find(team => team.nome == nomeDoTeam);
    listaDeParticipantes.innerHTML = '';
    teamSelecionado.participantes.map(participante => {
        listaDeParticipantes.innerHTML += `
            <div class="flex justify-between items-center text-white leading-[40px]">
                ${participante} 
                <button class="w-[40px] h-[40px] flex justify-center items-center border-2 border-rosa rounded-lg text-white text-[12px] uppercase font-bold relative group">
                    <span class="w-0 h-full absolute top-0 left-0 bg-rosa duration-200 group-hover:w-full"></span>
                    <box-icon name='trash' class="fill-white relative z-10"></box-icon>
                </button>
            </div>
        `;
    })
}


function removerParticipante(nomeDoTeam, index, event) {
    event.preventDefault(); // Evita que o botão feche o modal caso esteja dentro de um form

    let teamSelecionado = listaDeTeams.find(team => team.nome == nomeDoTeam);
    
    if (teamSelecionado) {
        // Remove o participante pelo índice
        teamSelecionado.participantes.splice(index, 1);

        // Atualiza os dados no sessionStorage
        sessionStorage.setItem("listaDeTeams", JSON.stringify(listaDeTeams));

        // Recarrega a lista para refletir a remoção
        carregarParticipantes(nomeDoTeam);
    }
}

function deletarTeam(nomeDoTeam) {

    // Deletar usando o splice
    // let teamPosition;
    // listaDeTeams.map((team, posicao) => {
    //     if(team.nome == nomeDoTeam){
    //         teamPosition = posicao;
    //     }
    //     return team;
    // })
    // listaDeTeams.splice(teamPosition, 1);

    //Deletar usando o filter
    let novaLista = listaDeTeams.filter(team => team.nome != nomeDoTeam)
    listaDeTeams = novaLista;
    sessionStorage.setItem("listaDeTeams", listaDeTeams)
    carregarTeams(listaDeTeams);
}
