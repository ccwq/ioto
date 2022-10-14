declare type Size = [number, number];
declare const _sfc_main: import("vue").DefineComponent<{
    offsetWidth: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    offsetHeight: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    debounce: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    throttle: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    fastMode: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    emitWhenReady: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
}, {
    props: any;
    emits: {
        (e: "update:modelValue", size: Size): void;
        (e: "ready", size: Size): void;
    };
    _w: number;
    _h: number;
    $$el: import("vue").Ref<HTMLElement | undefined>;
    _resizeObject: any;
    resizeHandler: Function;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "ready")[], "update:modelValue" | "ready", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    offsetWidth: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    offsetHeight: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    debounce: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    throttle: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    fastMode: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    emitWhenReady: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onReady?: ((...args: any[]) => any) | undefined;
}, {
    offsetWidth: number;
    offsetHeight: number;
    debounce: number;
    throttle: number;
    fastMode: boolean;
    emitWhenReady: boolean;
}>;
export default _sfc_main;
