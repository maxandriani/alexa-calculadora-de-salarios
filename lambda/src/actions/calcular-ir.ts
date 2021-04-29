import { IRInput } from "../models/ir-input";
import { REGRAS_IR } from "./regras-ir";

export function calcularIR({ salarioBase }: IRInput): number {
  const regra = REGRAS_IR.find(r => r.canHandle(salarioBase));
  return regra?.handle(salarioBase) ?? 0;
}