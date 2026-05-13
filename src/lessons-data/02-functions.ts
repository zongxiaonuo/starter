import type { Lesson } from '../types';

/**
 * 第二章：函数
 * 对应文件：src/lessons/02-functions.ts
 */
export const lesson02: Lesson = {
  id: '02-functions',
  title: '第二章：函数',
  sections: [
    {
      title: '2.1 函数类型注解',
      description: '可以为函数的参数和返回值添加类型注解。',
      code: `// 函数声明
function add(a: number, b: number): number {
  return a + b;
}

// 函数表达式
let multiply = function(a: number, b: number): number {
  return a * b;
};

// 箭头函数
let divide = (a: number, b: number): number => a / b;

// 调用函数
console.log(add(5, 3));      // 8
console.log(multiply(4, 2)); // 8`,
      output: '8\n8',
    },
    {
      title: '2.2 可选参数和默认参数',
      description: 'TypeScript 支持可选参数和带默认值的参数。',
      code: `// 可选参数（使用 ?）
function greet(name: string, greeting?: string): string {
  if (greeting) {
    return \`\${greeting}, \${name}!\`;
  }
  return \`Hello, \${name}!\`;
}

// 默认参数
function createUser(
  name: string,
  role: string = "user"
): object {
  return { name, role };
}

console.log(greet("Alice"));
console.log(greet("Bob", "Good morning"));
console.log(createUser("Charlie"));`,
      output: 'Hello, Alice!\nGood morning, Bob!\n{ name: "Charlie", role: "user" }',
    },
    {
      title: '2.3 剩余参数',
      description: '使用 ... 语法表示剩余参数，可以接收任意数量的参数。',
      code: `// 剩余参数
function sum(...numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}

// 结合普通参数和剩余参数
function concatenate(
  separator: string,
  ...strings: string[]
): string {
  return strings.join(separator);
}

console.log(sum(1, 2, 3, 4, 5));
console.log(concatenate("-", "a", "b", "c"));`,
      output: '15\na-b-c',
    },
    {
      title: '2.4 函数重载',
      description: '函数重载允许同一个函数有多个函数类型定义。',
      code: `// 函数重载定义
function process(input: string): string;
function process(input: number): number;
function process(input: boolean): boolean;

// 函数实现
function process(input: string | number | boolean): string | number | boolean {
  if (typeof input === "string") {
    return input.toUpperCase();
  } else if (typeof input === "number") {
    return input * 2;
  } else {
    return !input;
  }
}

console.log(process("hello"));
console.log(process(10));
console.log(process(true));`,
      output: 'HELLO\n20\nfalse',
    },
  ],
};