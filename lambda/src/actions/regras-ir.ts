import { Regra } from "../models/regra";

export const REGRAS_IR = [
  new Regra(0.0,     1903.98,          0.0,   0.0),
  new Regra(1903.99, 2826.65,          0.075, 142.8),
  new Regra(2826.66, 3751.05,          0.15,  354.8),
  new Regra(3751.06, 4664.68,          0.225, 636.13),
  new Regra(4664.69, Number.MAX_VALUE, 0.275, 869.36)
];
