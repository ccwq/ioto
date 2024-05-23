import { IPlainObject } from './helper.d';
/**
 * 纯文本组件
 */
export declare const rowTextComponent: import("vue").DefineComponent<{
    modelValue: (StringConstructor | NumberConstructor)[];
    multi: BooleanConstructor;
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue?: unknown;
    multi?: unknown;
} & {
    multi: boolean;
} & {
    modelValue?: string | number | undefined;
}>, {
    multi: boolean;
}>;
/**
 * html文本组件
 */
export declare const textNodeComponent: import("vue").DefineComponent<{
    text: StringConstructor;
    classList: (StringConstructor | ArrayConstructor)[];
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    text?: unknown;
    classList?: unknown;
} & {} & {
    text?: string | undefined;
    classList?: string | unknown[] | undefined;
}>, {}>;
/**
 * 纯文本字段
 * @param title
 * @param value
 * @param options
 */
export declare const textRule: (title: string, value?: any, options?: IPlainObject) => {
    component: import("vue").ShallowRef<import("vue").DefineComponent<{
        modelValue: (StringConstructor | NumberConstructor)[];
        multi: BooleanConstructor;
    }, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
        modelValue?: unknown;
        multi?: unknown;
    } & {
        multi: boolean;
    } & {
        modelValue?: string | number | undefined;
    }>, {
        multi: boolean;
    }>>;
    title: string;
    value: any;
    native: boolean;
};
