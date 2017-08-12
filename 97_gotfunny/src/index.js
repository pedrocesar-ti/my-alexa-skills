var APP_ID = undefined;

var CHARACTERS = {
    DaenerysTargeryen: "271",
    JonSnow: "583"
}

var AlexaSkill = require('./AlexaSkill');

var Fact = function () {
    AlexaSkill.call(this, APP_ID);
};

Fact.prototype = Object.create(AlexaSkill.prototype);
Fact.prototype.constructor = Fact;

Fact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    handleNewFactRequest(response);
};

Fact.prototype.intentHandlers = {
    "GotIntent": function (intent, session, response) {
        getAliases(intent, session, response);
    },
    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("Ask who is the person that agrees.");
    }
};

function handleNewFactRequest(response) {
    var myFact = FACTS;

    // Create speech output
    var speechOutput = "Yes.: " + myFact;
    var cardTitle = "Your Answer";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    var fact = new Fact();
    fact.execute(event, context);
};
