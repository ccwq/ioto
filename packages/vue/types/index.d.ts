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
export { default as SizeMonitor } from './components/SizeMonitor.vue';
export { default as VBox } from './components/VBox.vue';
export { default as F9Layout } from './components/F9Layout.vue';
export { EChart, initEchart, } from './components/e-chart';
export { default as usePageRequest } from './hooks/usePageRequest';
export { default as useStepHelper } from './hooks/useStepHelper';
export { default as TempVar } from "./components/TempVar";
export { VReander } from "./js/vRender";
export { plugins, XButton, useMouse, };
export { default as RouterAnchor } from "./components/RouterAnchor.vue";
export { type IDataWrapper, type IDWOptions, useDataWrapper, DWStatusEnum, DataWrapper, useDataWrapperWithPage, dataWrapperWithPageLoadFunSetter, type IDWWithPageOptions, } from "./components/data-wrapper";
