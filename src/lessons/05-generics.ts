/**
 * ============================================
 * 第 5 课：类型别名与泛型 (Type Alias & Generics)
 * ============================================
 *
 * 泛型 = 类型的「参数」
 * 让你写出「适用于多种类型」的代码，同时保留类型安全。
 */

// ---------- 1. 类型别名 type ----------
// 给一个类型起别名，方便复用
type ID = number | string;
type Point = { x: number; y: number };

const userId: ID = "u-001";
const origin: Point = { x: 0, y: 0 };

// ---------- 2. 为什么需要泛型？ ----------
// 假设我们要写「返回传入值」的函数：

// ❌ 写法一：用 any —— 失去了类型信息
function identityAny(value: any): any {
  return value;
}
const a = identityAny("hello"); // a 的类型是 any 😢

// ✅ 写法二：用泛型 —— 类型跟着输入走！
function identity<T>(value: T): T {
  return value;
}
const b = identity("hello"); // b 自动推断为 string ✅
const c = identity(123);     // c 自动推断为 number ✅

// 也可以显式指定类型参数
const d = identity<boolean>(true);

// ---------- 3. 泛型数组 ----------
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

const n1 = firstElement([1, 2, 3]);          // number | undefined
const s1 = firstElement(["a", "b", "c"]);    // string | undefined

// ---------- 4. 多个泛型参数 ----------
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const p1 = pair("hello", 123); // [string, number]

// ---------- 5. 泛型约束 (extends) ----------
// 给泛型加「最小要求」：必须有某些属性
interface HasLength {
  length: number;
}

// T 必须有 length 属性
function logLength<T extends HasLength>(item: T): T {
  console.log(`长度是: ${item.length}`);
  return item;
}

logLength("hello");        // ✅ 字符串有 length
logLength([1, 2, 3]);      // ✅ 数组有 length
logLength({ length: 10 }); // ✅ 对象有 length
// logLength(123);         // ❌ 数字没有 length

// ---------- 6. keyof 与索引访问 ----------
// keyof 拿到「对象所有 key 的联合类型」
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "Alice", age: 25, city: "Beijing" };
const name = getProperty(person, "name"); // string
const age = getProperty(person, "age");   // number
// getProperty(person, "email"); // ❌ 错误：person 没有 email

// ---------- 7. 泛型接口 ----------
interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

const userResponse: ApiResponse<{ name: string; age: number }> = {
  code: 200,
  message: "ok",
  data: { name: "Alice", age: 25 },
};

const listResponse: ApiResponse<number[]> = {
  code: 200,
  message: "ok",
  data: [1, 2, 3],
};

// ---------- 8. 泛型类 ----------
class Box<T> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }

  setValue(value: T): void {
    this.value = value;
  }
}

const stringBox = new Box<string>("hello");
console.log(stringBox.getValue()); // hello

const numberBox = new Box<number>(42);
console.log(numberBox.getValue()); // 42

// ---------- 9. 内置工具类型 (Utility Types) ----------
// TS 提供了一些常用的「类型操作工具」

interface Todo {
  id: number;
  title: string;
  done: boolean;
}

// Partial<T> —— 把所有属性变成可选
type PartialTodo = Partial<Todo>;
const t1: PartialTodo = { title: "学习 TS" }; // ✅ 不需要全部属性

// Required<T> —— 把所有属性变成必填（与 Partial 相反）
type RequiredTodo = Required<Todo>;

// Readonly<T> —— 把所有属性变成只读
type ReadonlyTodo = Readonly<Todo>;

// Pick<T, K> —— 挑选指定属性
type TodoPreview = Pick<Todo, "id" | "title">;
const t2: TodoPreview = { id: 1, title: "学习 TS" };

// Omit<T, K> —— 排除指定属性
type TodoWithoutId = Omit<Todo, "id">;
const t3: TodoWithoutId = { title: "学习 TS", done: false };

// Record<K, V> —— 构造一个对象类型
type PageInfo = Record<"home" | "about" | "contact", { url: string }>;
const pages: PageInfo = {
  home: { url: "/" },
  about: { url: "/about" },
  contact: { url: "/contact" },
};

// ✅ 小练习：写一个泛型函数 wrapInArray，把任意值包装成一个数组
function wrapInArray<T>(value: T): T[] {
  return [value];
}

console.log(wrapInArray("hello")); // ["hello"]
console.log(wrapInArray(123));     // [123]

export { identity, firstElement, getProperty, Box, ApiResponse };