import {isPlainObject} from "../object";

const randomDic = new Map<string, boolean>();
import $GBK from "../base/$GBK";

/**
 * 使用字符串或者布尔的第一个字母大写,
 * @param first string,0,bool
 * @returns {string}
 */
export function firstLetterUppercase(string: any) {

    if (string === 0) {
        return "0"
    }

    if (string === false) {
        return "False";
    }


    if (!string) {
        return "";
    }

    if (typeof string != "string") {
        throw new Error("无效输入")
    }

    let [first, ...rest] = string;
    return first.toUpperCase() + rest.join('');
}


/**
 * 字数限制
 * @param string
 * @param length
 * @returns {string|*}
 */
export function stripString(string: string, length: number) {
    if (!string || !length) {
        return '';
    }
    // 预期计数：中文2字节，英文1字节
    var a = 0;
    // 循环计数
    var i = 0;
    // 临时字串
    var temp = '';
    for (i = 0; i < string.length; i++) {
        if (string.charCodeAt(i) > 255) {
            // 按照预期计数增加2
            a += 2;
        } else {
            a++;
        }
        // 如果增加计数后长度大于限定长度，就直接返回临时字符串
        if (a > length) {
            return temp;

        }
        // 将当前内容加到临时字符串
        temp += string.charAt(i);
    }
    // 如果全部是单字节字符，就直接返回源字符串
    return string;
}


/**
 * 产生一个不重复的字符串
 * @returns {string}
 */
export const randomString: () => string = () => {
    let ret: string = Math.random().toString(32).substr(2);

    // 重复了就重新获取
    if (randomDic.get(ret)) {
        return randomString();
    } else {
        randomDic.set(ret, true);
        return ret;
    }
}


/**
 * 从不可读转为中文
 * @param str 可以传入 %aa%af, ["aa", "af"], "aa,af"三种类型的字符串
 * @returns {undefined}
 */
export function decodeGBK(hexInfo: string | string[]) {
    return $GBK.decode(hexInfo);
}


/**
 * 通hex数组转换为可读中文字符串
 * @returns {*}
 */
export function fromGBKArrayToString(array: string[] | number[]) {
    return $GBK.decode(array);
}

/**
 * 从每一项都是二进制数字的数组读取字符串
 * @param array 数组，每一项为1字节(Byte)信息(正好可以用两个16进制数字表示)
 * @param encodingType 编码方式 默认 uft-8,也可以是gbk等，参考 @link:https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder/TextDecoder
 * @param base 如果数组的每一项为字符串，在转换数字时，所认为的进制
 */
export function byteArrayToString(array: Array<any>, encodingType = "utf-8", base = 16) {
    if (encodingType.toLowerCase() == "gbk" && base == 16) {
        return decodeGBK(array);
    }

    return new TextDecoder(encodingType)
        .decode(
            new Uint8Array(
                array.map(n => {
                    if (Number.isFinite(n)) {
                        return n
                    } else {
                        return parseInt(n, base)
                    }
                })
            )
        )
        ;
}


/**
 * 文本转GBK的十六进制数组
 *  可读到不可读
 * @param string
 * @param outtype stinrg|array
 */
export function encodeStringToGBK(cnString: string, outtype = "string") {
    if (outtype == "string") {
        return $GBK.encode(cnString);
    } else {
        return $GBK.encode(cnString).split("%").splice(1);
    }
}


/**
 * 计算字符串个数,ascii长度1,unicode 2
 * @param string
 * @return {number}
 */
export function getByteLength(string: string) {
    var sum = 0;
    for (var i = 0; i < string.length; i++) {
        var c = string.charCodeAt(i);
        if (
            (c >= 0x0001 && c <= 0x007e)
            || (0xff60 <= c && c <= 0xff9f)
        ) {
            sum++;
        } else {
            sum += 2;
        }
    }
    return sum;
}

export const safeStringify = (input: any, backupValue = "") => {

    // 对象
    if (isPlainObject(input)) {
        return JSON.stringify(input)
    }

    // 数组
    else if(Array.isArray(input)){
        return JSON.stringify(input)
    }

    // 字符串
    else if (typeof input == "string") {
        return input
    }

    // 其他
    else {
        console.warn("safeStringify error(暂不支持的数据类型)", input);
        return backupValue
    }
}

/**
 * 驼峰转中划线 例如：helloWorld => hello-world
 * @param str
 */
