<template lang="pug">
ElSelect.aSelect(
    v-bind="vBind"
    :class="{aDisabled:disabled, isEmpty, isSelected:!isEmpty, disableAutoWidth}"
    v-if="!props.justLabel"
)
    slot()
    ElOption(
        v-for="option in options"
        :key="option.value"
        :label="option.label"
        :value="option.value + ''"
    )

    template(#prefix)
        p.label-content {{currentLabel}}
span.aSelect.text-mode(
    :class="{isEmpty, noMatched, multipleValueMode}"
    v-else v-html="currentTextLabel"
)
</template>
<script lang="ts" setup>
import {computed, inject, provide, ref, toRefs, useAttrs, watch, watchEffect} from "vue";
import {all2valueName} from "@ioto/core";
const attrs = useAttrs()
const props = withDefaults(defineProps<{
    modelValue?: string | number | string[],
    disabled?: boolean;
    options: any,
    keyField?: string;
    labelField?: string;
    justLabel?: boolean;
    placeholder?: string;
    disableAutoWidth?: boolean;
    blankTextPlaceholder?: string;
}>(), {
    disableAutoWidth: false,
    keyField: "id",
    labelField: "name",
    disabled: false,
    modelValue: "",
    options: () => [],
    justLabel: false,
    placeholder: "请选择",
    blankTextPlaceholder:"-"
})

const emits = defineEmits<{
    (e:"update:modelValue", value:string|number):void
    (e:"data-ready", hitItem:any, options?:any[]):void

    // 在modalVlue和options改变时候派发
    (e:"update:modelLabel", label:string|undefined):void
}>()

type Option = {
    value:string|number,
    label:string
    [key:string]:any
}

// 当 modalValue为数组的时候, just比如为true
if(Array.isArray(props.modelValue) && !props.justLabel ){
    throw new Error("modelValue must be string or number when justLabel is false");
}

const options = ref<Option[]>([])
watch(() => props.options, async (propOptions) => {
    let rawData = await Promise.resolve(propOptions).catch(e => {
        console.error("ASelect options error", e)
        return []
    })
    if (!rawData) {
        rawData = []
    }
    const optionsValue = all2valueName(rawData, {
        valueGetField: props.keyField,
        nameGetField: props.labelField,
        valueSetField: "value",
        nameSetField: "label"
    });

    let hitItem = optionsValue.find(el => el.value == props.modelValue);
    emits("data-ready", hitItem, optionsValue)

    options.value = optionsValue
}, {immediate: true});

// 派发label/update:modelLabel的逻辑
watch(()=>[
    options,
    props.modelValue
],async ([options, value]) => {
    const option = options.value.find((el:any) => el.value == value)
    emits("update:modelLabel", option?.label);
})

// 控件只支持字符串
const optDicByValue = computed(()=>{
    let dic = {} as Record<string, any>
    options.value.forEach(item=>{
        dic[item.value + ""] = item;
    })
    return dic
})

// 当前值对应的项
const currentItem = computed(()=>{
    return optDicByValue.value[props.modelValue + ""]
})

// 当前值对应的项的名称
const currentLabel = computed(()=>{
    return currentItem.value?.label || props.placeholder
})

// 显示多值的情况
const multipleValueMode = computed(()=>{
    if(Array.isArray(props.modelValue)){
        return props.modelValue.length > 1;
    }else{
        return false;
    }
})

const currentTextLabel = computed(()=>{
    const value = props.modelValue;
    if (Array.isArray(value)) {
        if (!value.length) {
            return props.blankTextPlaceholder
        }else{
            return value.map(v=>{
                return optDicByValue.value[v + ""]?.label || v
            }).join("<br/>")
        }
    }else{
        return currentItem.value?.label || props.blankTextPlaceholder
    }
})

// 当前选择获取和传入的值没有在options对应到项目
const noMatched = computed(()=>{
    return !currentItem;
})

// 没有选择任何项
const isEmpty = computed(()=>{
    return !currentItem.value
})

const vBind = computed(()=>{
    return {
        disabled: props.disabled,
        placeholder: props.placeholder,
        ...attrs,
        modelValue: props.modelValue + "",
        "onUpdate:modelValue"(v: string | number) {
            const item = optDicByValue.value[v]
            if (item) {
                emits("update:modelValue", item.value)
            } else {
                emits("update:modelValue", v);
            }
        },
    };
})
</script>

<style lang="less">
.aSelect{
    .label-content{
        min-width: 5em;
    }

    .el-input__inner{
        display: none;
    }

    &.isEmpty{}

    &.isSelected{
        .label-content{
            color: var(--el-input-text-color,var(--el-text-color-regular));
        }
    }

    &.disableAutoWidth{
        .el-input__inner{
            display: block;
        }
        .label-content{
            display: none;
        }
    }

    &.noMatched{
        color: #BDBDBD;
    }

    &.multipleValueMode{
        display: block;
        line-height: 1.2em;
    }
}
</style>
