export function assertDescontos(input: any): number {
  try {
    if (isNaN(input)) {
      return 0;
    } else {
      return parseFloat(input);
    }
  } catch (e) {
    return 0;
  }
}