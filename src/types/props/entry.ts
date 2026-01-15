// P02 Entry page component props
// File: src/types/props/entry.ts
import type React from 'react';

export interface ConsentCardProps {
  /** 是否已勾选同意 */
  checked: boolean;
  /** 勾选状态变更回调 */
  onCheckChange: (checked: boolean) => void;
  /** 隐私协议点击查看回调 */
  onPolicyClick: () => void;
  /** 卡片标题，支持富文本或 i18n key */
  title: string | React.ReactNode;
  /** 协议内容摘要列表 */
  terms: string[];
}

export interface ProgressBarProps {
  /** 当前进度百分比 (0-100) */
  percent: number;
  /** 进度条高度，默认 4px */
  height?: number;
  /** 是否显示动画效果 */
  animated?: boolean;
  /** ARIA 标签 */
  ariaLabel?: string;
}

export interface PrimaryButtonProps {
  /** 按钮类型：下一步/提交 */
  actionType: 'next' | 'submit';
  /** 禁用态，未勾选协议时为 true */
  disabled?: boolean;
  /** 按钮文案 */
  children: React.ReactNode;
  onClick?: () => void;
}
