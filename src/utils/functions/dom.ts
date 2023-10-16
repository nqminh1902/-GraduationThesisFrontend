export const handleAppUnmounted = () => {
    const app: HTMLElement | null = document.querySelector('#app');
    if (app) {
        app.style.height = 'auto';
        app.style.overflow = 'unset';
    }
};

export const handleAppMounted = () => {
    const app: HTMLElement | null = document.querySelector('#app');
    if (app) {
        app.style.height = '100vh';
        app.style.overflow = 'hidden';
    }
};

export const translateScreen = (yCoord: number, xCoord: number = 0) => {
    window.scrollTo(xCoord, yCoord);
};
