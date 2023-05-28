export declare const rowTextComponent: import("vue").DefineComponent<{
    modelValue: (StringConstructor | NumberConstructor)[];
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue?: unknown;
} & {} & {
    modelValue?: string | number | undefined;
}>, {}>;
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
export declare const textRule: (title: string, value?: any, options?: any) => any;
