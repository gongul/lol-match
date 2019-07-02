var fs = require('fs');
var jwt = require('jsonwebtoken');
var cert = fs.readFileSync(__dirname+"/../a1");
var pcert = fs.readFileSync(__dirname+"/../a1.pem");
// var cert = fs.readFileSync(__dirname+"/../match_jwt_token");
var token = jwt.sign({'str':'hello world'},cert,{algorithm:'RS256'})
console.log(token);

jwt.verify(token, pcert, function(err, decoded) {
    console.log(decoded) // bar
});