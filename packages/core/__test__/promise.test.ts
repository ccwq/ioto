import {asyncReduce} from "../src";
import {assert, describe, expect, test, it} from "vitest";
describe("测试promise相关代码", async ()=>{
    describe("测试asyncReduce", async ()=>{

        const asyncSum = (num1:number, num2:number, delay:number = 120)=>{
            return new Promise((resolve, reject)=>{
                setTimeout(() => {
                    if (isNaN(num1) || isNaN(num2)) {
                        reject(new Error("请输入有效数字"));
                    }
                    resolve(num1 + num2);
                }, delay);
            })
        }

        test("1, 2, 3, 5和为11", async ()=>{
            const result = await asyncReduce([1, 2, 3, 5], async (acc, num, list) => {
                acc = await asyncSum(acc, num);
                return acc
            }, 0);
            expect(result).toBe(11);
        })
    })
})
