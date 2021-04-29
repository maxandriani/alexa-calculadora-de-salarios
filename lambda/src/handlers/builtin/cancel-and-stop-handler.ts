import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { isIntent } from '../../helper/is-intent';

export function CancelAndStopHandler(): RequestHandler {
  return {
    canHandle(input: HandlerInput): boolean | Promise<boolean> {
      return isIntent(input.requestEnvelope, 'AMAZON.CancelIntent') || isIntent(input.requestEnvelope, 'AMAZON.StopIntent');
    },
    handle(input: HandlerInput): Response | Promise<Response> {
      const speakOutput = 'Até mais!';
      return input.responseBuilder
        .speak(speakOutput)
        .withShouldEndSession(true)
        .getResponse();
    }
  } 
}
