// src/js/index.js
// ES6 모듈
import { pi, power, Foo } from './lib.js';

console.log(pi);
console.log(power(pi, pi));

const f = new Foo();
console.log(f.foo());
console.log(f.bar());
