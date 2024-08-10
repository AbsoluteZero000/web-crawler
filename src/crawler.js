import { URL } from "url";
import { JSDOM } from "jsdom";


function normalizeURL(url) {
    let urlObject = new URL(url);
    let normalizedURL = urlObject.hostname + urlObject.pathname;
    normalizedURL = normalizedURL.toLowerCase();
    if (normalizedURL.endsWith('/')) {
        normalizedURL = normalizedURL.slice(0, -1);
    }
    return normalizedURL;
}

function getallLinksFromHTML(html, baseURL) {
    let dom = new JSDOM(html);
    let urlTags = dom.window.document.querySelectorAll('a');
    let urls = [];
    for (let i = 0; i < urlTags.length; i++) {
        let href = urlTags[i].href;
        if (href.startsWith('/')) {
            urls.push(new URL(href, baseURL).href);
        } else if (href.startsWith('http')) {
            urls.push(href);
        }
    }
    return urls;
}
async function crawl(baseURL, currentURL, pages) {
    let baseURLObj = new URL(baseURL);
    let currentURLObj = new URL(currentURL);

    if (baseURLObj.hostname !== currentURLObj.hostname) {
        return pages;
    }

    let normalizedCurrentURL = normalizeURL(currentURL);
    if (normalizedCurrentURL in pages) {
        pages[normalizedCurrentURL]++;
        return pages;
    }

    pages[normalizedCurrentURL] = 1;

    console.log("Visiting " + currentURL);
    try {
        const response = await fetch(currentURL);
        if (response.status >= 400) {
            console.log("Error occurred while visiting page: " + currentURL);
            return pages;
        }

        const contentType = response.headers.get("Content-Type");
        if (!contentType || !contentType.includes("text/html")) {
            return pages;
        }

        const html = await response.text();
        const links = getallLinksFromHTML(html, baseURL);

        for (const link of links) {
            pages = await crawl(baseURL, link, pages);
        }
    } catch (error) {
        console.log("Error occurred while visiting page: " + currentURL);
        console.log(error.message);
    }

    return pages;
}
export{
    normalizeURL,
    getallLinksFromHTML,
    crawl
};
