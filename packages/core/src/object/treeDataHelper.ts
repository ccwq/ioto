type KeyID = string|number;
interface INode {
    [key: string]: any;
}
type INodeList = INode[];
interface INodeDic {[key:KeyID]:INode}
type IInputData = INodeList|INode;

interface Options {
    childrenKey?:string
    checkedKey?:string
    idKey?:KeyID
}

interface ITravelCallback {
    (node:INode):void
}

interface ITravelAllCallback {
    (node: INode, oNode: INode | null): void | false
}


interface IFilterFunction {
    (el:INode, index?:number, array?:any[]):boolean
}

interface ITravelTreeCallback {
    (node: INode, parentNode: INodeList, childKey:string, idKey: KeyID): boolean
}


/**
 * 为树形数据建立索引,已便于向上查找父节点
 * @param treeData
 * @param options
 * @returns {{}}
 */
const makeTreeDataHelper = function(treeData:IInputData, options:Options = {}) {

    // 原始节点的字典
    let originNodeIndexes:INodeDic = {};

    // 原始节点列表
    let allOriginNodes:INodeList = [];

    // 镜像节点镜像列表
    let allMirrorNodes:INodeList = [];

    let mirrorNodeIndexes:INodeDic = {};

    // 重置缓存数据 originNodeIndexes allOriginNodes allMirrorNodes mirrorNodeIndexes
    const resetConstData = function(){
        originNodeIndexes = {};
        allOriginNodes = [];
        allMirrorNodes=[];
        mirrorNodeIndexes=  {};
    }
    resetConstData();

    let {
        childrenKey = "children",
        checkedKey = "checked",
        idKey = "id",
    } = options;
    let index = 0

    // 所有存在的节点中最大的深度
    let maxDepth = 0

    // 修改options
    const setOptions = function (options:Options = {}) {
        childrenKey = options.childrenKey || childrenKey
        checkedKey = options.checkedKey || checkedKey
        idKey = options.idKey || idKey
    };

    const traverse = function(data:INodeList, parent?:INode) {
        data.forEach(function(item) {
            const id:KeyID = item[idKey]
            originNodeIndexes[id] = item;
            item = {...item};
            allMirrorNodes.push(item);
            item.parent = parent
            item.index = index++
            const deepth = parent ? parent.deepth + 1 : 0;
            item.deepth = deepth;
            maxDepth = Math.max(maxDepth, deepth)
            item.path = parent ? parent.path + '.' + item[idKey] : '0'
            item.parentIdList = parent ? [...parent.parentIdList, parent[idKey]] : [];
            mirrorNodeIndexes[id] = item
            if (item[childrenKey] && item[childrenKey].length > 0) {
                traverse(item[childrenKey], item)
            }
        })
    };

    const isNodeCheckedByChildren = function(node:INode) {
        if (node[childrenKey] && node[childrenKey].length > 0) {
            const hasUnchecked = node[childrenKey]
                .map((node:INode) => getNode(node[idKey]))
                .find((node:INode) => !node[checkedKey])
            ;
            return !hasUnchecked;
        } else {
            return false
        }
    }

    // 更新索引
    const updateIndexes = function(treeData:IInputData) {

        resetConstData();

        // 如果是数组,设置虚拟根节点
        if (!Array.isArray(treeData)) {
        }else{
            traverse(treeData)
        }
    };
    updateIndexes(treeData)

    // 获取父节点列表
    const getParents = function(id:KeyID) {
        return getNode(id)?.parentIdList.map((id:KeyID) => getNode(id));
    }

    // 获取同级节点
    const getSublings = function(id:KeyID) {
        const node = getNode(id)
        return allMirrorNodes.filter(function(item) {
            return item.parent === node?.parent;
        })
    }


    const baseGetNode = function(id:KeyID|INode) {
        let _id:KeyID;
        if (!id) {
            console.warn("id不能为空");
            return null
        }
        if(id instanceof Object){
            _id = id[idKey]
        }else if(typeof id=="string" || typeof id == "number"){
            _id = id;
        }else{
            console.warn("id类型非法:", id);
            return null
        }
        return _id;
    }

    // 获取镜像节点
    const getNode = function(id:KeyID|INode) {
        const _id = baseGetNode(id)
        if (!_id) {
            return null
        }
        return mirrorNodeIndexes[_id];
    }

    // 获取原始节点
    const getOriginNode = function(id:KeyID|INode) {
        const _id = baseGetNode(id)
        if (!_id) {
            return null
        }
        return originNodeIndexes[_id]

    }

    // 获取节点的深度
    const getDeepth = function(id:KeyID|INode) {
        const node = getNode(id)
        return node?.deepth;
    }

    // 设置节点属性
    const setProps = function(id:KeyID|INode, props:{}) {
        const item = getNode(id)
        if (item) {
            Object.assign(item, props);
        }
    }
    // 设置check状态
    const setChecked = function(id:KeyID, checked:boolean, updateParentAndChildren = false) {
        const item = getNode(id)
        if (item) {
            item[checkedKey] = checked

            if (updateParentAndChildren) {
                // 设置父级
                item.parentIdList.forEach((id:KeyID) => {
                    const parent = mirrorNodeIndexes[id];
                    parent[checkedKey] = isNodeCheckedByChildren(parent)
                });

                // 设置子集
                travelNode(item, function(node:INode) {
                    node[checkedKey] = checked;
                })
            }
        }
    }

    // 重置节点的选中状态,应用于编辑时
    const resetCheckStatus = function(checkedKeyList:KeyID[]) {
        const dic:{[key:KeyID]:boolean} = {};
        if (checkedKeyList) {
            checkedKeyList.forEach(item => {
                dic[item] = true;
            })
        }
        allMirrorNodes.forEach(item => {
            item[checkedKey] = dic[item[idKey]] || false;
        })
    }

    // 遍历一个节点以及所有子节点
    const travelNode = function(id:KeyID|INode, callback:ITravelCallback, collection=[]) {
        const node = getNode(id)
        if (node) {
            callback(node)
            collection.push(node)
            if (node[childrenKey] && node[childrenKey].length > 0) {
                node[childrenKey].forEach(function(item:INode) {
                    travelNode(item, callback, collection);
                })
            }
        }else{
            throw new Error("节点不存在:" + id)
        }

        return collection as INode[];
    }

    // 获取所有节点中最浅的深度
    const getMinDeepth = function() {
        let minDeep = maxDepth
        for (const i in allMirrorNodes) {
            const node = allMirrorNodes[i]
            if (node.checked) {
                minDeep = Math.min(minDeep, node.deepth)
            }
            if (minDeep === 0) {
                return 0
            }
        }
        return minDeep
    }

    // 通过条件过滤节点
    const getNodeListByFilter = (filter:IFilterFunction) => allMirrorNodes.filter(filter);

    // 遍历所有节点
    const travelAllNode = function(callback:ITravelAllCallback) {
        for (const i in allMirrorNodes) {
            const node = allMirrorNodes[i]
            const oNode = getOriginNode(node[idKey])
            if (callback(node, oNode)===false) {
                break
            }
        }
    }

    /**
     * 获取某个节点的后代节点列表
     * @param id
     */
    const getNodeDescendantList = (id:KeyID|INode)=> {
        const list:INode[] = [];
        travelNode(id, function(node:INode) {
            list.push(node)
        })
        return list;
    }


    /**
     * 获取所有节点
     * @param isMirror
     */
    const getNodeList=(isMirror:boolean=true)=>{
        if (isMirror) {
            return [...allMirrorNodes];
        }else{
            return [...allOriginNodes];
        }
    }


    return {
        travelNode,
        getNodeList,
        getNodeDescendantList,
        getNodeListByFilter,
        getMinDeepth,
        getSublings,
        getParents,
        getDeepth,
        getNode,
        updateIndexes,
        setChecked,
        setProps,
        travelAllNode,

        setOptions,
        resetCheckStatus,
        getOriginNode,
    }
}


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
const travelTree = function (
    treeData: IInputData,
    callback: ITravelTreeCallback,
    childKey = "children",
    idKey = "id",
    parents:INodeList = [],
    breakFlag = {flag: false},
) {
    if (treeData instanceof Array) {
        return  travelTree({[childKey]: treeData}, callback, childKey, idKey, parents)
    }
    const nodeList = [] as INodeList;

    const list:INodeList = (treeData?.[childKey]) || [];
    for (let i = 0; i < list.length; i++) {
        const item:INode = list[i];

        if (callback) {
            const ret = callback(item, parents, childKey, idKey);

            // 返回false中断遍历
            if (ret===false) {
                breakFlag.flag = true;
                break;
            }
        }

        nodeList.push(item);

        if (item[childKey] instanceof Array) {
            const retList = travelTree(item[childKey], callback, childKey, idKey, [item, ...parents], breakFlag);
            nodeList.push(...retList);
        }

        if (breakFlag.flag) {
            break;
        }
    }
    return nodeList;
};

export {
    travelTree,
    makeTreeDataHelper
}

export type {
    INode,
    INodeList,
    INodeDic,
    IInputData,
    ITravelCallback,
    ITravelAllCallback,
    ITravelTreeCallback,
    IFilterFunction,
}
