/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license
 * that can be found at http://neekware.com/license/MIT.html
 */

/**
 * Interim solution till Typescript implements ts39
 * https://github.com/tc39/proposal-optional-chaining
 *
 * Try/Catch method - fast try (when found), slow catch (when undefined)
 * https://un33k-ng-type-error.stackblitz.io/
 *
 * Performance is optimal: when loop of 1000 or less.
 * Chrome: try: 0.3ms, catch: 6.2 ms (loop of 1000)
 *         ~1800% faster than lodash get on success (try)
 *         ~10% slower than lodash get on failure (catch)
 * Usage:
 * old way
 * if (a &&
 *     a.b &&
 *     a.b.c &&
 *     a.b.c.d &&
 *     a.b.c.d.name) {
 *   console.log(a.b.c.d.name);
 * } else {
 *   console.log('Hello World');
 * }
 *
 * new way (tG = try & get)
 * console.log(tG(() => a.b.c.name, 'Hello World'));
 */
export function tG<T>(fn: () => T, fallback: T = null): T {
  try {
    return fn() || fallback;
  } catch (e) {
    if (e instanceof TypeError) {
      return fallback;
    }
    throw e;
  }
}

/**
 * Given a location object, it returns a full url path
 * @param location location object
 * @returns full url path
 */
export const getHostHref = (location: Location): string => {
  const proto = location.protocol || 'http';
  const port = location.port ? ':' + location.port : '';
  const path = `${proto}//${location.hostname}${port}`;
  return path;
};

/**
 * Given a full name, it will return the best match for first and last name
 * @param fullName full name
 * @returns tokenized first and last names
 */
export const tokenizeFullName = (fullName: string) => {
  const tokenizedName = {
    firstName: '',
    lastName: '',
  };

  if (fullName.match(/^(.*\s+.*)+$/)) {
    const parts = fullName.replace(/\s\s+/g, ' ').split(' ');
    tokenizedName.firstName = parts[0];
    tokenizedName.lastName = parts.slice(1, parts.length).join(' ');
  }
  return tokenizedName;
};

/**
 * Checks if a date object is in the past (expired)
 * @param date date object
 * @returns returns true if date is passed
 */
export const isExpired = (date: Date) => {
  const now = Date.now();
  const expiry = new Date(date).getTime();
  return expiry < now;
};

/**
 * Return true if input is a function
 * @param value value of type any
 * @returns true if input is of type function
 */

export function isFunction(value: any): value is (...args: any[]) => any {
  return typeof value === 'function';
}

/**
 * A high performance low-collision unique number generator
 * @returns unique string
 */
export function getUniqueString(): string {
  return (Date.now() + Math.random()).toString(36);
}

/**
 * Simple Object DeepFreeze implementation
 * https://github.com/ngxs/store/blob/master/packages/store/src/utils/freeze.ts
 */
export const deepFreeze = (obj: any) => {
  Object.freeze(obj);
  const oIsFunction = isFunction(obj);

  Object.getOwnPropertyNames(obj).forEach(function (prop) {
    if (
      Object.prototype.hasOwnProperty.call(obj, prop) &&
      (oIsFunction
        ? prop !== 'caller' && prop !== 'callee' && prop !== 'arguments'
        : true) &&
      obj[prop] !== null &&
      (typeof obj[prop] === 'object' || typeof obj[prop] === 'function') &&
      !Object.isFrozen(obj[prop])
    ) {
      deepFreeze(obj[prop]);
    }
  });

  return obj;
};
