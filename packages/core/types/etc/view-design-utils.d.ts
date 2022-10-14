interface IColumnConfig {
    [key: string]: any;
}
interface IRenderParam {
    row: IRow;
    index: number;
    column: IColumnConfig;
}
interface IRow {
    [key: string]: number | string | boolean | Date | Array<any> | {};
}
declare type IColumnRender = (h: Function, param: IRenderParam) => any;
declare type IStep = (preConfig: IColumnConfig, rawString: string) => IColumnConfig;
declare const columnParseFactory: (customConfig: IColumnConfig, columnRenderConf: {
    [key: string]: IColumnRender;
}) => (columnsString: string, step: IStep) => IColumnConfig[];
export { columnParseFactory, };
