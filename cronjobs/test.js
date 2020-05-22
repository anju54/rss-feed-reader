var parseString = require('xml2js').parseString;
var xml = "<media:content url="https://www.hindustantimes.com/rf/image_size_630x354/HT/p2/2020/05/17/Pictures/_de423734-983a-11ea-a091-8eb61e4add3b.PNG" medium="image" height="640" width="362"/>;"
parseString(xml, function (err, result) {
    console.dir(result);
});