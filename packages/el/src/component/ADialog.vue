<template lang="pug">
index-dialog.a-dialog( v-bind="vBind")
    slot
    template(#header)
        slot(name="header")
</template>
<script lang="ts">
import {computed, defineComponent, toRefs} from "vue";

export default defineComponent({
        props:{
            label:{
                type:String,
                default:"按钮名称"
            },
            icon:{
                type:String,
                default:""
            },
            class: [Object, String, Array],
            style: [Object, String],
        },
        setup(attrs, ctx) {
            const vBind = computed(() => {
                return {
                    title:"标题",
                    closeOnClickModal:false,
                    ...ctx.attrs,
                }
            });

            return {
                vBind,
            }
        }
    }
)
</script>

<style lang="less">
.a-dialog{

}
</style>
