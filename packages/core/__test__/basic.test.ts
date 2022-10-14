/**
 * @vitest-environment jsdom
 */

import {assert, expect, test} from "vitest";
import {stripString, safeBindToObject, all2valueName} from "../src";
import {IObject} from "../src/types";

test("stripString", ()=>{
    expect(stripString("hi,我是ioto", 9)).toBe("hi,我是io");
    expect(stripString("hello world", 7)).toBe("hello w");
})


test("safeBindToObject", () => {
    const obj:IObject = {name:"ioto"};
    safeBindToObject(obj, "name", "ioto");
    expect(obj._name).toBe("ioto");
    safeBindToObject(obj, "name", "ioto");
    expect(obj.__name).toBe("ioto");
})


test("all2valueName", ()=>{
    const resultString = JSON.stringify([
        {
            value:"ioto",
            name:"IoTo",
        },
        {
            value:"jojo",
            name:"JoJo",
        },
        {value: "jiji", name: "jiji"},
    ]);

    const resultString2 = resultString.replace(/value/g, "id").replace(/name/g, "value");

    expect(JSON.stringify(all2valueName("ioto,IoTo jojo,JoJo jiji"))).toBe(resultString)
    expect(JSON.stringify(all2valueName(
        `
            ioto,IoTo 
            jojo,JoJo
            jiji
        `)
    )).toBe(resultString)
    expect(JSON.stringify(all2valueName(["ioto,IoTo"," jojo,JoJo", "jiji"]))).toBe(resultString)

    expect(JSON.stringify(
        all2valueName("ioto,IoTo jojo,JoJo jiji", "id", "value")
    )).toBe(resultString2)
})
