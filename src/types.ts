/**
 * 课程数据相关的类型定义
 *
 * 把类型集中放在这里，每个章节文件 import 一下，
 * 这样所有章节的数据结构都是一致的，也能享受 TS 的类型检查。
 */

// 一个小节（每章下面的小节，比如 1.1 / 1.2）
export interface LessonSection {
  title: string;        // 小节标题，例如 "1.1 原始类型"
  description: string;  // 小节简介
  code: string;         // 示例代码（字符串）
  output: string;       // 运行结果
}

// 一个章节
export interface Lesson {
  id: string;               // 唯一 ID（与文件名一致），例如 "01-basic-types"
  title: string;            // 章节标题，例如 "第一章：基本类型"
  sections: LessonSection[]; // 该章节包含的若干小节
}