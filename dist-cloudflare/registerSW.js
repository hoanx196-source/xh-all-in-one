(() => {
    const resetKey = 'xh-aio-cache-reset-version';
    const resetVersion = 'about-fields-20260710-1';

    window.addEventListener('load', async () => {
        const needsReload = window.localStorage.getItem(resetKey) !== resetVersion;

        try {
            if ('serviceWorker' in navigator) {
                const registrations = await navigator.serviceWorker.getRegistrations();
                await Promise.all(registrations.map(registration => registration.unregister()));
            }
        } catch (error) {
            console.warn('xH all in one: service worker cleanup failed', error);
        }

        try {
            if (needsReload && 'caches' in window) {
                const keys = await caches.keys();
                await Promise.all(keys.map(key => caches.delete(key)));
            }
        } catch (error) {
            console.warn('xH all in one: cache cleanup failed', error);
        }

        if (needsReload) {
            window.localStorage.setItem(resetKey, resetVersion);
            window.location.reload();
        }
    });
})();
