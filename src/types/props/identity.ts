// P03 Identity page component props
// File: src/types/props/identity.ts
import type React from 'react';
import type { DragEventSignature, DropEventSignature, TagItem, QuestionItem, AnswerMap } from '@/types/common';

export interface IdentityMapProps {
  /** 当前激活的国家代码列表，用于高亮显示 */
  activeCountryCodes: string[];
  /** 拖拽开始事件，传递被拖拽的角色 ID */
  onDragStart: DragEventSignature;
  /** 拖拽释放事件，传递目标区域 ID */
  onDrop: DropEventSignature;
  /** 地图加载完成回调 */
  onMapReady?: () => void;
  /** 自定义地图 SVG 路径或配置 */
  mapConfig?: Record<string, any>;
}

export interface CountryBoxProps {
  /** 国家代码 (ISO 3166) */
  countryCode: string;
  /** 国家名称 (i18n key) */
  labelKey: string;
  /** 是否高亮（命中状态）*/
  isHighlighted: boolean;
  /** 坐标位置 (百分比字符串) */
  position: { top: string; left: string };
  /** 尺寸 */
  size: { width: string; height: string };
}

export interface CountryLogicModalProps {
  /** 当前触发逻辑的国家 */
  countryCode: string;
  /** 触发逻辑的角色 (如 'child') */
  roleId: string;
  /** 弹窗显隐控制 */
  visible: boolean;
  /** 问题配置列表 (决策树节点) */
  questions: QuestionItem[];
  /** 必填问题 ID 列表（未回答将高亮并禁用提交） */
  requiredIds?: string[];
  /** 提交回调，返回答案字典 */
  onSubmit: (answers: AnswerMap) => void;
  /** 关闭回调 */
  onClose: () => void;
}

export interface TagListProps {
  /** 生成的风险标签列表 */
  tags: TagItem[];
  /** 是否允许手动移除标签 */
  removable?: boolean;
  /** 移除标签的回调 */
  onRemove?: (tagId: string) => void;
  /** 列表为空时的占位文案 */
  emptyText?: string;
}
