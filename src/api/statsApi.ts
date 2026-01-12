import apiClient from './axios';
import type {
  OverviewStatsDTO,
  ExpirationCalendarDTO,
  TrendDataDTO,
  CategoryBreakdownDTO,
} from '../types';

const STATS_URL = '/api/stats';

export const statsApi = {
  getOverview: async (): Promise<OverviewStatsDTO> => {
    const response = await apiClient.get<OverviewStatsDTO>(`${STATS_URL}/overview`);
    return response.data;
  },

  getExpirationCalendar: async (month?: string): Promise<ExpirationCalendarDTO[]> => {
    const params = month ? { month } : {};
    const response = await apiClient.get<ExpirationCalendarDTO[]>(
      `${STATS_URL}/expiration-calendar`,
      { params }
    );
    return response.data;
  },

  getTrend: async (period = 'weekly', range = 4): Promise<TrendDataDTO> => {
    const response = await apiClient.get<TrendDataDTO>(`${STATS_URL}/trend`, {
      params: { period, range },
    });
    return response.data;
  },

  getCategoryBreakdown: async (): Promise<CategoryBreakdownDTO[]> => {
    const response = await apiClient.get<CategoryBreakdownDTO[]>(
      `${STATS_URL}/category-breakdown`
    );
    return response.data;
  },
};
