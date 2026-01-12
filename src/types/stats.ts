// 統計関連の型定義

export interface CategoryBreakdownDTO {
  categoryId: number;
  category: string;
  count: number;
}

export interface OverviewStatsDTO {
  totalFoods: number;
  expiringIn3Days: number;
  expiredCount: number;
  categoryBreakdown: CategoryBreakdownDTO[];
  shoppingListCount: number;
}

export interface ExpirationItemDTO {
  id: number;
  name: string;
  daysLeft: number;
  categoryName: string;
}

export interface ExpirationCalendarDTO {
  date: string; // ISO date string
  items: ExpirationItemDTO[];
}

export interface TrendDataDTO {
  labels: string[];
  added: number[];
}
