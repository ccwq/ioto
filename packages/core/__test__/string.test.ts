import {getURLDirname, stripString} from "../src/string";
import {describe, expect, test, it} from "vitest";
describe("src/string/index", () => {
    it("stripString", ()=>{
        expect(stripString("hi,我是ioto", 9)).toBe("hi,我是io");
        expect(stripString("hello world", 7)).toBe("hello w");
    })




    it("getURLDirname", ()=>{
        expect(getURLDirname("https://vscode.dev/")).toBe("https://vscode.dev");
        expect(getURLDirname("https://vscode.dev/a.html")).toBe("https://vscode.dev");
        expect(getURLDirname("https://vscode.dev/a.html/#")).toBe("https://vscode.dev");
        expect(getURLDirname("https://vscode.dev/a.html#")).toBe("https://vscode.dev");
        expect(getURLDirname("https://vscode.dev/foo/a.html")).toBe("https://vscode.dev/foo");
        expect(getURLDirname("https://vscode.dev/foo/a.html/#")).toBe("https://vscode.dev/foo");
        expect(getURLDirname("foo/a.html/#")).toBe("/foo");
    })
})


