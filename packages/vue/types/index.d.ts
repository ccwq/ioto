import { useMouse } from "./js/use-mouse";
import XButton from "./components/XButton.vue";
declare const plugins: {
    /**
     * install function
     * @param {Vue} Vue
     * @param {Object} options
     */
    install(VueApp: any, options?: {}): void;
};
export { default as YButton } from './components/YButton.vue';
export { plugins, XButton, useMouse, };
