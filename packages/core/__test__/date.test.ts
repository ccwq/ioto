import {describe, expect, it} from "vitest";
import Date2 from "../src/date/Date2";

describe("测试Date2", async ()=>{


    const dateString = "2023-1";

    const date2 = Date2.fromAny(dateString);


    it("从月份转成日期", async ()=>{
        expect(date2.clone().formatToDay()).toBe("2023-1-1")
    })

    it("设置到月份的开始", async ()=>{
        expect(date2.clone().setToMonthStart().formatToDay()).toBe("2023-1-1")
    })

    it("设置到月份的结束", async ()=>{
        expect(date2.clone().setToMonthEnd().formatToDay()).toBe("2023-1-31")
    })
})
