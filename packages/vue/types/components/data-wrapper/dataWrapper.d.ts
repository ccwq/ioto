import { Ref } from "vue";
/**
 * 状态的枚举
 */
export declare enum DWStatusEnum {
    /**
     * 初始化之后为ready, 胫骨加载之后变为loading, 加载完成之后变为success|empty, 加载失败之后变为error
     * 其他状态无法转换为ready
     */
    READY = "READY",
    SUCCESS = "SUCCESS",
    LOADING = "LOADING",
    ERROR = "ERROR",
    EMPTY = "EMPTY"
}
/**
 * 数据容器的实体
 */
export interface IDataWrapper<T = any> {
    isEmpty: boolean;
    get id(): string;
    status: DWStatusEnum;
    value: T | null;
    /**
     * 用来暂存本次错误信息
     */
    error: any | null;
    /**
     * 需要调用此方法为数据赋值
     * @param value
     * @param error
     */
    setValue: (error: null | any, value: T | null) => void;
    load: (config?: Record<string, any>) => Promise<any>;
}
/**
 * 数据容器的初始化配置
 */
export interface IDWOptions<T> {
    id?: string;
    beforeSetValue?: (value: any) => T;
    /**
     * 加载数据的方法,一般在里面进行数据请求
     * @param self
     * @param config
     */
    load?: (self: IDataWrapper<T>, config: Record<string, any>) => Promise<T> | T;
    /**
     * 判空的方法
     * @param value
     */
    isEmptyFunc?: (value: T) => boolean;
    /**
     * 请求携带的参数
     */
    reqOptions?: Ref<Record<string, any>>;
    /**
     * 当请求参数改的时候是否要重新请求数据
     */
    watchReqOption?: boolean | undefined;
    /**
     * 自动加载
     */
    autoLoad?: boolean;
    /**
     * 初始值
     */
    initValue?: T;
}
/**
 * 一个数据容器
 * @param options.watchReqOption - [true] 是否监听请求参数的变化
 */
export declare const useDataWrapper: <T = any>(optionsParams: IDWOptions<T>) => IDataWrapper;
