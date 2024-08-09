import { URL } from "url";
function normalizeURL(url){
    let urlObject= new URL(url);
    let normalizedurl = urlObject.hostname;
    return normalizedurl;

};

export{
    normalizeURL
};
