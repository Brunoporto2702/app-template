export function omit(obj: any, keysToRemove: string[]) {
  const result = { ...obj };
  keysToRemove.forEach((key) => delete result[key]);
  return result;
}
