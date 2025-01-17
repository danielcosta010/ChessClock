let wakeLock = null;
const telaAtiva = document.getElementById('tela__ativa');

async function requestWakeLock() {
    try {
        wakeLock = await navigator.wakeLock.request('screen');
        telaAtiva.style.opacity = '1';
        telaAtiva.innerHTML = 'App mantendo a tela ativa';
        setTimeout(() => {
            telaAtiva.style.opacity = '0';
        }, 5000)


        wakeLock.addEventListener('release', () => {
            console.log('Wake Lock desativado');
        });
    } catch (err) {
        telaAtiva.innerHTML = `${err.name}, ${err.message}: Seu navegador não tem suporte para manter a tela ativa`;
    }
}

function releaseWakeLock() {
    if (wakeLock) {
        wakeLock.release()
            .then(() => {
                wakeLock = null;
            })
            .catch(err => {
                telaAtiva.innerHTML = `${err.name}, ${err.message}: Seu navegafor não tem suporte para manter a tela ativa`;
            });
    }
}

export { requestWakeLock, releaseWakeLock }