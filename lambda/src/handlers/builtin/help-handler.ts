import { HandlerInput, RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model";
import { isIntent } from "../../helper/is-intent";

export function HelpIntentHandler(): RequestHandler {
  return {
    canHandle(input: HandlerInput): boolean | Promise<boolean> {
      return isIntent(input.requestEnvelope, 'AMAZON.HelpIntent');
    },

    handle(input: HandlerInput): Response | Promise<Response> {
      const cardTitle = 'Ajuda da Calculadora de Salário',
            speach = `
<p>Bom, existem duas formas de calcular o seu salário!</p>
<p>
  Se você quer saber quanto será depositado na sua conta, diga <emphasis>calcular salário líquido</emphasis>;
  Se você quer saber qual salário deve negociar com seu patrão para receber o valor desejado, diga <emphasis>calcular salário bruto</emphasis>.
</p>`,
            reprompt = `
<p>
  Se você quer saber quanto será depositado na sua conta, diga <emphasis>calcular salário líquido</emphasis>;
  Se você quer saber qual salário deve negociar com seu patrão para receber o valor desejado, diga <emphasis>calcular salário bruto</emphasis>.
</p>`;

      return input.responseBuilder
        .withSimpleCard(cardTitle, speach)
        .speak(speach)
        .reprompt(reprompt)
        .getResponse();
    }
  }

}