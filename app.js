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
({ appId: 'cfb38d31-162f-4ec5-9a24-6a72bbe9fc15', appPassword: 'V3qkWq6WquEiq1oECpQpxOH' });
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

var flag=0;

// Create bot dialogs

bot.on('contactRelationUpdate', function (message) {

        /*bot.send(new builder.Message()
         .address(message.address)
         .text("Hello! I am in contactRelationUpdate"));*/

    bot.beginDialog(message.address, '/');

});

bot.on('conversationUpdate', function (message) {
    if(flag==0) {
        /*bot.send(new builder.Message()
            .address(message.address)
            .text("Hello! I am VendorBot! How can I help you?"));*/
       flag++;
        bot.beginDialog(message.address, '/');
   }
    });

bot.dialog('/', [
    function (session) {
        session.send("Hello! I am VendorBot! How can I help you? ");
        builder.Prompts.text(session, "You can say something like, 'What is the status of my payment?' or 'I would like to update my contact details'");
    },
    function (session, results) {

        if (results.response.toUpperCase().indexOf("PAYMENT") !== -1) {
            session.beginDialog('/payment');
            //session.send("Payment");
        } else if (results.response.toUpperCase().indexOf("CREATE") !== -1) {
           // session.send("UPDATE");
            session.beginDialog('/update');
        } else {
            session.send("Not Trained...");
        }
    }
]);

bot.dialog('/payment', [
    function (session) {
        builder.Prompts.text(session, 'Please Enter Your DUNS number');
    },
    function (session, results) {
        builder.Prompts.text(session,"An OTP has been sent to the registered email on file. Please Enter the OTP.");
         // console.log(results.response);
        // builder.Prompts.text(session,"An OTP has been sent to the registered email on file. Please Enter the OTP.");
        // console.log(results.response);
       // session.send("Please ask the query");

    },
    function (session, results) {
        session.send(results.response);
        session.send("OTP Verified. Thank You");
        session.send("Your last payment invoice is: OPEN as of 04/14/2017");
        builder.Prompts.choice(session, "Select one of the following for more details", "Payment Amount|Date of Payment|Payment Mode|Payment method|Payment Bank ", { listStyle: builder.ListStyle.button })
        // builder.Prompts.text(session,"How can i help you?");
        // builder.Prompts.choice(session, "", "Payment Amount|Date of Payment|Payment Mode|Payment method|Bank", { listStyle: builder.ListStyle.none })
    },
    function (session, results) {

            session.send(results.response);

    }
]);

bot.dialog('/update', [
    function (session) {
        builder.Prompts.text(session, 'Hi! What is your Gender?');
    },
    function (session, results) {
        session.send("ok");
        session.endDialog();
    }
]);