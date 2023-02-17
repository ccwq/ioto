<template lang="pug">
.AUploader
    .uploadItem(v-for="item in fileItemListClone")
        .loading-layer(v-if="item.status === 'uploading'")
            span.cl-grey500 上传中...
        input.url-input(
            :value="item.url" readonly="readonly" :placeholder="placeholder"
            :disabled="disabled" v-if="item.status != 'error'" @click="handlerTextCilick(item)"
        )

        .status-message.error(v-else): span.cl-red500 {{item.message}}

        // 删除
        button.btn(
            class="fileinput" type="warning" :disabled="disabled" @click="handlerItemDelete(item)"
            v-if="visibleFunc.delete(item) && !noDelete"
        ) 删除

        // 上传
        button.btn( class="fileinput" type="primary" :disabled="disabled" v-if="visibleFunc.upload(item)")
            span {{btnText}}
            input(type="file" v-if="inputIf" @change="handlerPickFile" :accept="accept" :multiple="multiple")
    slot(:clearFiles="clearFiles" :list="fileItemList" :loading="loading")
</template>
<script>
import {defineComponent, getCurrentInstance, computed, ref, nextTick, watch, reactive, useAttrs} from "vue";

const getErrorString = (object)=>{

    if(typeof object == "undefined"){
        return ""
    }
    else if(typeof object == "string"){
        return object;
    }
    else if(object instanceof Error){
        return object.message;
    }

    //plain object
    else if(isPlainObject(object)){
        return object.error;
    }
    else{
        console.warn("未知错误类型", object);
        return "";
    }
}

/**
 * @typedef {import("vue").Ref} VueRef
 */

/**
 * @typedef {Object} FileListItem
 * @prop {"uploaded"|"uploading"|"error"|"ready"|'blank'} status - 当前的状态
 * @prop {string=} url - 上传后的地址
 * @prop {string=} name - 文件名
 * @prop {file=} file - 文件
 * @prop {string=} message - 错误信息
 */
