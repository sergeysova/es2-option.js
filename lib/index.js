/* eslint-disable no-use-before-define, no-unused-vars */

const symbolSome = Symbol('Option::Some')
const symbolNone = Symbol('Option::None')

let Result = null

try {
  // eslint-disable-next-line global-require, import/no-extraneous-dependencies
  Result = require('@es2/result')
}
catch (error) {
  // no result
}

const ifResult = (fn) => Result
  ? fn
  : undefined

class OptionException extends Error {}

function Some(data) {
  return {
    [symbolSome]: true,

    isSome: () => true,

    isNone: () => false,

    equals: (result) => Some.isSome(result) && result.unwrap() === data,

    unwrap: () => data,

    unwrapOr: (value) => data,

    unwrapOrElse: (fn) => data,

    map: (fn) => Some(fn(data)),

    mapOr: (value, fn) => fn(data),

    mapOrElse: (defFn, mapFn) => mapFn(data),

    chain: (optionFn) => optionFn(data),

    okOr: ifResult((resultErr) => Result.Ok(data)),

    okOrElse: ifResult((resultErrFn) => Result.Ok(data)),

    * iter() {
      yield data
    },

    and: (optionB) => optionB,

    andThen: (fn) => fn(data),

    filter: (predicateFn) => predicateFn(data)
      ? Some(data)
      : None(),

    or: (optionB) => Some(data),

    orElse: (optionFn) => Some(data),
  }
}

Some.isSome = (instance) => instance[symbolSome] === true
Some.of = Some

function None() {
  return {
    [symbolNone]: true,

    isSome: () => false,

    isNone: () => true,

    equals: (result) => None.isNone(result),

    unwrap: () => {
      throw new OptionException('unwrap() called on None value')
    },

    unwrapOr: (value) => value,

    unwrapOrElse: (fn) => fn(),

    map: (fn) => None(),

    mapOr: (value, fn) => value,

    mapOrElse: (defFn, mapFn) => defFn(),

    chain: (optionFn) => None(),

    okOr: ifResult((resultErr) => Result.Err(resultErr)),

    okOrElse: ifResult((resultErrFn) => Result.Err(resultErrFn())),

    // eslint-disable-next-line no-empty-function
    * iter() {},

    and: (optionB) => None(),

    andThen: (fn) => None(),

    filter: (predicateFn) => None(),

    or: (optionB) => optionB,

    orElse: (optionFn) => optionFn(),
  }
}

None.isNone = (instance) => instance[symbolNone] === true

const Option = {
  Some,
  None,
  encase: (fn) => (...args) => {
    try {
      return Some(fn(...args))
    }
    catch (error) {
      return None()
    }
  },
  wrap: (fn) => (...args) => {
    try {
      const result = fn(...args)

      if (typeof result === 'undefined' || result === null || Number.isNaN(result)) {
        return None()
      }

      return Some(result)
    }
    catch (error) {
      return None()
    }
  },
  isOption: (instance) => Some.isSome(instance) || None.isNone(instance),
}

module.exports = {
  Some,
  None,
  Option,
}
