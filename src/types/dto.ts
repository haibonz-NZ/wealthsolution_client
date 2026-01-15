// API DTOs and shared data contracts
// File: src/types/dto.ts

// 顾问数据对象，用于 Landing 名片以及后续联系逻辑
export interface AdvisorDTO {
  id: string;
  name: string;
  title?: string;
  avatarUrl?: string;
}

// 风险项 DTO，用于 Dashboard 风险列表
export interface RiskItem {
  id: string;
  title: string;
  description: string;
  severity: 'red' | 'yellow' | 'green';
  impact?: string; // e.g., "可能面临 40% 遗产税"
}

// Dashboard API 返回的 DTO
export interface DashboardDTO {
  radar_scores: {
    dimensions: string[]; // ["税务", "安全", "传承", "隐私", "合规"]
    user_values: number[]; // [60, 70, 55, 80, 65]
    ideal_values: number[]; // [90, 90, 85, 95, 90]
  };
  risk_items: Array<{
    code: string;
    level: string; // 'HIGH' | 'MEDIUM' | 'LOW'
    desc_cn: string;
  }>;
}
