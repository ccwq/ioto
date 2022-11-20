import {ElMessageBox} from "element-plus";
import type {ElMessageBoxOptions} from "element-plus/es/components/message-box/src/message-box.type";
export const globalConfirm = (
    message:string,
    type:ElMessageBoxOptions["type"] = "warning",
    options?:ElMessageBoxOptions
) => {
    const defaultOptions = {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
    }
    return ElMessageBox.confirm(message, options?.title || "提示", {
        ...defaultOptions,
        ...options||{},
    })
        .then(() => true)
        .catch(() => false)
        ;
}
