/**
 * @vitest-environment jsdom
 */
import {assert, describe, expect, test, it} from "vitest";
import {safeBindToObject, all2valueName} from "../src/base";
import {IObject} from "../src/types";
import * as _ from "lodash";
describe("src/base/index", () => {
    test("safeBindToObject", () => {
        const obj:IObject = {name:"ioto"};
        safeBindToObject(obj, "name", "ioto");
        expect(obj._name).toBe("ioto");
        safeBindToObject(obj, "name", "ioto");
        expect(obj.__name).toBe("ioto");
    })
    describe("all2valueName", ()=>{
        const expectResult = [
            {
                value:"ioto",
                name:"IoTo",
            },
            {
                value:"jojo",
                name:"JoJo",
            },
            {value: "jiji", name: "jiji"},
        ];

        const 简单原始数据 = expectResult.map(el => {
            return {
                id: el.value,
                name: el.name,
            }
        });

        it("单字符串选项", ()=>{
            expect(all2valueName("ioto,IoTo jojo,JoJo jiji")).toEqual(expectResult)
        })

        it("多行字符串", ()=>{
            expect(all2valueName(`
                ioto,IoTo
                jojo,JoJo
                jiji
            `)
            ).toEqual(expectResult)
        })

        it("数组项为字符串", ()=>{
            expect(all2valueName(["ioto,IoTo"," jojo,JoJo", "jiji"])).toEqual(expectResult)
        })

        it("改变输出的字段名", ()=> {
            expect(all2valueName(简单原始数据, {nameGetField: "name", valueGetField: "id"})).toEqual(expectResult)
        })


        const 复杂原始数据 =  [{
            nickName: "ioto",
            who:{
                realName:"jito",
                ages:{
                    "22":[
                        {title:"本科毕业"}
                    ]
                }
            }
        }]

        it("获取复杂的对象列表", () => {
            let actual = all2valueName(复杂原始数据, {
                nameGetField: ["title", "who.ages.22.0.title"],
                valueGetField: ["realName", "who.realName"]
            });
            expect(
                actual
            ).toEqual([{value: "jito", name: "本科毕业"}])
        })
    })
})

