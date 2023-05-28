declare const _sfc_main: import("vue").DefineComponent<{
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
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    label?: unknown;
    icon?: unknown;
    suffix?: unknown;
    lite?: unknown;
} & {
    label: string;
    icon: string;
    suffix: string;
    lite: boolean;
} & {}>, {
    label: string;
    icon: string;
    suffix: string;
    lite: boolean;
}>;
export default _sfc_main;
