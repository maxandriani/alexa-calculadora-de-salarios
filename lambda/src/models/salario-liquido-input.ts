export class SalarioLiquidoInput {
  constructor(
    public salarioBruto: number,
    public descontos: number,
    public dependentes: number
  ) {}
}