export const camel2dash = (str: string) => {
    return str.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`);
}

if (import.meta.vitest) {
    const { it, expect, describe } = import.meta.vitest

    it('aaaaa', () => {
        expect(camel2dash("fooBar")).toBe("foo-bar")
        // expect(add(1)).toBe(1)
        // expect(add(1, 2, 3)).toBe(6)
    })
}


/**
 * 中划线转驼峰 例如：hello-world => helloWorld
 * @param str
 */
export const dash2camel = (str: string) => {
    return str.replace(/-([a-z])/g, g => g[1].toUpperCase());
};



// 加单的加密
export const simpleEncryptString = (str:string)=>{
    return str.split("").map(c=>c.charCodeAt(0).toString(13)).join("")
}


// 解密
export const simpleDecryptString = (str:string)=>{
    return str.split("").map(c=>String.fromCharCode(parseInt(c, 13))).join("")
}





/**
 * 截取html字符串，保留长度
 * @param html
 * @param num
 */
export function truncateHTML(html:string, num:number, endfix="...") {
    // 创建一个 div 元素，用于解析和过滤 HTML
    var div = document.createElement('div');
    div.innerHTML = html;

    // 过滤 HTML 内容，确保安全性
    var filteredHTML = sanitizeHTML(div);

    // 获取解析后的文本内容
    var text = filteredHTML.textContent ||
        //@ts-ignore
        filteredHTML.innerText ||
        ''
    ;


    // 遍历文本，计算字符长度
    var truncatedText = '';
    var length = 0;
    for (var i = 0; i < text.length; i++) {
        var char = text[i];
        // 判断字符是否为中文
        if (/[\u4e00-\u9fa5]/.test(char)) {
            length += 2;
        } else {
            length += 1;
        }
        // 如果字符长度超过限制，则停止遍历
        if (length > num * 2) {
            break;
        }
        truncatedText += char;
    }

    // 如果文本长度超过限制，则添加省略号
    if (text.length <= truncatedText.length) {
        return text;
    }else{
        return truncatedText + endfix;
    }
}

// XSS 过滤函数
function sanitizeHTML(htmlNode:Element){
    var newNode = htmlNode.cloneNode(true);

    //@ts-ignore
    var scripts = newNode.getElementsByTagName('script');
    var i = scripts.length;
    while (i--) {
        scripts[i].parentNode.removeChild(scripts[i]);
    }
    return newNode;
}


// 截取文本
function truncateTEXT(text:string, lagnth:number, endfix="..."){
    // 遍历文本，计算字符长度
    var truncatedText = '';
    var length = 0;
    for (var i = 0; i < text.length; i++) {
        var char = text[i];
        // 判断字符是否为中文
        if (/[\u4e00-\u9fa5]/.test(char)) {
            length += 2;
        } else {
            length += 1;
        }
        // 如果字符长度超过限制，则停止遍历
        if (length > lagnth * 2) {
            break;
        }
        truncatedText += char;
    }

    // 如果文本长度超过限制，则添加省略号
    if (text.length <= truncatedText.length) {
        return text;
    }else{
        return truncatedText + endfix;
    }
}


/**
 * 获取 URL 的 dirname。
 * @description 获取 URL 的 dirname
 * @param {string} url URL 字符串
 * @returns {string} dirname
 * 用例:
 *     https://vscode.dev/, https://vscode.dev
 *     https://vscode.dev/a.html, https://vscode.dev
 *     https://vscode.dev/a.html/#, https://vscode.dev
 *     https://vscode.dev/a.html#, https://vscode.dev
 *     https://vscode.dev/foo/a.html, https://vscode.dev/foo
 *     https://vscode.dev/foo/a.html/#, https://vscode.dev/foo
 */
export function getURLDirname(url) {
    let rawUrl = url.split(/#|\?/)[0]
    const array = rawUrl.split("/")
    let uhost, upathArray
    // 包含host
    if(array[1]===""){
        uhost = array.slice(0,3).join("/")
        upathArray = array.slice(3)
    }else{
        uhost=""
        upathArray = array
    }
    let lastItem = upathArray[upathArray.length-1]

    let upathStr
    // 最后一个字符是/表示可能是目录,除非名称包含扩展名
    if(lastItem===""){
        upathArray = upathArray.slice(0,-1)
        if(upathArray.length){
            lastItem = upathArray[upathArray.length-1]
        }

        // 目录是根
        if(!lastItem){
            upathStr=""
        }

        // 目录名包含.
        else if(lastItem.includes(".")){
            upathStr=upathArray.slice(0,-1).join("/")
        }

        // 常规目录
        else{
            upathStr=upathArray.join("/")
        }
    }
    // 是文件
    else {
        upathStr = upathArray.slice(0,-1).join("/")
    }

    // 删除第一个/
    upathStr = upathStr.replace(/^\//, "");

    // 合并
    return [uhost, upathStr].join("/").replace(/\/$/, "")
}
