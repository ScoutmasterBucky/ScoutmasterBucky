export const addScript = (src: string): void => {
    const scriptTag = document.createElement('script');
    scriptTag.src = '/dnd/wc-carousel-lite.min.js';
    scriptTag.async = true;
    document.head.appendChild(scriptTag);
}
