import { Result } from '@es2/result'

export class OptionException extends Error {}

export type Option<T> = {
  equals(option: Option<T>): boolean,

  /** @throws {OptionException} */
  unwrap(): T,
  unwrapOr(value: T): T,
  unwrapOrElse(fn: () => T): T,
  map<U>(fn: (value: T) => U): Option<U>,
  mapOrElse<U>(defFn: () => U, mapFn: (value: T) => U): Option<U>,
  chain<U>(optionFn: (value: T) => Option<U>): Option<U>,
  okOr<E>(error: E): Result<T, E>,
  okOrElse<E>(errorFn: () => E): Result<T, E>,
  iter(): Iterator<T>,
  and<I>(optionB: Option<I>): Option<I>,
  andThen<I>(fn: (value: T) => I): Option<I>,
  filter(predicate: (value: T) => boolean): Option<T>,
  or(optionB: Option<T>): Option<T>,
  orElse(fn: () => Option<T>): Option<T>,
}

export type SomeConstructor = {
  <T>(data: T): Option<T>,

  isSome<T>(result: Option<T>): boolean,
}

export type NoneConstructor = {
  <T>(): Option<T>,

  isNone<T, E>(result: Option<T>): boolean,
}

export type OptionNamespace = {
  Some: SomeConstructor,
  None: NoneConstructor,
  encase<A, Rs>(fn: (a: A) => Rs): ((a: A) => Option<Rs>),
  encase<A, B, Rs>(fn: (a: A, b: B) => Rs): ((a: A, b: B) => Option<Rs>),
  encase<A, B, C, Rs>(fn: (a: A, b: B, c: C) => Rs): ((a: A, b: B, c: C) => Option<Rs>),
  encase<A, B, C, D, Rs>(fn: (a: A, b: B, c: C, d: D) => Rs): ((a: A, b: B, c: C, d: D) => Option<Rs>),
  encase<A, B, C, D, E, Rs>(fn: (a: A, b: B, c: C, d: D, e: E) => Rs): ((a: A, b: B, c: C, d: D, e: E) => Option<Rs>),
  encase<A, B, C, D, E, F, Rs>(fn: (a: A, b: B, c: C, d: D, e: E, f: F) => Rs): ((a: A, b: B, c: C, d: D, e: E, f: F) => Option<Rs>),
  encase<A, B, C, D, E, F, J, Rs>(fn: (a: A, b: B, c: C, d: D, e: E, f: F, j: J) => Rs): ((a: A, b: B, c: C, d: D, e: E, f: F, j: J) => Option<Rs>),
  wrap<A, Rs>(fn: (a: A) => Rs): ((a: A) => Option<Rs>),
  wrap<A, B, Rs>(fn: (a: A, b: B) => Rs): ((a: A, b: B) => Option<Rs>),
  wrap<A, B, C, Rs>(fn: (a: A, b: B, c: C) => Rs): ((a: A, b: B, c: C) => Option<Rs>),
  wrap<A, B, C, D, Rs>(fn: (a: A, b: B, c: C, d: D) => Rs): ((a: A, b: B, c: C, d: D) => Option<Rs>),
  wrap<A, B, C, D, E, Rs>(fn: (a: A, b: B, c: C, d: D, e: E) => Rs): ((a: A, b: B, c: C, d: D, e: E) => Option<Rs>),
  wrap<A, B, C, D, E, F, Rs>(fn: (a: A, b: B, c: C, d: D, e: E, f: F) => Rs): ((a: A, b: B, c: C, d: D, e: E, f: F) => Option<Rs>),
  wrap<A, B, C, D, E, F, J, Rs>(fn: (a: A, b: B, c: C, d: D, e: E, f: F, j: J) => Rs): ((a: A, b: B, c: C, d: D, e: E, f: F, j: J) => Option<Rs>),
  isOption: (value: any) => boolean,
}

export const Result: OptionNamespace
export const Some: SomeConstructor
export const None: NoneConstructor

