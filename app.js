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

// Create bot dialogs
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
    /*function (session, results) {
        session.endConversation("Goodbye until next time...");
    }*/
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
        session.beginDialog('rootMenu');
        // builder.Prompts.text(session,"How can i help you?");
        // builder.Prompts.choice(session, "", "Payment Amount|Date of Payment|Payment Mode|Payment method|Bank|Main Menu", { listStyle: builder.ListStyle.button })
    }
  /*  function (session, results) {
        switch (results.response.index) {
            case 0:
                session.send("Amount is: $ 15,000");
                break;
            case 1:
                session.send("Date is: $ 09/04/2017");
                break;
            case 2:
                session.send("Payment Mode is: DD");
                break;
            case 3:
                session.send("Payment Method is: DD");
                break;
            case 4:
                session.send("Payment Bank is: ICICI");
                break;
            case 5:
                session.endDialog();
                break;
        }
    }*/
]);

bot.dialog('rootMenu', [
    function (session) {
        builder.Prompts.choice(session, "Please select an option", "Payment Amount|Date of Payment|Payment Mode|Payment method|Bank|Main Menu", { listStyle: builder.ListStyle.button })
    },
    function (session, results) {
        switch (results.response.index) {
            case 0:
                session.send("Amount is: $ 15,000");
                session.replaceDialog('rootMenu');
                break;
            case 1:
                session.send("Date is: $ 09/04/2017");
                session.replaceDialog('rootMenu');
                break;
            case 2:
                session.send("Payment Mode is: DD");
                session.replaceDialog('rootMenu');
                break;
            case 3:
                session.send("Payment Method is: DD");
                session.replaceDialog('rootMenu');
                break;
            case 4:
                session.send("Payment Bank is: ICICI");
                session.replaceDialog('rootMenu');
                break;
            case 5:
                session.endDialog();
                break;
        }
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


