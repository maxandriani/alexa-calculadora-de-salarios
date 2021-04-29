import { INSSInput } from "../models/inss-input";
import { REGRAS_INSS } from "./regras-inss";

export function calcularINSS({ salario }: INSSInput): number {
  const regra = REGRAS_INSS.find(r => r.canHandle(salario));
  return regra?.handle(salario) ?? 0;
}
