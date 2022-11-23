interface UsePageRequestOptions<T> {
    pageKey?: string;
    sizeKey?: string;
    totalKey?: string;
    request: (params: any) => Promise<any>;
    defaultSize?: number;
    defaultPage?: number;
    immediateLoad?: boolean;
    listPath?: string | (string | number)[];
    totalPath?: string | (string | number)[];
    mapEl?: (el?: T, index?: number, list?: T[]) => T | undefined;
    idKey?: string;
}
declare const _default: <T = any>(options: UsePageRequestOptions<T>) => {
    getRow: (row: string | T) => any;
    addRow: (row: T) => void;
    editRow: (row: T) => void;
    deleteRow: (row: string | T) => void;
    deleteByIndex: (index: number) => void;
    elPageVBind: import("vue").ComputedRef<{
        pageSize: any;
        "onUpdate:pageSize": (size: number) => number;
        currentPage: any;
        "onUpdate:currentPage": (pageNum: number) => number;
        total: any;
    }>;
    isError: import("vue").Ref<boolean>;
    loadStatus: import("vue").ComputedRef<"error" | "loading" | "success" | "empty">;
    reload: (newPage?: number) => Promise<void>;
    setTotal: (total: number) => void;
    isEof: import("vue").ComputedRef<boolean>;
    isBof: import("vue").ComputedRef<boolean>;
    list: Ref<T[]>;
    page: any;
};
export default _default;
