import { getRequestType, HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";

export function SessionEndedRequestHandler(): RequestHandler {
  return {
    canHandle(input: HandlerInput): boolean | Promise<boolean> {
      return getRequestType(input.requestEnvelope) === 'SessionEndedRequest';
    },
    
    handle(input: HandlerInput): Response | Promise<Response> {
      // Any cleanup logic goes here.
      input.attributesManager.setSessionAttributes({});
      return input.responseBuilder.getResponse();
    }
  }
}
