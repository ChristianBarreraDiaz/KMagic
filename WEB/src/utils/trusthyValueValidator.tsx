export function hasTruthyValue(obj: Record<string, unknown>): boolean {
  for (const key in obj) {
    const val = obj[key];
    if (val) {
      return true;
    }
  }
  return false;
}
