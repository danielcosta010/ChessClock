let player1Time;
let player2Time;
let interval;
let currentPlayer = 1;
const botaoBlack = document.getElementById('botao__player-black');
const botaoWhite = document.getElementById('botao__player-white');
const iniciar = document.getElementById('start-btn');
const reiniciar = document.getElementById('restart-btn');
const whitePiece = document.getElementById('white-piece');
const blackPiece = document.getElementById('black-piece');
const timePlayer1 = document.getElementById('player1-time')
const timePlayer2 = document.getElementById('player2-time')

botaoBlack.addEventListener('click', () => {
    animatePiece()
    startClock
    switchPlayer()
    console.log('Cliquei');
    botaoBlack.setAttribute('disabled', true)
    botaoWhite.removeAttribute('disabled')
    console.log(currentPlayer);
})
botaoWhite.addEventListener('click', () => {
    animatePiece()
    startClock()
    switchPlayer()
    console.log('Cliquei');
    botaoWhite.setAttribute('disabled', true)
    botaoBlack.removeAttribute('disabled')
    console.log(currentPlayer);
})

function updateClock(player, time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById(`${player}-time`).textContent = formattedTime;
}

function switchPlayer() {
    clearInterval(interval);
    currentPlayer = currentPlayer === 1 ? 2 : 1;
}

function startClock() {
    interval = setInterval(() => {
        if (currentPlayer === 1) {
            player1Time--;
            updateClock('player1', player1Time);
            if (timePlayer1 < 11) {
                clearInterval(interval)
                alert('lsdkjj')
                timePlayer1.style.backgroundColor = "#FF0F0F";
            }
        } else {
            player2Time--;
            updateClock('player2', player2Time);
            if (player2Time <= 0) {
                clearInterval(interval);
                alert('Jogador 2 perdeu!');
            }
        }
    }, 1000);
}

function animatePiece() {
    if (currentPlayer === 1) {
        whitePiece.style.opacity = '0';
        blackPiece.style.opacity = '1';
    } else {
        whitePiece.style.opacity = '1';
        blackPiece.style.opacity = '0';
    }
}

iniciar.addEventListener('click', () => {
    const selectedTime = parseInt(document.getElementById('time-select').value) / 2;
    player1Time = selectedTime;
    player2Time = selectedTime;
    currentPlayer = 1; // Sempre começa com as peças brancas
    updateClock('player1', player1Time);
    updateClock('player2', player2Time);
    whitePiece.style.opacity = '1';
    startClock();
    botaoWhite.removeAttribute('disabled')
    iniciar.setAttribute('disabled', true)
    reiniciar.removeAttribute('disabled')
});

// modal reiniciar
const modal = document.getElementById("myModal");
const reiniciarModal = document.getElementById('restart-btn-modal')
const fecharModal = document.getElementById('cancel-btn-modal')
const fechar = document.getElementById("close__modal");

reiniciarModal.addEventListener('click', () => {
    modal.style.display = "none";
    window.location.reload();
    
})
fecharModal.addEventListener('click', () => {
    modal.style.display = "none";
})

reiniciar.addEventListener('click', () => {
    modal.style.display = "block";
})


fechar.addEventListener('click', () => {
    modal.style.display = "none";
})

window.addEventListener('click', () => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}) 
