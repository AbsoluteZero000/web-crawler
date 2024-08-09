import { URL } from "url";
import { JSDOM } from "jsdom";
import { url } from "inspector";

function normalizeURL(url){
    let urlObject= new URL(url);
    let normalizedurl = urlObject.hostname;
    return normalizedurl;

};

function getallLinksFromHTML(html, BaseURl){
    let dom = new JSDOM(html);
    let urltags = dom.window.document.querySelectorAll('a');
    let urls = Array(urltags.length);
    for(let i = 0; i < urls.length; i++){
        if(!urltags[i].href.startsWith("http"))
            urls[i] = BaseURl + urltags[i].href;
        else
            urls[i] = urltags[i].href;
    }
    return urls;
}

export{
    normalizeURL,
    getallLinksFromHTML
};
