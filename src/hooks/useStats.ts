import { useQuery } from '@tanstack/react-query';
import { statsApi } from '../api';

const STATS_KEY = ['stats'];

export function useOverviewStats() {
  return useQuery({
    queryKey: [...STATS_KEY, 'overview'],
    queryFn: statsApi.getOverview,
  });
}

export function useExpirationCalendar(month?: string) {
  return useQuery({
    queryKey: [...STATS_KEY, 'expiration-calendar', month],
    queryFn: () => statsApi.getExpirationCalendar(month),
  });
}

export function useTrendData(period = 'weekly', range = 4) {
  return useQuery({
    queryKey: [...STATS_KEY, 'trend', period, range],
    queryFn: () => statsApi.getTrend(period, range),
  });
}

export function useCategoryBreakdown() {
  return useQuery({
    queryKey: [...STATS_KEY, 'category-breakdown'],
    queryFn: statsApi.getCategoryBreakdown,
  });
}
