import { nextTick, provide, ref, type Ref, toRefs, useAttrs, watchEffect } from "vue";
import type { Rule, OptionAttrs, FC } from "../a-form-create";
declare const _sfc_main: import("vue").DefineComponent<{
    disabled: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    labelWidth: {
        type: StringConstructor;
        required: false;
    };
    noSubmitBtn: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    option: {
        type: null;
        required: false;
    };
    autoValidate: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    modelValue: {
        type: null;
        required: false;
        default: any;
    };
    mergedValue: {
        type: null;
        required: false;
        default: any;
    };
    compact: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    rule: {
        type: ArrayConstructor;
        required: false;
    };
    rules: {
        type: ArrayConstructor;
        required: false;
    };
    noFooter: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    beforeSubmit: {
        type: FunctionConstructor;
        required: false;
    };
}, {
    props: any;
    mergedValue: {};
    emits: {
        (e: "update:api", api: FC): void;
        (e: "ready", api: FC): void;
        (e: "submit", api: FC, formData: any, ...addiRest: any[]): void;
        (e: "reset", api: FC, ...addiRest: any[]): void;
        (e: "update:modelValue", value: any): void;
        (e: "update:mergedValue", value: any): void;
    };
    attrs: {
        [x: string]: unknown;
    };
    beforeButmitSeed: Ref<number>;
    option: import("vue").ComputedRef<OptionAttrs | Ref<OptionAttrs>>;
    disabled: import("vue").ComputedRef<any>;
    fc: import("@form-create/element-ui").Api | null;
    handlerSubmit: (...addiRest: any[]) => Promise<void>;
    handlerReset: (...addiRest: any[]) => void;
    vBind: import("vue").ComputedRef<{
        rule: Rule[];
        modelValue: any;
        "onUpdate:modelValue"(value: Record<string, any>): void;
        "onUpdate:api"(api: FC): void;
    }>;
    disableSubmit: Ref<boolean>;
    computed: typeof import("@vue/reactivity").computed;
    nextTick: typeof nextTick;
    provide: typeof provide;
    ref: typeof ref;
    toRefs: typeof toRefs;
    useAttrs: typeof useAttrs;
    watchEffect: typeof watchEffect;
    readonly set: {
        <T extends object>(object: T, path: import("lodash").PropertyPath, value: any): T;
        <TResult>(object: object, path: import("lodash").PropertyPath, value: any): TResult;
    };
    readonly get: {
        <TObject extends object, TKey extends keyof TObject>(object: TObject, path: TKey | [TKey]): TObject[TKey];
        <TObject_1 extends object, TKey_1 extends keyof TObject_1>(object: TObject_1 | null | undefined, path: TKey_1 | [TKey_1]): TObject_1[TKey_1] | undefined;
        <TObject_2 extends object, TKey_2 extends keyof TObject_2, TDefault>(object: TObject_2 | null | undefined, path: TKey_2 | [TKey_2], defaultValue: TDefault): TDefault | Exclude<TObject_2[TKey_2], undefined>;
        <TObject_3 extends object, TKey1 extends keyof TObject_3, TKey2 extends keyof TObject_3[TKey1]>(object: TObject_3, path: [TKey1, TKey2]): TObject_3[TKey1][TKey2];
        <TObject_4 extends object, TKey1_1 extends keyof TObject_4, TKey2_1 extends keyof TObject_4[TKey1_1]>(object: TObject_4 | null | undefined, path: [TKey1_1, TKey2_1]): TObject_4[TKey1_1][TKey2_1] | undefined;
        <TObject_5 extends object, TKey1_2 extends keyof TObject_5, TKey2_2 extends keyof TObject_5[TKey1_2], TDefault_1>(object: TObject_5 | null | undefined, path: [TKey1_2, TKey2_2], defaultValue: TDefault_1): TDefault_1 | Exclude<TObject_5[TKey1_2][TKey2_2], undefined>;
        <TObject_6 extends object, TKey1_3 extends keyof TObject_6, TKey2_3 extends keyof TObject_6[TKey1_3], TKey3 extends keyof TObject_6[TKey1_3][TKey2_3]>(object: TObject_6, path: [TKey1_3, TKey2_3, TKey3]): TObject_6[TKey1_3][TKey2_3][TKey3];
        <TObject_7 extends object, TKey1_4 extends keyof TObject_7, TKey2_4 extends keyof TObject_7[TKey1_4], TKey3_1 extends keyof TObject_7[TKey1_4][TKey2_4]>(object: TObject_7 | null | undefined, path: [TKey1_4, TKey2_4, TKey3_1]): TObject_7[TKey1_4][TKey2_4][TKey3_1] | undefined;
        <TObject_8 extends object, TKey1_5 extends keyof TObject_8, TKey2_5 extends keyof TObject_8[TKey1_5], TKey3_2 extends keyof TObject_8[TKey1_5][TKey2_5], TDefault_2>(object: TObject_8 | null | undefined, path: [TKey1_5, TKey2_5, TKey3_2], defaultValue: TDefault_2): TDefault_2 | Exclude<TObject_8[TKey1_5][TKey2_5][TKey3_2], undefined>;
        <TObject_9 extends object, TKey1_6 extends keyof TObject_9, TKey2_6 extends keyof TObject_9[TKey1_6], TKey3_3 extends keyof TObject_9[TKey1_6][TKey2_6], TKey4 extends keyof TObject_9[TKey1_6][TKey2_6][TKey3_3]>(object: TObject_9, path: [TKey1_6, TKey2_6, TKey3_3, TKey4]): TObject_9[TKey1_6][TKey2_6][TKey3_3][TKey4];
        <TObject_10 extends object, TKey1_7 extends keyof TObject_10, TKey2_7 extends keyof TObject_10[TKey1_7], TKey3_4 extends keyof TObject_10[TKey1_7][TKey2_7], TKey4_1 extends keyof TObject_10[TKey1_7][TKey2_7][TKey3_4]>(object: TObject_10 | null | undefined, path: [TKey1_7, TKey2_7, TKey3_4, TKey4_1]): TObject_10[TKey1_7][TKey2_7][TKey3_4][TKey4_1] | undefined;
        <TObject_11 extends object, TKey1_8 extends keyof TObject_11, TKey2_8 extends keyof TObject_11[TKey1_8], TKey3_5 extends keyof TObject_11[TKey1_8][TKey2_8], TKey4_2 extends keyof TObject_11[TKey1_8][TKey2_8][TKey3_5], TDefault_3>(object: TObject_11 | null | undefined, path: [TKey1_8, TKey2_8, TKey3_5, TKey4_2], defaultValue: TDefault_3): TDefault_3 | Exclude<TObject_11[TKey1_8][TKey2_8][TKey3_5][TKey4_2], undefined>;
        <T_1>(object: import("lodash").NumericDictionary<T_1>, path: number): T_1;
        <T_2>(object: import("lodash").NumericDictionary<T_2> | null | undefined, path: number): T_2 | undefined;
        <T_3, TDefault_4>(object: import("lodash").NumericDictionary<T_3> | null | undefined, path: number, defaultValue: TDefault_4): T_3 | TDefault_4;
        <TDefault_5>(object: null | undefined, path: import("lodash").PropertyPath, defaultValue: TDefault_5): TDefault_5;
        (object: null | undefined, path: import("lodash").PropertyPath): undefined;
        <TObject_12, TPath extends string>(data: TObject_12, path: TPath): string extends TPath ? any : import("lodash").GetFieldType<TObject_12, TPath>;
        <TObject_13, TPath_1 extends string, TDefault_6 = import("lodash").GetFieldType<TObject_13, TPath_1>>(data: TObject_13, path: TPath_1, defaultValue: TDefault_6): TDefault_6 | Exclude<import("lodash").GetFieldType<TObject_13, TPath_1>, null | undefined>;
        (object: any, path: import("lodash").PropertyPath, defaultValue?: any): any;
    };
    AButton: import("vue").DefineComponent<{
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
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "update:api" | "ready" | "submit" | "reset" | "update:mergedValue")[], "update:modelValue" | "update:api" | "ready" | "submit" | "reset" | "update:mergedValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    disabled: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    labelWidth: {
        type: StringConstructor;
        required: false;
    };
    noSubmitBtn: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    option: {
        type: null;
        required: false;
    };
    autoValidate: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    modelValue: {
        type: null;
        required: false;
        default: any;
    };
    mergedValue: {
        type: null;
        required: false;
        default: any;
    };
    compact: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    rule: {
        type: ArrayConstructor;
        required: false;
    };
    rules: {
        type: ArrayConstructor;
        required: false;
    };
    noFooter: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    beforeSubmit: {
        type: FunctionConstructor;
        required: false;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    "onUpdate:api"?: ((...args: any[]) => any) | undefined;
    onReady?: ((...args: any[]) => any) | undefined;
    onSubmit?: ((...args: any[]) => any) | undefined;
    onReset?: ((...args: any[]) => any) | undefined;
    "onUpdate:mergedValue"?: ((...args: any[]) => any) | undefined;
}, {
    modelValue: any;
    disabled: boolean;
    noSubmitBtn: boolean;
    autoValidate: boolean;
    mergedValue: any;
    compact: string;
    noFooter: boolean;
}>;
export default _sfc_main;
