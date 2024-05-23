<!--
 * @Creator: Albus
 * @Date: 2024/10/144 10:02:26
 * @Description: 允许一个router-link 在其他路由处于激活状态
 -->
<template lang="pug">
RouterLink.RouterAnchor(:class="classes"): slot


</template>
<script lang="ts" setup>
import {computed, useAttrs} from "vue"
import {useRoute} from "vue-router";


/**
 * 允许一个router-link 在其他路由处于激活状态
 * @example - 比如要自新闻的详情页面,让新闻的导航页处于高亮状态
 * (route)=>{
 *     return route.name == "detail" && route.params?.type=="news"
 * }
 *
 */
const props = withDefaults(defineProps<{
    // activeInDetailType: string[],

    activeFunc?: (route:ReturnType<typeof useRoute>)=>boolean,

}>(),{})
const emits = defineEmits<{}>()
const attrs = useAttrs()
const route = useRoute()
const classes = computed(()=>{
    const ret = {} as any
    if (props?.activeFunc?.(route)) {
        const key = attrs.activeClass as string || "router-link-active";
        ret[key] = true;
    }
    return ret;
})
</script>
