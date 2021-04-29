import { SkillBuilders } from "ask-sdk-core";
import { CancelAndStopHandler } from "./handlers/builtin/cancel-and-stop-handler";
import { ErrorHandler } from "./handlers/builtin/error-handler";
import { HelpIntentHandler } from "./handlers/builtin/help-handler";
import { CalcularSalarioBrutoHandler } from "./handlers/calculadora/computar-salario-bruto-handler";
import { ComputarSalarioLiquidoHandler } from "./handlers/calculadora/computar-salario-liquido-handler";
import { MemoriaDeCalculoHandler } from "./handlers/calculadora/memoria-de-calculo-handler";
import { LaunchRequestHandler } from "./handlers/launch-request-handler";
import { SessionEndedRequestHandler } from "./handlers/session-ended-handler";

/** Default handler */
export const handler = SkillBuilders.custom()
  .addRequestHandlers(
    CancelAndStopHandler(),
    HelpIntentHandler(),
    // ===============================
    MemoriaDeCalculoHandler(),
    CalcularSalarioBrutoHandler(),
    ComputarSalarioLiquidoHandler(),
    LaunchRequestHandler(),
    // ==============================
    // IntentReflectorHandler(), // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    SessionEndedRequestHandler()
  )
  .addErrorHandlers(ErrorHandler())
  .lambda();
