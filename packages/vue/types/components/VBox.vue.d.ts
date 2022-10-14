import { ref, watch } from "vue";
declare const _sfc_main: import("vue").DefineComponent<{
    overflowType: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    raiseSlot: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    offsetX: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    offsetY: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    disableSizeCalc: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    unit: {
        type: StringConstructor;
        required: false;
        default: string;
    };
}, {
    size: import("vue").Ref<[string | number, string | number]>;
    props: any;
    handlerSize: (aSize?: [number, number]) => void;
    slotAnchor: import("vue").Ref<HTMLDivElement | undefined>;
    SizeMonitor: import("vue").DefineComponent<{
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
            (e: "update:modelValue", size: [number, number]): void;
            (e: "ready", size: [number, number]): void;
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
    onMounted: (hook: () => any, target?: import("vue").ComponentInternalInstance | null | undefined) => false | Function | undefined;
    ref: typeof ref;
    watch: typeof watch;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    overflowType: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    raiseSlot: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    offsetX: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    offsetY: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    disableSizeCalc: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    unit: {
        type: StringConstructor;
        required: false;
        default: string;
    };
}>>, {
    overflowType: string;
    raiseSlot: boolean;
    offsetX: number;
    offsetY: number;
    disableSizeCalc: boolean;
    unit: string;
}>;
export default _sfc_main;
