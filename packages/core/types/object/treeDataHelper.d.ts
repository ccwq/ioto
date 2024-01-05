declare type KeyID = string | number;
interface INode {
    [key: string]: any;
}
declare type INodeList = INode[];
interface INodeDic {
    [key: KeyID]: INode;
}
declare type IInputData = INodeList | INode;
interface Options {
    childrenKey?: string;
    checkedKey?: string;
    idKey?: KeyID;
}
interface ITravelCallback {
    (node: INode): void;
}
interface ITravelAllCallback {
    (node: INode, oNode: INode | null): void | false;
}
interface IFilterFunction {
    (el: INode, index?: number, array?: any[]): boolean;
}
interface ITravelTreeCallback {
    (node: INode, parentNode: INodeList, childKey: string, idKey: KeyID): boolean;
}
/**
 * 为树形数据建立索引,已便于向上查找父节点
 * @param treeData
 * @param options
 * @returns {{}}
 */
declare const makeTreeDataHelper: (treeData: IInputData, options?: Options) => {
    travelNode: (id: KeyID | INode, callback: ITravelCallback) => void;
    getNodeList: (isMirror?: boolean) => INode[];
    getNodeDescendantList: (id: KeyID | INode) => INode[];
    getNodeListByFilter: (filter: IFilterFunction) => INode[];
    getMinDeepth: () => number;
    getSublings: (id: KeyID) => INode[];
    getParents: (id: KeyID) => any;
    getDeepth: (id: KeyID | INode) => any;
    getNode: (id: KeyID | INode) => INode | null;
    updateIndexes: (treeData: IInputData) => void;
    setChecked: (id: KeyID, checked: boolean, updateParentAndChildren?: boolean) => void;
    setProps: (id: KeyID | INode, props: {}) => void;
    travelAllNode: (callback: ITravelAllCallback) => void;
    setOptions: (options?: Options) => void;
    resetCheckStatus: (checkedKeyList: KeyID[]) => void;
    getOriginNode: (id: KeyID | INode) => INode | null;
};
/**
 * makeTreeDataHelper在处理重复数据包含重复id数据会有问题
 * 此时可以使用travelTree对数据进行预处理
 * @param treeData 树数据
 * @param callback:(node, parentNodes)=>boolean boolean为false时停止遍历
 * @param childKey 子节点的key
 * @param idKey 节点id的key
 * @param parents 当前节点的父节点 不要赋值
 * @param breakFlag
 */
declare const travelTree: (treeData: IInputData, callback: ITravelTreeCallback, childKey?: string, idKey?: string, parents?: INodeList, breakFlag?: {
    flag: boolean;
}) => any;
export { travelTree, makeTreeDataHelper };
export type { INode, INodeList, INodeDic, IInputData, ITravelCallback, ITravelAllCallback, ITravelTreeCallback, IFilterFunction, };
