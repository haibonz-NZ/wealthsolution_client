// Common reusable types and event signatures for GWRC Frontend
// File: src/types/common.ts
import type React from 'react';

/** VI 色彩系统映射 */
export type ColorToken = 'deepBlue' | 'cream' | 'copper' | 'red' | 'green';

/** 风险等级（通用逻辑使用） */
export type Severity = 'high' | 'medium' | 'low' | 'safe';

/** 身份角色标识（身份托盘使用） */
export type RoleId = 'self' | 'spouse' | 'child' | 'parent';

/** 国家代码（身份地图已支持 US/JP，后续可扩展） */
export type CountryCode = 'US' | 'JP' | (string & {});

/** 拖拽事件签名（角色 -> 拖拽事件） */
export type DragEventSignature = (roleId: RoleId, event: React.DragEvent) => void;
/** 放置事件签名（国家代码 -> 拖拽事件） */
export type DropEventSignature = (countryCode: CountryCode, event: React.DragEvent) => void;

/** 风险标签结构 */
export interface TagItem {
  id: string;
  label: string;
  severity: Severity;
}

/** 逻辑弹窗问题节点 */
export interface QuestionItem {
  id: string;
  text: string;
  type: 'boolean' | 'select';
  options?: string[];
}

/** 问题答案字典 */
export type AnswerMap = { [key: string]: string | boolean };

/** 雷达图数据序列（用于 DashboardRadarProps） */
export interface RadarSeries {
  name: string;
  data: number[]; // e.g., [80, 60, 40, 90, 70]
  color?: string;
}
