import type { Lesson } from '../types';

/**
 * 第五章：泛型
 * 对应文件：src/lessons/05-generics.ts
 */
export const lesson05: Lesson = {
  id: '05-generics',
  title: '第五章：泛型',
  sections: [
    {
      title: '5.1 泛型基础',
      description: '泛型允许创建可重用的组件，能够支持多种类型而不丢失类型信息。',
      code: `// 泛型函数
function identity<T>(arg: T): T {
  return arg;
}

// 使用方式一：明确指定类型
let result1 = identity<string>("hello");

// 使用方式二：类型推断
let result2 = identity(42);

// 泛型接口
interface Container<T> {
  value: T;
  getValue(): T;
}

const numberContainer: Container<number> = {
  value: 42,
  getValue() { return this.value; }
};

console.log(result1);
console.log(result2);
console.log(numberContainer.getValue());`,
      output: 'hello\n42\n42',
    },
    {
      title: '5.2 泛型约束',
      description: '可以对泛型类型进行约束，限制它必须符合某些条件。',
      code: `// 定义约束接口
interface Lengthwise {
  length: number;
}

// 使用约束的泛型函数
function logLength<T extends Lengthwise>(arg: T): T {
  console.log(\`Length: \${arg.length}\`);
  return arg;
}

logLength("hello");       // 字符串有 length 属性
logLength([1, 2, 3]);     // 数组有 length 属性
logLength({ length: 10 }); // 对象有 length 属性

// 在约束中使用类型参数
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

const person = { name: "Alice", age: 25 };
console.log(getProperty(person, "name"));`,
      output: 'Length: 5\nLength: 3\nLength: 10\nAlice',
    },
    {
      title: '5.3 泛型类',
      description: '类也可以使用泛型。',
      code: `// 泛型类
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  size(): number {
    return this.items.length;
  }
}

// 使用泛型类
const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
numberStack.push(3);
console.log(numberStack.pop());
console.log(numberStack.peek());
console.log(numberStack.size());`,
      output: '3\n2\n2',
    },
    {
      title: '5.4 泛型工具类型',
      description: 'TypeScript 提供了一些内置的泛型工具类型。',
      code: `interface Person {
  name: string;
  age: number;
  address: string;
}

// Partial - 所有属性变为可选
type PartialPerson = Partial<Person>;
const partialPerson: PartialPerson = { name: "Alice" };

// Required - 所有属性变为必需
type RequiredPerson = Required<PartialPerson>;

// Readonly - 所有属性变为只读
type ReadonlyPerson = Readonly<Person>;

// Pick - 选取部分属性
type PersonName = Pick<Person, "name">;

// Omit - 排除部分属性
type PersonWithoutAddress = Omit<Person, "address">;

console.log(partialPerson);`,
      output: '{ name: "Alice" }',
    },
  ],
};