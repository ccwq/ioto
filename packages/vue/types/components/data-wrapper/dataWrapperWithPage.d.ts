import { IDataWrapper, IDWOptions } from "./";
import { Ref } from "vue";
declare type IDWOptions2<T = any> = Omit<IDWOptions<T>, "reqOptions"> & {
    /**
     * axios请求信息
     */
    reqOptions: Ref<Record<string, any>>;
    /**
     * 响应的类型
     */
    responseType?: "object" | "list" | "page-list";
    /**
     * 默认页大小
     */
    pageSize?: number;
};
interface IPageVBind {
    pageSize: number;
    currentPage: number;
    total: number;
    "onUpdate:currentPage": (currentPage: number) => void;
    "onUpdate:page-size": (pageSize: number) => void;
}
/**
 * 返回值
 */
declare type UseDataWrapperHelperReturn<T> = [
    IDataWrapper<T>,
    Ref<Record<string, any>>,
    Ref<IPageVBind>
];
/**
 * 用来进行数据请求的工具, 直接传入axios的请求实体
 */
export declare const dataWrapperWithPageLoadFunSetter: {
    _functions: Function | null;
    /**
     * 允许直接传入axios实体
     * @param func
     * @example -
     *  const commonDataWrapperLoadFunc = (dw: any, options)=>axiosInstance(options)
     */
    set(func: Function): void;
    /**
     * 执行
     * @param dw
     * @param config
     */
    exec(dw: IDWOptions2, config: Record<string, any>): any;
};
/**
 * 数据包装器帮助函数
 * @param options {IDWOptions2}
 * @returns {UseDataWrapperHelperReturn}
 * @example
 *
 * 以下代码实现了一个进行数据分页请求的data
 * // template
 * ElPagination.mt45x.main_content.tc(
 *     layout="prev, pager, next, total, sizes"
 *     :page-sizes="[2, 3, 4, 5]"
 *     v-bind="pageBinder"
 * )
 *
 * //js
 * const [newsDw, newsReqOptions, pageBinder] = useDataWrapperHelper<News[]>({
 *     responseType: 'page-list',
 *     pageSize: 3,
 *     reqOptions: computed(() => ({
 *         url: '/screen/index/portal/publish-news',
 *     })),
 * });
 *
 */
export declare const useDataWrapperWithPage: <T>(options: IDWOptions2<T>) => UseDataWrapperHelperReturn<T>;
export {};
