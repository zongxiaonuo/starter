import type { Lesson } from '../types';

/**
 * 第六章：类 (Class)
 * 对应文件：src/lessons/06-classes.ts
 */
export const lesson06: Lesson = {
  id: '06-classes',
  title: '第六章：类 (Class)',
  sections: [
    {
      title: '6.1 基本类',
      description: 'TypeScript 在 JavaScript 的 class 基础上增加了类型注解、访问修饰符等。',
      code: `class Person {
  // 字段必须先声明类型
  name: string;
  age: number;

  // 构造函数
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  // 方法
  greet(): string {
    return \`Hi, I'm \${this.name}, \${this.age} years old.\`;
  }
}

const alice = new Person("Alice", 25);
console.log(alice.greet());`,
      output: "Hi, I'm Alice, 25 years old.",
    },
    {
      title: '6.2 访问修饰符与参数属性',
      description: 'public（默认公开）、private（仅类内部）、protected（类和子类）。在构造函数参数前加修饰符可自动声明并赋值字段。',
      code: `class BankAccount {
  public owner: string;       // 任何地方都能访问
  private balance: number;    // 只有这个类自己能访问
  protected bankName: string; // 自身 + 子类能访问

  constructor(owner: string, initialBalance: number) {
    this.owner = owner;
    this.balance = initialBalance;
    this.bankName = "MyBank";
  }

  deposit(amount: number): void {
    this.balance += amount;
  }

  getBalance(): number {
    return this.balance;
  }
}

// 参数属性 - 简写
class Product {
  constructor(
    public name: string,
    public price: number,
    private stock: number
  ) {}

  isAvailable(): boolean {
    return this.stock > 0;
  }
}

const account = new BankAccount("Alice", 1000);
account.deposit(500);
console.log(account.getBalance());

const apple = new Product("Apple", 5, 100);
console.log(apple.name, apple.price, apple.isAvailable());`,
      output: '1500\nApple 5 true',
    },
    {
      title: '6.3 继承与抽象类',
      description: '使用 extends 实现继承，使用 abstract 定义抽象类（不能直接 new，子类必须实现抽象方法）。',
      code: `// 继承
class Animal {
  constructor(public name: string) {}

  move(distance: number): void {
    console.log(\`\${this.name} moved \${distance}m\`);
  }
}

class Dog extends Animal {
  bark(): void {
    console.log(\`\${this.name}: Woof!\`);
  }

  override move(distance: number): void {
    console.log(\`\${this.name} (a dog) ran \${distance}m\`);
    super.move(distance);
  }
}

// 抽象类
abstract class Shape {
  abstract area(): number;

  describe(): void {
    console.log(\`这是一个形状，面积是 \${this.area()}\`);
  }
}

class Square extends Shape {
  constructor(public size: number) { super(); }
  area(): number { return this.size * this.size; }
}

const buddy = new Dog("Buddy");
buddy.bark();
buddy.move(10);

const sq = new Square(5);
sq.describe();`,
      output: 'Buddy: Woof!\nBuddy (a dog) ran 10m\nBuddy moved 10m\n这是一个形状，面积是 25',
    },
    {
      title: '6.4 实现接口、静态成员与 getter/setter',
      description: '类可以使用 implements 实现接口；static 属于类本身；get/set 提供属性访问器。',
      code: `// 实现接口
interface Printable { print(): void; }
interface Saveable { save(): void; }

class Document implements Printable, Saveable {
  constructor(public content: string) {}
  print(): void { console.log(\`打印: \${this.content}\`); }
  save(): void { console.log(\`保存: \${this.content}\`); }
}

// 静态成员
class MathUtil {
  static PI = 3.14159;
  static square(x: number): number { return x * x; }
}

// getter / setter
class Temperature {
  private _celsius: number = 0;

  get celsius(): number { return this._celsius; }
  set celsius(value: number) {
    if (value < -273.15) throw new Error("温度不能低于绝对零度");
    this._celsius = value;
  }
  get fahrenheit(): number { return this._celsius * 9 / 5 + 32; }
}

const doc = new Document("Hello");
doc.print();

console.log(MathUtil.PI);
console.log(MathUtil.square(5));

const temp = new Temperature();
temp.celsius = 100;
console.log(temp.celsius);
console.log(temp.fahrenheit);`,
      output: '打印: Hello\n3.14159\n25\n100\n212',
    },
  ],
};