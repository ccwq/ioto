import {defineComponent, shallowRef} from "vue";

export const rowTextComponent = defineComponent({
    props:{
        modelValue: [String, Number],
    },
    setup(props, ctx) {
        return () => <div class="row-text-component">
            {props.modelValue || "-"}
        </div>
    }
})


export const textNodeComponent = defineComponent({
    props:{
        text: String,
        classList: [Array, String],
    },
    setup(props, ctx){
        const classString = Array.isArray(props.classList) ? props.classList.join(" ") : props.classList;
        return () => <div
            class={"fx1 ph05 cl-grey500 lh12 text-node " + classString}
            v-html={props.text}
        />
    }
})

export const textRule = ( title:string, value?:any, options?)=>{
    if (!options) {
        options = {}
    }

    if (!options.field) {
        options.field = new Date().getTime() + ""
    }

    return {
        native:false,
        ...(options||{}),
        component: shallowRef(rowTextComponent),
        title,
        value,
    };
}
