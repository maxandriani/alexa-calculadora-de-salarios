export function assertDependentes(input: any): number {
  try {
    if (isNaN(input)) {
      return 0;
    } else {
      return parseInt(input);
    }
  } catch (e) {
    return 0;
  }
}