import {defineComponent, ref, watch} from "vue";
import {ASelect} from "./"
import type {PropType} from "vue"
import get from "lodash/get";

// 从api网络请求方法中获取数据
export const SelectFromRequest = defineComponent({
    components:{
        ASelect,
    },
    props:{
        apiParams:{
            default:""
        },

        // 当apiParams为空的时候，是否请求，默认true
        requestWhenApiParamsBlank:{
            type:Boolean,
            default:true
        },

        api: {
            required:true,
            type: Function as PropType<(params:any) => Promise<any>>,
        },

        listPath:{
            type: String,
            default:"data",
        }
    },
    setup(props, ctx){
        const options = ref<Promise<any>|[]>([]);
        watch(() => props.apiParams, async (params) => {
            if(!params && !props.requestWhenApiParamsBlank){
                options.value = [];
            }else{
                options.value = props.api(params).then(res => get(res, props.listPath, []))
            }
        }, {immediate: true});
        return () => <ASelect{...ctx.attrs} options={options.value}/>;
    }
})


/**
 * 生成一个特定元素的下拉选择组件
 * @param api
 * @param listPath
 * @param labelField
 * @param valueField
 */
export const generateSelect = (api:(params?:any)=>Promise<any>, listPath:string="data.list", labelField="name", valueField="id")=>{
    return defineComponent({
        components: {
            SelectFromRequest,
        },
        setup(props, ctx) {
            return () => <SelectFromRequest
                api={api}
                listPath={listPath}
                //@ts-ignore
                labelField={labelField}
                idField={valueField}
                {...ctx.attrs}
            />;
        }
    })
}
// 合同创建 项目选择器
//export const CProjectSelect = generateSelect(cProjectList, "data", "name", "id")


