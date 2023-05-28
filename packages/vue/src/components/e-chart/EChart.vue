<template lang="pug">
.echarts-comp
    .index(ref="$$index")
    SizeMonitor(@update:modelValue="updateHandlerSize")
</template>
<script lang="ts" setup>
import SizeMonitor from "../SizeMonitor.vue"
import {firstLetterUppercase} from "@ioto/core"
import merge from "lodash/merge";
import size from "lodash/size";
// 所有的鼠标事件
const MOUSE_EVENT_LIST = [
    'click',
    'dblclick',
    'mousedown',
    'mousemove',
    'mouseup',
    'mouseover',
    'mouseout',
    'globalout',
    'contextmenu',
]
import isPlainObject from 'lodash/isPlainObject'
import { BPromise } from '@ioto/core'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, toRaw, useAttrs, watch } from 'vue'
import { getEchartBaseOption, getEcharts } from './index'
const $$index = ref<HTMLDivElement>()
const readyPromise = new BPromise<any>()
let echartInst: null | ECharts = null
const emits = defineEmits<{
    (e: 'chartClick', event: any, options: any): void
    (e: 'chartDblClick', event: any, options: any): void
    (e: 'chartMousedown', event: any, options: any): void
    (e: 'chartMousemove', event: any, options: any): void
    (e: 'chartMouseup', event: any, options: any): void
    (e: 'chartMouseover', event: any, options: any): void
    (e: 'chartMouseout', event: any, options: any): void
    (e: 'chartGlobalout', event: any, options: any): void
    (e: 'chartContextmenu', event: any, options: any): void
    (e: 'chartLegendselectchanged', event: any, options: any): void
}>()
const props = withDefaults(
    defineProps<{
    // 全局基准配置
        baseOption?: IObject

    // 配置被应用前允许在此进行修改
    optionHook?: (option: IObject) => IObject

        options?: IObject

    // 图表的配置
        series?: IObject[] | IObject

        theme?: string
    }>(),
    {
        baseOption: () => ({}),
        optionHook: (option: IObject) => option,
        options: () => ({}),
    }
)

const attrs = useAttrs()

const updateCharts = async (opt: IObject) => {
    const opt1 = props.optionHook(opt) || opt
    const inst = await readyPromise
    inst.clear()
    await nextTick()
    // await new Promise((r) => setTimeout(r, 100))
    inst.setOption(opt1, true)
}

const opt = ref<any>()
const rebuildOption = () => {
    const ret = merge({}, getEchartBaseOption(), props.baseOption, props.options)
    let _series = props.series
    if (_series) {
        if (isPlainObject(_series)) {
            _series = [_series]
        }
        ret.series = _series
    }
    opt.value = ret
    updateCharts(ret)
}
watch(() => props.options, rebuildOption, { immediate: true })

const updateHandlerSize = async (size) => {
    const inst = await readyPromise
    inst.resize()
}

onMounted(() => {
    // watch(() => opt, () => updateOption(opt.value), {immediate: true});
    // watch(()=>props.series, ()=>updateOption(opt.value), {immediate:false})
    const Echart = getEcharts()
    if (!Echart) {
        console.warn(
            "first place call \nimport {initEchart} from '@ioto/vue' \ninitEchart(echartFromLib, baseOptions)"
        )
        throw new Error('echart is required')
    }
    echartInst = Echart.init($$index.value)
    readyPromise._resolve(echartInst)

    MOUSE_EVENT_LIST.forEach((eventName) => {
        const propEventName = ('chart' +
            firstLetterUppercase(eventName)) as (typeof MOUSE_EVENT_LIST)[number]
        echartInst!.on(eventName, (e) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            emits(propEventName, e, toRaw(opt.value))
        })
    })

    // 防止legend点击之后,对应的数据会消失的特性
    // 使用selectedMode.legend也能完成相同的功能,但是会导致无法获取到legend的点击事件
    echartInst.on('legendselectchanged', function (d) {
        echartInst.setOption({ animation: false })
        const name = Object.keys(d.selected).find((key) => !d.selected[key])
        if (name) {
            // Re-select what the user unselected
            echartInst.dispatchAction({ type: 'legendSelect', name })
        }
        echartInst.setOption({ animation: true })
        emits('chartLegendselectchanged', d, toRaw(opt.value))
    })
})
onBeforeUnmount(() => {
    MOUSE_EVENT_LIST.forEach((eventName) => {
        echartInst.off(eventName)
    })
    echartInst.dispose()
})

defineExpose({
    getEchartInst: () => echartInst,
})
</script>
<style lang="less">
.echarts-comp {
    position: relative;
    .index {
        width: 100%;
        height: 100%;
    }
}
</style>
