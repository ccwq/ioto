import {defineComponent, h, useAttrs} from 'vue';
interface VarProps {}
export default defineComponent({
    name: "TempVar",
    setup(props: VarProps, { slots }) {
        const attrs = useAttrs()
        if (!slots) {
            throw new Error('No slots found');
        }
        return () => {
            let dom;
            if (slots?.default) {
                dom = slots.default(attrs);
            }else{
                dom = null
            }
            return h('div', null, dom);
        }
    }
});
