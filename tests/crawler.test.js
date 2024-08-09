import {test, describe, expect} from "@jest/globals";
import {normalizeURL, getallLinksFromHTML} from "../src/crawler.js";


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

describe("testing getallLinksFromHtml, it should extract all links in a html page, convert any relative urls to absolute urls and return them as an array", () => {
    test("extracting 1 link from html page", () => {
        let html = `<html><body><a href="https://absolutezero000/">absolutezero000</a></body></html>`;
        let url = "https://absolutezero000/";
        expect(getallLinksFromHTML(html, url)).toEqual(["https://absolutezero000/"]);
    });

    test("extracting a lot of links from a html page", ()=>{
        let html = "<html><body><a href=\"https://absolutezero000/\">absolutezero000</a><a href=\"https://absolutezero000/bootdev\">boot.dev</a></body></html>";
        let url = "http://absolutezero000";
        expect(getallLinksFromHTML(html, url)).toEqual(["https://absolutezero000/", "https://absolutezero000/bootdev"]);
    });

    
});
