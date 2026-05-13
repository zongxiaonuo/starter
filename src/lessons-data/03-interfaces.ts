import type { Lesson } from '../types';

/**
 * 第三章：接口
 * 对应文件：src/lessons/03-interfaces.ts
 */
export const lesson03: Lesson = {
  id: '03-interfaces',
  title: '第三章：接口',
  sections: [
    {
      title: '3.1 接口基础',
      description: '接口用于定义对象的形状，描述对象应该有哪些属性和方法。',
      code: `// 定义接口
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

// 使用接口
const user: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  isActive: true
};

// 接口也可以描述函数类型
interface GreetFunction {
  (name: string): string;
}

const greet: GreetFunction = (name) => \`Hello, \${name}\`;`,
      output: '// 接口定义了契约\n// 对象必须包含接口中定义的所有必需属性',
    },
    {
      title: '3.2 可选属性和只读属性',
      description: '接口支持可选属性和只读属性。',
      code: `interface Config {
  readonly apiKey: string;      // 只读属性
  endpoint: string;
  timeout?: number;             // 可选属性
  debugMode?: boolean;
}

const config: Config = {
  apiKey: "secret-123",
  endpoint: "https://api.example.com"
  // timeout 和 debugMode 是可选的
};

console.log(config.apiKey);
// config.apiKey = "new-key"; // 错误！只读属性不能修改`,
      output: 'secret-123\n// 只读属性在初始化后不能修改',
    },
    {
      title: '3.3 索引签名',
      description: '索引签名用于描述通过索引得到的类型。',
      code: `// 字符串索引签名
interface StringDictionary {
  [key: string]: string;
}

const colors: StringDictionary = {
  red: "#ff0000",
  green: "#00ff00",
  blue: "#0000ff"
};

// 数字索引签名
interface NumberArray {
  [index: number]: number;
}

const scores: NumberArray = [90, 85, 95];

console.log(colors.red);
console.log(scores[0]);`,
      output: '#ff0000\n90',
    },
    {
      title: '3.4 接口继承',
      description: '接口可以继承其他接口，实现接口的复用和扩展。',
      code: `// 基础接口
interface Person {
  name: string;
  age: number;
}

// 继承接口
interface Employee extends Person {
  employeeId: number;
  department: string;
}

// 使用继承后的接口
const employee: Employee = {
  name: "Bob",
  age: 30,
  employeeId: 1001,
  department: "Engineering"
};

// 多继承
interface Manager extends Employee {
  teamSize: number;
}

console.log(employee.name);
console.log(employee.department);`,
      output: 'Bob\nEngineering',
    },
  ],
};