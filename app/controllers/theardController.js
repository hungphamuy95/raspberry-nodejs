const puppeterr = require('puppeteer');
const express = require('express');

async function scraptVozTheard(pagenumber) {
    const browser = await puppeterr.launch({headless:true});
    const page = await browser.newPage();
    await page.goto('https://vozforums.com/forumdisplay.php?f=17&order=desc&page='+pagenumber);
    const result = await page.evaluate(()=>{
        let titles = document.querySelectorAll('#threadbits_forum_17 > tr > td.alt1 > div > a');
        //let rating = document.querySelectorAll('#threadbits_forum_17 > tr > td.alt1 > div.smallfont > span > img');
        titles = [...titles];
        let theradlist = titles.map(link=>{
             return {title: link.innerText, link:link.href}
        });
        return theradlist;
    });
    await browser.close();
    return result;
}

module.exports = (app)=>{
    app.get('/theards/:page', (req, res)=>{
        scraptVozTheard(req.params.page).then((val)=>res.json(val));
    });
}

