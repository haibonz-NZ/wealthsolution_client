// P04 Assets page component props
// File: src/types/props/assets.ts
import type React from 'react';

export interface AssetsGridProps {
  /** 可选资产类型列表 */
  options: Array<{ id: string; icon: React.ReactNode; labelKey: string }>;
  /** 当前选中的资产 ID 集合 */
  selectedIds: string[];
  /** 选择变更回调 (多选) */
  onSelectionChange: (ids: string[]) => void;
  /** 网格列数配置 */
  columns?: number;
}

export interface FuzzySliderProps {
  /** 当前选中的区间值 ID */
  valueId: string;
  /** 可选区间配置 */
  ranges: Array<{ 
    id: string; 
    label: string; // e.g., "500-2000w"
    min?: number; 
    max?: number 
  }>;
  /** 值变更回调 */
  onChange: (rangeId: string) => void;
  /** 滑块标签的单位 (如 'USD') */
  currency?: string;
  /** 是否禁用 */
  disabled?: boolean;
}
