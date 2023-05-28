import type { PropType } from "vue";
export declare const SelectFromRequest: import("vue").DefineComponent<{
    apiParams: {
        default: string;
    };
    requestWhenApiParamsBlank: {
        type: BooleanConstructor;
        default: boolean;
    };
    api: {
        required: true;
        type: PropType<(params: any) => Promise<any>>;
    };
    listPath: {
        type: StringConstructor;
        default: string;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    apiParams?: unknown;
    requestWhenApiParamsBlank?: unknown;
    api?: unknown;
    listPath?: unknown;
} & {
    apiParams: string;
    requestWhenApiParamsBlank: boolean;
    api: (params: any) => Promise<any>;
    listPath: string;
} & {}>, {
    apiParams: string;
    requestWhenApiParamsBlank: boolean;
    listPath: string;
}>;
/**
 * 生成一个特定元素的下拉选择组件
 * @param api
 * @param listPath
 * @param labelField
 * @param valueField
 */
export declare const generateSelect: (api: (params?: any) => Promise<any>, listPath?: string, labelField?: string, valueField?: string) => import("vue").DefineComponent<{}, () => JSX.Element, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {} & {}>, {}>;
