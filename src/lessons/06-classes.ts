/**
 * ============================================
 * 第 6 课：类 (Class)
 * ============================================
 *
 * TypeScript 在 JavaScript 的 class 基础上增加了：
 * 类型注解、访问修饰符 (public/private/protected)、
 * abstract、implements、参数属性等。
 */

// ---------- 1. 基本类 ----------
class Person {
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
    return `Hi, I'm ${this.name}, ${this.age} years old.`;
  }
}

const alice = new Person("Alice", 25);
console.log(alice.greet());

// ---------- 2. 访问修饰符 ----------
// public    —— 公开（默认）
// private   —— 仅类内部可访问
// protected —— 类和子类可访问
class BankAccount {
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
    return this.balance; // ✅ 内部能访问 private
  }
}

const account = new BankAccount("Alice", 1000);
account.deposit(500);
console.log(account.getBalance()); // 1500
// console.log(account.balance);   // ❌ 错误：balance 是 private

// ---------- 3. 参数属性 (简写) ----------
// 在构造函数参数前加修饰符，自动声明并赋值字段 —— 超方便！
class Product {
  constructor(
    public name: string,
    public price: number,
    private stock: number
  ) {
    // 不用再写 this.name = name; 等等
  }

  isAvailable(): boolean {
    return this.stock > 0;
  }
}

const apple = new Product("Apple", 5, 100);
console.log(apple.name, apple.price, apple.isAvailable());

// ---------- 4. readonly 字段 ----------
class Circle {
  readonly pi: number = 3.14159;

  constructor(public radius: number) {}

  area(): number {
    return this.pi * this.radius ** 2;
  }
}

// ---------- 5. 继承 (extends) ----------
class Animal {
  constructor(public name: string) {}

  move(distance: number): void {
    console.log(`${this.name} moved ${distance}m`);
  }
}

class Dog extends Animal {
  // 子类可以加新方法
  bark(): void {
    console.log(`${this.name}: Woof!`);
  }

  // 重写父类方法
  override move(distance: number): void {
    console.log(`${this.name} (a dog) ran ${distance}m`);
    super.move(distance); // 调用父类方法
  }
}

const buddy = new Dog("Buddy");
buddy.bark();
buddy.move(10);

// ---------- 6. 抽象类 (abstract) ----------
// 抽象类不能直接 new，只能被继承
// 用来定义「子类必须实现」的接口
abstract class Shape {
  abstract area(): number; // 抽象方法，子类必须实现

  // 普通方法，子类可以直接用
  describe(): void {
    console.log(`这是一个形状，面积是 ${this.area()}`);
  }
}

class Square extends Shape {
  constructor(public size: number) {
    super();
  }

  // 必须实现 area
  area(): number {
    return this.size * this.size;
  }
}

const sq = new Square(5);
sq.describe(); // 这是一个形状，面积是 25
// new Shape(); // ❌ 错误：不能 new 抽象类

// ---------- 7. implements 实现接口 ----------
// 类可以「实现」一个接口（保证有这些方法/属性）
interface Printable {
  print(): void;
}

interface Saveable {
  save(): void;
}

// 一个类可以实现多个接口
class Document implements Printable, Saveable {
  constructor(public content: string) {}

  print(): void {
    console.log(`打印: ${this.content}`);
  }

  save(): void {
    console.log(`保存: ${this.content}`);
  }
}

const doc = new Document("Hello");
doc.print();
doc.save();

// ---------- 8. 静态成员 (static) ----------
// static 属于「类本身」，不属于某个实例
class MathUtil {
  static PI = 3.14159;

  static square(x: number): number {
    return x * x;
  }
}

console.log(MathUtil.PI);          // 3.14159
console.log(MathUtil.square(5));   // 25
// new MathUtil().square(5);       // ❌ 静态方法不能在实例上调用

// ---------- 9. getter / setter ----------
class Temperature {
  private _celsius: number = 0;

  get celsius(): number {
    return this._celsius;
  }

  set celsius(value: number) {
    if (value < -273.15) {
      throw new Error("温度不能低于绝对零度");
    }
    this._celsius = value;
  }

  // 派生属性
  get fahrenheit(): number {
    return this._celsius * 9 / 5 + 32;
  }
}

const temp = new Temperature();
temp.celsius = 100;             // 调用 setter
console.log(temp.celsius);      // 100  调用 getter
console.log(temp.fahrenheit);   // 212

// ✅ 小练习：写一个 Stack<T> 类，支持 push / pop / peek / size
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

  get size(): number {
    return this.items.length;
  }
}

const stack = new Stack<number>();
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.peek()); // 3
console.log(stack.pop());  // 3
console.log(stack.size);   // 2

export { Person, BankAccount, Product, Animal, Dog, Shape, Square, Stack };