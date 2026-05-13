/**
 * 章节数据汇总入口
 *
 * 把每个章节文件 import 进来，统一以 `lessons` 数组导出。
 * 之后想新增章节，只需要：
 *   1) 在本目录下新建 0X-xxx.ts
 *   2) 在这里 import 并加入 lessons 数组
 */
import type { Lesson } from '../types';
import { lesson01 } from './01-basic-types';
import { lesson02 } from './02-functions';
import { lesson03 } from './03-interfaces';
import { lesson04 } from './04-union-literal';
import { lesson05 } from './05-generics';
import { lesson06 } from './06-classes';
import { lesson07 } from './07-enums-and-more';

export const lessons: Lesson[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lesson07,
];