export default defineComponent({
    name: 'AUploader',
    props: {
        // 是否可以在文本框中进行输入
        editable: {
            type: Boolean,
            default: false,
        },

        // 不允许删除
        // 某些情况下，只能清除所有上传任务之后,重新选择，而不能单个删除
        noDelete: {
            type: Boolean,
            defualt: false,
        },

        /**
         * 最大文件大小
         */
        maxFileSize: {
            type: [Number, String],
            default: 10 * 1024 * 1024
        },

        /**
         * 禁用状态
         */
        disabled: {
            type: Boolean,
            default: false
        },

        accept: {
            type: String,
            default: ""
        },

        placeholder: {
            type: String,
            default: "未上传文件"
        },

        // 路径
        value: {
            type: [String, Array],
            default: "",
        },
        btnText: {
            type: String,
            default: '选择文件'
        },
        loading: {
            type: Boolean,
            default: false
        },


        // 多文件
        multiple: {
            type: Boolean,
            default: false
        },

        // 文件数量的限制
        maxFileCount: {
            type: Number,
            default: 10
        },

        // 文件域
        fileField: {
            type: String,
            default: "file"
        },


        /**
         * @callback RequestFunc - 数据请求的回调
         * @param {FormData} formData - 表单数据
         * @param {File} file - 文件列表
         * @param {Object} props - 组件的属性
         * @returns  {Promise<{url:string}>} - 返回一个promise，promise的结果是一个对象，对象中包含一个url属性
         */

        /**
         * 上传的请求
         * @example (formData, file, _props)=>{
         *       return request.post("/file/uploadFile", formData);
         * }
         * @type {import('vue').PropOptions<RequestFunc>}
         * */
        requestFunc: {
            type: Function,
            request: true
        },


        /**
         * @callback ErrorFunc
         * @param {Error|string} - 错误信息
         */

        /**
         * 错误的回调
         * @type {import('vue').PropOptions<ErrorFunc>}
         */
        errorFunc: {
            type: Function,
            default: (rawError) => {
                console.error("上传出错:", rawError);
            }
        },

        /**
         * @callback beforeUpload
         * @param {File[]} files - 选择的文件列表
         * @param {Object} props - 组件的属性
         * @returns {File[]|false} -
         *    返回false，表示不上传，
         *    返回null或者undefined，表示使用默认的文件列表,
         *    返回一个新的文件列表，表示使用新的文件列表
         */

        /**
         * 上传之前的回调
         * @type {import('vue').PropOptions<beforeUpload>}
         */
        beforeUpload: {
            type: Function,
            default: () => {}
        },


        /**
         * @typedef {Object} BatUploadResp
         * @prop {string} url - 上传后的地址
         * @prop {Error|string} error - 错误信息
         */

        /**
         * @callback BatUploadFunc
         * @param {FileListItem} fileListItem - 上传的文件
         * @param {Object} props - 组件的属性
         * @returns {Promise<BatUploadResp[]>}
         */
        batUploadFunc:{
            type: Function,
        }

    },
    setup(props, ctx) {
        const m = getCurrentInstance()?.proxy;

        // 验证
        if (props.batUploadFunc && !props.multiple) {
            throw new Error("batUploadFunc只能在multiple为true时使用");
        }

        const handlerPickFile = async (e) => {
            inputIf.value = false;
            await nextTick()
            inputIf.value = true;

            loading.value = true;
            let filesArr = Array.from(e.target.files);
            ctx.emit("on-select", filesArr)

            // 处理hook
            const selectReturn = await props.beforeUpload(filesArr, props);
            if(selectReturn=== false){
                return;
            }else if (selectReturn) {
                filesArr = selectReturn;
            }

            // 多文件附加到内部
            if (props.multiple) {

                // 文件数量到达上线
                let isOverlflow = filesArr.length + fileItemList.value.length > props.maxFileCount;
                if (isOverlflow) {
                    props.errorFunc(`文件数量已超过数量上限”${props.maxFileCount}“,多余文件将被忽略`);
                }

                filesArr.forEach(file => {
                    if (!fileCountFull.value) {
                        fileItemList.value.push({
                            status: "ready",
                            url: null,
                            name: file.name,
                            file: file
                        });
                    }
                });
            }

            // 单文件占用整个列表
            else {
                const item = fileItemList.value[0];
                item.status = "ready";
                item.name = filesArr[0].name;
                item.file = filesArr[0];
            }

            for (let i = 0; i < fileItemList.value.length; i++) {

                /**@type {FileListItem} */
                const fileItem = fileItemList.value[i];
                const file = fileItem.file;

                // 只有ready状态的才能执行上传
                if(fileItem.status=="ready"){
                    fileItem.status = "uploading"
                }else{
                    continue;
                }
                if(file.size < maxFileSize.value){
                    const data = new FormData();
                    data.append(props.fileField, file);
                    try {
                        if (!props.requestFunc) {
                            throw new Error("未设置props.requestFunc");
                        }

                        // 单个上传方式
                        if (!props.batUploadFunc) {
                            const resp = await props.requestFunc(data, file, props);
                            fileItem.status = "uploaded"
                            fileItem.url = resp.url;
                        }
                    } catch (e) {
                        props.errorFunc(e)
                        console.error("文件上传失败", e);
                        fileItem.status = "error";
                        fileItem.message = "文件上传失败:" + getErrorString(e);
                        continue;
                    }
                }else{
                    const errMessage = `文件"${file.name}"大小超过"${props.maxFileSize}"的限制`;
                    fileItem.status = "error"
                    fileItem.message = errMessage;
                    loading.value = false;
                    if (!props.multiple) {
                        props.errorFunc(errMessage)
                        return;
                    }
                }
            }

            // 批量上传方式
            if (props.batUploadFunc) {

                // 过滤掉错误的文件
                const validFileItemList = fileItemList.value.filter(item=>item.status!="error");

                /**@type {BatUploadResp[]} */
                const respList = await props.batUploadFunc(validFileItemList, props);
                if (respList) {
                    respList.forEach((resp, i)=>{
                        const fileItem = validFileItemList[i];
                        if(resp.error){
                            fileItem.status = "error";
                            fileItem.message = "文件上传失败:" + getErrorString(resp.error);
                        }else{
                            fileItem.status = "uploaded"
                            fileItem.url = resp.url;
                        }
                    })
                }
            }

            // 整理input事件的数据
            const resultUrlArray = fileItemList.value.filter(item=>item.status=="uploaded").map(item=>item.url);
            if(props.multiple){
                let result = resultUrlArray;
                if(isStringMultipleMode.value){
                    result = resultUrlArray.join(",");
                }
                ctx.emit("input", result);
            }else{
                ctx.emit("input", resultUrlArray[0])
            }

            loading.value = false;
        };

        const loading = ref(false);
        watch(() => props.loading, () => loading.value = props.loading)
        watch(loading, () => ctx.emit("update:loading", loading.value));
        const inputIf = ref(true);

        // 文件数量prop转数字
        const maxFileSize = computed(() => {
            let size = props.maxFileSize;
            if(typeof size == "number"){
                return size;
            }else if (typeof size == "string") {
                size = size.toLowerCase();
                const unit = size[size.length - 1];
                const num = parseInt(size.slice(0, size.length - 1));
                if (unit == "k") {
                    return num * 1024;
                } else if (unit == "m") {
                    return num * 1024 * 1024;
                } else if (unit == "g") {
                    return num * 1024 * 1024 * 1024;
                } else {
                    return num;
                }
            }
        });

        /**
         * 管理上传信息的列表
         * @type {VueRef<FileListItem[]>>}
         */
        const fileItemList = ref([])

        const blankItem = {status: "blank", url: null, name: null, file: null, message:""}

        // 文件使用逗号分割的字符串模型
        const isStringMultipleMode = computed(()=>{
            return props.multiple && typeof props.value == "string";
        })

        // 回填value
        watch(() => props.value, (urlList) => {
            // 记录错误的文件
            const errorList = fileItemList.value.filter(item => item.status == "error");

            fileItemList.value = [];

            if (props.multiple) {
                if (!urlList) {
                    urlList = [];
                }else if (typeof urlList == "string") {
                    urlList = urlList.split(",");
                }
                urlList.forEach(url => {
                    fileItemList.value.push({
                        url,
                        name: url.split("/").pop(),
                        status: "uploaded",
                        file: null,
                    })
                });
                fileItemList.value.push(...errorList);
            }else{
                if(typeof props.value != "string"){
                    throw new Error("单文件上传props.multiple=false，value必须是字符串")
                }
                const blankItemClone = {...blankItem};
                blankItemClone.url = urlList;
                blankItemClone.status = "uploaded";
                fileItemList.value.push(blankItem);
            }
        }, {immediate: true});

        const fileItemListClone = computed(() => {
            if (props.multiple) {
                if(fileCountFull.value) {
                    return fileItemList.value;
                }else{
                    return [...fileItemList.value, blankItem,];
                }
            }else{
                return fileItemList.value;
            }
        })

        // 删除已经上传的
        const handlerItemDelete = (item)=>{
            const index = fileItemList.value.indexOf(item);

            //todo: 可以实现网络删除
            if(index > -1){
                fileItemList.value.splice(index, 1);
            }
        }

        const clearFiles = async () => {
            const list = [...fileItemList.value];
            for (let i = 0; i <list.length; i++) {
                const item = list[i]
                await handlerItemDelete(item)
            }
        }

        const visibleFunc = reactive({
            delete(item){
                if (props.multiple) {
                    return 'error,uploaded'.includes(item.status);
                }else{
                    return false;
                }
            },

            upload(item){
                if (props.multiple) {
                    return item.status == "blank";
                }else{
                    return true;
                }

            }
        })

        // 文件已经满员
        const fileCountFull = computed(() => {
            return fileItemList.value.length >= props.maxFileCount;
        })

        const textEditing = ref(false);

        const handlerTextCilick = (item)=>{
            const index = fileItemList.value.indexOf(item);
            if (index == 0) {
                textEditing.value = true;
            }
        }

        return {
            textEditing,
            handlerTextCilick,
            isStringMultipleMode,
            fileCountFull,
            visibleFunc,
            handlerItemDelete,
            fileItemListClone,
            fileItemList,
            inputIf,
            loading,
            handlerPickFile,
            clearFiles,
        }
    }
})</script>
<style lang="less">
.AUploader{
    .btn{
        display: inline-block;
        margin-bottom: 0;
        font-weight: normal;
        text-align: center;
        vertical-align: middle;
        touch-action: manipulation;
        cursor: pointer;
        background-image: none;
        border: 1px solid transparent;
        white-space: nowrap;
        line-height: 1.5;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
        height: 32px;
        padding: 0 15px;
        font-size: 14px;
        border-radius: 4px;

        background-color: #1890ff;
        color: #fff;
        &:hover {
            opacity: 0.9;
        }
    }

    .uploadItem{
        display: flex;
        position: relative;
        .ivu-input{
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            flex: 1;
        }
        .btn{
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            position: relative;
            overflow: hidden;
            input{
                position: absolute;
                z-index: 10;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                opacity: 0.001;
            }
        }
        .loading-layer{
            position: absolute;
            background: #ffffffc0;
            z-index: 10;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

        }
    }

    .url-input,.status-message{
        flex: 1;
        height: 32px;
        line-height: 1.5;
        padding: 4px 7px;
        font-size: 14px;
        border: 1px solid #dcdee2;
        border-radius: 4px;
        color: #515a6e;
        background-color: #fff;
        background-image: none;
        position: relative;
        cursor: text;
        outline: none;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        overflow: hidden;
        text-overflow-ellipsis: ellipsis;
    }
    .url-input{

    }
    .status-message{
        background-color: #e0e0e0;
        color: #ffffff;
    }
}
</style>
