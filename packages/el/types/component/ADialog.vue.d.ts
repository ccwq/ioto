declare const _sfc_main: import("vue").DefineComponent<{
    label: {
        type: StringConstructor;
        default: string;
    };
    icon: {
        type: StringConstructor;
        default: string;
    };
    class: (StringConstructor | ObjectConstructor | ArrayConstructor)[];
    style: (StringConstructor | ObjectConstructor)[];
}, {
    vBind: import("vue").ComputedRef<{
        title: string;
        closeOnClickModal: boolean;
    }>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    label?: unknown;
    icon?: unknown;
    class?: unknown;
    style?: unknown;
} & {
    label: string;
    icon: string;
} & {
    class?: string | unknown[] | Record<string, any> | undefined;
    style?: string | Record<string, any> | undefined;
}>, {
    label: string;
    icon: string;
}>;
export default _sfc_main;
