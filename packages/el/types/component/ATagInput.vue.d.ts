import { inject, provide, toRefs, useAttrs, watchEffect } from "vue";
declare const _sfc_main: import("vue").DefineComponent<{
    modelValue: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    placeholder: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    spliters: {
        type: ArrayConstructor;
        required: false;
        default: () => string[];
    };
}, {
    attrs: {
        [x: string]: unknown;
    };
    props: any;
    emits: (e: "update:modelValue", value: string) => void;
    value: import("vue").ComputedRef<any[]>;
    disabled: import("vue").ComputedRef<boolean>;
    vBind: import("vue").ComputedRef<{
        tags: any[];
        modelValue: string;
        placeholder: string;
        disabled: boolean;
        "onTags-changed"(v: any[]): void;
        addOnKey: (string | number)[];
    }>;
    computed: typeof import("@vue/reactivity").computed;
    inject: typeof inject;
    provide: typeof provide;
    toRefs: typeof toRefs;
    useAttrs: typeof useAttrs;
    watchEffect: typeof watchEffect;
    readonly VueTagsInput: any;
    readonly AButton: import("vue").DefineComponent<{
        label: {
            type: StringConstructor;
            default: string;
        };
        icon: {
            type: StringConstructor;
            default: string;
        };
        suffix: {
            type: StringConstructor;
            default: string;
        };
        lite: {
            type: BooleanConstructor;
            default: boolean;
        };
    }, {
        iconPrevClasses: import("vue").ComputedRef<Record<string, any>>;
        iconSuffixClasses: import("vue").ComputedRef<Record<string, any>>;
        vBind: import("vue").ComputedRef<{
            [x: string]: unknown;
        }>;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
        label: {
            type: StringConstructor;
            default: string;
        };
        icon: {
            type: StringConstructor;
            default: string;
        };
        suffix: {
            type: StringConstructor;
            default: string;
        };
        lite: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>>, {
        label: string;
        icon: string;
        suffix: string;
        lite: boolean;
    }>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    placeholder: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    spliters: {
        type: ArrayConstructor;
        required: false;
        default: () => string[];
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    modelValue: string;
    disabled: boolean;
    placeholder: string;
    spliters: unknown[];
}>;
export default _sfc_main;
