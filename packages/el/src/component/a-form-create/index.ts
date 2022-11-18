// 导入表单创造
import {App, nextTick, onBeforeUnmount, reactive, ref, shallowRef, isReactive, markRaw, defineComponent} from "vue"
import formCreate,{maker} from '@form-create/element-ui'
import type {ComputedRef} from 'vue'
import set from "lodash/set"
import type {
    Options as FormOption,
    Rule,
    Api,
} from "@form-create/element-ui";

import type {ApiAttrs, CreatorAttrs, OptionAttrs} from "@form-create/element-ui/types/config";

const dateOffset = (value:number, unit:"day"|"month"|"year"="day")=>{
    const date = new Date();
    switch (unit) {
        case "day":
            date.setDate(date.getDate() + value);
            break;
        case "month":
            date.setMonth(date.getMonth() + value);
            break;
        case "year":
            date.setFullYear(date.getFullYear() + value);
            break;
    }
    return date;
}

const useFormCreate = (app:App)=>{
    app.use(formCreate)
}

// 默认配置
const defaultFormOptions:FormOption = {

}

// 合并默认配置
const getFormOption = (option:FormOption)=>{
    return {
        ...defaultFormOptions,
        ...option
    }
}

type VNodeRule = Rule["suffix"];


// import AUploader from "src/components/AUploader.vue"
// import Foo from "src/components/Foo.vue"
// formCreate.component("AUploader", AUploader);
// formCreate.component("foo", Foo);

// 自定义option http://www.form-create.com/v3/guide/effect.html
formCreate.register({
    name:"customOption",
    init({value}, rule, fapi) {

    }
})

import {BPromise} from "../../../../core";
import {rowTextComponent, textNodeComponent} from "./form-create-setup-helper";

interface FormOption2 extends Omit<OptionAttrs, "submitBtn" | "resetBtn"> {
    labelWidth?: string
    submitBtn?: {
        click?: Function;
        innerText?: string;
        show?: Boolean;
        [key: string]: any
    } | false,
    resetBtn?: {
        click?: Function;
        innerText?: string;
        show?: Boolean;
        [key: string]: any
    } | boolean,
    onReady?: (api: FC) => void
    onSubmit?: (formData:any, api: FC, ...rest:any[]) => void
    onReset?: (api: FC, ...rest:any[]) => void

    global?:{
        [key:string]:any
    }
    beforeSubmit?: (formData:any, api: FC, ...rest:any[]) => void
}


const useFC = (option?: FormOption2)=>{
    const fcPromise = new BPromise<FC>()
    const fcRef = ref<FC>()
    const labelWidthRef = ref<string|number>()
    const formDataRef = ref<any>();
    const disabledRef = ref<boolean>(false)
    const fcOptionRef = ref<OptionAttrs>({})

    //表单数据合并
    const getFormOption = ()=>{
        let _option = {...option};
        if (!_option) {
            _option = {}
        }
        if (_option.labelWidth) {
            set(_option, "form.labelWidth", _option.labelWidth)
            // setLabelWidth(_option.labelWidth)
            delete _option.labelWidth
        }
        return _option as OptionAttrs
    }
    fcOptionRef.value = getFormOption()

    // 用来获取fc引用
    const handlerFcReady = (api:FC)=>{
        fcPromise._resolve(api)
        fcRef.value = api
        option?.onReady?.(api)
    }

    // 清除验证重置数据
    const fullReset = async () => {
        const fc = await fcPromise

        // 重置表单
        fc.resetFields()
        await nextTick()

        // 清除验证规则
        fc.clearValidateState()
    }

    // 设置表单禁用和可用状态
    const disabledForm = async (disabled:boolean=true)=>{
        const fc = await fcPromise
        disabledRef.value = disabled
        set(fcOptionRef.value, "form.disabled", disabled)
        // set(fcOptionRef.value, "resetBtn.show", !disabled)
        // set(fcOptionRef.value, "submitBtn.show", !disabled)
    }

    // 设置label宽度
    const setLabelWidth = async (labelWidth:string)=>{
        const fc = await fcPromise;
        labelWidthRef.value = labelWidth
        set(fcOptionRef.value, "form.labelWidth", labelWidth)
        fc.fields().forEach(fieldString=>{
            fc.updateRule(fieldString, {
                wrap:{
                    labelWidth,
                }
            })
        })
    }

    // 设置表单值
    const setFormData = async (formData:any)=>{
        const fc = await fcPromise;
        // formDataRef.value = formData
        fc.setValue(formData)
    }

    // 直接绑定到AFromCreate上的属性
    const aFormVBind = reactive({
        onReady:handlerFcReady,
        disabled:disabledRef,
        option: fcOptionRef,
        // "onSubmit":option?.onSubmit,
        onSubmit:option?.onSubmit,
        beforeSubmit:option?.beforeSubmit,
        "onReset":option?.onReset,
    })


    const updateRule = async (field:string, rule:Rule)=>{
        const fc = await fcPromise;
        fc.updateRule(field, rule)
    }
    const mergeRule = async (field:string, rule:Rule)=>{
        const fc = await fcPromise;
        fc.mergeRule(field, rule)
    }

    const updateRules = async (rules:Rule[])=>{
        const fc = await fcPromise;
        fc.updateRules(rules)
    }

    const mergeRules = async (rules:Rule[])=>{
        const fc = await fcPromise;
        fc.mergeRules(rules)
    }



    return {
        updateRule,
        mergeRule,
        updateRules,
        mergeRules,
        setFormData,
        fcOptionRef,
        disabledForm,
        fullReset,
        fcPromise,
        fcRef,
        handlerFcReady,
        formDataRef,
        setLabelWidth,
        labelWidthRef,
        aFormVBind,
    }
}


