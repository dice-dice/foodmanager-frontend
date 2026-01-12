import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { foodApi } from '../api';
import type { FoodDTO } from '../types';
import toast from 'react-hot-toast';

const FOODS_KEY = ['foods'];

export function useFoods() {
  return useQuery({
    queryKey: FOODS_KEY,
    queryFn: foodApi.getByUser,
  });
}

export function useFoodsByCategory(userId: number, categoryId: number) {
  return useQuery({
    queryKey: [...FOODS_KEY, 'category', userId, categoryId],
    queryFn: () => foodApi.getByCategory(userId, categoryId),
    enabled: !!userId && !!categoryId,
  });
}

export function useCreateFood() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (foods: FoodDTO[]) => foodApi.create(foods),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FOODS_KEY });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      toast.success('食材を追加しました');
    },
    onError: () => {
      toast.error('食材の追加に失敗しました');
    },
  });
}

export function useUpdateFood() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (foods: FoodDTO[]) => foodApi.update(foods),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FOODS_KEY });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      toast.success('食材を更新しました');
    },
    onError: () => {
      toast.error('食材の更新に失敗しました');
    },
  });
}

export function useDeleteFood() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => foodApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FOODS_KEY });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      toast.success('食材を削除しました');
    },
    onError: () => {
      toast.error('食材の削除に失敗しました');
    },
  });
}
