import type { Lesson } from '../types';

/**
 * 第四章：联合类型与字面量类型
 * 对应文件：src/lessons/04-union-literal.ts
 */
export const lesson04: Lesson = {
  id: '04-union-literal',
  title: '第四章：联合类型与字面量类型',
  sections: [
    {
      title: '4.1 联合类型',
      description: '联合类型表示一个值可以是几种类型之一，使用 | 符号分隔。',
      code: `// 联合类型
let value: string | number;
value = "hello";
value = 42;
// value = true; // 错误！

// 函数参数使用联合类型
function formatValue(input: string | number): string {
  if (typeof input === "string") {
    return input.toUpperCase();
  } else {
    return input.toFixed(2);
  }
}

console.log(formatValue("hello"));
console.log(formatValue(3.14159));`,
      output: 'HELLO\n3.14',
    },
    {
      title: '4.2 字面量类型',
      description: '字面量类型允许你指定一个值只能是特定的字面量。',
      code: `// 字符串字面量类型
type Direction = "north" | "south" | "east" | "west";

function move(direction: Direction): string {
  return \`Moving \${direction}\`;
}

console.log(move("north"));
// console.log(move("up")); // 错误！

// 数字字面量类型
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;

function rollDice(): DiceRoll {
  return (Math.floor(Math.random() * 6) + 1) as DiceRoll;
}

console.log(rollDice());`,
      output: 'Moving north\n// 1-6 之间的随机数',
    },
    {
      title: '4.3 可辨识联合',
      description: '可辨识联合是一种特殊的联合类型，有一个共有的属性用来区分类型。',
      code: `// 可辨识联合
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

type Shape = Circle | Square | Rectangle;

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    case "rectangle":
      return shape.width * shape.height;
  }
}

console.log(getArea({ kind: "circle", radius: 5 }));
console.log(getArea({ kind: "square", sideLength: 4 }));`,
      output: '78.53981633974483\n16',
    },
    {
      title: '4.4 交叉类型',
      description: '交叉类型将多个类型合并为一个类型，使用 & 符号。',
      code: `// 交叉类型
interface Nameable {
  name: string;
}

interface Ageable {
  age: number;
}

type Person = Nameable & Ageable;

const person: Person = {
  name: "Alice",
  age: 25
};

// 多个接口的交叉
interface Loggable {
  log: (message: string) => void;
}

interface Serializable {
  serialize: () => string;
}

type Logger = Loggable & Serializable;

console.log(person.name);
console.log(person.age);`,
      output: 'Alice\n25',
    },
  ],
};