<template lang="pug">
.TestView
    ASelect(options="nihao,wohao da,hao id")
    ATagInput(v-model="tagInputValue")
</template>
<script lang="ts" setup>
import {
    ASelect,
    ATagInput,
} from "@ioto/el"
import "@ioto/el/dist/style.css"

import {stripAndFixNumber} from "@ioto/core"

console.log(stripAndFixNumber(1.234564546, 2))

import {ref, watchEffect} from "vue";
const props = withDefaults(defineProps<{modelValue:any}>(),{})
const emits = defineEmits<{}>()


const tagInputValue = ref("你好,世界")

watchEffect(()=>{
    console.log("tagInputValue", tagInputValue.value)
})

</script>
<style scoped lang="less">
.TestView{

}
</style>