// 下拉，checkbox，radio的候选项
type OptionsList = [string, string, boolean?]




// 自定义的marker
namespace aMaker {
    const WidthSizeDefine = {
        small: "6em",
        medium: "8em",
        large: "10em",
        exLarge: "14em",
    };
    type Size = keyof typeof WidthSizeDefine | `${number}${"em" | "px"}`;


    interface ExRule extends Rule{
        size?:Size
        required?:boolean
        colSpan?:number

        //number单位
        unit?:string

        //date
        offsetDate?:[number, ("day"|"month"|"year"|undefined)?]

        //switch
        values?:[any, any]
        labels?:[string, string]
    }


    const calcExField = (option:ExRule, type:string="")=>{
        if (option?.size) {
            const width = WidthSizeDefine[option.size || "medium"] || option.size;
            set(option, "style.width", width)
            delete option.size
        }

        if (option?.required) {
            set(option, "effect.required", true)
            delete option.required
        }

        if (option?.colSpan) {
            set(option, "col.span", option.colSpan)
            set(option, "col.xs", 24)
            delete option.colSpan
        }

        if (type == "switch") {
            //values
            if (option?.values) {
                set(option, "props.activeValue", option.values[0]);
                set(option, "props.inactiveValue", option.values[1]);
                delete option.values;
            }

            //labels
            if (option?.labels) {
                set(option, "props.activeText", option.labels[0]);
                set(option, "props.inactiveText", option.labels[1]);
                delete option.labels;
            }
        }
    }

    // 日期选择
    export const number = (field:string, title:string, value=0, option = {} as ExRule)=>{
        calcExField(option)
        if(option?.unit){
            set(option, "suffix", option.unit)
            set(option, "style.marginRight", "0.25em")
        }
        return {
            type: "number",
            field,
            title,
            value,
            ...option
        };
    }



    // 日期选择
    export const date = (field:string, title:string, option = {} as ExRule)=>{
        calcExField(option)
        if(option?.offsetDate){
            // option.value = dayjs2().add(...option.offsetDate).format("YYYY-MM-DD")
            // option.value = dayjs2().add(...option.offsetDate).format("YYYY-MM-DD")

            option.value = dateOffset(...option.offsetDate)

        }
        return {
            type: "DatePicker",
            field,
            title,
            ...option
        }
    }

    export const input = (field:string, title:string, option = {} as ExRule)=>{
        calcExField(option)
        return {
            type: "input",
            field,
            title,
            ...option
        }
    }

    export const textarea = (field:string, title:string, option = {} as ExRule)=>{
        set(option, "porps.type", "textarea")
        return input(field, title, option);
    }

    /**
     * 自定义组件
     * @param component 组件实体或者包裹组件的一个数组，
     * 目的是为了避免使用shallowRef包裹组件之后，出现的 Component is missing template or render function. 的错误
     * @param field
     * @param title
     * @param props
     * @param option
     */
    export const component = (component:any, field:string, title:string, props:any, option = {} as ExRule)=>{
        calcExField(option)
        if(props && !option?.props){
            set(option, "props", props)
        }
        component = markRaw(component)
        return {
            component,
            field,
            title,
            native:false,
            ...option
        }
    }

    //rawText
    export const rawText = (field:string, title:string, option = {} as ExRule)=>{
        calcExField(option)
        let component = markRaw(rowTextComponent) as any;
        return {
            component,
            field,
            title,
            native:false,
            ...option
        }
    }



    // checkbox
    export const checkbox = (field:string, title:string, list:OptionsList[], option = {} as ExRule)=>{
        calcExField(option)
        const options = list.map(([value, label, disabled]) => {
            return {
                value,
                label,
                disabled,
            }
        });
        return {
            type: "checkbox",
            field,
            title,
            options:options,
            ...option
        }
    }

    // radio
    export const radio = (field:string, title:string, list:OptionsList[], option = {} as ExRule)=>{
        return checkbox(field, title, list, {type:"radio", ...option})
    }

    // switch
    export const aSwitch = (field:string, title:string, option = {} as ExRule)=>{
        calcExField(option, "switch")
        return {
            type: "switch",
            field,
            title,
            ...option
        }
    }
    export const switcher = aSwitch;



    //hidden
    export const hidden = (field:string, value?:any, option = {} as ExRule)=>{
        calcExField(option)
        return {
            type: "hidden",
            field,
            value,
            ...option
        }
    }


    const componentText = markRaw(textNodeComponent) as any;
    formCreate.component("text-node", componentText);

    // 在suffix和prefix中用来增加一段文字描述
    export const textNode = (text:string, classList:string|string[]=[], option = {} as ExRule)=>{
        calcExField(option)
        set(option, "props.text", text);
        set(option, "props.classList", classList);
        return {
            type: "text-node",
            ...option,
        } as VNodeRule;
    }
}


export {
    formCreate as createForm,
    getFormOption,
    useFormCreate,
    maker,
    useFC,
    aMaker,
}


export {default as AFormCreate} from "./AFormCreate.vue"
export type {
    ApiAttrs,
    CreatorAttrs,
    OptionAttrs,
    Rule,
    Api as FormApi,
    FormOption2,
}
