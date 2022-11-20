<template lang="pug">
.SimpleList(:class="['mode-'+props.mode]")
    .list-item(v-for="(item, i) in list" v-if="list.length")
        i.pr05(v-if="!props.hideIndex") {{i+1}}.
        | {{item}}
    p.cl-grey400(v-else) 暂无信息

</template>
<script lang="ts" setup>
import {computed} from "vue";

const props = withDefaults(defineProps<{
    mode?: "grid" | "list" | "tag"
    modelValue: string | string[] | undefined | null
    split?: string | RegExp
    hideIndex?: boolean
}>(), {
    hideIndex: false,
    mode: "list",
    split: ",",
});
const emits = defineEmits<{}>()
const list = computed(()=>{
    if (!props.modelValue) {
        return [];
    }
    if (Array.isArray(props.modelValue)) {
        return props.modelValue;
    }
    return props.modelValue.split(props.split);
})
</script>
<style scoped lang="less">
.SimpleList{
    font-size: 12px;
    &.mode-list{
        .list-item{
            padding: 0.25em 0;
            display: flex;
            border-bottom: 1px solid #f0f0f0;
            &:last-child{
                border-bottom: none;
            }
        }
    }

    &.mode-tag{
        .list-item {
            display: inline-block;
            vertical-align: top;
            padding: 0.5em 0.75em;
            background-color: #c0c0c0;
            color: #fff;
            margin: 0.25em;
            border-radius: 3px;
            line-height: 1em;
            background-image: linear-gradient(25deg, #9773cf, #8888d2, #749cd6, #57afd9);

        }
    }

}
</style>
