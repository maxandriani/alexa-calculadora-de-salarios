import { SalarioBrutoInput } from "../models/salario-bruto-input";
import { SalarioOutput } from "../models/salario-output";
import { calcularDependentes } from "./calcular-dependentes";
import { calcularINSS } from "./calcular-inss";
import { calcularIR } from "./calcular-ir";

export function calcularSalarioBruto({ salarioLiquido, dependentes, descontos }: SalarioBrutoInput): SalarioOutput {
  // Base de cálculo = salário bruto – contribuição para o INSS – número de dependentes x 189,59
  const descDependentes = calcularDependentes({ dependentes });
  let brutoEstimado = salarioLiquido,
      liquidoEstimado = salarioLiquido,
      descInss = 0,
      salarioBase = 0,
      descIr = 0,
      safeCount = 0;  
 
  do {
    descInss = calcularINSS({ salario: brutoEstimado });
    salarioBase = brutoEstimado - (descInss + descDependentes);
    descIr = calcularIR({ salarioBase });
    liquidoEstimado = (brutoEstimado - (descInss + descIr + descontos))
    brutoEstimado = salarioLiquido + descInss + descIr + descDependentes + descontos;
    safeCount++;
    
  } while (Math.round(liquidoEstimado) < Math.round(salarioLiquido) && safeCount < 1000000)

  return new SalarioOutput(
    salarioLiquido,
    brutoEstimado,
    descontos,
    dependentes,
    descDependentes,
    descInss,
    descIr
  );
}