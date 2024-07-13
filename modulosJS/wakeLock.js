let wakeLock = null;
const telaAtiva = document.getElementById('tela__ativa')
export async function requestWakeLock() {
    try {
        wakeLock = await navigator.wakeLock.request('screen');
        telaAtiva.style.opacity = '1'
        telaAtiva.innerHTML = 'App mantendo a tela ativa'
        setTimeout(() => {
            telaAtiva.style.opacity = '0'
        }, 5000)


        wakeLock.addEventListener('release', () => {
            console.log('Wake Lock desativado');
        });
    } catch (err) {
        telaAtiva.innerHTML = `${err.name}, ${err.message}: seu navegafor não está mantendo a tela ativa`;
    }
}

export function releaseWakeLock() {
    if (wakeLock) {
        wakeLock.release()
            .then(() => {
                wakeLock = null;
            })
            .catch(err => {
                telaAtiva.innerHTML = `${err.name}, ${err.message}: seu navegafor não está mantendo a tela ativa`
            });
    }
}