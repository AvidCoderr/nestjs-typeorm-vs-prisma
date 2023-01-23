/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license
 * that can be found at http://neekware.com/license/MIT.html
 */

import { tG } from "./util";

interface D {
  name: string;
}
interface C {
  name: string;
  d: D;
}
interface B {
  name: string;
  c?: C;
}
interface A {
  name: string;
  b: B;
}

const fullData: A = {
  name: 'A',
  b: {
    name: 'B',
    c: {
      name: 'C',
      d: {
        name: 'D',
      },
    },
  },
};

const partialData: A = {
  name: 'A',
  b: {
    name: 'B',
  },
};

const HELLO_WORLD = 'Hello World';

describe('tG (TypedGet)', function () {
  it('should get nested object attribute', () => {
    expect(tG(() => fullData.b.c.d.name)).toBe('D');
  });

  it('should get return null for undefined nested object attribute', () => {
    expect(tG(() => partialData.b.c.d.name)).toBe(null);
  });

  it('should get return default value for undefined nested object attribute', () => {
    expect(tG(() => partialData.b.c.d.name, HELLO_WORLD)).toBe(HELLO_WORLD);
  });

  it('should get the correct object type', () => {
    const isC = (obj): obj is C => obj !== undefined;
    const value = tG<C>(() => fullData.b.c);
    expect(value).toBeTruthy();
    expect(isC(value)).toBe(true);
  });

  it('should get the default value for undefined nested object', () => {
    const cObj: C = { name: 'C', d: { name: 'D' } };
    const value = tG<C>(() => partialData.b.c, cObj);
    expect(value).toBe(cObj);
  });

  it('should get the default value of defined type', () => {
    const value = tG<string>(() => partialData.b.c.d.name, HELLO_WORLD);
    expect(value).toBe(HELLO_WORLD);
    expect(typeof value === 'string').toBe(true);
  });

  it('should get the default value of inferred type', () => {
    const value = tG(() => partialData.b.c.d.name, HELLO_WORLD);
    expect(value).toBe(HELLO_WORLD);
    expect(typeof value === 'string').toBe(true);
  });
});
