let wakeLock = null;
export async function requestWakeLock() {
    try {
        wakeLock = await navigator.wakeLock.request('screen');
        console.log('Wake Lock ativado');
        wakeLock.addEventListener('release', () => {
            console.log('Wake Lock desativado');
        });
    } catch (err) {
        console.error(`${err.name}, ${err.message}`);
    }
}

export function releaseWakeLock() {
    if (wakeLock) {
        wakeLock.release()
            .then(() => {
                wakeLock = null;
                console.log('Wake Lock liberado');
            })
            .catch(err => {
                console.error(`${err.name}, ${err.message}`);
            });
    }
}