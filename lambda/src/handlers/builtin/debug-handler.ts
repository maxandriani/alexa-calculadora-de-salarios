import { getIntentName, getRequestType, HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";

/**
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers
 * for your intents by defining them above, then also adding them to the request
 * handler chain below.
 */
export function IntentReflectorHandler(): RequestHandler {
  return {
    canHandle(input: HandlerInput): boolean | Promise<boolean> {
      return getRequestType(input.requestEnvelope) === 'IntentRequest';
    },

    handle(input: HandlerInput): Response | Promise<Response> {
      const intentName = getIntentName(input.requestEnvelope);
      const speakOutput = `Você invocou ${intentName}`;

      return input.responseBuilder
        .speak(speakOutput)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse();
    }
  }
}

