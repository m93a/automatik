import { z, type ZodRawShape } from 'zod';

const TAG = Symbol('TAG');
type Tag<Name> = { [TAG]: Name };
type RecursiveType<Name, Self extends object, O = Self>
    = O extends Tag<Name> ? RecursiveType<Name, Self>
    : O extends Array<infer V> ? Array<RecursiveType<Name, Self, V>>
    : O extends object ? { [K in keyof O]: RecursiveType<Name, Self, O[K]> }
    : O;

type Category = RecursiveType<
  'Cat',
  {
    name: string;
    subcategories: Tag<'Cat'>[];
  }
>;

z.union([ z.string(), z.number() ]).options
z.intersection(z.string(), z.number())

const x: Category = {
    name: "asdf",
    subcategories: [],
};

function recursiveType<T extends ZodRawShape>(name: string, shape: T) {
    const tag = Symbol();
    type tag = typeof tag;
    const r: z.ZodType<RecursiveType<tag, T>> = z.lazy(() => z.object(shape));
    return r;
}

const Category = recursiveType('Cat', {
    name: z.string(),
    subcategories: z.array(z.tag('Cat')),
  });
