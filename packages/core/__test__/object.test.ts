import {treeListToFlatList, tryGet} from "../src/object";
import {describe, expect, it, test} from "vitest";
import {travelTree} from "../src/object/treeDataHelper";


describe("tryGet", ()=>{
    const src =  {
        nickName: "ioto",
        who:{
            name:"jito",

            ages:{
                "22":[
                    {title:"本科毕业"}
                ]
            }
        }
    }
    it("直接获取属性", ()=>{
        expect(tryGet(src, "nickName")).toBe("ioto");
    })

    it("尝试获取,首次为尝试获取", ()=>{
        expect(tryGet(src, ["nickName1", "nickName"])).toBe("ioto");
    })

    it("直接二级属性", ()=>{
        expect(tryGet(src, "who.name")).toBe("jito");
    })

    it("尝试获取二级属性", ()=>{
        expect(tryGet(src, ["who.name1", "who.name"])).toBe("jito");
    })

    it("尝试获取多级数组属性", ()=>{
        expect(
            tryGet(
                src,
                [
                    "who.age.12",
                    "who.ages.22.0.title"
                ]
            )
        ).toBe("本科毕业");
    })
})

describe("测试treeListToFlatList", async ()=>{
    const testData = [
        {
            "value": "ss",
            "label": "成员0-0",
        },
        {
            "value": "zgdy",
            "label": "成员1-0",
            "children": [
                {
                    "value": "zgdy_children",
                    "label": "成员1-1",
                },
                {
                    "value": "zgybdy",
                    "label": "成员1-2",
                }
            ]
        },
        {
            "value": "gqty",
            "label": "成员2-0",
        },
    ];

    test("包含所有节点", async ()=>{
        expect(
            treeListToFlatList(testData).map(el => el.label)
        ).toEqual(["成员0-0", "成员1-0", "成员1-1", "成员1-2", "成员2-0"]);
    })
    test("只包含叶子节点", async ()=>{
        expect(
            treeListToFlatList(testData, "children", true).map(el => el.label)
        ).toEqual(["成员0-0", "成员1-1", "成员1-2", "成员2-0"]);
    })
})


describe("测试treeDataHelper", async ()=>{

    const data = [
        {
            "level": 1,
            "name": "生产制造",
            "value": 10,
            "status": 1,
        },
        {
            "level": 2,
            "name": "厂务系统",
            "status": 0,
            value: 20,
            "children": [
                {
                    "name": "供冷",
                    "value": 5,
                    "status": 1
                },
                {
                    "name": "供热",
                    "value": 5,
                    "status": 1
                },
                {
                    "name": "空压",
                    "value": 5,
                    "status": 1
                },
                {
                    "name": "蒸汽",
                    "value": 5,
                    "status": 1
                }
            ],
        },
    ];

    // 测试callback
    test("travelTree使用callback遍历", async ()=>{
        const ret = [] as string[];
        travelTree(data, el => ret.push(el.name as string), "children");
        expect(ret).toEqual(["生产制造", "厂务系统", "供冷", "供热", "空压", "蒸汽"])
    })

    // 测试返回所有节点
    test("travelTree返回所有节点", async ()=>{
        expect(travelTree(data, null, "children").map(el=>el.name)).toEqual(["生产制造", "厂务系统", "供冷", "供热", "空压", "蒸汽"])
    })

    // 测试中断
    test("travelTree中断", async ()=>{
        expect(travelTree(data, el=>el.name!=="供冷", "children").map(el=>el.name)).toEqual(["生产制造", "厂务系统", ])
    })
})
