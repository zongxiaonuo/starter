/**
 * ============================================
 * 第 7 课：枚举与常用进阶知识点
 * ============================================
 */

// ---------- 1. 数字枚举 ----------
// 默认从 0 开始递增
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right, // 3
}

console.log(Direction.Up);     // 0
console.log(Direction[0]);     // "Up" （数字枚举支持反向映射）

// 也可以指定起始值
enum StatusCode {
  OK = 200,
  BadRequest = 400,
  NotFound = 404,
  ServerError = 500,
}

// ---------- 2. 字符串枚举 ----------
// 推荐使用 —— 调试时更直观
enum LogLevel {
  Info = "INFO",
  Warn = "WARN",
  Error = "ERROR",
}

function log(level: LogLevel, message: string): void {
  console.log(`[${level}] ${message}`);
}

log(LogLevel.Info, "服务启动");
log(LogLevel.Error, "出错了");

// ---------- 3. const enum ----------
// const enum 在编译时会被「内联」，运行时没有对象，性能更好
const enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE",
}

const c = Color.Red; // 编译后直接变成 "RED"

// ---------- 4. 用「字面量联合」代替枚举（更现代的做法）----------
// 很多团队现在更推荐用字面量联合而不是 enum
type Theme = "light" | "dark" | "auto";

function setTheme(theme: Theme): void {
  console.log(`切换主题: ${theme}`);
}

setTheme("dark");

// ===========================================
// 进阶知识点
// ===========================================

// ---------- 5. typeof 类型操作符 ----------
// 从一个「值」拿到它的「类型」
const config = {
  host: "localhost",
  port: 3000,
  debug: true,
};

type Config = typeof config;
// 等价于 { host: string; port: number; debug: boolean; }

const newConfig: Config = {
  host: "127.0.0.1",
  port: 8080,
  debug: false,
};

// ---------- 6. as const —— 字面量推断 ----------
// 普通对象会被推断为「宽松类型」
const obj1 = { name: "Alice", role: "admin" };
// obj1.role 的类型是 string

// 加 as const 后，所有字段变成「字面量类型 + readonly」
const obj2 = { name: "Alice", role: "admin" } as const;
// obj2.role 的类型是 "admin"

const colors = ["red", "green", "blue"] as const;
// colors 的类型是 readonly ["red", "green", "blue"]
type ColorName = typeof colors[number]; // "red" | "green" | "blue"

// ---------- 7. 可选链 ?. 与空值合并 ?? ----------
interface UserProfile {
  name: string;
  address?: {
    city?: string;
    zip?: string;
  };
}

const profile: UserProfile = { name: "Alice" };

// ?. 可选链：如果某一段是 null/undefined，就直接返回 undefined，不报错
const city = profile.address?.city; // string | undefined

// ?? 空值合并：左边是 null/undefined 时用右边
const cityName = profile.address?.city ?? "未知城市";
console.log(cityName); // 未知城市

// ⚠️ 注意 ?? 和 || 的区别：
//   - ||  把 0 / "" / false 也当成「假值」
//   - ??  只在 null / undefined 时才用右边
const count = 0;
console.log(count || 10); // 10  ← 0 被当成假值
console.log(count ?? 10); // 0   ← 0 是有效值

// ---------- 8. 类型守卫函数 (Type Predicates) ----------
// 用 `is` 关键字告诉 TS：这个函数能「判定类型」
interface Cat {
  meow(): void;
}
interface Bird {
  fly(): void;
}

function isCat(animal: Cat | Bird): animal is Cat {
  return (animal as Cat).meow !== undefined;
}

function makeSound(animal: Cat | Bird): void {
  if (isCat(animal)) {
    animal.meow(); // ✅ TS 知道这里是 Cat
  } else {
    animal.fly();  // ✅ 否则是 Bird
  }
}

// ---------- 9. 模块导入导出 ----------
// 见 module-demo.ts —— 推荐使用 ES Modules 语法：
//   export / export default / import
// 例如：
//   export const PI = 3.14;
//   import { PI } from "./constants";

// ---------- 10. 处理外部库（声明文件 .d.ts）----------
// 当你 import 一个 JS 库时，TS 需要它的类型声明：
//   - 库自带：直接用
//   - 没有：从 DefinitelyTyped 安装 @types/xxx
//     例：npm install --save-dev @types/lodash

// ✅ 综合小练习：实现一个简单的「待办事项」系统
enum TodoStatus {
  Pending = "PENDING",
  Done = "DONE",
}

interface TodoItem {
  id: number;
  title: string;
  status: TodoStatus;
}

class TodoList {
  private todos: TodoItem[] = [];
  private nextId: number = 1;

  add(title: string): TodoItem {
    const todo: TodoItem = {
      id: this.nextId++,
      title,
      status: TodoStatus.Pending,
    };
    this.todos.push(todo);
    return todo;
  }

  complete(id: number): boolean {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) return false;
    todo.status = TodoStatus.Done;
    return true;
  }

  remove(id: number): boolean {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index === -1) return false;
    this.todos.splice(index, 1);
    return true;
  }

  filter(status?: TodoStatus): TodoItem[] {
    if (!status) return [...this.todos];
    return this.todos.filter((t) => t.status === status);
  }

  print(): void {
    console.log("=== TODO LIST ===");
    this.todos.forEach((t) => {
      const mark = t.status === TodoStatus.Done ? "[x]" : "[ ]";
      console.log(`${mark} #${t.id} ${t.title}`);
    });
  }
}

const list = new TodoList();
list.add("学习 TypeScript 基本类型");
list.add("学习接口和泛型");
list.add("做一个练习项目");
list.complete(1);
list.print();

export { Direction, LogLevel, TodoStatus, TodoList };