<template><div class="size-monitor" tabindex="-1" ref="$$el"></div></template>

<script setup lang="ts">
    import debounce from "lodash/debounce";
    import throttle from "lodash/throttle";
    import {isIE} from "@ioto/core/src/base";
    import {nextTick, onBeforeUnmount, onMounted, ref} from "vue";

    interface Props{
        //尺寸偏移
        offsetWidth?:number,
        offsetHeight?:number,
        debounce?:number,
        throttle?:number,
        fastMode?:boolean,
        //当初始化完成的时候触发
        emitWhenReady?:boolean,
    }
    const props = withDefaults(defineProps<Props>(), {
        offsetWidth:0,
        offsetHeight:0,
        debounce:120,
        throttle:120,
        fastMode:false,
        emitWhenReady:true,
    })

    type Size = [number, number]
    const emits = defineEmits<{
        (e: "update:modelValue", size:Size): void
        (e: "ready", size:Size): void
    }>();

    let _w:number=0, _h:number=0;

    const $$el = ref<HTMLElement>();
    let _resizeObject:any
    let resizeHandler:Function
    onMounted(()=>{
        const $el = $$el.value!;

        //尺寸变化的处理
        const _resizeHandler = ()=> {
            if (_w !== $el.offsetWidth || _h !== $el.offsetHeight) {
                _w = $el.offsetWidth;
                _h = $el.offsetHeight;
                emits("update:modelValue", [_w + props.offsetWidth, _h + props.offsetHeight]);
            }
        }



        //关闭debounce和throttle
        if (props.fastMode) {
            resizeHandler = _resizeHandler;
        }else{
            let _debFunc = debounce(_resizeHandler, props.debounce);
            let _thrFunc = throttle(_resizeHandler, props.throttle);
            resizeHandler = ()=>{
                _debFunc();
                _thrFunc();
            }
        }


        nextTick(() => {
            _w = $el.offsetWidth;
            _h = $el.offsetHeight;

            const object = document.createElement('object')
            _resizeObject = object
            object.setAttribute('aria-hidden', 'true')
            object.setAttribute('tabindex', "-1")

            object.onload = _=>{
                object.contentDocument?.defaultView?.addEventListener('resize', ()=>resizeHandler());
                _resizeHandler();

                //第一次派发
                if (props.emitWhenReady) {
                    let size = [_w + props.offsetWidth, _h + props.offsetHeight];
                    emits('update:modelValue', size as Size);
                    emits('ready', size as Size);
                }
            };

            object.type = 'text/html'
            if (isIE) {
                $el.appendChild(object)
            }
            object.data = 'about:blank'
            if (!isIE) {
                $el.appendChild(object)
            }
        })

        onBeforeUnmount(()=>{
            if (_resizeObject?.onload) {
                if (!isIE && _resizeObject.contentDocument) {
                    _resizeObject.contentDocument.defaultView.removeEventListener('resize', resizeHandler)
                }
                delete _resizeObject.onload
            }
        })
    })
</script>

<style scoped lang="less">
    .size-monitor {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
        border: none;
        background-color: transparent;
        pointer-events: none;
        display: block;
        overflow: hidden;
        opacity: 0;
        ::v-deep object{
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            overflow: hidden;
            pointer-events: none;
            z-index: -1;
        }
    }
</style>
