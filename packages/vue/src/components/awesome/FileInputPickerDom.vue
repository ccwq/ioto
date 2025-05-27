<!--
 * @Author: ccwq
 * @Date: 2025/5/26 11:15:11
 * @Description: 自定义文件选择器组件外观
 * @Example
 * // 基础用法 - 图片选择
 * <div style="position: relative; width: 200px; height: 100px; border: 1px dashed #ccc;">
 *   <FileInputPickerDom
 *     :expandToFill="true"
 *     acceptPreset="image"
 *     @update:modelValue="handleFileSelect"
 *   />
 * </div>
 *
 * // 多文件选择
 * <div style="position: relative; width: 300px; height: 150px; background: #f5f5f5;">
 *   <FileInputPickerDom
 *     :expandToFill="true"
 *     :multiple="true"
 *     acceptPreset="all"
 *     @update:modelValue="handleMultipleFiles"
 *   />
 * </div>
 *
 * // 自定义文件类型
 * <FileInputPickerDom
 *   :expandToFill="true"
 *   accept=".pdf,.doc,.docx"
 *   @update:modelValue="handleDocuments"
 * />
 -->

<template lang="pug">
.FileInputPickerDom(:class="classes")
    .tip-text(v-if="!expandToFill")
        h3 需要进行下列操作来开启 &lt;FileInputPickerDom/&gt;组件:
        p 1. 设置 expandToFill:true
        p 2. 设置父元素的position为relative或者absolut
        p 以使input元素能够覆盖整个父元素区域
    template(v-else)
        input(
            @input="handlerInput" type="file"
            :accept="accept"
            :multiple="multiple"
        )


</template>
<script setup>
import {computed, onErrorCaptured, ref} from "vue"
const props = defineProps({
    /**
     * 向所有方向扩充以填满容器
     */
    expandToFill: {
        type: Boolean,
        default: false,
    },

    accept: {
        type: String,
        default: "",
    },

    // 是否支持多选
    multiple:{
        type: Boolean,
        default: false,
    },

    acceptPreset: {
        type: String,
        default: "all",
        validator(val){
            return [
                "all",
                "image"
            ].includes(val)
        }
    }
})
const emits = defineEmits([
    "update:modelValue",
])
onErrorCaptured((err)=>console.error("组件FileInputPickerDom内部错误:", err))

const classes = computed(() => {
    const val = [
        {
            "expand-to-fill": props.expandToFill,
        }
    ];
    return val;
});


const accept = computed(()=>{
    if (props.acceptPreset === "image") {
        return "image/*";
    } else if (props.acceptPreset === "all") {
        return "";
    } else {
        return props.accept;
    }
})



const inputIf = ref(true);

const handlerInput = (e) => {
    emits("update:modelValue", e.target.files)
    inputIf.value = false;
    setTimeout(()=>{
        inputIf.value = true;
    }, 0);
};

</script>
<style scoped lang="less">
.FileInputPickerDom{

    .tip-text{
        width: 440px;
        text-align: left;
        transform: translate(-120px, 0);
    }

    &.expand-to-fill{
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
    }

    >input{
        position: absolute;
        opacity: 0;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        cursor: pointer;
    }
}
</style>
