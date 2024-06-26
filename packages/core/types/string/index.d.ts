/**
 * 使用字符串或者布尔的第一个字母大写,
 * @param first string,0,bool
 * @returns {string}
 */
export declare function firstLetterUppercase(string: any): string;
/**
 * 产生一个不重复的字符串
 * @returns {string}
 */
export declare const randomString: () => string;
/**
 * 从不可读转为中文
 * @param str 可以传入 %aa%af, ["aa", "af"], "aa,af"三种类型的字符串
 * @returns {undefined}
 */
export declare function decodeGBK(hexInfo: string | string[]): string;
/**
 * 通hex数组转换为可读中文字符串
 * @returns {*}
 */
export declare function fromGBKArrayToString(array: string[] | number[]): string;
/**
 * 从每一项都是二进制数字的数组读取字符串
 * @param array 数组，每一项为1字节(Byte)信息(正好可以用两个16进制数字表示)
 * @param encodingType 编码方式 默认 uft-8,也可以是gbk等，参考 @link:https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder/TextDecoder
 * @param base 如果数组的每一项为字符串，在转换数字时，所认为的进制
 */
export declare function byteArrayToString(array: Array<any>, encodingType?: string, base?: number): string;
/**
 * 文本转GBK的十六进制数组
 *  可读到不可读
 * @param string
 * @param outtype stinrg|array
 */
export declare function encodeStringToGBK(cnString: string, outtype?: string): any;
/**
 * 计算字符串个数,ascii长度1,unicode 2
 * @param string
 * @return {number}
 */
export declare function getByteLength(string: string): number;
export declare const safeStringify: (input: any, backupValue?: string) => string;
/**
 * 驼峰转中划线 例如：helloWorld => hello-world
 * @param str
 */
export declare const camel2dash: (str: string) => string;
/**
 * 中划线转驼峰 例如：hello-world => helloWorld
 * @param str
 */
export declare const dash2camel: (str: string) => string;
export declare const simpleEncryptString: (str: string) => string;
export declare const simpleDecryptString: (str: string) => string;
/**
 * 截取html字符串，保留长度
 * @param html
 * @param num
 */
export declare function truncateHTML(html: string, num: number, endfix?: string): any;
/**
 * 截取字符串并添加省略号。
 *
 * 此函数用于将给定的字符串截断到指定的长度，并在末尾添加省略号，以确保字符串的总长度不超过指定的长度。
 * 特别地，该函数考虑了中文字符的长度，每个中文字符计为2个字符长度。
 *
 * @param text 要截断的原始字符串。
 * @param length 指定的字符串长度限制。
 * @param endfix 可选参数，指定要添加的省略号字符串，默认为"..."。
 * @returns 返回截断后的字符串，如果原始字符串长度不超过指定长度，则返回原始字符串。
 */
export declare function stripString(text: string, lagnth: number, endfix?: string): string;
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
export declare function getURLDirname(url: any): string;
