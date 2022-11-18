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
    :class="{isEmpty, noMatched}"
    v-else
) {{currentTextLabel}}
</template>
<script lang="ts" setup>
import {computed, inject, provide, ref, toRefs, useAttrs, watch, watchEffect} from "vue";
import {all2valueName} from "@ioto/core";
const attrs = useAttrs()
const props = withDefaults(defineProps<{
    modelValue?: string | number,
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
    (e:"update:modelValue", string):void
    (e:"data-ready", hitItem:any, options?:any[]):void
}>()

type Option = {
    value:string|number,
    label:string
    [key:string]:any
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

    let hitItem = optionsValue.find(index => index.value == props.modelValue);
    emits("data-ready", hitItem, optionsValue)

    options.value = optionsValue
}, {immediate: true});

// 控件只支持字符串
const optDicByValue = computed(()=>{
    let dic = {}
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

const currentTextLabel = computed(()=>{
    return currentItem.value?.label || props.blankTextPlaceholder
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
        placeholder:props.placeholder,
        ...attrs,
        modelValue:props.modelValue + "",
        "onUpdate:modelValue"(v){
            const item = optDicByValue.value[v]
            if (item) {
                emits("update:modelValue", item.value)
            }else{
                emits("update:modelValue", v);
            }
        },
    }
})
</script>

<style lang="less">
.aSelect{
    .label-content{
        min-width: 5em;

    }

    .index-input__inner{
        display: none;
    }

    &.isEmpty{

    }

    &.isSelected{
        .label-content{
            color: var(--index-input-text-color,var(--index-text-color-regular));
        }
    }

    &.disableAutoWidth{
        .index-input__inner{
            display: block;
        }
        .label-content{
            display: none;
        }
    }

    &.noMatched{
        color: #BDBDBD;
    }
}
</style>
