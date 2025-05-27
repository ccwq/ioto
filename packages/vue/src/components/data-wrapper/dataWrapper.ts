import {nextTick, reactive, Ref, shallowRef, watch} from "vue";
import _merge from "lodash/merge";
import {until} from "@vueuse/core";

/**
 * 状态的枚举
 */
export enum DWStatusEnum {

    /**
     * 初始化之后为ready, 胫骨加载之后变为loading, 加载完成之后变为success|empty, 加载失败之后变为error
     * 其他状态无法转换为ready
     */
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
 * @param options.watchReqOption - [true] 是否监听请求参数的变化
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

    /**
     * 请求计数器, 在不同参数请求,响应速率差异过大导致结果无法正确对应的问题
     */
    const requestSeqNo = shallowRef(0);

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

        // 包含初值或者在ready状态load需要等待一个tick
        // 解决2个问题
        // - 初始值附带加载值
        // - ready状态load需要等待一个tick, 以等待请求参数赋值正确, 并且被监控到
        if (hasInitValue || dwInst.status === DWStatusEnum.READY) {
            await nextTick();
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

        requestSeqNo.value++;

        return Promise.all([
            Promise.resolve(options.load!(dwInst, axiosOptions))
                .then(resp=>([null, resp]))
                .catch(err=>([err]))
            ,
            requestSeqNo.value
        ])
            .then(
                ([[err,resp], seqNo]) => {
                    if(seqNo != requestSeqNo.value) return
                    if(err){
                        setValue(err);
                        return [err]
                    }
                    else{
                        setValue(null, resp);
                        return [null, resp];
                    }
                },
            )
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
    if (options.watchReqOption) {

        // 等待dw ready状态改变, 或者理解成至少进行了一次加载
        until(() => dwInst.status).toMatch(v => v !== DWStatusEnum.READY)
            .then(resp=>{

                // 开始监控请求参数的改变
                watch(() => options.reqOptions!.value, (newParams, oldParams) => {
                    if (newParams) {
                        load(newParams);
                    }else{
                        console.warn("reqOptions is null");
                    }
                })
            })
    }


    // 设置初始值
    if (hasInitValue) {
        setValue(null, options.initValue)
    }

    return dwInst;
}
