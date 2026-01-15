// P06 Dashboard page component props
// File: src/types/props/dashboard.ts
import type { RiskItem } from '../dto';
import type { RadarSeries } from '../common';

export interface DashboardRadarProps {
  /** 雷达维度标签 (5 维: 税务/安全/传承/隐私/合规) */
  indicators: Array<{ name: string; max: number }>;
  /** 数据系列 (当前状态 vs 理想状态) */
  series: RadarSeries[];
  /** 图表加载状态 */
  loading?: boolean;
  /** 容器高度 */
  height?: number | string;
  /** 是否启用动画重绘 */
  animate?: boolean;
}

export interface RiskListProps {
  /** 风险项数据列表 */
  items: RiskItem[];
  /** 点击展开详情的回调 */
  onItemClick: (item: RiskItem) => void;
  /** 是否只展示高危项 (Red Only) */
  filterHighRisk?: boolean;
}
