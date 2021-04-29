import { getRequestType, HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { isIntent } from "../helper/is-intent";

/**
 * Tela inicial da aplicação
 */
export function LaunchRequestHandler(): RequestHandler {
  return {
    canHandle(input: HandlerInput): boolean | Promise<boolean> {
      return getRequestType(input.requestEnvelope) === 'LaunchRequest'
             || isIntent(input.requestEnvelope, 'CalcularSalario');
    },
    
    handle(input: HandlerInput): Response | Promise<Response> {
      const cardTitle = 'Calculadora de Salário',
            speach = `
<speak>
  <emphasis level="moderate">Bem vindo à Calculadora de Salários!</emphasis>
  <p>
    Você pode calcular seu <emphasis level="moderate">salário líquido</emphasis>, ou encontrar o <emphasis level="moderate">salário bruto</emphasis> para negociação.
    Qual deles você quer calcular?
  </p>
</speak>`,
            cardContent = `Bem vindo à Calculadora de Salários!\n
Você pode calcular seu salário líquido, ou encontrar o salário bruto para negociação.
Qual deles você quer calcular?`,
            reprompt = 'Você quer calcular seu <emphasis>salário líquido</emphasis>, ou <emphasis>salário bruto</emphasis>?',
            cardReprompt = `Você quer calcular seu salário líquido, ou salário bruto?`;

      if (getRequestType(input.requestEnvelope) === 'LaunchRequest') {
        return input.responseBuilder
          .withSimpleCard(cardTitle, cardContent)
          .speak(speach)
          .reprompt(reprompt)
          .withShouldEndSession(false)
          .getResponse();
      } else {
        return input.responseBuilder
          .withSimpleCard(cardTitle, cardReprompt)
          .speak(reprompt)
          .withShouldEndSession(false)
          .getResponse();
      }
    }
  }
}
