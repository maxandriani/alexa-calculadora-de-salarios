import { SalarioLiquidoInput } from "../models/salario-liquido-input";
import { SalarioOutput } from "../models/salario-output";
import { calcularDependentes } from "./calcular-dependentes";
import { calcularINSS } from "./calcular-inss";
import { calcularIR } from "./calcular-ir";

export function calcularSalarioLiquido({ salarioBruto, dependentes, descontos }: SalarioLiquidoInput): SalarioOutput {
  // Base de cálculo = salário bruto – contribuição para o INSS – número de dependentes x 189,59
  const descDependentes = calcularDependentes({ dependentes }),
        descInss        = calcularINSS({ salario: salarioBruto }),
        salarioBase     = salarioBruto - (descInss + descDependentes),
        descIr          = calcularIR({ salarioBase });

  return new SalarioOutput(
    (salarioBruto - (descDependentes + descInss + descIr + descontos)),
    salarioBruto,
    descontos,
    dependentes,
    descDependentes,
    descInss,
    descIr
  );
}