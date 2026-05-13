/**
 * 应用入口文件
 *
 * 拆分后这个文件只负责两件事：
 *   1) 引入样式和课程数据
 *   2) 把数据渲染到页面上（导航 + 内容）
 *
 * 课程数据现在分散在 src/lessons-data/ 目录下，每章一个文件，
 * 通过 src/lessons-data/index.ts 聚合后再 import 进来。
 */
import './styles.css';
import { lessons } from './lessons-data';

// ========== 渲染：左侧课程导航 ==========
function renderLessonNav(): void {
  const nav = document.getElementById('lesson-nav');
  if (!nav) return;

  const lessonList = document.createElement('ul');
  lessonList.className = 'lesson-list';

  lessons.forEach((lesson) => {
    const li = document.createElement('li');
    li.className = 'lesson-item';
    li.innerHTML = `
      <a class="lesson-link" data-lesson-id="${lesson.id}">
        ${lesson.title}
      </a>
    `;
    lessonList.appendChild(li);
  });

  nav.appendChild(lessonList);

  // 给每个导航链接绑定点击事件
  document.querySelectorAll('.lesson-link').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const lessonId = target.getAttribute('data-lesson-id');
      if (lessonId) {
        renderLessonContent(lessonId);
        // 更新激活样式
        document
          .querySelectorAll('.lesson-link')
          .forEach((l) => l.classList.remove('active'));
        target.classList.add('active');
      }
    });
  });
}

// ========== 渲染：右侧课程内容 ==========
function renderLessonContent(lessonId: string): void {
  const content = document.getElementById('lesson-content');
  if (!content) return;

  const lesson = lessons.find((l) => l.id === lessonId);
  if (!lesson) return;

  let html = `<h2 class="lesson-title">${lesson.title}</h2>`;

  lesson.sections.forEach((section) => {
    html += `
      <div class="lesson-section">
        <h3>${section.title}</h3>
        <p>${section.description}</p>
        <div class="code-block">${escapeHtml(section.code)}</div>
        <div class="output-box">
          <h4>📤 输出结果</h4>
          <pre>${escapeHtml(section.output)}</pre>
        </div>
      </div>
    `;
  });

  content.innerHTML = html;
}

// ========== 工具函数：HTML 转义，防止代码片段把页面布局打乱 ==========
function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ========== 启动：页面加载完成后渲染左侧导航 ==========
document.addEventListener('DOMContentLoaded', () => {
  renderLessonNav();
});