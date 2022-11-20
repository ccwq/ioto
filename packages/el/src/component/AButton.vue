<template lang="pug">
ElButton.a-button(type="primary" v-bind="vBind" :class="{lite}")
    slot(name="icon")
        index-icon(v-if="icon" :class="iconPrevClasses"): component(:is="icon")
    slot(name="default") {{label}}
    slot(name="suffix")
        index-icon(v-if="suffix" :class="{iconSuffixClasses}"): component(:is="suffix")
    template(#tip): slot(name="tip")
</template>
<script lang="ts">
import {computed, defineComponent, toRefs, useSlots} from "vue";

export default defineComponent({
    props:{
        label:{
            type:String,
            default:""
        },
        icon:{
            type:String,
            default:""
        },

        suffix:{
            type:String,
            default:""
        },
        lite:{
            type:Boolean,
            default:false
        }
    },
    setup(attrs, ctx) {
        const vBind = computed(() => {
            return {
                // text:true,
                ...ctx.attrs,
            }
        });

        const slots = useSlots();
        const iconPrevClasses = computed(() => {
            const ret = {} as Record<string, any>;
            if (slots.default) {
                ret["mr025"] = true;
            }
            return ret
        });

        const iconSuffixClasses = computed(() => {
            const ret = {} as Record<string, any>;
            if (slots.default) {
                ret["ml025"] = true;
            }
            return ret
        });

        return {
            iconPrevClasses,
            iconSuffixClasses,
            vBind,
        }
    }
})
</script>

<style lang="less">
.a-button{
    align-self: center;
    font-size: 12px;
    &.as-stretch{
        align-self: stretch;
    }

    &:not(.no-ml) {
        margin-left: 6px;
    }
    &.lite{
        padding:0 5px;
        height: 24px;
        //margin-left: 5px;
        &:not(.no-ml) {
            margin-left: 5px;
        }
    }
    &.ex-lite,&.lite-ex{
        padding: 0.25em;
        height: 18px;
        font-size: 12px;
        >span{
            display: block;
            transform: scale(0.8);
        }
    }
    &.no-bg{
        border: none;
        background: none;
        &:hover {
            //background: none;
            //border: none;
        }
    }

    &.as-stretch{
        height: auto;
    }

    &.is-text{
        &:hover {
            color: var(--index-color-primary-light-5);
        }
    }
}
</style>
