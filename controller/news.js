const con = require('../util/database');

let constFile = require('../util/constants');

//This is used to get all the news
exports.getAllNews = (req,res,next) => {

    let pageNum = parseInt(req.params.pageNum);
    let itemPerPage = constFile.ITEMFORTOPNEWS;
    let offset = (pageNum -1) * itemPerPage;
  
    con.query(
        'SELECT an.title,a.agency_title,an.link  '+
        'FROM rss_news.agency_news an inner join rss_news.agency a on an.agency_id = a.agency_id '+
        'ORDER BY agency_news_id DESC '+
        'LIMIT ? OFFSET ?',[itemPerPage ,offset]
         , function(error,results,fields){
        if (error) throw error;
        console.log(results);
        res.end(JSON.stringify(results));
    });
}

//This is used to get news by category
exports.getNewsByCategory = (req,res,next) => {
   
    con.query(
        'SELECT * FROM rss_news.agency_news '+
		'INNER JOIN rss_news.category '+
        'ON agency_news.category_id = category.category_id '+
        'WHERE category_title = ? ', [req.params.category] 
        , function(error,results,fields){
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
}

/**
 *  This is used for pagination to display set of news
 *  @params limit is used for starting of the page
 */
exports.getSetOfNewsByCategory = (req,res,next) => {
    console.log("13.......");

    let pageNum = parseInt(req.params.pageNum);
    let itemPerPage = constFile.ITEMPERPAGE;
    let offset = (pageNum -1) * itemPerPage;
    con.query(
        'SELECT * FROM rss_news.agency_news '+
		'INNER JOIN rss_news.category '+
        'ON agency_news.category_id = category.category_id '+
        'WHERE category_title = ? ORDER BY agency_news_id DESC '+
        'LIMIT ? OFFSET ?',[req.params.category, itemPerPage ,offset]
        , function(error,results,fields){
        if (error) throw error;
        console.log(results);
        res.end(JSON.stringify(results));
    });
}

exports.getTopNews = (req,res,next) => {
    console.log("12.......");

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

    console.log("11.......");
    console.log(req.params.rss);

    let pageNum = parseInt(req.params.pageNum);
    let rss = req.params.rss;

    getNewsByRSSProvider(pageNum,rss).then(
        function(results){
            res.end(JSON.stringify(results));
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