import { getRequest, HandlerInput, RequestHandler } from "ask-sdk-core";
import { IntentRequest, Response } from "ask-sdk-model";
import { isIntent } from "../../helper/is-intent";
import { ISession } from "../../models/i-sessions";
import { SalarioOutput } from "../../models/salario-output";
import { CancelAndStopHandler } from "../builtin/cancel-and-stop-handler";
import { ErrorHandler } from "../builtin/error-handler";

export function MemoriaDeCalculoHandler(): RequestHandler {
  return {
    canHandle(input: HandlerInput): boolean | Promise<boolean> {
      return isIntent(input.requestEnvelope, 'MemoriaDeCalculo');
    },
    
    async handle(input: HandlerInput): Promise<Response> {
      const request = getRequest<IntentRequest>(input.requestEnvelope),
            isConfirmed = request.intent?.confirmationStatus === 'CONFIRMED';

      try {
        let speach = '',
            card = '';
        
        const { salarioCalculado } = input.attributesManager.getSessionAttributes<ISession>(),
              cardTitle = 'Memória de Cálculo';
        
        if (!salarioCalculado?.salarioBruto || !salarioCalculado?.salarioLiquido) {
          speach = `Ops! Parece que você ainda não informou como deseja calcular o seu salário, sendo assim ainda não tenho os dados da memória de cálculo para te informar. Você pode dizer: <s>calcular salário líquido</s>, ou então <s>calcular salário bruto</s>`
        } else if (!isConfirmed) {
          return CancelAndStopHandler().handle(input);
        } else {
          speach = `
<speak>
<s>Memória de Cálculo!</s>
<s>Saláio Bruto: ${salarioCalculado?.salarioBruto?.toFixed(2)} reais</s>
<s>Salário líquido: ${salarioCalculado?.salarioLiquido?.toFixed(2)} reais</s>
<s>Total de descontos dos dependentes: ${salarioCalculado?.totalDescontoDependentes?.toFixed(2)} reais</s>
<s>Total de imposto de renda: ${salarioCalculado?.totalDescontoIr?.toFixed(2)}</s>
<s>Total para bancar a previdência social dos aposentados atuais: ${salarioCalculado?.totalDescontoInss?.toFixed(2)}</s>
<s><amazon:emotion name="disappointed" intensity="medium">A soma de todos os descontos em folha de pagamento é de ${SalarioOutput.totalDescontos(salarioCalculado)?.toFixed(2)} reais</amazon:emotion></s>
<s>Lembre-se que existem mais impostos trabalhistas descontados indiretamente do seu salário, mas não afetarão o descritivo do seu holerite! <amazon:emotion name="excited" intensity="high">Boa sorte Brasil!</amazon:emotion></s>
</speak>`,
          card = `Saláio Bruto: R$ ${salarioCalculado?.salarioBruto?.toFixed(2)}
Salário líquido: R$ ${salarioCalculado?.salarioLiquido?.toFixed(2)}
Dependentes: R$ ${salarioCalculado?.totalDescontoDependentes?.toFixed(2)}
Imposto de Renda: R$ ${salarioCalculado?.totalDescontoIr?.toFixed(2)}
Previdência: R$ ${salarioCalculado?.totalDescontoInss?.toFixed(2)}`;
        }

        return input.responseBuilder
          .withSimpleCard(cardTitle, card)
          .speak(speach)
          .reprompt(speach)
          .withShouldEndSession(true)
          .getResponse();

      } catch (err) {
        return ErrorHandler().handle(input, err);
      }
    }
  }
}