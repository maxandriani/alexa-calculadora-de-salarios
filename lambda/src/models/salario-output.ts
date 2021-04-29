export class SalarioOutput {
  constructor(
    public salarioLiquido: number,
    public salarioBruto: number,
    public descontos: number,
    public dependentes: number,
    public totalDescontoDependentes: number = 0,
    public totalDescontoInss: number = 0,
    public totalDescontoIr: number = 0
  ) {}

  static totalDescontos(data: SalarioOutput) {
    return (data.totalDescontoDependentes ?? 0) + (data.totalDescontoInss ?? 0) + (data.totalDescontoIr ?? 0);
  }
}