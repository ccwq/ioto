import path from "path";
import {readFile, existsSync} from "fs";
import {app, protocol} from "electron";
import type {BrowserWindow, Protocol} from "electron";

/**
 * 创建一个自定义协议
 * @param rootDir {string} ["dist"] - 协议的根目录
 * @param scheme {string} ["app"] - 协议名称
 * @param customProtocol {Protocol} [protocol] - 协议对象
 */
export const createProtocol = (rootDir = 'dist', scheme = 'app', customProtocol?:Protocol) => {
    app.whenReady().then(() => {
        const _protocol = customProtocol || protocol
        _protocol.registerBufferProtocol(scheme, (request, respond) => {
            let pathName = request.url.slice(scheme.length + 3)
            pathName = decodeURI(pathName) // Needed in case URL contains spaces
            pathName = pathName.replace(fakeHost, "");
            const cwd = process.cwd()
            let overlayerFilePath;
            if (existsSync(path.join(cwd, pathName))) {
                overlayerFilePath = path.join(cwd, pathName);
                console.log("hit-exclude-file:", pathName);
            }

            //
            const asarPath = path.join(cwd, 'resources', 'app.asar')
            const filePath = path.join(asarPath, rootDir, pathName)

            // 移除模拟的域名
            console.log("filePath:", filePath, "fp");
            readFile(overlayerFilePath || filePath, (error, data) => {
                if (error) {
                    console.error(`Failed to read ${pathName} on ${scheme} protocol`, error)
                }
                const extension = path.extname(pathName).toLowerCase()
                let mimeType = ''

                if (extension === '.js') {
                    mimeType = 'text/javascript'
                } else if (extension === '.html') {
                    mimeType = 'text/html'
                } else if (extension === '.css') {
                    mimeType = 'text/css'
                } else if (extension === '.svg' || extension === '.svgz') {
                    mimeType = 'image/svg+xml'
                } else if (extension === '.json') {
                    mimeType = 'application/json'
                } else if (extension === '.wasm') {
                    mimeType = 'application/wasm'
                }
                respond({mimeType, data})
            })
        })
    });
    const _protocol = customProtocol || protocol
    _protocol.registerSchemesAsPrivileged([
        {scheme, privileges: {standard: true, supportFetchAPI: true, secure: true}},
    ])

    /**
     * 模拟的域名, 比如trgis.map
     */
    let fakeHost:string

    /**
     * 开始加载
     * @param window 要加载的窗口
     * @param filePath 文件的路径 "路径要相对于rootDir"
     * @param _fakeHost 为协议后面增加由一个虚拟的域名,模拟带host的http请求环境
     */
    const loadByProtocol = (window:BrowserWindow, filePath:string, _fakeHost=".")=>{
        fakeHost = _fakeHost
        window.loadURL(`${scheme}://${fakeHost}/${filePath}`);
    }

    return {
        loadByProtocol,
    }
}
