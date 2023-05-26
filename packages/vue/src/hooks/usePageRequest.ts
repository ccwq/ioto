import {computed, reactive, Ref, ref, watch} from 'vue';
import get from "lodash/get"


interface UsePageRequestOptions<T> {
    pageKey?: string
    sizeKey?: string
    totalKey?: string
    request: (params: any) => Promise<any>;

    // 默认的分页参数
    defaultSize?: number
    defaultPage?: number

    // 是否立即进行请求
    immediateLoad?: boolean

    // 获取内容的字段，支持多级"foo.bar"
    listPath?: string|(string|number)[]

    totalPath?: string|(string|number)[]

    // 用来遍历,每个元素
    mapEl?:(el?:T, index?:number, list?:T[])=>T|undefined

    idKey?:string
}

interface IUserRequestPage {
    pageNum: number
    pageSize: number
    total: number
}

export default <T=any>(options:UsePageRequestOptions<T>)=>{
    options = Object.assign({}, {
        pageKey: "pageNum",
        sizeKey: "pageSize",
        totalKey: "total",
        totalField: "total",
        defaultSize: 20,
        defaultPage: 1,
        immediateLoad:true,
        listPath: "data.list",
        totalPath: "data.total",
        idKey:"id",
    }, options);

    type loadingStatus = "loading" | "success" | "empty" | "error";

    // 数据
    const list = ref([]) as Ref<T[]>
    const page = reactive<IUserRequestPage>({
        pageNum: options.defaultPage! as number,
        pageSize: options.defaultSize! as number,
        total: 1
    })

    const isEof = computed(() => page.pageNum * page.pageSize >= page.total)
    const isBof = computed(() => page.pageNum === 1)
    const loading = ref(false)
    const isError = ref(false)

    const loadStatus = computed<loadingStatus>(() => {
        if (loading.value) {
            return "loading"
        }
        if (isError.value) {
            return "error"
        }
        if (list.value.length === 0) {
            return "empty"
        }
        return "success"
    })

    const setTotal = (total:number)=>{
        page.total = total;
    }

    const updateList = async () => {
        isError.value = false;
        loading.value = true;
        try {
            const resp = await options.request({pageNum: page.pageNum, pageSize: page.pageSize})
            let _list = get(resp, options.listPath!) || [];
            if(options.mapEl){
                _list = _list.map(options.mapEl).filter(el=>!!el)
            }
            list.value = _list;
            const total = get(resp, options.totalPath!)
            if(typeof total == "number"){
                page.total = total
            }else{
                if (!_list.length) {
                    page.total = 0;
                }
            }
        } catch (e) {
            console.error(e, "页面加载出错");
            isError.value = true;
        }
        loading.value = false;
    }
    const reload = async (newPage: number=1) => {
        if(typeof newPage === "number" && newPage!=page.pageNum){
            // 如果页码不相等,直接翻页,会自动触发updateList
            page.pageNum = newPage;
        }else{
            updateList()
        }
    };

    // 获取index
    const getRowIndex = (id:string|T)=>{
        if (typeof id == "string") {
            return list.value.findIndex(el => el[options.idKey!] == id)
        }else{
            return list.value.findIndex(el => el[options.idKey!] == id[options.idKey!])
        }
    }

    // 获取row
    const getRow = (row:string|T)=>{
        const index = getRowIndex(row);
        if(index>=0){
            return list.value[index]
        }
    }

    // 新增row
    const addRow = (row:T)=>{
        list.value.push(row)
        page.total++
    }

    // 删除row
    const deleteRow = (row:T|string)=>{
        const index = getRowIndex(row);
        if(index>=0){
            list.value.splice(index, 1)
            page.total--;
        }else{
            console.warn("删除的数据不存在", row)
        }
    }

    // 修改row
    const editRow = (row:T)=>{
        const index = getRowIndex(row);
        if(index>=0){
            list.value[index] = row;
        }else{
            console.warn("编辑的数据不存在", row)
        }
    }

    const deleteByIndex = (index:number)=>{
        list.value.splice(index, 1)
    }

    watch(() => [page.pageNum, page.pageSize], updateList, {immediate: options.immediateLoad});

    // 使用方式: APage(v-bind="elPageVBind")
    const elPageVBind = computed(()=>{
        return {
            pageSize: page.pageSize,
            "onUpdate:pageSize": (size:number) => page.pageSize = size,
            currentPage: page.pageNum,
            "onUpdate:currentPage": (pageNum:number) => page.pageNum = pageNum,
            total: page.total,
        }
    })

    return {
        getRow,
        addRow,
        editRow,
        deleteRow,
        deleteByIndex,
        elPageVBind,
        isError,
        loadStatus,
        reload,
        setTotal,
        isEof,
        isBof,
        list,
        page,
    }
}
