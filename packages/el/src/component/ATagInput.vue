<template lang="pug">
VueTagsInput.aVueTagsInput( v-bind="vBind" :class="{aDisabled:disabled}")
</template>
<script lang="ts" setup>
import {computed, inject, provide, toRefs, useAttrs, watchEffect} from "vue";

//@ts-ignore
import VueTagsInput from "@sipec/vue3-tags-input";
const attrs = useAttrs()

// const props = withDefaults(defineProps<{}>(), {})
const props = withDefaults(defineProps<{
    modelValue?:string,
    placeholder?:string
    disabled?:boolean
    spliters?:(string|number)[]
}>(), {
    spliters:()=>[";"],
    disabled: false,
    modelValue:"",
    placeholder:"增加标签"
})

const emits = defineEmits<{
    (e:"update:modelValue", value:string):void
}>()



const value = computed(() => {
    const list = [] as any[];
    if (props.modelValue) {
        const spliters = props.spliters;
        const rgx = new RegExp(spliters.join("|"), "g");
        const arr = props.modelValue.split(rgx);
        for (const text of arr) {
            if (text.trim()) {
                list.push({text});
            }
        }
    }
    return list
    // props.modelValue ? props.modelValue?.split(",").map(text => ({text})) : [];
});
const disabled = computed(() => props.disabled );

const vBind = computed(()=>{
    return {
        addOnKey:[13, ...props.spliters],
        ...attrs,
        tags:value.value,
        modelValue:"",
        placeholder:props.placeholder,
        disabled:disabled.value,
        //"onUpdate:modelValue"(v){},
        "onTags-changed"(v:any[]){
            const value = v.map(item=>item.text).join(props.spliters[0]+"")
            emits("update:modelValue", value)
        }
    }
})



</script>

<style lang="less">
.aVueTagsInput{
    .ti-input{
        -webkit-appearance: none;
        background-color: var(--index-input-bg-color,var(--index-color-white));
        background-image: none;
        border-radius: var(--index-input-border-radius,var(--index-border-radius-base));
        border: var(--index-input-border,var(--index-border-base));
        box-sizing: border-box;
        color: var(--index-input-text-color,var(--index-text-color-regular));
        font-size: inherit;
        min-height: 40px;
        line-height: 40px;
        outline: 0;
        padding: 0 15px;
        transition: var(--index-transition-border);
        width: 100%;
        display: flex;
        align-items: center;
    }

    &.aDisabled{
        .ti-input{
            padding: 0;
            //display: block;
            border: none;
        }
        .ti-icon-close{
            display: none;
        }
        .ti-new-tag-input-wrapper{
            display: none;
        }
    }
}
</style>
