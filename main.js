import { iniciarRelogio, iniciarJogo, selecionarVezJogador, mostrarPeca } from "./modulosJS/clock.js";
import { iniciarModal, mostrarModal } from "./modulosJS/modal.js";
import { requestWakeLock, releaseWakeLock } from "./modulosJS/wakeLock.js";


const botaoPreto = document.getElementById('botao__peca-preta');
const botaoBranco = document.getElementById('botao__peca-branca');
const iniciar = document.getElementById('iniciar-btn');
const reiniciar = document.getElementById('reiniciar-btn');

function clickJogada(branco, preto) {
    mostrarPeca();
    iniciarRelogio();
    selecionarVezJogador();
    branco.setAttribute('disabled', true);
    preto.removeAttribute('disabled');
  }

botaoBranco.addEventListener('click', () => {
    clickJogada(botaoBranco, botaoPreto);
})
botaoPreto.addEventListener('click', () => {
    clickJogada(botaoPreto, botaoBranco);
})

iniciar.addEventListener('click', () => {
    iniciarJogo()
    requestWakeLock();
    botaoBranco.removeAttribute('disabled');
    iniciar.setAttribute('disabled', true);
    reiniciar.removeAttribute('disabled');
});


reiniciar.addEventListener('click', () => {
    iniciarModal()
    mostrarModal()
})

window.addEventListener('beforeunload', () => {
    whitePieceVideo.pause();
    blackPieceVideo.pause();
    releaseWakeLock();
});

export { botaoBranco, botaoPreto}