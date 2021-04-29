import { getRequest, getSlotValue, HandlerInput, RequestHandler } from "ask-sdk-core";
import { IntentRequest, Response } from "ask-sdk-model";
import { assertDependentes } from "../../actions/assert-dependentes";
import { assertDescontos } from "../../actions/assert-descontos";
import { assertSalario } from "../../actions/assert-salario";
import { calcularSalarioBruto } from "../../actions/calcular-salario-bruto";
import { isIntent } from "../../helper/is-intent";
import { ISession } from "../../models/i-sessions";
import { ErrorHandler } from "../builtin/error-handler";
import { LaunchRequestHandler } from "../launch-request-handler";

export function CalcularSalarioBrutoHandler(): RequestHandler {
  return {
    canHandle(input: HandlerInput): boolean | Promise<boolean> {
      return isIntent(input.requestEnvelope, 'CalcularSalarioBruto')
    },
    
    async handle(input: HandlerInput): Promise<Response> {
      const salarioLiquido = assertSalario(getSlotValue(input.requestEnvelope, 'salarioLiquido')) ?? 0,
            dependentes = assertDependentes(getSlotValue(input.requestEnvelope, 'dependentes')) ?? 0,
            descontos = assertDescontos(getSlotValue(input.requestEnvelope, 'descontos')) ?? 0,
            request = getRequest<IntentRequest>(input.requestEnvelope),
            isConfirmed = request.intent?.confirmationStatus === 'CONFIRMED';

      try {
        if (!isConfirmed) {
          return LaunchRequestHandler().handle(input);
        }

        const session = input.attributesManager.getSessionAttributes<ISession>() ?? {},
              salario = calcularSalarioBruto({ salarioLiquido, dependentes, descontos });

        // Persist on session
        input.attributesManager.setSessionAttributes({ ...session, salarioCalculado: salario });

        const cardTitle = 'Seu salário Bruto',
              speach = `
<speak>
<p>Calculando...</p>
<p>Para que você possa ganhar ${salario?.salarioLiquido?.toFixed(2)} reais, será preciso negociar um salário de pelo menos ${salario.salarioBruto.toFixed(2)}.</p>
<p>Você quer conhecer a memória de cálculo?</p>
</speak>`,
              reprompt = `
<speak>
<p>Seu salário bruto deverá ser de pelo menos ${salario?.salarioBruto?.toFixed(2)}.</p>
<p>Você quer conhecer a memória de cálculo?</p>
</speak>`,
              card = `Para que você possa ganhar ${salario?.salarioLiquido?.toFixed(2)} reais, será preciso negociar um salário de pelo menos ${salario.salarioBruto.toFixed(2)}.`;

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
