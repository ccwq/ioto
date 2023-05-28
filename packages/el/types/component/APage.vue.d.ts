declare const _sfc_main: import("vue").DefineComponent<{
    total: {
        type: NumberConstructor;
        default: number;
    };
    pageSize: {
        type: NumberConstructor;
        default: number;
    };
    currentPage: {
        type: NumberConstructor;
        default: number;
    };
}, {
    vBind: import("vue").ComputedRef<{
        "onUpdate:currentPage": (val: number) => void;
        "onUpdate:pageSize": (val: number) => void;
        "onSize-change": (val: number) => void;
        "onCurrent-change": (val: number) => void;
        total: number;
        pageSize: number;
        currentPage: number;
        pagerCount: number;
        pageSizes: number[];
        background: boolean;
        layout: string;
    }>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    total?: unknown;
    pageSize?: unknown;
    currentPage?: unknown;
} & {
    total: number;
    pageSize: number;
    currentPage: number;
} & {}>, {
    total: number;
    pageSize: number;
    currentPage: number;
}>;
export default _sfc_main;
