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

export type ResultNamespace = {
  Some: SomeConstructor,
  None: NoneConstructor,
  of<T>(data: T): Option<T>,
}

export const Result: ResultNamespace
export const Some: SomeConstructor
export const None: NoneConstructor

