import {nextTick, reactive, Ref, watch} from "vue";
import _merge from "lodash/merge";

/**
 * 状态的枚举
 */
export enum DWStatusEnum {
    READY = "READY",
    SUCCESS = "SUCCESS",
    LOADING = "LOADING",
    ERROR = "ERROR",
    EMPTY = "EMPTY",
}


/**
 * 数据容器的实体
 */
export interface IDataWrapper <T=any>{

    // 数据是否为空
    // 单独凭借loading无法完全判断数据是否为空
    isEmpty: boolean

    // 唯一id,用来调试
    get id():string


    status:DWStatusEnum

    // 值
    value: T | null

    /**
     * 用来暂存本次错误信息
     */
    error:any | null

    /**
     * 需要调用此方法为数据赋值
     * @param value
     * @param error
     */
    setValue:(error:null|any, value:T|null)=>void

    // 加载数据
    load: (config?:Record<string, any>)=>Promise<any>
}

/**
 * 数据容器的初始化配置
 */
export interface IDWOptions<T> {

    // 一个id用来辅助调试
    id?:string

    // 一个hook,用来在获取到数据之后,对数据进行修改
    beforeSetValue?: (value: any) => T

    /**
     * 加载数据的方法,一般在里面进行数据请求
     * @param self
     * @param config
     */
    load?:(self:IDataWrapper<T>, config:Record<string, any>)=>Promise<T>|T

    /**
     * 判空的方法
     * @param value
     */
    isEmptyFunc?:(value:T)=>boolean

    /**
     * 请求携带的参数
     */
    reqOptions?: Ref<Record<string, any>>

    /**
     * 当请求参数改的时候是否要重新请求数据
     */
    watchReqOption?:boolean | undefined

    /**
     * 自动加载
     */
    autoLoad?:boolean

    /**
     * 初始值
     */
    initValue?:T
}


/**
 * 一个数据容器
 * @param options
 */

export const useDataWrapper = <T=any>(optionsParams:IDWOptions<T>):IDataWrapper=>{

    /**
     * 空判定
     */
    const isEmptyFunc = ()=>{
        let isEmpty:boolean;

        // 使用自定义判空方法进行判空
        if (options.isEmptyFunc) {
            isEmpty = options.isEmptyFunc(dwInst.value!);
        }

        // 默认判空的方法
        else{
            isEmpty = Array.isArray(dwInst.value) ? !dwInst.value.length : !dwInst.value;
        }
        return isEmpty
    }


    const options = {
        watchReqOption: true,
        ...optionsParams,
    } as IDWOptions<T>

    const hasInitValue = options.initValue !== undefined

    /**
     * 实体
     */
    let dwInst:IDataWrapper<T>

    /**
     * 设置dw的值
     * @param value - 用来设置值
     * @param error - 用来设置错误信息
     */
    const setValue = async (error:any=null, value?:any)=>{

        // 包含错误
        if (error) {
            dwInst.status = DWStatusEnum.ERROR;
            dwInst.error = error;
            dwInst.value = null;
        }

        // 设置成功
        else {
            if (options.beforeSetValue) {
                try {
                    dwInst.value = await options.beforeSetValue(value) as T;
                } catch (e) {
                    console.error("设置dataWrapper失败:", e)
                    dwInst.error = e;
                    dwInst.status = DWStatusEnum.ERROR;
                    return
                }
            } else {
                dwInst.value = value;
            }
            let isEmpty = isEmptyFunc()
            dwInst.isEmpty = true;
            if (isEmpty) {
                dwInst.status = DWStatusEnum.EMPTY;
            }else{
                dwInst.status = DWStatusEnum.SUCCESS;
            }
            dwInst.error = null;
        }
    }

    /**
     * 执行加载
     * @param config
     */
    const load = async (config?:Record<string, any>)=>{

        if (hasInitValue) {
            await nextTick()
        }
        dwInst.status = DWStatusEnum.LOADING;
        // 合并请求参数
        const axiosOptions = {}
        if (options.reqOptions?.value) {
            _merge(axiosOptions, options.reqOptions.value);
        }

        if (config) {
            _merge(axiosOptions, config);
        }

        return Promise.resolve(options.load!(dwInst, axiosOptions))
            .then(resp => {
                setValue(null, resp);
                return [null, resp];
            })
            .catch(err => {
                setValue(err);
                // return Promise.reject(err);
                return [err]
            })
        ;
    }

    //@ts-ignore
    dwInst = reactive({
        isEmpty: true,
        get id() {
            return options.id ?? "unnamed-dwInst-wrapper"
        },
        status: DWStatusEnum.READY,

        //@ts-ignore
        value: null as T,
        error: null,
        setValue,
        load,
    })


    // 自动加载
    if (options.autoLoad) {
        load();
    }

    // 监控params的变化
    if (options.watchReqOption && options.reqOptions?.value) {
        watch(() => options.reqOptions!.value, (newParams, oldParams) => {
            load(newParams);
        }, {immediate: false})
    }


    // 设置初始值
    if (hasInitValue) {
        setValue(null, options.initValue)
    }

    return dwInst;
}
