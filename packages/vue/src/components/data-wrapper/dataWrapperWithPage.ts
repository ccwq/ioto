import {useDataWrapper, IDataWrapper, IDWOptions} from "./";
import {computed, ref, Ref, watch} from "vue";
import _ from "lodash";


export type IDWWithPageOptions<T=any> = Omit<IDWOptions<T>, "reqOptions"> & {

    /**
     * axios请求信息
     */
    reqOptions: Ref<Record<string, any>>

    /**
     * 响应的类型
     */
    responseType?: "object" | "list" | "page-list";

    /**
     * 默认页大小
     */
    pageSize?: number
}

interface IPageVBind {
    pageSize: number
    currentPage: number
    total: number
    "onUpdate:currentPage": (currentPage: number) => void
    "onUpdate:page-size": (pageSize: number) => void
}

/**
 * 返回值
 */
type UseDataWrapperHelperReturn<T> = [
    // dataWrapper
    IDataWrapper<T>,

    // 用来修改请求
    Ref<Record<string, any>>,

    // 分页组件的绑定数据, 目前只支持element-plus
    Ref<IPageVBind>
]

/**
 * 用来进行数据请求的工具, 直接传入axios的请求实体
 */
export const dataWrapperWithPageLoadFunSetter = new class {
    _functions: Function| null = null

    /**
     * 允许直接传入axios实体
     * @param func
     * @example -
     *  const commonDataWrapperLoadFunc = (dw: any, options)=>axiosInstance(options)
     */
    set(func:Function){
        this._functions = func;
    }

    /**
     * 执行
     * @param dw
     * @param config
     */
    exec(dw:IDWWithPageOptions, config:Record<string, any>){
        if(this._functions){
            return this._functions(dw, config);
        }else{
            throw new Error("请先执行:useDWWithPageLoadSetter.set,传入已配置的axios实体");
        }
    }
}

/**
 * 数据包装器帮助函数
 * @param options {IDWWithPageOptions}
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
export const useDataWrapperWithPage = <T>(options: IDWWithPageOptions<T>): UseDataWrapperHelperReturn<T> => {

    const responseType = options.responseType || "object";
    const withPage = options.responseType === "page-list";
    delete options.responseType;

    const handlerPageUpdate = (currentPage: number) => {
        pageVBind.value.currentPage = currentPage;
    }

    const handlerPageSizeUpdate = (pageSize: number) => {
        pageVBind.value.pageSize = pageSize;
        pageVBind.value.currentPage = 1;
    }

    const pageVBind = ref<IPageVBind>({
        pageSize: options.pageSize || 10,
        total: 1000,
        currentPage: 1,
        "onUpdate:currentPage": handlerPageUpdate,
        "onUpdate:page-size": handlerPageSizeUpdate
    });

    const reqOptionsRef = ref();


    const setReqOptionRef = () => {
        const opt = {} as any
        const reqOpt = options.reqOptions?.value;
        if (reqOpt) {
            Object.assign(opt, reqOpt);
        }

        const pageVal = pageVBind.value;

        // 包含分页
        if (withPage) {
            _.set(opt, "params.pageNum", pageVal.currentPage);
            _.set(opt, "params.pageSize", pageVal.pageSize);
        }
        reqOptionsRef.value = opt;
    };

    if (withPage) {
        watch(() => [
            pageVBind.value.pageSize,
            pageVBind.value.currentPage,
        ], setReqOptionRef);
    }
    setReqOptionRef();

    delete options.pageSize;

    const dw = useDataWrapper<T>(
        Object.assign(
            // 默认功能干
            {
                // watchReqOption:true,

                load: (dw, config:Record<string, any>)=>dataWrapperWithPageLoadFunSetter.exec(dw as any, config)
            } as IDWOptions<T>,

            // 其他配置
            options,

            // 最高配置
            {
                reqOptions: reqOptionsRef,
                beforeSetValue(resp:any) {
                    let ret
                    if (responseType === "page-list") {
                        pageVBind.value.total = resp.data.total;
                        ret = resp.data.list;
                    } else if (responseType === "list") {
                        ret = resp.data
                    } else {
                        ret = resp.data
                    }

                    if (options?.beforeSetValue) {
                        return options.beforeSetValue(ret)
                    } else {
                        return ret
                    }
                },
            }
        )
    )

    // 在配置改时重新加载
    watch(options.reqOptions, config=>{
        dw.load(config);
    })

    return [dw as IDataWrapper<T>, options.reqOptions, pageVBind];
};
