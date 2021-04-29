export class Regra {

  constructor(
    public readonly min: number = 0,
    public readonly max: number = 0,
    public readonly tax: number = 0,
    public readonly discount: number = 0,
    public readonly maxTax: number = Number.MAX_VALUE
  ) {}

  canHandle(salary: number): boolean {
    return (salary >= this.min && salary <= this.max);
  }

  handle(salary: number): number {
    const value = (salary * this.tax) - this.discount;
    return (value > this.maxTax)
      ? this.maxTax
      : value;
  }

}