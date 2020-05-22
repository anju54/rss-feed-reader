const con = require('../util/database');
const bcryptjs = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require('../util/config');
var passport = require('passport');

// This is used to get news by user_id
exports.getNews = (req, res, next) => {

    con.query('SELECT * from rss_news.agency_news' +
              ' INNER JOIN rss_news.user_category' +
              ' ON user_category.category_id = agency_news.category_id'+
              ' WHERE user_id = ?',[req.userId] , function(error,results,fields){
                if (error) throw error;
                res.end(JSON.stringify(results));
    });

}

// This is used for subscribing the particular category 
exports.subcribeForCategory = (req, res, next) => {
    
    var userId = req.userId ; //req.user.id;

    if(userId==0 || req.body.categoryName==null){
        res.end("Body is empty, input needed");
    }
    var postData = {
        "categoryName": req.body.categoryName
    };

    con.query('SELECT * FROM rss_news.category WHERE category_title = ?', [postData.categoryName] ,
    function(error, results, fields){
        if (error) {
            console.log(error);
            res.end("Request failed");
        }
        mapCategoryToUser(userId,results[0].category_id).then(function(success){
            res.status(200).end("Data inserted successfully");
        })
        .catch(err => console.log(error));
        
    });
}

// This is used to insert records of user and selected category
function mapCategoryToUser(userId,categoryId){

    var postData = {
        "user_id": userId,
        "category_id": categoryId
    };
    
    return new Promise(
        function(resolve,reject){
            con.query('INSERT INTO rss_news.user_category SET ?',postData, function(error, results, fields){
                if (error) throw error;                
                resolve(results);  
            });  
        }
    );
}

// This is used for signup
exports.signup = (req, res, next) => {

    checkIfUserAlreadyExists(req.body.email).then( function(resolve){
        if(resolve.length){
            console.log(resolve.length);
            res.status(200).send("User already exists!!");
        }else{

            if( req.body.password == req.body.confirmPwd ){

                bcryptjs.hash(req.body.password,10, function(err,hash){
        
                    var postData  = {
                        "user_name": req.body.username,
                        "email_id" : req.body.email,
                        "password" : hash
                    };
                    // singup
                    con.query('INSERT INTO rss_news.users SET ?', postData, function (error, results, fields) {
                        if (error) {
                           // throw error;
                           res.status(500).send("Opps! some error occured, Try again");
                        }
                        res.status(200).send("Your account has been created !!");
                    });
                });
                
            }else{
                var err = {
                    "err":"Paasword and confirm password did not match! Try again"
                };
                res.status(422).send(JSON.stringify(err));
            }  
        }
        
    })
    
};

// This is used to get all the users logged in the system
exports.getAllUsers = (req, res, next) => {

    //console.log(req);
    con.query('SELECT * FROM users.user', function(error, results, fields){
        if (error) throw error;
        res.end(JSON.stringify(results));
    });    
}

// This is used to login
exports.login = (req, res, next) => {

    var data = req.body;
    
    con.query('SELECT * FROM rss_news.users WHERE email_id = ?  ', [data.name] ,
                function(error, results, fields){
        if (error) throw error;

        if(results.length==1){
            bcryptjs.compare(data.password, results[0].password, function(err, isMatch) {
                if (err) {
                   throw err;
                } else if (!isMatch) {
                    res.status(400).send('Password does not match');
                } else {
                    
                    var token = jwt.sign({ id: results[0].user_id , role : "Admin"}, config.secret, {
                        expiresIn: "1d" // expires in 1(24hrs) day
                    });
                    res.status(200).send({ auth: true, token: token });
                }
                });
        }else{
            var err = {
                "err":"Password or email id did not match!! Opps try again"
            };
            res.status(400).send(JSON.stringify(err));
        }  
    })
}

function checkIfUserAlreadyExists(emailId){

    return new Promise(
        function(resolve,reject){
            con.query('SELECT * FROM rss_news.users WHERE email_id = ?', [emailId],
             function(error, results, fields){
                if (error) throw error;                
                resolve(results);  
            });    
        }
    )
}