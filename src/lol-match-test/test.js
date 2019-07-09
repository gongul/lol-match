var appRoot = require("app-root-path");
var fs = require('fs');
var jwt = require('jsonwebtoken');
var cert = fs.readFileSync(appRoot.path+"/resources/ssl/match_jwt_token");
var pcert = fs.readFileSync(appRoot.path+"/resources/ssl/match_jwt_token.pem");
// var cert = fs.readFileSync(__dirname+"/../match_jwt_token");
var token = jwt.sign({'str':'hello world',exp:Math.floor(Date.now() / 1000) + 21600},cert,{algorithm:'RS256'})
console.log(token);

jwt.verify(token, pcert, function(err, decoded) {
    console.log(decoded) // bar
});