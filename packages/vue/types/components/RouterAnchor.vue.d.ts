import { computed, useAttrs } from "vue";
import { useRoute } from "vue-router";
/**
 * 允许一个router-link 在其他路由处于激活状态
 * @example - 比如要自新闻的详情页面,让新闻的导航页处于高亮状态
 * (route)=>{
 *     return route.name == "detail" && route.params?.type=="news"
 * }
 *
 */
declare const _sfc_main: import("vue").DefineComponent<{
    activeFunc: {
        type: FunctionConstructor;
        required: false;
    };
}, {
    props: any;
    emits: {};
    attrs: {
        [x: string]: unknown;
    };
    route: import("vue-router").RouteLocationNormalizedLoaded;
    classes: import("vue").ComputedRef<any>;
    computed: typeof computed;
    useAttrs: typeof useAttrs;
    useRoute: typeof useRoute;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    activeFunc?: unknown;
} & {} & {
    activeFunc?: Function | undefined;
}>, {}>;
export default _sfc_main;
