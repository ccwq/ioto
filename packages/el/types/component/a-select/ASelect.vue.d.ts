import { computed, inject, provide, ref, toRefs, useAttrs, watch, watchEffect } from "vue";
declare const _sfc_main: import("vue").DefineComponent<{
    modelValue: {
        type: (StringConstructor | ArrayConstructor | NumberConstructor)[];
        required: false;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    options: {
        type: null;
        required: true;
        default: () => never[];
    };
    keyField: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    labelField: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    justLabel: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    placeholder: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    disableAutoWidth: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    blankTextPlaceholder: {
        type: StringConstructor;
        required: false;
        default: string;
    };
}, {
    attrs: {
        [x: string]: unknown;
    };
    props: any;
    emits: {
        (e: "update:modelValue", value: string | number): void;
        (e: "data-ready", hitItem: any, options?: any[]): void;
        (e: "update:modelLabel", label: string | undefined): void;
    };
    options: import("vue").Ref<{
        [x: string]: any;
        value: string | number;
        label: string;
    }[]>;
    optDicByValue: import("vue").ComputedRef<Record<string, any>>;
    currentItem: import("vue").ComputedRef<any>;
    currentLabel: import("vue").ComputedRef<any>;
    multipleValueMode: import("vue").ComputedRef<boolean>;
    currentTextLabel: import("vue").ComputedRef<any>;
    noMatched: import("vue").ComputedRef<boolean>;
    isEmpty: import("vue").ComputedRef<boolean>;
    vBind: import("vue").ComputedRef<{
        modelValue: string;
        "onUpdate:modelValue"(v: string | number): void;
        placeholder: string;
    }>;
    computed: typeof computed;
    inject: typeof inject;
    provide: typeof provide;
    ref: typeof ref;
    toRefs: typeof toRefs;
    useAttrs: typeof useAttrs;
    watch: typeof watch;
    watchEffect: typeof watchEffect;
    all2valueName: (options: (string | string[] | (string | number)[][] | import("@ioto/core/types/types").IObject[]) | ((sett?: import("@ioto/core/types/base").All2ValueNameOption | undefined) => string | string[] | (string | number)[][] | import("@ioto/core/types/types").IObject[]), settings?: import("@ioto/core/types/base").All2ValueNameOption | undefined) => any[];
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "data-ready" | "update:modelLabel")[], "update:modelValue" | "data-ready" | "update:modelLabel", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue?: unknown;
    disabled?: unknown;
    options?: unknown;
    keyField?: unknown;
    labelField?: unknown;
    justLabel?: unknown;
    placeholder?: unknown;
    disableAutoWidth?: unknown;
    blankTextPlaceholder?: unknown;
} & {
    modelValue: string | number | unknown[];
    disabled: boolean;
    placeholder: string;
    options: any;
    keyField: string;
    labelField: string;
    justLabel: boolean;
    disableAutoWidth: boolean;
    blankTextPlaceholder: string;
} & {}> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    "onData-ready"?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelLabel"?: ((...args: any[]) => any) | undefined;
}, {
    modelValue: string | number | unknown[];
    disabled: boolean;
    placeholder: string;
    options: any;
    keyField: string;
    labelField: string;
    justLabel: boolean;
    disableAutoWidth: boolean;
    blankTextPlaceholder: string;
}>;
export default _sfc_main;
