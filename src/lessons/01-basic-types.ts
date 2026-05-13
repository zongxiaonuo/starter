/**
 * ============================================
 * 第 1 课：基本类型 (Basic Types)
 * ============================================
 *
 * TypeScript 是 JavaScript 的超集，最大特点是「静态类型」。
 * 在变量名后用 `: 类型` 来声明它的类型。
 */

// ---------- 1. 布尔值 boolean ----------
let isDone: boolean = false;
isDone = true;
// isDone = "yes"; // ❌ 错误：不能把字符串赋给 boolean

// ---------- 2. 数字 number ----------
// TypeScript 中所有数字都是浮点数（包括整数）
let decimal: number = 6;
let hex: number = 0xf00d;       // 十六进制
let binary: number = 0b1010;    // 二进制
let octal: number = 0o744;      // 八进制

// ---------- 3. 字符串 string ----------
let myName: string = "Alice";
let sentence: string = `Hello, my name is ${myName}`; // 模板字符串

// ---------- 4. 数组 Array ----------
// 写法一：类型[]
let list1: number[] = [1, 2, 3];
// 写法二：Array<类型>（泛型写法）
let list2: Array<string> = ["a", "b", "c"];

// ---------- 5. 元组 Tuple ----------
// 元组是「固定长度、每个位置类型确定」的数组
let person: [string, number] = ["Alice", 25];
// person = [25, "Alice"]; // ❌ 错误：顺序不对

// ---------- 6. 任意类型 any ----------
// any 表示「关闭类型检查」，能赋什么都行 —— 谨慎使用！
let anything: any = 4;
anything = "string";
anything = false;

// ---------- 7. unknown ----------
// unknown 比 any 更安全：必须先「检查类型」才能使用
let value: unknown = "hello";
if (typeof value === "string") {
  console.log(value.toUpperCase()); // ✅ 检查后才能调用 string 方法
}

// ---------- 8. void / null / undefined ----------
// void 通常用于「没有返回值的函数」
function logMessage(msg: string): void {
  console.log(msg);
}

let n: null = null;
let u: undefined = undefined;

// ---------- 9. never ----------
// never 表示「永远不会有返回值」（如抛异常或死循环）
function throwError(message: string): never {
  throw new Error(message);
}

// ---------- 10. 类型推断 (Type Inference) ----------
// 如果你不写类型，TS 会自己「猜」一个：
let inferred = "hello"; // TS 推断为 string
// inferred = 123;      // ❌ 错误

// ✅ 小练习：把下面的 any 替换成正确的具体类型
let age: number = 18;
let username: string = "Bob";
let isAdmin: boolean = true;

export { age, username, isAdmin, logMessage, throwError };