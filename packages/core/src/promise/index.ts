interface PromiseMapItem {
    (): Promise<any>;
}

/**
 * Promise.all的map版本
 * 传入数组或者数组的展开
 * @return {*}
 */
function promiseMap(tasks:PromiseMapItem[]):Promise<any>
function promiseMap(...rest:PromiseMapItem[]):Promise<any>
function promiseMap(...rest:any){
    let tasks;
    if (Array.isArray(arguments[0])) {
        tasks = arguments[0];
    }else{
        tasks = Array.prototype.slice.call(arguments);
    }
    let result:any[] = [];
    return tasks.reduce(
        function (prev, current, index, ls) {
            return prev.then(function () {
                if (typeof current === "function") {
                    try {
                        current = current();
                    } catch (e) {

                        //用来提前停止reduce
                        ls.splice(1);
                        return Promise.reject(e);
                    }
                }else{
                    console.warn("map element:"+ index +" not function");
                }
                return current.then((_ret:any) => {
                    result[index] = _ret;
                })
            })
        },
        Promise.resolve(result)
    ).then(function () {
        return result;
    });
}


interface PromoseExec {
    (resolve:Function, reject:Function):void;
}

class BPromise<T> extends Promise<T>{
    static map(promiseLs:PromiseMapItem[]){
        return promiseMap(promiseLs);
    }

    static all(ls:Promise<any>[]){
        return Promise.all(ls);
    }

    private __resolve:undefined|Function = undefined;
    resolve(value:any){this.__resolve!(value)}
    _resolve(value:any){this.__resolve!(value)}
    private __reject:undefined|Function = undefined;
    reject(error:any){this.__reject!(error)}
    _reject(error:any){this.__reject!(error)}
    constructor(executor:PromoseExec|undefined = undefined){
        let _resolve, _reject;
        super((resolve, reject) => {
            _resolve = resolve;
            _reject = reject;
            if (executor) {
                executor(resolve, reject);
            }
        });
        this.__resolve = _resolve;
        this.__reject = _reject;
    }

    // @ts-ignore
    // constructor(executor) { super(executor); }
}

export {
    BPromise,
    promiseMap,
}
