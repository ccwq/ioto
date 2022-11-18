import {computed, ref, watch} from 'vue';

export default (valueList:any[], defaultIndex = 0)=>{
    const step = reactive({
        index:0,
        valueList,
        next() {
            if (step.index < step.valueList.length - 1) {
                step.index++;
            }
        },
        prev() {
            if (step.index > 0) {
                step.index--;
            }
        },

        goto(n:number){
            if(n<0) n = 0;
            else if(n>step.valueList.length-1) n = step.valueList.length-1;
            step.index = n;
        },
    })

    const stepValue = computed(() => step.valueList[step.index]);
    return {
        stepIndex: toRef(step, "index"),
        stepLength: computed(() => step.valueList.length),
        valueList,
        stepNext:step.next,
        stepPrev:step.prev,
        stepValue,
        stepEof:computed(()=>step.index === step.valueList.length - 1),
        stepBof:computed(()=>step.index === 0),
        goto:step.goto,
    }
}