import { createApp } from 'vue-demi'
import './style.css'
import App from './App.vue'
//
// // createApp(App).mount('#app')
import HelloWorld from './components/HelloWorld.vue'
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

export {
    plugins,
    XButton,
    useMouse,
    App,
    HelloWorld,
}
