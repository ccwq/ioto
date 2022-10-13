import {useMouse} from "./js/use-mouse";
import XButton from "./components/XButton.vue";


const plugins = {
    /**
     * install function
     * @param {Vue} Vue
     * @param {Object} options
     */
    install (VueApp:any, options = {}) {
        // VueApp.component('my-component', MyComponent);
    },
};


// 其他导出组件方式
// export { default as App } from './App.vue'

export {default as YButton} from './components/YButton.vue'

export {
    plugins,
    XButton,
    useMouse,
}
