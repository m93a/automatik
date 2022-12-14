interface CommonMethods {
  array(): ArraySchema<this>;
  or<T extends Schema[]>(...other: T): UnionSchema<[this, ...T]>;
  and<T extends Schema[]>(...other: T): IntersectionSchema<[this, ...T]>;
}
const common = <T extends object>(t: T): T & CommonMethods => ({
  ...t,
  array() {
    return array(this);
  },
  or(...other) {
    return union(this, ...other);
  },
  and(...other) {
    return intersection(this, ...other);
  }
});

export interface StringSchema extends CommonMethods {
  type: 'string';
}
export const string = (): StringSchema => common({ type: 'string' });

export interface NumberSchema extends CommonMethods {
  type: 'number';
}
export const number = (): NumberSchema => common({ type: 'number' });

export interface BigintSchema extends CommonMethods {
  type: 'bigint';
}
export const bigint = (): BigintSchema => common({ type: 'bigint' });

export interface BooleanSchema extends CommonMethods {
  type: 'boolean';
}
export const boolean = (): BooleanSchema => common({ type: 'boolean' });

export interface SymbolSchema extends CommonMethods {
  type: 'symbol';
}
export const symbol = (): SymbolSchema => common({ type: 'symbol' });

export interface LiteralSchema<V> extends CommonMethods {
  type: 'literal';
  value: V;
}
export const literal = <T>(value: T): LiteralSchema<T> => common({ type: 'literal', value });

export interface ArraySchema<T> extends CommonMethods {
  type: 'array';
  element: T;
}
export const array = <T>(element: T): ArraySchema<T> => common({ type: 'array', element });

export interface UnionSchema<T extends any[]> extends CommonMethods {
  type: 'union';
  options: T;
}
export const union = <T extends any[]>(...options: T): UnionSchema<T> =>
  common({ type: 'union', options });

export interface IntersectionSchema<T extends any[]> extends CommonMethods {
  type: 'intersection';
  demands: T;
}
export const intersection = <T extends any[]>(...demands: T): IntersectionSchema<T> =>
  common({ type: 'intersection', demands });

export interface RecordSchema<T extends object> extends CommonMethods {
  type: 'record';
  shape: T;
}
export const record = <T extends object>(shape: T): RecordSchema<T> =>
  common({ type: 'record', shape });

export interface ReferenceToLabel<T extends string | symbol> extends CommonMethods {
  type: 'reference';
  label: T;
}
export const ref = <T extends string | symbol>(label: T): ReferenceToLabel<T> =>
  common({ type: 'reference', label });

// prettier-ignore
type ResolveReferences<Name extends string | symbol, Self extends Schema, O extends Schema = Self> =
  O extends ReferenceToLabel<Name> ? ResolveReferences<Name, Self> :
  O extends UnionSchema<infer V extends Schema[]> ? UnionSchema<ResolveReferencesInTuple<Name, Self, V>>:
  O extends IntersectionSchema<infer V extends Schema[]> ? IntersectionSchema<ResolveReferencesInTuple<Name, Self, V>>:
  O extends ArraySchema<infer V extends Schema> ? ArraySchema<ResolveReferences<Name, Self, V>> :
  O extends RecordSchema<infer S> ? { [K in keyof S]: S[K] extends Schema ? ResolveReferences<Name, Self, S[K]> : never } :
  O;

// prettier-ignore
type ResolveReferencesInTuple<
  Name extends string | symbol,
  Self extends Schema,
  O extends Schema[]
> =
  O extends [] ? [] :
  O extends [infer T extends Schema, ...infer Rest extends Schema[]] ? [
    ResolveReferences<Name, Self, T>, ...ResolveReferencesInTuple<Name, Self, Rest>
  ] :
  never;

export const label = <T extends Schema>(label: string | symbol, type: T) => {};

export type Schema =
  | StringSchema
  | NumberSchema
  | BigintSchema
  | BooleanSchema
  | SymbolSchema
  | LiteralSchema<any>
  | UnionSchema<any>
  | IntersectionSchema<any>
  | ArraySchema<any>
  | RecordSchema<any>;

// prettier-ignore
type SchemaTupleToUnion<T> =
  T extends [] ? never :
  T extends [infer First extends Schema, ...infer Rest] ? Type<First> | SchemaTupleToUnion<Rest> :
  never;

// prettier-ignore
type SchemaTupleToIntersection<T> =
  T extends [] ? unknown :
  T extends [infer First extends Schema, ...infer Rest] ? Type<First> & SchemaTupleToIntersection<Rest> :
  unknown;

// prettier-ignore
export type Type<T extends Schema> =
  T extends StringSchema ? string :
  T extends NumberSchema ? number :
  T extends BigintSchema ? bigint :
  T extends BooleanSchema ? boolean :
  T extends SymbolSchema ? symbol :
  T extends LiteralSchema<infer V> ? V :
  T extends UnionSchema<infer T> ? SchemaTupleToUnion<T> :
  T extends IntersectionSchema<infer T> ? SchemaTupleToIntersection<T> :
  T extends ArraySchema<infer S extends Schema> ? Type<S>[] :
  T extends RecordSchema<infer S> ? {
    [K in keyof S]: S[K] extends Schema ? Type<S[K]> : never
  } :
  never;
