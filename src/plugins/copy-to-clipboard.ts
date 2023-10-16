import type { App } from 'vue';

let onCopyToClipboard: (event: Event) => void;
let temp: HTMLElement;

export default {
    install: (app: App): void => {
        app.directive('copy-clipboard', {
            mounted(el: HTMLElement, binding: any, vnode: any) {
                temp = el;
                el.classList.add('cpointer');
                onCopyToClipboard = (event: Event): void => {
                    const text = binding.value;
                    const textarea = document.createElement('textarea');
                    textarea.value = text;
                    document.body.appendChild(textarea);
                    textarea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textarea);
                    alert(`Copied text: "${text}"!`);
                };
                el.addEventListener('click', onCopyToClipboard);
            },
            unmounted() {
                temp.removeEventListener('click', onCopyToClipboard);
            },
        });
    },
};
