import { computed } from "vue";
import { DWStatusEnum } from "./dataWrapper";
export declare type ILoadingStatus = "ready" | 'success' | 'loading' | 'error' | 'empty';
declare const _sfc_main: import("vue").DefineComponent<{
    modelValue: {
        type: null;
        required: true;
    };
    justLoadingWhenEmpty: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
}, {
    props: any;
    attrs: {};
    isEmptyFunc: (data: any) => boolean;
    status: import("vue").ComputedRef<DWStatusEnum>;
    data: import("vue").ComputedRef<any>;
    emits: {};
    computed: typeof computed;
    DWStatusEnum: typeof DWStatusEnum;
    IDataWrapper: any;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue?: unknown;
    justLoadingWhenEmpty?: unknown;
} & {
    modelValue: any;
    justLoadingWhenEmpty: boolean;
} & {}>, {
    justLoadingWhenEmpty: boolean;
}>;
export default _sfc_main;
