//HTTP MODULE NODE.JS
var http = require('http');
var server = http.createServer(function(req, res){
  if (req.url === "/") {
      res.write("This is home page.");
      res.end();
   } else if (req.url === "/about" && req.method === "GET") {
      res.write("This is about page.");
      res.end();
   } else {
      res.write("Not Found!");
      res.end();
   }
});
server.listen(5000);
