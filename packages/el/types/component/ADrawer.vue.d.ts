import { ref, useAttrs, watch } from "vue";
declare const _sfc_main: import("vue").DefineComponent<{
    positionAbs: {
        type: BooleanConstructor;
        required: false;
    };
}, {
    props: any;
    emits: {};
    attrs: {
        [x: string]: unknown;
    };
    vBind: import("vue").ComputedRef<{
        [x: string]: unknown;
    }>;
    helperClass: string;
    drawerEl: import("vue").Ref<any>;
    computed: typeof import("@vue/reactivity").computed;
    onMounted: (hook: () => any, target?: import("vue").ComponentInternalInstance | null | undefined) => false | Function | undefined;
    ref: typeof ref;
    useAttrs: typeof useAttrs;
    watch: typeof watch;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    positionAbs: {
        type: BooleanConstructor;
        required: false;
    };
}>>, {
    positionAbs: boolean;
}>;
export default _sfc_main;
