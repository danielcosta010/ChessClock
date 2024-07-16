let jogador1;
let jogador2;
let vezJogador;
let intervalo = 0;
const tempoJogador1 = document.getElementById('jogador1-tempo');
const tempoJogador2 = document.getElementById('jogador2-tempo');
const selecionaTempo = document.getElementById('time-select');
const pecaBranca = document.getElementById('peca-branca');
const pecaPreta = document.getElementById('peca-preta');

function atualizaRelogio(jogador, tempo) {
  const minutos = Math.floor(tempo / 60);
  const segundos = tempo % 60;
  const tempoFormatado = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
  return document.getElementById(`${jogador}-tempo`).textContent = tempoFormatado;
}

function iniciarJogo() {
  const selecionaTempoJogador = parseInt(selecionaTempo.value);
  jogador1 = selecionaTempoJogador;
  jogador2 = selecionaTempoJogador;
  vezJogador = 1;
  atualizaRelogio('jogador1', jogador1);
  atualizaRelogio('jogador2', jogador2);
  iniciarRelogio();
  pecaBranca.style.opacity = '1';
  selecionaTempo.setAttribute('disabled', true);
}

function iniciarRelogio() {
  intervalo = setInterval(() => {
    if (vezJogador === 1) {
      jogador1--;
      atualizaRelogio('jogador1', jogador1);
      if (jogador1 <= 0) {
        temposEsgotado(tempoJogador1);
      }
    } else {
      jogador2--;
      atualizaRelogio('jogador2', jogador2);
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


selecionaTempo.addEventListener('change', () => {
  const tempo = selecionaTempo.value;
  tempoJogador1.textContent = atualizaRelogio('jogador1', tempo);
  tempoJogador2.textContent = atualizaRelogio('jogador2', tempo);
})

export {  iniciarJogo, iniciarRelogio, mostrarPeca, selecionaVezJogador }