/**
 * 用来在template中创建变量
 * 使用方式
 *   <AVar vars="{a:1,b:2}" comment="直接使用">
 *       <template #default="{a, b}">
 *           {{a}}-{{b}}
 *       </template>
 *   </AVar>
 *   <AVar vars="{a:1,b:2}" comment="v-model指令">
 *         <template #default="ctx">
 *               <input v-model=ctx.a/>
 *         </template>
 *   </AVar>
 */
import {defineComponent, PropType, useSlots, h, reactive, computed} from "vue";

export const AVar = defineComponent({
    props: {
        vars:{
            type: Object as PropType<Record<string, any>>,
            default: ()=>({})
        },
    },
    setup(props, ctx) {
        const slots = useSlots();
        const attrs = ctx.attrs;
        const state = reactive({...attrs, ...props.vars});
        return  ()=>{
            const node = slots.default?.(state);
            return node;
        }
    }
})
