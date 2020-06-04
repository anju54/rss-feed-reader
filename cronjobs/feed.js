const con = require('../util/database');
let Parser = require('rss-parser');
let moment = require('moment-timezone');
let parser = new Parser();
const logger = require('../util/logger');
var cron = require('node-cron');
 
cron.schedule('*/5 * * * *', () => {
    var date = new Date().toLocaleString();
    logger.log('running a task every five minutes : ', date, '\n');
    addNewsToDb();
});

// This is used for adding news to the database
function addNewsToDb() {

    getAgencyFeed().then(function(agencyFeed){

        agencyFeed.forEach(item => {

            rssFeedsObjects(item.feed_url).then(function(feed){

                var rssFeedNews = feed.items;

                rssFeedNews.forEach(element => {
                    var pubDate = moment(rssFeedNews.pubDate).tz('Asia/Kolkata').format("YYYY-MM-DD HH:mm:ss");
                    
                    let pic_src = "";
                    if(item.feed_url=="https://www.indiatoday.in/rss/1206584" || item.feed_url=="https://www.indiatoday.in/rss/1206614"){
                        let src = element.content.split('src');
                        let imgPath = src[1].split("=");
                        let position = imgPath[1].indexOf(">");
                        pic_src = imgPath[1].substring(1,position-1);
                        
                        console.log(element);
                    }
                
                    var postData = {
                        "title": element.title,
                        "description": element.description,
                        "guid": element.guid,
                        "link": element.link,
                        "news_published_date": pubDate,
                        "agency_feed_id": item.agency_feed_id,
                        "agency_id": item.agency_id,
                        "category_id": item.category_id,
                        "pic_src": pic_src
                    }
                    
                    con.query('INSERT INTO rss_news.agency_news SET ?', postData, function (error, results, fields) {
                        if (error) {
                            //throw error;
                            logger.error("---------- Printing the failed query ---------------");
                            logger.error('this.sql', this.sql + '\n'+ '\n');
                         }
                    });
                });    
            });
        });
    })
    .catch(error => logger.error(error));
};

// This is used to get agnecy feed data
function getAgencyFeed(){

    return new Promise(
        function(resolve,reject){
            con.query('SELECT * FROM rss_news.agency_feed', function(error, results, fields){
                if (error) throw error;                
                resolve(results);  
            })     
        }
    ) 
}

// This is used to convert rss feeds to js object
var rssFeedsObjects = function (rsslink){ 
    var feed = new Object();
    return new Promise ( 
        function(resolve,reject){
        resolve(feed =  parser.parseURL(rsslink));
    })
}