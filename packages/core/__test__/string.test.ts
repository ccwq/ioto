import {stripString} from "../src/string";
import {describe, expect, test, it} from "vitest";
describe("src/string/index", () => {
    it("stripString", ()=>{
        expect(stripString("hi,我是ioto", 9)).toBe("hi,我是io");
        expect(stripString("hello world", 7)).toBe("hello w");
    })
})
