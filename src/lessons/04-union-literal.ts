/**
 * ============================================
 * 第 4 课：联合类型与字面量类型
 * ============================================
 *
 * 联合类型 (Union)：一个变量可能是「这种或那种」类型
 * 字面量类型 (Literal)：把「具体的值」也当成类型
 */

// ---------- 1. 联合类型 | ----------
// 用 | 把多个类型「或」起来
let id: number | string;
id = 123;       // ✅
id = "abc-456"; // ✅
// id = true;   // ❌ 错误

// ---------- 2. 类型守卫 (Type Guard) ----------
// 联合类型变量在使用前，需要「窄化」类型
function printId(value: number | string): void {
  if (typeof value === "string") {
    // 在这个分支里，value 被 TS 自动推断为 string
    console.log(value.toUpperCase());
  } else {
    // 这里 value 自动是 number
    console.log(value.toFixed(2));
  }
}

printId(123.456);   // 123.46
printId("hello");   // HELLO

// ---------- 3. 字面量类型 ----------
// 把「具体的值」当作类型
let direction: "up" | "down" | "left" | "right";
direction = "up";   // ✅
// direction = "north"; // ❌ 错误：不在允许的字面量集合里

// 数字字面量
let dieRoll: 1 | 2 | 3 | 4 | 5 | 6;
dieRoll = 3;
// dieRoll = 7; // ❌ 错误

// 布尔字面量
let success: true;
success = true;
// success = false; // ❌ 错误

// ---------- 4. 联合 + 字面量：超常用！ ----------
// 实际项目中常用「字符串字面量联合」做枚举
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

function request(url: string, method: HttpMethod): void {
  console.log(`${method} ${url}`);
}

request("/api/users", "GET");
request("/api/users", "POST");
// request("/api/users", "PATCH"); // ❌ 错误

// ---------- 5. 可辨识联合 (Discriminated Unions) ----------
// 高级用法：用「公共字段」来区分不同的对象类型
interface Circle {
  kind: "circle";   // 这个字段是「判别符」
  radius: number;
}

interface Square {
  kind: "square";
  size: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

type Shape = Circle | Square | Rectangle;

function area(shape: Shape): number {
  // 通过 kind 字段，TS 能精准推断出当前 shape 的类型
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.size ** 2;
    case "rectangle":
      return shape.width * shape.height;
  }
}

console.log(area({ kind: "circle", radius: 5 }));               // 78.54
console.log(area({ kind: "square", size: 4 }));                 // 16
console.log(area({ kind: "rectangle", width: 3, height: 5 })); // 15

// ---------- 6. 类型断言 (Type Assertion) ----------
// 当你「比 TS 更清楚」类型时，用 as 来告诉它
const someValue: unknown = "this is a string";
const strLength: number = (someValue as string).length;
console.log(strLength); // 16

// ✅ 小练习：定义一个 Status 类型，只能是 "pending" / "success" / "failed"
type Status = "pending" | "success" | "failed";

function handleStatus(status: Status): string {
  switch (status) {
    case "pending":
      return "处理中...";
    case "success":
      return "成功 ✅";
    case "failed":
      return "失败 ❌";
  }
}

console.log(handleStatus("success"));

export { printId, request, area, handleStatus, Shape, HttpMethod, Status };