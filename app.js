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



    session.send("Hello World");
});