import { PropType } from "vue";
/**
 * 根据从API方法获取的参数生成下拉选择框的组件
 *
 * @props apiParams - 传递给API方法的参数，默认为空字符串
 * @props requestWhenApiParamsBlank - 当apiParams为空时，是否发起请求，默认为true
 * @props api - 必需，类型为函数，用于根据参数获取数据的API方法
 * @props dataPath - 从API响应中提取选项列表的路径，默认为"data"
 * @returns 返回一个封装了ASelect组件的模板函数，将options绑定为从API请求得到的数据
 * @example
 * <SelectFromRequest
 * 	api={()=>([["1", "专家"], ["52", "教授"]])
 * 	model-value="52"
 * />
 */
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
        type: PropType<(params: any) => Promise<any[]> | any[]>;
    };
    dataPath: {
        type: StringConstructor;
        default: string;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    apiParams?: unknown;
    requestWhenApiParamsBlank?: unknown;
    api?: unknown;
    dataPath?: unknown;
} & {
    apiParams: string;
    requestWhenApiParamsBlank: boolean;
    api: (params: any) => Promise<any[]> | any[];
    dataPath: string;
} & {}>, {
    apiParams: string;
    requestWhenApiParamsBlank: boolean;
    dataPath: string;
}>;
/**
 * 生成一个特定元素的下拉选择组件
 * @param api
 * @param dataPath - 从API响应中提取选项列表的路径，默认为"data"
 * @param labelField - 从选项中提取label字段的名称，默认为"name"
 * @param valueField- 从选项中提取value字段的名称，默认为"id"
 */
export declare const generateSelect: (api: (params?: any) => Promise<any[]> | any[], dataPath?: string, labelField?: string, valueField?: string) => import("vue").DefineComponent<{}, () => JSX.Element, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {} & {}>, {}>;
