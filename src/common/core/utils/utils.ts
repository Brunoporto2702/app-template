export function nameof<T>(key: keyof T): string {
  return key.toString();
}
