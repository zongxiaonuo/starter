/**
 * ============================================
 * 第 2 课：函数 (Functions)
 * ============================================
 *
 * TypeScript 给函数添加了：参数类型、返回值类型、可选参数、
 * 默认参数、剩余参数、函数重载等强大功能。
 */

// ---------- 1. 基本函数声明 ----------
// 给参数和返回值都加上类型注解
function add(x: number, y: number): number {
  return x + y;
}

// ---------- 2. 函数表达式 / 箭头函数 ----------
const multiply = (x: number, y: number): number => x * y;

// ---------- 3. 函数类型签名 ----------
// 把「函数」当作一种类型来声明
let myAdd: (a: number, b: number) => number;
myAdd = (a, b) => a + b; // a, b 自动被推断为 number

// ---------- 4. 可选参数 ?  ----------
// 在参数名后加 `?` 表示「可传可不传」
function buildName(firstName: string, lastName?: string): string {
  if (lastName) {
    return `${firstName} ${lastName}`;
  }
  return firstName;
}

console.log(buildName("Alice"));          // Alice
console.log(buildName("Alice", "Smith")); // Alice Smith

// ---------- 5. 默认参数 ----------
function greet(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}!`;
}

console.log(greet("Bob"));            // Hello, Bob!
console.log(greet("Bob", "你好"));    // 你好, Bob!

// ---------- 6. 剩余参数 (Rest Parameters) ----------
// 用 `...` 把多余的参数收集到一个数组里
function sum(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15

// ---------- 7. 函数返回 void ----------
// 没有返回值时用 void
function printLog(message: string): void {
  console.log(`[LOG]: ${message}`);
}

// ---------- 8. 函数重载 (Overloads) ----------
// 同一个函数名根据「参数不同」有不同的返回类型
function reverse(value: string): string;
function reverse(value: number[]): number[];
function reverse(value: string | number[]): string | number[] {
  if (typeof value === "string") {
    return value.split("").reverse().join("");
  }
  return value.slice().reverse();
}

console.log(reverse("hello"));      // "olleh"
console.log(reverse([1, 2, 3]));    // [3, 2, 1]

// ---------- 9. 高阶函数 (Higher-order functions) ----------
// 函数的参数也可以是另一个函数
function applyOperation(
  a: number,
  b: number,
  operation: (x: number, y: number) => number
): number {
  return operation(a, b);
}

console.log(applyOperation(3, 4, add));       // 7
console.log(applyOperation(3, 4, multiply));  // 12

// ✅ 小练习：写一个函数，接收一个字符串数组，返回每个字符串的长度数组
function getLengths(strs: string[]): number[] {
  return strs.map((s) => s.length);
}

console.log(getLengths(["hi", "hello", "world"])); // [2, 5, 5]

export { add, multiply, buildName, greet, sum, reverse, getLengths };