import { getRequest, getSlotValue, HandlerInput, RequestHandler } from "ask-sdk-core";
import { IntentRequest, Response } from "ask-sdk-model";
import { assertDependentes } from "../../actions/assert-dependentes";
import { assertDescontos } from "../../actions/assert-descontos";
import { assertSalario } from "../../actions/assert-salario";
import { calcularSalarioLiquido } from "../../actions/calcular-salario-liquido";
import { isIntent } from "../../helper/is-intent";
import { ISession } from "../../models/i-sessions";
import { ErrorHandler } from "../builtin/error-handler";
import { LaunchRequestHandler } from "../launch-request-handler";

export function ComputarSalarioLiquidoHandler(): RequestHandler {
  return {
    canHandle(input: HandlerInput): boolean | Promise<boolean> {
      return isIntent(input.requestEnvelope, 'CalcularSalarioLiquido')
    },
    
    async handle(input: HandlerInput): Promise<Response> {
      const salarioBruto = assertSalario(getSlotValue(input.requestEnvelope, 'salarioBruto')) ?? 0,
            dependentes = assertDependentes(getSlotValue(input.requestEnvelope, 'dependentes')) ?? 0,
            descontos = assertDescontos(getSlotValue(input.requestEnvelope, 'descontos')) ?? 0,
            request = getRequest<IntentRequest>(input.requestEnvelope),
            isConfirmed = request.intent?.confirmationStatus === 'CONFIRMED';

      try {
        if (!isConfirmed) {
          if (!isConfirmed) {
            return LaunchRequestHandler().handle(input);
          }
        }
        
        const session = input.attributesManager.getSessionAttributes<ISession>() ?? {},
              salario = calcularSalarioLiquido({ salarioBruto, dependentes, descontos });

        // Persist on session
        input.attributesManager.setSessionAttributes({ ...session, salarioCalculado: salario });

        const cardTitle = 'Seu salário Líquido',
              speach = `
<speak>
<p>Calculando...</p>
<p>Para o valor negociado de ${salario?.salarioBruto?.toFixed(2)} reais, após o governo roubar um pedaço, você receberá aproximadamente ${salario?.salarioLiquido?.toFixed(2)} reais na sua conta.</p>
<p>Você quer conhecer a memória de cálculo?</p>
</speak>`,
              reprompt = `
<speak>
<p>Seu salário líquido deverá ser de pelo menos ${salario?.salarioLiquido?.toFixed(2)}.</p>
<p>Você quer conhecer a memória de cálculo?</p>
</speak>`,
              card = `Para o valor negociado de ${salario?.salarioBruto?.toFixed(2)} reais, após o governo roubar um pedaço, você receberá aproximadamente ${salario?.salarioLiquido?.toFixed(2)} reais na sua conta.`;

        return input.responseBuilder
          .withSimpleCard(cardTitle, card)
          .speak(speach)
          .reprompt(reprompt)
          .addConfirmIntentDirective({
            name: 'MemoriaDeCalculo',
            confirmationStatus: 'NONE',
            slots: {}
          })
          .getResponse();
      } catch (err) {
        return ErrorHandler().handle(input, err);
      }
    }
  }
}
