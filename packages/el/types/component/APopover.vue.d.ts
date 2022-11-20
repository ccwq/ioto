import { ref, useAttrs } from "vue";
declare const _sfc_main: import("vue").DefineComponent<{
    renderWhenReady: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    virtual: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
}, {
    props: any;
    emits: {};
    attrs: {
        [x: string]: unknown;
    };
    contnetReady: import("vue").ComputedRef<boolean>;
    hasReady: import("vue").Ref<boolean>;
    vBind: import("vue").ComputedRef<{
        onShow(): void;
    }>;
    computed: typeof import("@vue/reactivity").computed;
    ref: typeof ref;
    useAttrs: typeof useAttrs;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    renderWhenReady: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    virtual: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
}>>, {
    renderWhenReady: boolean;
    virtual: boolean;
}>;
export default _sfc_main;
