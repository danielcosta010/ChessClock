import { iniciarModal, mostrarModal } from "./modal.js";
import { requestWakeLock, releaseWakeLock } from "./wakeLock.js";

let jogador1;
let jogador2;
let intervalo = 0;
let vezJogador = 1;
const botaoPreto = document.getElementById('botao__player-black');
const botaoBranco = document.getElementById('botao__player-white');
const iniciar = document.getElementById('start-btn');
const reiniciar = document.getElementById('restart-btn');
const pecaBranca = document.getElementById('white-piece');
const pecaPreta = document.getElementById('black-piece');
const tempoJogador1 = document.getElementById('player1-time')
const tempoJogador2 = document.getElementById('player2-time')

botaoPreto.addEventListener('click', () => {
    mostrarPeca()
    iniciarRelogio()
    selecionaVezJogador()
    botaoPreto.setAttribute('disabled', true)
    botaoBranco.removeAttribute('disabled')
})
botaoBranco.addEventListener('click', () => {
    mostrarPeca()
    iniciarRelogio()
    selecionaVezJogador()
    botaoBranco.setAttribute('disabled', true)
    botaoPreto.removeAttribute('disabled')
})

function atualizaRelogio(player, time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById(`${player}-time`).textContent = formattedTime;
}

function selecionaVezJogador() {
    clearInterval(intervalo);
    vezJogador = vezJogador === 1 ? 2 : 1;
}

function iniciarRelogio() {
    intervalo = setInterval(() => {
        if (vezJogador === 1) {
            jogador1--;
            atualizaRelogio('player1', jogador1);
            if (jogador1 <= 0) {
                temposEsgotado(tempoJogador1)
            }
        } else {
            jogador2--;
            atualizaRelogio('player2', jogador2);
            if (jogador2 <= 0) {
                temposEsgotado(tempoJogador2)
            }
        }
    }, 1000);
}

function temposEsgotado(tempoJogador) {
    clearInterval(intervalo)
    tempoJogador.innerHTML = 'Tempo Esgotado!'
    tempoJogador.style.color = 'red'
    botaoBranco.setAttribute('disabled', true)
    botaoPreto.setAttribute('disabled', true)
}

function mostrarPeca() {
    if (vezJogador === 1) {
        pecaBranca.style.opacity = '0';
        pecaPreta.style.opacity = '1';
        pecaBranca.play()
    } else {
        pecaBranca.style.opacity = '1';
        pecaPreta.style.opacity = '0';
        pecaPreta.play()
    }
}

iniciar.addEventListener('click', () => {
    const selecionaTempo = parseInt(document.getElementById('time-select').value) / 2;
    jogador1 = selecionaTempo;
    jogador2 = selecionaTempo;
    vezJogador = 1;
    atualizaRelogio('player1', jogador1);
    atualizaRelogio('player2', jogador2);
    iniciarRelogio();
    requestWakeLock()
    pecaBranca.style.opacity = '1';
    botaoBranco.removeAttribute('disabled')
    iniciar.setAttribute('disabled', true)
    reiniciar.removeAttribute('disabled')
});

iniciarModal()

reiniciar.addEventListener('click', () => {
    mostrarModal()
})

// Pausar os vídeos quando a página é descarregada
window.addEventListener('beforeunload', () => {
    whitePieceVideo.pause();
    blackPieceVideo.pause();
    releaseWakeLock(); // Liberar Wake Lock
});

