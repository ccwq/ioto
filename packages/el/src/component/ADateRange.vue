<template lang="pug">
.ADateRange(ref="$index")
    span(v-if="label").pr10 {{label}}

    //- 日期范围
    template(v-if="!isSingleView")
        span.label 从
        ElDatePicker( v-bind="startVbind" )
        span.label.inner 到
        ElDatePicker( v-bind="endVbind" )

    //- 整周,整月，整季度，整年
    template(v-else)
        span.label {{singleViewLabel}}选择
        ElDatePicker( v-bind="singleViewVbind" ref="singleViewDatePickerRef")

    // 下拉内容
    APopover(width="360px" popper-class="ADateRange" trigger="click" :ref="index=>popover.ref=index" v-model:visible="popover.visible")
        index-divider 常用日期范围
        .list.flex.wrap.jc-center
            .list-item: AButton.lite(@click="handlerQuicklySetting('week', 1)") 1周内
            .list-item: AButton.lite(@click="handlerQuicklySetting('week', 2)") 2周内
            .list-item: AButton.lite(@click="handlerQuicklySetting('month', 1)") 1个月内
            .list-item: AButton.lite(@click="handlerQuicklySetting('month', 3)") 3个月内
            .list-item: AButton.lite(@click="handlerQuicklySetting('month', 6)") 6个月内
            .list-item: AButton.lite(@click="handlerQuicklySetting('year', 1)") 一年内
        index-divider 日期类型
        .flex.jc-center: index-radio-group(v-model="mode").m-auto
            index-radio-button(size="small" label="date") 自定义范围
            index-radio-button(size="small" label="week") 星期
            index-radio-button(size="small" label="month") 月份
            index-radio-button(size="small" label="year") 年份
        .h15
        template(#reference)
            index-button(plain circle size="small").more-btn: index-icon: elementOperation

    // 清除
    index-button(
        plain circle size="small" v-if="startDate || endDate" type="info"
        @click="startDate=null, endDate=null, emitValue(),resumeMode()"
    ).more-btn: index-icon: elementClose

</template>
<script lang="ts" setup>
import {computed, nextTick, onMounted, reactive, type Ref, ref, toRef, watch, watchEffect} from "vue";
import {dayjs2} from "/@/utils/dayjs-settup";
import {APopover, AButton} from "/@/components/common";
type IDate = `${string}-${string}-${string}` | Date | number | null;

const nowDate = new Date();
const aWeekAgo = new Date(nowDate.getTime() - 7 * 24 * 60 * 60 * 1000);

const props = withDefaults(defineProps<{
    size?: "large" | "small" | "default" | ""
    modelValue: [IDate, IDate] | null

    // 不设置表示时间戳,设置了表示字符串
    outputFormat?: null|""|"YYYY-MM-DD"|"Y-M-D"|"Y-M"|"Y"|string

    defaultMode?: "date" | "week" | "month" | "year"

    label?:string

    defaultValue?: [IDate, IDate] | null
}>(),{
    size:"",
    outputFormat:"",
    defaultMode:"date"
})
const emits = defineEmits<{
    (e:"update:modelValue", date:IDate[]):void
    (e:"update:start", date:IDate):void
    (e:"update:end", date:IDate):void
}>()

const popover =reactive({
    visible:false,
    ref:null,
})

const singleViewDatePickerRef = ref(null)

const $index = ref<HTMLDivElement>()
let popoverIds: string[] = [];
onMounted(()=>{
    const inputDoms = $index.value?.querySelectorAll(".index-input__inner[aria-controls]")||[]
    popoverIds = [...inputDoms].map(dom => dom.getAttribute("aria-controls")) as string[];
})

// 日期范围选择框的形式，自定义，还是整周，整月，整季度，整年
const mode = ref(props.defaultMode) as Ref<"date"|"week"|"month"|"year">
const isSingleView = computed(()=>{
    return mode.value != "date"
})
const resumeMode = ()=>{
    mode.value = "date"
}

const singleViewLabel = computed(()=>{
    return mode.value == "week" ? "星期" : mode.value == "month" ? "月份" : "年份"
})

watch(mode, async (modeValue) => {
    popover.visible = false
    if (modeValue != "date") {
        await nextTick()

        //@ts-ignore
        singleViewDatePickerRef?.value?.handleOpen?.()
    }
})

const handlerQuicklySetting = (type:string, value:number=1)=>{
    const now  = dayjs2()

    if(type == "week"){
        endDate.value = now.toDate()
        startDate.value = now.subtract(value, "week").toDate()
    }else if(type == "month"){
        endDate.value = now.toDate()
        startDate.value = now.subtract(value, "month").toDate()
    }else if(type == "year"){
        endDate.value = now.toDate()
        startDate.value = now.subtract(value, "year").toDate()
    }else {
        handlerQuicklySetting("week", value | 1);
        return;
    }
    popover.visible = false;
    emitValue()
}

// 判断是否是在日期视图
// 如果是月视图或者年视图，不要触发更改
const isDateViewMode = async (type: "start" | "end" = "start") => {
    let selector
    if (type == "start") {
        selector = popoverIds[0]
    } else if (type == "end") {
        selector = popoverIds[1]
    }
    if (!selector) {
        console.warn("isDateViewMode selector not found");
        return
    }
    const dateViewTable = document.getElementById(selector)?.querySelector("table.index-date-table")
    return !!dateViewTable
}


const lastValues = [] as Date[];

// 初始值输入
const startDate = ref()
const endDate = ref()
watch(() => props.modelValue, (val, oldValue) => {
    // 避免震荡
    if (val && oldValue) {
        const newRange = val.map(index=>dayjs2(index).format("YYYY-MM-DD"));
        const oldRange = oldValue.map(index=>dayjs2(index).format("YYYY-MM-DD"));
        if (newRange[0] === oldRange[0] && newRange[1] === oldRange[1]) {
            return
        }
    }
    if (val) {
        startDate.value = val[0]?dayjs2(val[0]).toDate():null
        endDate.value = val[1]?dayjs2(val[1]).toDate():null
    }else{
        if (props.defaultValue) {
            startDate.value = props.defaultValue[0]?dayjs2(props.defaultValue[0]).toDate():null
            endDate.value = props.defaultValue[1]?dayjs2(props.defaultValue[1]).toDate():null
        }else{
            startDate.value = aWeekAgo;
            endDate.value = nowDate;
        }
    }

    // 记录旧值
    lastValues[0] = new Date(startDate.value)
    lastValues[1] = new Date(endDate.value)
}, {immediate: true});

// 值更改
const emitValue = ()=>{
    const start = startDate.value;
    const end = endDate.value;

    // 如果值没有变化，不触发更改
    let noChange = true;
    noChange = noChange && start && start.getTime() == lastValues[0]?.getTime();
    noChange = noChange && end && end.getTime() == lastValues[1]?.getTime();
    if (noChange) return;

    // 记录上一次触发的值
    lastValues[0] = new Date(start);
    lastValues[1] = new Date(end);

    debugger
    // 有可能起始和中止或者之一都为0
    if (start && end) {
        if(start.getTime() > end.getTime()){
            startDate.value = end;
            endDate.value = start;
        }
    }

    let value;

    // 响应格式
    if (props.outputFormat) {

        let formatString = props.outputFormat;
        if (formatString == "Y-M-D") {
            formatString = "YYYY-MM-DD"
        } else if (formatString == "Y-M") {
            formatString = "YYYY-MM"
        } else if (formatString == "Y") {
            formatString = "YYYY"
        }

        value = [startDate.value, endDate.value].map(index => {
            if (index) {
                return dayjs2(index).format(formatString!);
            }else{
                return null;
            }
        });
    }

    // 无格式
    else{
        value = [startDate.value, endDate.value]
    }
    emits("update:modelValue", value);
    emits("update:start", value[0])
    emits("update:end", value[1])
}
const commonVbind = computed(()=>{
    return {
        editable:false,
        clearable:false,
        size:props.size,
        type:mode.value,
        "onVisible-change"(visible){
            nextTick(()=>{
                if (!visible) {
                    debugger
                    emitValue();
                }
            })
        },
    }
})

const handlerSetStart = async (val: Date) => {
    startDate.value = val
}

const handlerSetEnd = async (val: Date) => {
    endDate.value = val
}

const startVbind = computed(()=>{
    return {
        ...commonVbind.value,
        "onUpdate:modelValue":handlerSetStart,
        "modelValue":startDate.value,
    }
})

const endVbind = computed(()=>{
    return {
        ...commonVbind.value,
        "onUpdate:modelValue":handlerSetEnd,
        "modelValue":endDate.value
    }
})

//singleViewVbind
const singleViewVbind = computed(()=>{
    return {
        ...commonVbind.value,
        "onUpdate:modelValue"(val: Date){
            if (mode.value == "month") {
                startDate.value = dayjs2(val).startOf("month").toDate()
                endDate.value = dayjs2(val).endOf("month").toDate()
            } else if (mode.value == "year") {
                startDate.value = dayjs2(val).startOf("year").toDate()
                endDate.value = dayjs2(val).endOf("year").toDate()
            } else if (mode.value == "week") {
                startDate.value = dayjs2(val).startOf("week").toDate()
                endDate.value = dayjs2(val).endOf("week").toDate()
            }
            emitValue();
            resumeMode()
        },
        "modelValue":startDate.value
    }
})

</script>
<style lang="less">
.ADateRange{
    .label{
        padding-right: 0.5em;
        &.inner{
          padding-right: 0.5em;
          padding-left: 0.5em;
        }
    }
    .index-date-editor{
        width: 120px;
        .index-input__inner{
            padding-left: 0;
            padding-right: 0;
        }
    }
    .more-btn{
        margin-left: 0.25em;
    }

    .list{
        &-item{
            margin: 0.25em 0;
        }
    }
    .index-divider{
        margin: 1.5em 0;
    }
}
</style>
