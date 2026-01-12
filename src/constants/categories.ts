export const CATEGORIES = [
  { id: 1, name: '果物' },
  { id: 2, name: '野菜' },
  { id: 3, name: '肉' },
  { id: 4, name: '魚' },
  { id: 5, name: '乳製品' },
  { id: 6, name: '冷蔵' },
  { id: 7, name: '冷凍' },
  { id: 8, name: '常温' },
  { id: 9, name: '飲料' },
  { id: 10, name: '日用品' },
  { id: 11, name: 'その他' },
] as const;

export const STORAGE_CATEGORY_IDS = {
  refrigerated: 6, // 冷蔵
  frozen: 7,       // 冷凍
  roomTemp: 8,     // 常温
} as const;

export function getCategoryName(categoryId: number | undefined): string | undefined {
  if (!categoryId) return undefined;
  const category = CATEGORIES.find(c => c.id === categoryId);
  return category?.name;
}
