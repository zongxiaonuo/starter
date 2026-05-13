import type { Lesson } from '../types';

/**
 * 第一章：基本类型
 * 对应文件：src/lessons/01-basic-types.ts
 */
export const lesson01: Lesson = {
  id: '01-basic-types',
  title: '第一章：基本类型',
  sections: [
    {
      title: '1.1 原始类型',
      description: 'TypeScript 支持 JavaScript 的所有原始类型，包括 string、number、boolean、null、undefined 和 symbol。',
      code: `// 字符串类型
let name: string = "TypeScript";
let message: string = \`Hello, \${name}!\`;

// 数字类型
let age: number = 25;
let price: number = 99.99;

// 布尔类型
let isActive: boolean = true;
let isDone: boolean = false;

// null 和 undefined
let n: null = null;
let u: undefined = undefined;`,
      output: '// 这些是基本的类型注解\n// TypeScript 会在编译时检查类型正确性',
    },
    {
      title: '1.2 数组类型',
      description: '有两种方式定义数组类型：在元素类型后加上 []，或使用 Array<元素类型> 泛型。',
      code: `// 方式一：使用 []
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["Alice", "Bob", "Charlie"];

// 方式二：使用 Array 泛型
let scores: Array<number> = [90, 85, 95];
let fruits: Array<string> = ["apple", "banana", "orange"];

// 只读数组
let readOnlyNumbers: readonly number[] = [1, 2, 3];`,
      output: '// 数组类型确保数组中的元素都是指定类型\n// numbers.push("string"); // 错误！',
    },
    {
      title: '1.3 元组类型',
      description: '元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。',
      code: `// 定义一个元组类型
let person: [string, number, boolean] = ["Alice", 25, true];

// 访问元素
console.log(person[0]); // "Alice"
console.log(person[1]); // 25

// 解构赋值
let [userName, userAge] = person;

// 可选元素
let optionalTuple: [string, number?] = ["Bob"];`,
      output: '// 元组的长度是固定的\n// 每个位置的类型也是固定的',
    },
    {
      title: '1.4 any 和 unknown 类型',
      description: 'any 类型可以是任何类型，unknown 类型也可以是任何类型但更安全。',
      code: `// any 类型 - 跳过类型检查
let anything: any = "hello";
anything = 42;
anything = true;
anything(); // 运行时可能出错

// unknown 类型 - 需要类型检查
let unknownValue: unknown = "hello";
if (typeof unknownValue === "string") {
  console.log(unknownValue.toUpperCase());
}`,
      output: '// 建议优先使用 unknown 而不是 any\n// unknown 更安全，强制进行类型检查',
    },
  ],
};