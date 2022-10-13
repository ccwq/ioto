const textLength = (text:string):number => {
    return text.replace(/[^\x00-\xff]/g, "**").length
}

interface IColumnConfig {
    [key:string]: any
}

interface IRenderParam {
    row:IRow
    index:number
    column:IColumnConfig
}

interface IRow {
    [key:string]: number|string|boolean|Date|Array<any>|{}
}

type IColumnRender = (h: Function, param:IRenderParam) => any;


type IStep = (preConfig:IColumnConfig, rawString:string)=>IColumnConfig;

const columnParseFactory = (
    customConfig:IColumnConfig,
    columnRenderConf: {[key:string]: IColumnRender},
)=>{
    return (columnsString: string, step: IStep) => {
        const ret = columnsString.trim()
            .split('\n')
            .map(rowString => {
                const rs = rowString.trim();
                if (rs.startsWith("//")) {
                    return ""
                } else {
                    return rs;
                }
            })
            // 支持注释
            .filter(row => !!row)
            .map(rowString => {
                const [key, title, ...addRests] = rowString.split(/\s+/);
                const minWidth = textLength(title) * 7 + 45;
                const col:IColumnConfig = {
                    minWidth,
                    key,
                    title,

                    // 表示是否在表格中显示,默认false,在模板中使用 hide和show来设置值
                    visible: false,

                    // 标识是否参与合计运算, 使用__sum__ 来标识
                    sum: false,
                }
                addRests.forEach(word => {

                    // 对其方式
                    if (["center", "left"].includes(word)) {
                        col.align = word;

                        // 宽度
                    } else if (/^(\+|\-)?(\d+)$/.test(word)) {
                        const p1 = RegExp.$1;
                        const p2 = parseInt(RegExp.$2);
                        if (p1 === "+") {
                            col.maxWidth = p2
                        } else if (p1 === "-") {
                            col.minWidth = p2
                        } else {
                            col.width = p2
                        }

                        // 显示或者隐藏
                    } else if (["show", "hide"].includes(word)) {
                        col.visible = word == "show";

                    } else if (word === "__sum__") {
                        col.sum = true;

                        // 处理slot
                        // #foo 标识flot设置为foo,如果只有#,标识slot和key相同
                    } else if (word.startsWith("#")) {
                        if (word == "#") {
                            col.slot = col.key;
                        } else {
                            col.slot = word.substring(1);
                        }

                        // 自定义render
                    } else {
                        const render = columnRenderConf[word];
                        if (render) {
                            col.render = render;
                        }else{
                            console.warn('未定义的render:', word);
                        }
                    }
                })

                // 合并自定义配置
                const customCfg = customConfig[key];
                if(customCfg){
                    Object.assign(col, customCfg);
                }

                col.getValue = function (row:IRow) {
                    if (!col.render) {
                        return row[col.key]
                    } else {
                        return col.render(null, {row, column: col}, true);
                    }
                };

                if (step) {
                    return step(col, rowString);
                }else{
                    return col;
                }
            })
        return ret;
    };
}

export {
    columnParseFactory,
}
