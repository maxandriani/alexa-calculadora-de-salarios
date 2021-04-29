import { Regra } from "../models/regra";

export const REGRAS_INSS = [
  new Regra(0.0,     1045.0,           0.075, 0.0),
  new Regra(1045.01, 2089.6,           0.09,  15.67),
  new Regra(2089.61, 3134.4,           0.12,  78.36),
  new Regra(3134.41, 6101.06,          0.14,  141.05),
  new Regra(6101.07, Number.MAX_VALUE, 0.14,  141.05, 713.10)
]