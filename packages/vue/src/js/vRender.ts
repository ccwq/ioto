import {defineComponent, h} from "vue";
const VReander = defineComponent({
    props:{
        render:Function,
        data:{
            type:Object,
        }
    },
    setup({render, data}){
        return ()=> render(h, data)
    }
})


export {
    VReander,
}
