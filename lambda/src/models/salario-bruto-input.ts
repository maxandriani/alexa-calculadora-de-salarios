export class SalarioBrutoInput {
  constructor (
    public salarioLiquido: number,
    public dependentes: number,
    public descontos: number
  ) {}
}