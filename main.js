import { crawl} from "./src/crawler.js";

// printReport takes a dictionary of pages and prints them
// to the console in a human-friendly way
function printReport(pages) {
    console.log('==========')
    console.log('REPORT')
    console.log('==========')
    const sortedPages = sortPages(pages)
    for (const sortedPage of sortedPages) {
      const url = sortedPage[0]
      const count = sortedPage[1]
      console.log(`Found ${count} internal links to ${url}`)
    }
}

function sortPages(pages) {
    const pagesArr = Object.entries(pages)
    pagesArr.sort((pageA, pageB) => {
        if (pageB[1] === pageA[1]) {
        return pageA[0].localeCompare(pageB[0])
        }
        return pageB[1] - pageA[1]
    })
    return pagesArr
}

async function main(){
    if(process.argv.length < 3){
        console.log("please provide the base url that will be crawlered through");
        process.exit(1);
    }
    if(process.argv.length > 3){
        console.log(process.argv);
        console.log("please provide only one base url");
        process.exit(1);
    }
    console.log("Starting the crawler...");
    let BaseURL = process.argv[2];
    let pages = await crawl(BaseURL, BaseURL, {});
    printReport(pages);
    console.log("Crawler finished...");
}

main()
