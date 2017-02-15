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
        .get('http://google.com')
        .on('response', function(response) {
            console.log(response.statusCode) // 200
            session.send(response.statusCode);
            console.log(response.headers['content-type']) // 'image/png'
            session.send(response.statusCode);
        })
    session.send("Hello World");
});