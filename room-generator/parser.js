const cheerio = require('cheerio');
const { InternalLink } = require('./types/InternalLink');

class Parser {
    constructor (htmlStr) {
        this.htmlStr = htmlStr; 
        this.load(); 
    }

    load () {
        this.html = cheerio.load(this.htmlStr);
    }

    fetchInternalLinks () {
        const $ = this.html;
        const links = [];
        $('a').each((i, link) => {
            const $link = $(link);
            console.log($link.text());
            const classes = $link.attr('class');
            if (classes && classes.includes('internal-link')) {
                const href = $link.attr('href');
                const text = $link.text();
                const internalLink = new InternalLink(href, text);
                links.push(internalLink);
            }
        });
        return links;
    }
}

module.exports =  { Parser };