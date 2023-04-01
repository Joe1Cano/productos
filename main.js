var db_gateway    = require('./db_gateway.js');
var http_requests = require('./http_requests.js');
var products      = require('./products.js');   

const http = require('http');
const hostname = '54.83.81.0';
const port = 80;


const server = http.createServer((req, res) => { 

    var dg = new db_gateway();
    var httpRequest = new http_requests(req);
    var product = new products(dg); 

    var payload = "";            

    req.on('data', function (data) {
        payload += data;
    });      

    req.on('end', function () {

        function callBack(err, result) {

            res.statusCode = 200;

            res.setHeader('Content-Type', 'application/json');

            var response = {}

            if (err) { 
                response["error"] = err.message;
            } else {
                response["data"] = result; 
            }

            res.write(JSON.stringify(response, null, 4));
            res.end();
        }

        resourceId = httpRequest.resourceId;

        switch (req.method) { 

            case "POST":

                jsonData =  JSON.parse(payload); 

                product.insertRecord(jsonData, callBack);


                break;

            case "PUT": 

                jsonData =  JSON.parse(payload); 

                product.updateRecord(resourceId, jsonData, callBack);

                break;

            case "DELETE": 

                product.deleteRecord(resourceId, callBack);

                break; 

            case "GET":  

                product.getRecords(resourceId, callBack); 

                break; 
        }

    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
