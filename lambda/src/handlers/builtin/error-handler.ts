import { ErrorHandler as ErrorRequestHandler, HandlerInput } from "ask-sdk-core";
import { Response } from "ask-sdk-model";

/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below.
 */
export function ErrorHandler(): ErrorRequestHandler {
  return {
    canHandle(input: HandlerInput): boolean | Promise<boolean> {
      return true;
    },

    handle(input: HandlerInput, error: Error): Response | Promise<Response> {
      const speakOutput = `Bah!! Deu ruim guri. Não consegui calcular o teu salário. ${error.message}.`;
      console.error(error);
      return input.responseBuilder
          .speak(speakOutput)
          .reprompt(`${error.stack}`)
          .getResponse();
    }
  }
}
