let listaDeTeams = [];

function mostrarOverlay() {
    let modalBG = document.querySelector("#overlay");
    modalBG.classList.remove("invisible", "opacity-0");
}

function esconderOverlay() {
    let modalBG = document.querySelector("#overlay");
    modalBG.classList.add("invisible", "opacity-0");
    esconderCriar();
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

function criarTeam() {
    event.preventDefault();
    let nomeValue = document.querySelector("#nome").value;
    let capacidadeValue = document.querySelector("#capacidade").value;

    listaDeTeams.push({
        nome: nomeValue,
        capacidade: parseInt(capacidadeValue),
        participantes: []
    });

    document.querySelector("#nome").value = '';
    document.querySelector("#capacidade").value = '';

    esconderCriar();
    esconderOverlay();
    carregarTeams(listaDeTeams);
}

// Função para deletar um time
function deletarTeam(index) {
    listaDeTeams.splice(index, 1);
    carregarTeams(listaDeTeams);
}

// Função para adicionar um participante ao time
function adicionarParticipante(index) {
    let nomeParticipante = prompt("Digite o nome do participante:");

    if (nomeParticipante) {
        if (listaDeTeams[index].participantes.length < listaDeTeams[index].capacidade) {
            listaDeTeams[index].participantes.push(nomeParticipante);
            carregarTeams(listaDeTeams);
        } else {
            alert("Capacidade máxima atingida!");
        }
    }
}

// Função para mostrar a lista de participantes
function mostrarParticipantes(index) {
    let team = listaDeTeams[index];
    let mensagem = `Participantes de ${team.nome}:\n\n`;
    
    if (team.participantes.length > 0) {
        mensagem += team.participantes.join("\n");
    } else {
        mensagem += "Nenhum participante cadastrado.";
    }

    alert(mensagem);
}

// Função para buscar times ou participantes
function buscarTimes() {
    let termoBusca = document.querySelector("#search").value.toLowerCase();
    let resultado = listaDeTeams.filter(team => 
        team.nome.toLowerCase().includes(termoBusca) || 
        team.participantes.some(participante => participante.toLowerCase().includes(termoBusca))
    );
    
    carregarTeams(resultado);
}

function carregarTeams(lista) {
    let teamsGrid = document.querySelector("#teams");
    teamsGrid.innerHTML = '';

    lista.forEach((team, index) => {
        teamsGrid.innerHTML += `
            <div class="bg-cinza2 rounded-lg p-4" data-index="${index}">
                <div class="flex items-center justify-between">
                    <h6 class="text-white text-[18px] font-bold">${team.nome}</h6>
                    <box-icon name='show' type='solid' class="fill-white cursor-pointer duration-200 hover:fill-rosa view-btn" data-index="${index}"></box-icon>
                </div>
                <div class="w-[100px] h-[100px] rounded-full bg-cinza1 flex flex-col justify-center items-center m-auto my-[26px]">
                    <h1 class="text-white text-[50px] leading-[50px]">${team.participantes.length}</h1>
                    <h6 class="font-bold text-white">/ ${team.capacidade}</h6>
                </div>
                <div class="flex gap-4">
                    <button class="add-btn flex-1 h-[40px] flex items-center border-2 border-rosa rounded-lg text-white text-[12px] uppercase font-bold relative group" data-index="${index}">
                        <span class="w-0 h-full absolute top-0 left-0 bg-rosa duration-200 group-hover:w-full"></span>
                        <span class="w-full relative z-10 text-center">Adicionar</span>
                    </button>
                    <button class="delete-btn w-[40px] h-[40px] flex justify-center items-center border-2 border-rosa rounded-lg text-white text-[12px] uppercase font-bold relative group" data-index="${index}">
                        <span class="w-0 h-full absolute top-0 left-0 bg-rosa duration-200 group-hover:w-full"></span>
                        <box-icon name='trash' class="fill-white relative z-10"></box-icon>
                    </button>
                </div>
            </div>
        `;
    });
}

// Delegação de eventos para os botões
document.querySelector("#teams").addEventListener("click", function(event) {
    let btnDelete = event.target.closest(".delete-btn");
    if (btnDelete) {
        let index = btnDelete.getAttribute("data-index");
        deletarTeam(index);
    }

    let btnAdd = event.target.closest(".add-btn");
    if (btnAdd) {
        let index = btnAdd.getAttribute("data-index");
        adicionarParticipante(index);
    }

    let btnView = event.target.closest(".view-btn");
    if (btnView) {
        let index = btnView.getAttribute("data-index");
        mostrarParticipantes(index);
    }
});

// Evento de busca
document.querySelector("#search").addEventListener("input", buscarTimes);
