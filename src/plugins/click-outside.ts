import type { App } from 'vue';

let onClickOutside: (event: Event) => void;

export default {
    install: (app: App): void => {
        app.directive('click-outside', {
            mounted(el: HTMLElement, binding: any, vnode: any) {
                onClickOutside = (event: Event) => {
                    el.style.display = 'inline-block';
                    if (!el.contains(event.target as Node)) {
                        const callback = binding.value;
                        if (typeof callback === 'function') {
                            callback();
                        }
                    }
                };
                document.addEventListener('click', onClickOutside);
            },
            unmounted() {
                document.removeEventListener('click', onClickOutside);
            },
        });
    },
};
