// Add your requirements
var restify = require('restify');
var builder = require('botbuilder');
var request = require('request');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.PORT || 3000, function()
{
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
var connector = new builder.ChatConnector
({ appId: '7a5470f5-fb9f-43e0-85c5-eb764131728e', appPassword: 'vPmda5yurk8uiO7tT9nbYah' });
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

// Create bot dialogs

bot.dialog('/', function (session) {

    request
        .get('https://jsonplaceholder.typicode.com/posts/1')
        .on('response', function(response) {
          //  console.log(response.statusCode) // 200
          //  session.send(response.statusCode);
          //  console.log(response.headers['content-type']) // 'image/png'
          //  session.send(response.statusCode+"");
        })
        .on('data', function(data) {
            // decompressed data as it is received
            var temp=JSON.parse(data);
            session.send("user Id: "+ temp.userId);
            session.send("Title: "+ temp.title);
            session.send("Body:     "+ temp.body);
            //session.send('decoded chunk: ' + JSON.stringify(data));
        });


    var msg="";
    var data1 = ""
    request.get('http://alinhana4.bcone.com:8000/sap/opu/odata/sap/ZINFA_PO_SRV/POSet?$format=json', {
        'auth': {
            'user': 'TRAIN69_HN5',
            'pass': 'bcone@123',
            'sendImmediately': false
        },
        headers:
                {'Content-Type': 'application/json; charset=utf-8',
                    '$format': 'json'
                }



        //  console.log(response.statusCode) // 200
        //  session.send(response.statusCode);
        //  console.log(response.headers['content-type']) // 'image/png'
        //  session.send(response.statusCode+"");
    })
        .on('data', function(chunk) {


            data1 += chunk;

            console.log("data"+data1);
            // decompressed data as it is received

            /*for(i=0;i<data.d.results.length;i++){

                listOfPo=listOfPo+data.d.results[i].PoNumber+"\n";



            }*/

            //msg=msg+data;
            //session.send('decoded chunk: ' + JSON.stringify(data));
         //   session.send("List Of POs:     "+ temp);

        })
        .on('end', function(data) {
            //console.log("data"+data);

            //var temp=JSON.parse(data);

            var listOfPo="";

            for(i=0;i<JSON.parse(data1).d.results.length;i++){

                listOfPo=listOfPo+JSON.parse(data1).d.results[i].PoNumber+"\n";



            }

            session.send("List Of POs:     "+ listOfPo);
        })
    ;



    //session.send("Hello World");
});