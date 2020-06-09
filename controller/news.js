const con = require('../util/database');

let constFile = require('../util/constants');

//This is used to get all the news and total news count
exports.getAllNews = (req,res,next) => {

    let pageNum = parseInt(req.params.pageNum);
    let itemPerPage = constFile.ITEMFORTOPNEWS;
    let offset = (pageNum -1) * itemPerPage;
    let allnews = [];
    getAllNewsPromise(itemPerPage,offset).then(
        function(results){ allnews.push(results); }
    )
    
    getCountOfAllNews().then(
        function(results){
            response = {
                "allnews" : allnews,
                "total_all_news_count" : results
            }
            res.end(JSON.stringify(response));
        }
    )
    
}

// This is used to give the promise object for all news
function getAllNewsPromise(itemPerPage,offset){
    return new Promise(
        function (resolve,reject){
            con.query(
                'SELECT an.title,a.agency_title,an.link  '+
                'FROM rss_news.agency_news an inner join rss_news.agency a on an.agency_id = a.agency_id '+
                'ORDER BY agency_news_id DESC '+
                'LIMIT ? OFFSET ?',[itemPerPage ,offset]
                 , function(error,results,fields){
                if (error) throw error;
                resolve(results);
            })
        }
    )
}

/**
 *  This is used for pagination to display set of news
 *  @params limit is used for starting of the page
 */
exports.getSetOfNewsByCategory = (req,res,next) => {
console.log("cat log");
    let pageNum = parseInt(req.params.pageNum);
    let itemPerPage = constFile.ITEMPERPAGE;
    let offset = (pageNum -1) * itemPerPage;
    let categoryNews = [];
    con.query(
        'SELECT * FROM rss_news.agency_news '+
		'INNER JOIN rss_news.category '+
        'ON agency_news.category_id = category.category_id '+
        'WHERE category_title = ? ORDER BY agency_news_id DESC '+
        'LIMIT ? OFFSET ?',[req.params.category, itemPerPage ,offset]
        , function(error,results,fields){
        if (error) throw error;
        results["categ"] = req.params.category;
        categoryNews.push(results);
    });

    getCountOfCategoryRecords(req.params.category).then(
        function(results){
            let response = {
                "cat_news" : categoryNews,
                "cat_news_count" : results
            }
            res.end(JSON.stringify(response));
        })
        .catch(error => {
            console.log(error);
            res.end("failed");
    }); 
}

exports.getTopNews = (req,res,next) => {

    getTopNewsPromise().then(
        function(results){
            res.end(JSON.stringify(results));
        })
        .catch(error => {
            console.log(error);
            res.end("failed");
    }); 
}

exports.invokeGetNewsByRSSProvider = (req,res,next) => {
    console.log("rss log");
    let pageNum = parseInt(req.params.pageNum);
    let rss = req.params.rss;
    let rssNews = [];

    getNewsByRSSProvider(pageNum,rss)
    .then(
        function(results){
            rssNews.push(results)}
    ).catch(error => {
        console.log(error);
        res.end("failed");
    }); 

    getCountOfRSSRecords(req.params.rss).then(
        function(results){
            let response = {
                "rss_news" : rssNews,
                "rss_news_count" : results
            }
            res.end(JSON.stringify(response));;
        })
        .catch(error => {
            console.log(error);
            res.end("failed");
    }); 
}

// This is used to fetch top news from db using promise 
function getTopNewsPromise() {

    let itemPerPage = constFile.ITEMFORTOPNEWS;

    return new Promise (
        function(resolve,reject){
            con.query(
                'SELECT * FROM rss_news.agency_news '+
                'INNER JOIN rss_news.category '+
                'ON agency_news.category_id = category.category_id '+
                'WHERE category_title = "top stories" ORDER BY agency_news_id DESC '+
                'LIMIT ? ',[itemPerPage],
                function(error,results,fields){
                    if (error) reject(err); 
                    resolve(results)
            })
        }
    )
    
}

// This is used to fetch news by rss providers
function getNewsByRSSProvider(pageNum,rss){
    console.log(rss);

    let itemPerPage = constFile.ITEMPERPAGE;
    let offset = (pageNum -1) * itemPerPage;

    return new Promise(
        function(resolve,reject){
            con.query(
                'SELECT * FROM rss_news.agency_news an ' +
                'INNER JOIN rss_news.agency a ' +
                'ON an.agency_id = a.agency_id ' +
                'WHERE agency_title = ? ' +
                'ORDER BY agency_news_id DESC '+
                'LIMIT ? OFFSET ?',[rss, itemPerPage ,offset],
                function(err,results,fields){
                    if(err) reject(err);
                    resolve(results);
                }
            )
        }
    )
}

function getCountOfRSSRecords(rss){
    return new Promise(
        function (resolve,reject){
            con.query(
                'SELECT count(*) as numOfRecords FROM rss_news.agency_news an ' +
                'INNER JOIN rss_news.agency a ' +
                'ON an.agency_id = a.agency_id ' +
                'WHERE agency_title = ? ' +
                'ORDER BY agency_news_id DESC ',[rss],
                function(err,results,fields){
                    if(err) reject(err);
                    console.log(results);
                    resolve(results);
                }
            )
        }
    )
}

function getCountOfCategoryRecords(category){
    
    return new Promise(
        function (resolve,reject){
            con.query(
                'SELECT COUNT(*) AS numOfRecords FROM rss_news.agency_news '+
                'INNER JOIN rss_news.category '+
                'ON agency_news.category_id = category.category_id '+
                'WHERE category_title = ? ORDER BY agency_news_id DESC ',[category]
                , function(err,results,fields){
                    if(err) reject(err);
                    //console.log(err);
                    resolve(results);
            });
        }
    )
}

function getCountOfAllNews(){
    return new Promise(
        function (resolve,reject){
            con.query('SELECT count(*) as totalpage ' +
            'FROM rss_news.agency_news an inner join rss_news.agency a on an.agency_id = a.agency_id ' +
            'ORDER BY agency_news_id DESC ', function(err,results,fields){
                if(err) reject(err);
                resolve(results);
            })
        }
    )
}
