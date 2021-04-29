import { DependentesInput } from "../models/dependentes-input";

export const TAX_DEPENDENTE = 189.59;

export function calcularDependentes({ dependentes }: DependentesInput): number {
  return dependentes * TAX_DEPENDENTE;
}