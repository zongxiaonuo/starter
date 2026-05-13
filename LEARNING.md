# 🎓 TypeScript 入门学习指南

欢迎！这是一份专为 TypeScript 入门者打造的学习路径。所有示例代码都在 `src/lessons/` 目录下，配有详细中文注释。

---

## 📚 学习路径（建议按顺序学）

| 课程 | 文件 | 核心内容 |
| --- | --- | --- |
| 第 1 课 | `src/lessons/01-basic-types.ts` | 基本类型：boolean / number / string / 数组 / 元组 / any / unknown / void / never |
| 第 2 课 | `src/lessons/02-functions.ts` | 函数：参数类型、可选/默认/剩余参数、函数重载、高阶函数 |
| 第 3 课 | `src/lessons/03-interfaces.ts` | 接口：对象形状、可选/只读属性、继承、interface vs type |
| 第 4 课 | `src/lessons/04-union-literal.ts` | 联合类型、字面量类型、类型守卫、可辨识联合 |
| 第 5 课 | `src/lessons/05-generics.ts` | 类型别名、泛型、泛型约束、内置工具类型 (Partial/Pick/Omit...) |
| 第 6 课 | `src/lessons/06-classes.ts` | 类：访问修饰符、继承、抽象类、implements、static、getter/setter |
| 第 7 课 | `src/lessons/07-enums-and-more.ts` | 枚举、typeof、as const、可选链、类型守卫函数、综合练习 |

---

## 🚀 准备工作

> ✅ **环境已配置完毕！** Node.js (v24 LTS) 与所有依赖均已安装。

### 每次打开新终端都需要执行（让 nvm 生效）

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

> 💡 这两行已自动追加到 `~/.zshrc`，**关闭并重新打开终端**后 `node` / `npm` 命令即可直接使用，不用再手动 export。

### 验证环境

```bash
node -v   # 应显示 v24.x.x
npm -v    # 应显示 11.x.x
```

### 运行任意一节课的代码

```bash
# 直接运行单个 lesson 文件（推荐学习时使用）
npx ts-node src/lessons/01-basic-types.ts
npx ts-node src/lessons/02-functions.ts
# ... 以此类推

# 或者运行入口文件
npm run dev
```

### 4. 编译检查（不运行，只看类型对不对）

```bash
npx tsc --noEmit
```

---

## 🧠 学习方法建议

### 🌱 入门阶段（1-3 课）
1. **先读注释**：每节课的代码都按「概念 → 示例 → 错误演示 → 小练习」顺序排列，建议从头到尾通读。
2. **打开错误的注释**：把代码里被注释掉的 `// ❌ 错误` 那一行解开，看看 TS 报什么错——这能帮你深刻理解类型规则。
3. **改造示例**：随便改改类型，看 VS Code 立即给你的红线提示。

### 🌿 进阶阶段（4-5 课）
1. **泛型是难点也是核心**：第 5 课多看几遍，重点理解「为什么需要泛型」。
2. **多用工具类型**：`Partial` / `Pick` / `Omit` / `Record` 在实际项目里几乎天天用。

### 🌳 实战阶段（6-7 课）
1. 第 7 课最后有一个 **TodoList 综合练习**，把所有概念串起来了。
2. 自己尝试实现：
   - 一个 **HTTP 请求封装**（用泛型 + 接口）
   - 一个 **简单的状态管理**（class + 泛型）
   - 一个 **表单验证器**（联合类型 + 类型守卫）

---

## 🔑 TypeScript 核心心智模型

记住这几条，受用终身：

1. **类型只在编译时存在**，编译后就是普通 JavaScript，运行时没有任何类型检查。
2. **类型推断很强大**：能不写就不写类型注解，让 TS 自己推断。
3. **结构化类型 (Structural Typing)**：TS 看的是「形状」，不是「名字」。两个长得一样的对象类型可以互相赋值。
4. **优先使用 `interface` 描述对象，`type` 描述其他东西**（联合、元组、复杂组合等）。
5. **能用 `unknown` 不用 `any`**：`any` 关闭了类型检查，等于回到了 JS 时代。
6. **善用 VS Code 的悬停提示**：把鼠标放到任何变量上，可以看到 TS 推断出的真实类型。

---

## 📖 推荐资源

- **官方手册**（中文版）: <https://www.typescriptlang.org/zh/docs/>
- **TypeScript Playground**（在线试验）: <https://www.typescriptlang.org/play>
- **TS 速查表**: <https://www.typescriptlang.org/cheatsheets/>
- **type-challenges**（进阶练习）: <https://github.com/type-challenges/type-challenges>

---

## ❓ 常见疑问

**Q: 编辑器里 `console` 报红？**
A: 这是因为还没有安装 `@types/node`。运行 `npm install` 后就会消失。

**Q: TypeScript 一定要写所有类型吗？**
A: 不！TS 推断能力很强，绝大多数局部变量都不用写。重点是给「函数参数、函数返回值、对象/类的字段」加类型。

**Q: `interface` 和 `type` 用哪个？**
A: 描述对象/类用 `interface`（可扩展、可合并）；做联合、元组、工具类型用 `type`。

**Q: 我应该开 `strict: true` 吗？**
A: **强烈推荐开启**。本项目的 `tsconfig.json` 已经默认开启，能帮你养成好习惯。

---

🎉 **开始第 1 课吧！** 打开 `src/lessons/01-basic-types.ts`，享受类型安全的编程体验！