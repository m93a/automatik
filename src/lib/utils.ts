/**
 * Throw an error. A handy replacement for the throw expression.
 */
export function yeet(message: string): never;
export function yeet<T extends any[]>(Error: { new (...args: T): any }, ...args: T): never;
export function yeet(E: string | { new (...args: any[]): any }, ...args: any[]): never {
  if (typeof E === 'string') {
    throw new Error(E);
  }

  throw new E(...args);
}
