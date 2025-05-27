<template lang="pug">
ElForm.UseElFormExample(v-bind="formBind" ref="formRef" label-width="5em")
    UFItem(prop="nickName" v-slot="{bind}")
    UFItem(prop="introduction" :itemComponentOptions="{type:'textarea', rows: 5}")
    UFItem(prop="sex")
    UFItem(prop="interest")
    UFItem(prop="age" v-slot="{bind}"): ElSlider(v-bind="bind")
    ElDivider 操作
    UFItem(label=" ")
        ElButton(@click="handlerSubmit()") 提交
        ElButton(@click="handlerAddItem()") 增加表单项
    ElDivider 数据预览
    UFItem(label=" ")
        pre {{JSON.stringify(model, 2, 2)}}
</template>
<script setup lang="tsx">
import {defineComponent, getCurrentInstance, onErrorCaptured, ref, watch} from "vue"
import {type FormRuleItem, useElFormConf} from "@/composition/useElForm/useElForm.tsx";
const props = defineProps()
const emits = defineEmits()
onErrorCaptured((err)=>console.error("组件UseElFormExample内部错误:", err))
import {type IUFItem} from "@/composition/useElForm/useElFormHelper";
const fromItemDef = ref<FormRuleItem<IUser>[]>([
    {
        prop: "nickName",
        label: "昵称",
        rules: [
            {required: true, message: "请输入用户名", trigger: "blur"},
            {min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur"},
        ],
    },
    {
        prop: "introduction",
        label: "个人简介",
    },
    {
        prop: "sex",
        label: "性别",
        value: "1",
        selectOptions: [
            {label: "男", value: "1"},
            {label: "女", value: "0"},
        ]
    }
]);

const {
    formRef,
    model,
    formBind,
    formValidateTo,
    UFItem
} = useElFormConf < IUser > (fromItemDef);


const handlerSubmit = async ()=> {

    const [err] = await formValidateTo();

    if (err) {
        console.error("表单验证失败", err);
        return;
    }
}

/**
 * 动态显示或者隐藏表单项
 */
const handlerAddItem = async ()=>{
    fromItemDef.value = [
        ...fromItemDef.value,

        {
            prop: "interest",
            label: "兴趣爱好",
            value:"看书写字打游戏,骑马唱歌开飞机",
        },
        {
            prop: "age",
            label: "年龄",
            value:21,
            componentProps: {
                min:0,
                max: 180,
                step:1,
            }
        }
    ] as FormRuleItem<IUser>[]
}

watch(formBind, fv=>{
    console.log(fv, 77)
}, {immediate: true})


const Uider = defineComponent({
    setup(){
        const instance = getCurrentInstance()
        return ()=>{

            console.log("又一次渲染了")
            return <span {...{
                "v-memo": [],
            }}>{instance.uid}</span>
        }
    }
})

</script>
<style scoped lang="less">
.UseElFormExample{
    padding: 1em;
    margin: auto;
    max-width: 600px;
    pre{
        line-height: 1.2;
    }
}
</style>
