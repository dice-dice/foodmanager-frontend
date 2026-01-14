export const CATEGORIES = [
  { id: 1, name: '冷蔵' },
  { id: 2, name: '冷凍' },
  { id: 3, name: '常温' },
  { id: 4, name: 'その他' },
  { id: 5, name: '日用品' },
] as const;

export const CATEGORY_IDS = {
  refrigerated: 1, // 冷蔵
  frozen: 2,       // 冷凍
  roomTemp: 3,     // 常温
  other: 4,        // その他
  daily: 5,        // 日用品
} as const;

// 食材カテゴリ（冷蔵・冷凍・常温）
export const FOOD_CATEGORY_IDS = [
  CATEGORY_IDS.refrigerated,
  CATEGORY_IDS.frozen,
  CATEGORY_IDS.roomTemp,
] as const;

// 期限を付与しないカテゴリ
export const NO_EXPIRATION_CATEGORY_IDS = [
  CATEGORY_IDS.other,
  CATEGORY_IDS.daily,
] as const;

export function getCategoryName(categoryId: number | undefined): string | undefined {
  if (!categoryId) return undefined;
  const category = CATEGORIES.find(c => c.id === categoryId);
  return category?.name;
}

export function isNoExpirationCategory(categoryId: number | undefined): boolean {
  if (!categoryId) return false;
  return NO_EXPIRATION_CATEGORY_IDS.includes(categoryId as typeof NO_EXPIRATION_CATEGORY_IDS[number]);
}

export function isFoodCategory(categoryId: number | undefined): boolean {
  if (!categoryId) return false;
  return FOOD_CATEGORY_IDS.includes(categoryId as typeof FOOD_CATEGORY_IDS[number]);
}

export function isDailyStockCategory(categoryId: number | undefined): boolean {
  if (!categoryId) return false;
  return NO_EXPIRATION_CATEGORY_IDS.includes(categoryId as typeof NO_EXPIRATION_CATEGORY_IDS[number]);
}

export function isOtherCategory(categoryId: number | undefined): boolean {
  if (!categoryId) return false;
  return categoryId === CATEGORY_IDS.other;
}

export function isDailyCategory(categoryId: number | undefined): boolean {
  if (!categoryId) return false;
  return categoryId === CATEGORY_IDS.daily;
}
