import { iniciarModal, mostrarModal } from "./modulosJS/modal.js";
import { requestWakeLock, releaseWakeLock } from "./modulosJS/wakeLock.js";

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
const tempoJogador1 = document.getElementById('player1-time');
const tempoJogador2 = document.getElementById('player2-time');
const selecionaTempo = document.getElementById('time-select')

function atualizaRelogio(player, time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return document.getElementById(`${player}-time`).textContent = formattedTime;
}

function iniciarRelogio() {
    intervalo = setInterval(() => {
        if (vezJogador === 1) {
            jogador1--;
            atualizaRelogio('player1', jogador1);
            if (jogador1 <= 0) {
                temposEsgotado(tempoJogador1);
            }
        } else {
            jogador2--;
            atualizaRelogio('player2', jogador2);
            if (jogador2 <= 0) {
                temposEsgotado(tempoJogador2);
            }
        }
    }, 1000);
}

function temposEsgotado(tempoJogador) {
    clearInterval(intervalo);
    tempoJogador.innerHTML = 'Tempo Esgotado!';
    tempoJogador.style.color = 'red';
    botaoBranco.setAttribute('disabled', true);
    botaoPreto.setAttribute('disabled', true);
}

function mostrarPeca() {
    if (vezJogador === 1) {
        pecaBranca.style.opacity = '0';
        pecaPreta.style.opacity = '1';
        pecaBranca.play();
    } else {
        pecaBranca.style.opacity = '1';
        pecaPreta.style.opacity = '0';
        pecaPreta.play();
    }
}

function selecionaVezJogador() {
    clearInterval(intervalo);
    vezJogador = vezJogador === 1 ? 2 : 1;
}

function clickJogada(branco, preto){
    mostrarPeca();
    iniciarRelogio();
    selecionaVezJogador();
    branco.setAttribute('disabled', true);
    preto.removeAttribute('disabled');
}

botaoBranco.addEventListener('click', () => {
    clickJogada(botaoBranco, botaoPreto);
})
botaoPreto.addEventListener('click', () => {
    clickJogada(botaoPreto, botaoBranco);
})

selecionaTempo.addEventListener('change', () => {
    tempoJogador1.textContent = atualizaRelogio('player1', selecionaTempo.value);
    tempoJogador2.textContent = atualizaRelogio('player2', selecionaTempo.value);
})

iniciar.addEventListener('click', () => {
    const selecionaTempoJogador = parseInt(document.getElementById('time-select').value);
    jogador1 = selecionaTempoJogador;
    jogador2 = selecionaTempoJogador;
    vezJogador = 1;
    atualizaRelogio('player1', jogador1);
    atualizaRelogio('player2', jogador2);
    iniciarRelogio();
    requestWakeLock();
    pecaBranca.style.opacity = '1';
    botaoBranco.removeAttribute('disabled');
    iniciar.setAttribute('disabled', true);
    reiniciar.removeAttribute('disabled');
    selecionaTempo.setAttribute('disabled', true);
});

iniciarModal()

reiniciar.addEventListener('click', () => {
    mostrarModal()
})

window.addEventListener('beforeunload', () => {
    whitePieceVideo.pause();
    blackPieceVideo.pause();
    releaseWakeLock();
});

