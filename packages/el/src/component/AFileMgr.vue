<template lang="pug">
.AFileMgr(:class="{singleFile}" v-loading="isLoading")

    //- 单文件模式的预览
    .file-thumb(v-if="singleFile")
        template(v-if="!modelValue?.filePath")
        .file-thumb-image(v-else-if="isImage(modelValue)")

            // 图片预览
            img(:src="modelValue.filePath" alt="图片预览")
        .file-thumb-file(v-else)
            span(:href="modelValue.url") {{modelValue.fileName}}

    //- 上传控件
    index-upload(
        v-if="!readonly"
        :headers="headers"
        :action="actions.file"
        :limit="10"
        :on-exceed="handleExceed"
        v-bind="uploaderVBind"
    )
        template(v-if="props.singleFile")
            .flex.ai-center(v-if="!props.modelValue")
                <index-icon size="24px" color="#b8b8b8" class="index-icon--upload"><elementUploadFilled /></index-icon>
                p.cl-grey600.pl025 点击上传文件
            AButton.lite(v-else).no-ml 重选文件
        a-button.lite( v-else type="primary") {{label}}

    //- 文件列表
    ul.file-list(v-if="!singleFile")
        li.file-list-item(v-for="(attach, index) in modelValue")
            ElIcon.mr05(color="#00dd00"): elementSelect
            span.item-name(:href="attach.url") {{attach.fileName}}
            a-button.lite.ml-auto-i(
                type="default" @click="handlerDownload(attach)"
            ) {{PreviewableFileType.includes(attach.fileType)?"预览":"下载"}}
            a-button.lite.item-delete(
                type="danger" @click="handleRemove(attach)" v-if="!readonly"
            ) 删除
</template>
<script lang="ts" setup>
import {computed, reactive, ref, watch} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {type UploadUserFile, type UploadProps, type UploadRawFile} from "element-plus"
import {baseURL} from "/@/utils/request";
import {Session} from "/@/utils/storage";
import {globalConfirm} from "/@/utils/element-setup";
import {AButton} from "/@/components/common/index";
import {safeJsonParser} from "@ioto/core";

type FileType = "image"|"file"|"all"


interface IAttachment {
    attachSize?:number	//附件大小
    fileName:string	//附件名
    filePath:string	//附件路径
    fileType:string	//附件类型
    id:string	//id
    uploadDate?:string	//上传时间
    uploadPath?:string	//上传路径
}

const props = withDefaults(defineProps<{
    label?:string

    // singleFile为true,为单个文件,false为文件列表
    modelValue: IAttachment[] | IAttachment | null
    readonly ?:boolean
    singleFile?:boolean
    fileType?:FileType|FileType[]
}>(), {
    readonly:false,
    label:"选择文件",
    // modelValue: () => [] as IAttachment[],
    singleFile:false,
    fileType:"all"
});


const modelValue = computed(()=>{
    const list = props.modelValue

    // 单个文件
    if (props.singleFile) {
        if (Array.isArray(list)) {
            throw new Error("singleFile为true时, modelValue只能为单个文件")
        }
        return props.modelValue;
    }

    // 文件列表
    else{
        if (!Array.isArray(list)) {
            throw new Error("singleFile为false时, modelValue只能为文件列表")
        }
        return list || [];
    }
})


const emits = defineEmits<{

    // singleFile为true,为单个文件,false为文件列表
    (e: 'update:modelValue', value: IAttachment[]|IAttachment|null): void;
}>();

const getAccept = (fileType:FileType|FileType[])=>{
    if(fileType === "all") return "*"
    if(fileType === "image") return "image/*"
    if(fileType === "file") return ".doc,.docx,.xls,.xlsx,.ppt,.pptx,.pdf,.txt,.zip,.rar,.7z"
    if(Array.isArray(fileType)){
        return fileType.map(getAccept).join(",")
    }
    return "*"
}
const fileAccept = computed(()=>getAccept(props.fileType))
const PreviewableFileType = ["pdf", "png", "jpg", "jpeg", "gif"];
const headers = {
    ['Authorization']: `${Session.get('token')}`
};

// 接口地址
const actions = {
    "image": baseURL + "/file/image/upload",
    "file": baseURL + "/file/upload",
    "ossImage": baseURL + "/file/oss/image/policy",
    "ossFile": baseURL + "/file/oss/file/policy",
};

const isLoading = ref(false);

const uploaderVBind = reactive({
    "accept": fileAccept,
    "show-file-list":false,
    "before-upload"(rawFile: UploadRawFile) {
        isLoading.value = true;
    },
    "on-success": (response: any, file: any, fileList: any) => {
        const attach: IAttachment = response?.data;
        isLoading.value = false;
        if (!attach) {
            console.error("上传失败");
            return;
        }
        if(props.singleFile){
            emits("update:modelValue", attach)
        }else{
            const list = modelValue.value as IAttachment[]
            emits('update:modelValue', [...list, attach]);
        }
    },
    "on-error"(error: any, file: any, fileList: any) {
        const resp = safeJsonParser(error.message);
        isLoading.value = false;
        const message = resp?.message
        if (message) {
            ElMessage.error(message);
        } else {
            ElMessage.error("上传失败");
        }
    },
})

// 超过预设数量
const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
    ElMessage.warning(
        `The limit is 3, you selected ${files.length} files this time, add up to ${
            files.length + uploadFiles.length
        } totally`
    )
}

// 删除
const handleRemove = async (attach: IAttachment) => {
    const fileId = attach.id;
    if (!await globalConfirm("确定删除附件吗？")) {
        return false;
    }

    if (!props.singleFile) {
        const list = modelValue.value as IAttachment[]
        emits('update:modelValue', list.filter((item) => item.id !== fileId));
    }else{
        emits("update:modelValue", null)
    }
    return true;
}

// 下载和预览
const handlerDownload = (file: IAttachment) => {
    const url = file.filePath;

    if(PreviewableFileType.includes(file.fileType)) {
        window.open(url);
    } else {
        const a = document.createElement('a');
        a.href = url;
        a.download = file.fileName;
        a.click();
    }
}


const isImage = (file: IAttachment) => {
    const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
    const fileType = file.fileType;
    if (fileType) {
        return imageExts.includes(fileType.toLowerCase());
    }

    const filePath = file.filePath;
    if (filePath) {
        const ext = filePath.split('.').pop();
        return imageExts.includes(ext?.toLowerCase() || '');
    }

    const fileName = file.fileName;
    if (fileName) {
        const ext = fileName.split('.').pop();
        return imageExts.includes(ext?.toLowerCase() || '');
    }
}

</script>
<style scoped lang="less">
@import "src/theme/mixin.less";
.AFileMgr{
    .file-list{
        cursor: default;
        color: #666666;

        max-height: 150px;
        overflow-y: auto;
        padding-right: 0.5em;
    }
    .file-list-item{
        line-height: 0.9em;
        display: flex;
        padding: 0.25em 0;
        align-items: center;
        border-bottom: 1px solid #e0e0e0;
        &:last-child{
            border-bottom: none;
        }
    }
    .item-delete{
    }

    &.singleFile{
        display: flex;
        align-items: center;
    }

    .file-thumb{}
    .file-thumb-item{

    }
    .file-thumb-image{
        margin-right: 2em;
        width: 100px;
        max-height: 100px;
        img{
            max-width: 100%;
        }
    }
    .file-thumb-file{
        margin-right: 2em;
    }
}
</style>
