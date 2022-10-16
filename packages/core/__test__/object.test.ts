import {tryGet} from "../src/object";
import {describe, expect, it} from "vitest";


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
