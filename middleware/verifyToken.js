var jwt = require('jsonwebtoken');
var config = require('../util/config');

function verifyToken(req, res, next) {

  var token = req.headers['x-access-token'];
  
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });
    
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err){
      console.log(err);
      var errMsg = "jwt expired";
      if(errMsg.localeCompare(err.message)== 0){
        res.status(400).secret('Access token has expired');
      }else{
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      }
      
    }
    
    // if everything good, save to request for use in other routes
    req.userId = decoded.id;
    // console.log(decoded);
    next();
  });
}

module.exports = verifyToken;