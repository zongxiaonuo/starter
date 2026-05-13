/**
 * ============================================
 * 第 3 课：接口与对象类型 (Interfaces)
 * ============================================
 *
 * 接口（interface）用来「描述对象的形状」，
 * 是 TypeScript 中最常用、最重要的概念之一。
 */

// ---------- 1. 基本接口 ----------
interface User {
  name: string;
  age: number;
}

const user1: User = {
  name: "Alice",
  age: 25,
};

// const user2: User = { name: "Bob" }; // ❌ 错误：缺少 age 属性

// ---------- 2. 可选属性 ?  ----------
interface Config {
  url: string;
  method?: string;  // 可选
  timeout?: number; // 可选
}

const config1: Config = { url: "/api/users" };                    // ✅
const config2: Config = { url: "/api/users", method: "POST" };    // ✅

// ---------- 3. 只读属性 readonly ----------
// readonly 表示属性赋值后不能再改
interface Point {
  readonly x: number;
  readonly y: number;
}

const p: Point = { x: 10, y: 20 };
// p.x = 100; // ❌ 错误：x 是只读的

// ---------- 4. 函数类型接口 ----------
// 接口也能描述「函数」的形状
interface SearchFunc {
  (source: string, keyword: string): boolean;
}

const mySearch: SearchFunc = (src, kw) => src.includes(kw);
console.log(mySearch("Hello World", "World")); // true

// ---------- 5. 索引签名 (Index Signature) ----------
// 当对象的 key 数量不确定时使用
interface StringDictionary {
  [key: string]: string;
}

const colors: StringDictionary = {
  red: "#FF0000",
  green: "#00FF00",
  blue: "#0000FF",
};
console.log(colors["red"]); // #FF0000

// ---------- 6. 接口继承 (extends) ----------
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

const myDog: Dog = {
  name: "Buddy",
  breed: "Golden Retriever",
};

// ---------- 7. 多重继承 ----------
interface Swimmer {
  swim(): void;
}

interface Flyer {
  fly(): void;
}

interface Duck extends Animal, Swimmer, Flyer {
  quack(): void;
}

const donald: Duck = {
  name: "Donald",
  swim() { console.log("游泳"); },
  fly() { console.log("飞行"); },
  quack() { console.log("呱呱"); },
};

// ---------- 8. interface vs type ----------
// 两者大部分情况可互换：
//   - interface 适合「描述对象/类」，可以被同名声明合并
//   - type 更灵活，可以表示联合类型、元组等

interface Cat1 {
  name: string;
}
interface Cat1 {
  age: number; // ✅ 同名 interface 自动合并
}
const cat: Cat1 = { name: "Tom", age: 3 };

// type 不能合并
type Cat2 = { name: string };
// type Cat2 = { age: number }; // ❌ 错误

// ✅ 小练习：定义一个 Book 接口，包含书名、作者、页数（可选）和一个 read 方法
interface Book {
  title: string;
  author: string;
  pages?: number;
  read(): void;
}

const myBook: Book = {
  title: "TypeScript 入门",
  author: "你",
  read() {
    console.log(`正在阅读《${this.title}》`);
  },
};

myBook.read();

export { User, Config, Point, Animal, Dog, Book };