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
        builder.Prompts.text(session, "You can say something like, 'What is the status of my payment?' or 'I would like to know inventory details for products I supply'");
    },
    function (session, results) {

        if (results.response.toUpperCase().indexOf("PAYMENT") !== -1) {
            session.beginDialog('/payment');
            //session.send("Payment");
        } else if (results.response.toUpperCase().indexOf("INVENTORY") !== -1) {
            // session.send("UPDATE");
            session.beginDialog('/inventory');
        }
        else if (results.response.toUpperCase().indexOf("ISSUE") !== -1) {
            // session.send("UPDATE");
            session.beginDialog('/issues');
        } else {
            session.send("Not Trained...");
            session.endDialog();
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
                session.send("Date is:  09/04/2017");
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

bot.dialog('/inventory', [
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
        session.beginDialog('inventoryMenu');
        // builder.Prompts.text(session,"How can i help you?");
        // builder.Prompts.choice(session, "", "Payment Amount|Date of Payment|Payment Mode|Payment method|Bank|Main Menu", { listStyle: builder.ListStyle.button })
    }
]);

bot.dialog('/issues', [
    function (session) {
        builder.Prompts.text(session, 'Please Enter Your DUNS number');
    },
    function (session, results) {
        builder.Prompts.text(session, "An OTP has been sent to the registered email on file. Please Enter the OTP.");
    },
    function (session,results) {
        session.send("OTP Verified. Thank You");
        builder.Prompts.text(session, 'Is this an existing issue or a new issue?');
    },
    function (session, results) {
        if (results.response.toUpperCase().indexOf("NEW") !== -1) {
            session.beginDialog('newIssue');
        }
        else
        {
            session.beginDialog('existingIssue');
        }
        //session.beginDialog('inventoryMenu');
        // builder.Prompts.text(session,"How can i help you?");
        // builder.Prompts.choice(session, "", "Payment Amount|Date of Payment|Payment Mode|Payment method|Bank|Main Menu", { listStyle: builder.ListStyle.button })
    }
]);


bot.dialog('inventoryMenu', [
    function (session) {
        builder.Prompts.choice(session, "The following products are supplied by you. Choose one to know more.", "Silicon Wafer 200 micron|Galvanized metal mesh 10*20|Polished Silicon Wafer 2 inches|Plain Weave screen 600 microns|Steel Cable wire 2 mm|Main Menu", { listStyle: builder.ListStyle.button })
    },
    function (session, results) {
        switch (results.response.index) {
            case 0:
                session.send("Silicon Wafer 200 micron");
                session.replaceDialog('inventoryMenu');
                break;
            case 1:
                session.send("Date is:  09/04/2017");
                session.replaceDialog('inventoryMenu');
                break;
            case 2:
                session.send("Payment Mode is: DD");
                session.replaceDialog('inventoryMenu');
                break;
            case 3:
                session.send("Payment Method is: DD");
                session.replaceDialog('inventoryMenu');
                break;
            case 4:
                session.send("Payment Bank is: ICICI");
                session.replaceDialog('inventoryMenu');
                break;
            case 5:
                session.endDialog();
                break;
        }
    }
]);
bot.dialog('newIssue', [
    function(session) {
        //session.send("OK! You have selected new issue, Please describe your issue in few words");
        builder.Prompts.text(session, 'OK! You have selected new issue, Please describe your issue in few words');
    },
    function (session, results) {
        builder.Prompts.text(session, 'what is priority (1-5)');
    },
    function (session, results) {
        session.send('Great! new issue created.Your issue key is 1234.');
        session.endDialog();
    }
]);

bot.dialog('existingIssue', [
    function (session) {
        builder.Prompts.choice(session, "Ok! Please select one of the following issues", "VI-123|VI-234|VI-346", { listStyle: builder.ListStyle.button })
    },
    function (session, results) {
        session.send("Following are the details of your issue");
        session.send("Ticket No : "+ results.response.entity);
        session.send("Summary   : Incorrect vendor contact details");
        session.send("Priority   : 3");
        builder.Prompts.text(session, "would you like to escalate?");
    },
    function (session, results) {
        session.send("Ok! Thank you");
        session.endDialog();
    }
]);