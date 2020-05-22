const con = require('../util/database');

let constFile = require('../newsConstants/constant');

//This is used to get all the news
exports.getAllNews = (req,res,next) => {

    con.query(
        'SELECT * FROM rss_news.agency_news limit 5'  , function(error,results,fields){
        if (error) throw error;
        res.end(JSON.stringify(results));
    });

}

//This is used to get news by category
exports.getNewsByCategory = (req,res,next) => {
    console.log(req.params);

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
    console.log(req.params);
    con.query(
        'SELECT * FROM rss_news.agency_news '+
		'INNER JOIN rss_news.category '+
        'ON agency_news.category_id = category.category_id '+
        'WHERE category_title = ? ORDER BY agency_news_id ASC '+
        'LIMIT ?, 1',[req.params.category,parseInt(req.params.limit)]
        , function(error,results,fields){
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
}