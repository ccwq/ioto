<template lang="pug">
vBox.echarts-comp(@change="updateHandlerSize")
    .el(ref="$$el")
    slot
    template(#header): slot(name="header")
    template(#footer): slot(name="footer")
</template>
<script lang="ts" setup>
import vBox from "../VBox.vue"
import merge from "lodash/merge";
import size from "lodash/size";
import isPlainObject from "lodash/isPlainObject";
import {BPromise} from "@ioto/core/src/promise"
import {IObject} from "@ioto/core/types/types";
import {computed, onBeforeUnmount, onMounted, ref, watch} from "vue";
import {getEchartBaseOption, getEcharts} from "./index";

const props = withDefaults(defineProps<{

    // 全局基准配置
    baseOption?:IObject

    // 配置被应用前允许在此进行修改
    optionHook?: (option: IObject) => IObject

    options?:IObject

    // 图表的配置
    series?:IObject[]|IObject


    theme:string
}>(), {
    baseOption:()=>({}),
    optionHook:()=>(option:IObject)=>option,
    options:()=>({}),
})


// 配置合并
const opt = computed(()=>{
    let ret = merge({}, getEchartBaseOption(), props.baseOption, props.options);
    let _series = props.series;
    if (_series) {
        if (isPlainObject(_series)) {
            _series = [_series];
        }
        ret.series = _series;
    }
    return ret;
})

const $$el = ref<HTMLDivElement>();
const readyPromise = new BPromise<any>()
let echartInst:any = undefined

const updateOption = async (opt: IObject) => {
    if (size(opt)) {
        opt = props.optionHook(opt) || opt;
        const inst = await readyPromise
        inst.setOption(opt)
    }
}

const updateHandlerSize = async () => {
    const inst = await readyPromise
    inst.resize()
}

onMounted(()=>{
    watch(()=>opt,          ()=>updateOption(opt.value), {immediate:true})
    // watch(()=>props.series, ()=>updateOption(opt.value), {immediate:false})
    const Echart = getEcharts()
    if (!Echart) {
        console.warn("first place call \nimport {initEchart} from '@ioto/vue' \ninitEchart(echartFromLib, baseOptions)")
        throw new Error("echart is required")
    }
    echartInst = Echart.init($$el.value,  props.theme);
    readyPromise._resolve(echartInst) ;
})

onBeforeUnmount(()=>{
    echartInst?.dispose();
})
</script>
<style lang="less">
.echarts-comp {
    ._container {
        overflow: visible !important;
    }
    .el {
        width: 100%;
        height: 100%;
    }
}
</style>
