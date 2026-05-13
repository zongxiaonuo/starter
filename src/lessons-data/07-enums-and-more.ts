import type { Lesson } from '../types';

/**
 * 第七章：枚举与进阶知识
 * 对应文件：src/lessons/07-enums-and-more.ts
 */
export const lesson07: Lesson = {
  id: '07-enums-and-more',
  title: '第七章：枚举与进阶知识',
  sections: [
    {
      title: '7.1 数字枚举与字符串枚举',
      description: '枚举（enum）用于定义一组命名常量。数字枚举默认从 0 递增，字符串枚举调试时更直观（推荐）。',
      code: `// 数字枚举
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right, // 3
}

console.log(Direction.Up);
console.log(Direction[0]); // 反向映射

// 指定起始值
enum StatusCode {
  OK = 200,
  BadRequest = 400,
  NotFound = 404,
}

// 字符串枚举（推荐）
enum LogLevel {
  Info = "INFO",
  Warn = "WARN",
  Error = "ERROR",
}

function log(level: LogLevel, message: string): void {
  console.log(\`[\${level}] \${message}\`);
}

log(LogLevel.Info, "服务启动");
log(LogLevel.Error, "出错了");`,
      output: '0\nUp\n[INFO] 服务启动\n[ERROR] 出错了',
    },
    {
      title: '7.2 typeof 与 as const',
      description: 'typeof 可以从一个值拿到它的类型；as const 让对象/数组的字段被推断为字面量类型并变为只读。',
      code: `// typeof 类型操作符
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

// as const - 字面量推断
const obj1 = { name: "Alice", role: "admin" };
// obj1.role 的类型是 string

const obj2 = { name: "Alice", role: "admin" } as const;
// obj2.role 的类型是 "admin"

const colors = ["red", "green", "blue"] as const;
type ColorName = typeof colors[number]; // "red" | "green" | "blue"

console.log(newConfig.host);
console.log(obj2.role);`,
      output: '127.0.0.1\nadmin',
    },
    {
      title: '7.3 可选链 ?. 与空值合并 ??',
      description: '?. 在某段为 null/undefined 时直接返回 undefined；?? 仅在左边为 null/undefined 时使用右边（区别于 ||）。',
      code: `interface UserProfile {
  name: string;
  address?: {
    city?: string;
    zip?: string;
  };
}

const profile: UserProfile = { name: "Alice" };

// 可选链
const city = profile.address?.city; // string | undefined

// 空值合并
const cityName = profile.address?.city ?? "未知城市";
console.log(cityName);

// ?? 与 || 的区别
const count = 0;
console.log(count || 10); // 10  ← 0 被当成假值
console.log(count ?? 10); // 0   ← 0 是有效值`,
      output: '未知城市\n10\n0',
    },
    {
      title: '7.4 类型守卫与综合实战',
      description: '使用 `is` 关键字定义类型谓词函数，让 TypeScript 能在分支中精确推断类型。综合枚举、接口、类构建一个待办系统。',
      code: `// 类型守卫
interface Cat { meow(): void; }
interface Bird { fly(): void; }

function isCat(animal: Cat | Bird): animal is Cat {
  return (animal as Cat).meow !== undefined;
}

// 综合实战：待办事项
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

  print(): void {
    console.log("=== TODO LIST ===");
    this.todos.forEach((t) => {
      const mark = t.status === TodoStatus.Done ? "[x]" : "[ ]";
      console.log(\`\${mark} #\${t.id} \${t.title}\`);
    });
  }
}

const list = new TodoList();
list.add("学习 TypeScript 基本类型");
list.add("学习接口和泛型");
list.add("做一个练习项目");
list.complete(1);
list.print();`,
      output: '=== TODO LIST ===\n[x] #1 学习 TypeScript 基本类型\n[ ] #2 学习接口和泛型\n[ ] #3 做一个练习项目',
    },
  ],
};