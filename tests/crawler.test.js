import {test, describe, expect} from "@jest/globals";
import {normalizeURL} from "../crawler.js";


describe("testing normalizeURL, it removes http or https and leading / from urls, normalizing them so we can equate them ", () => {
    test("test https: with a leading /", () => {
        let url = "https://absolutezero000/";
        expect(normalizeURL(url)).toBe("absolutezero000");
    });

    test("test http without a leading /", ()=>{
        let url = "https://absolutezero000/";
        expect(normalizeURL(url)).toBe("absolutezero000");
    });

    test("test equating removing https without leading / and http with leading /", ()=>{
        let url1 = "https://absolutezero000";
        let url2 = "http://absolutezero000/";
        expect(normalizeURL(url1)).toBe(normalizeURL(url2));
    });
});
