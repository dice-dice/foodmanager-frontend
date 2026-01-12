import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FoodCard } from './FoodCard';
import type { FoodDTO } from '../types';

describe('FoodCard', () => {
  const mockFood: FoodDTO = {
    id: 1,
    name: 'りんご',
    quantity: 3,
    date: '2024-01-01',
    expirationDate: '2024-01-10',
    categoryId: 1,
    categoryName: '果物',
  };

  it('食材名が表示される', () => {
    render(<FoodCard food={mockFood} />);
    expect(screen.getByText('りんご')).toBeInTheDocument();
  });

  it('数量が表示される', () => {
    render(<FoodCard food={mockFood} />);
    expect(screen.getByText('数量: 3')).toBeInTheDocument();
  });

  it('カテゴリが表示される', () => {
    render(<FoodCard food={mockFood} />);
    expect(screen.getByText('果物')).toBeInTheDocument();
  });

  it('登録日が表示される', () => {
    render(<FoodCard food={mockFood} />);
    expect(screen.getByText('登録日: 2024-01-01')).toBeInTheDocument();
  });

  it('賞味期限が表示される（showExpiration=true）', () => {
    render(<FoodCard food={mockFood} showExpiration={true} />);
    expect(screen.getByText('賞味期限: 2024-01-10')).toBeInTheDocument();
  });

  it('賞味期限が非表示になる（showExpiration=false）', () => {
    render(<FoodCard food={mockFood} showExpiration={false} />);
    expect(screen.queryByText('賞味期限: 2024-01-10')).not.toBeInTheDocument();
  });

  it('編集ボタンをクリックするとonEditが呼ばれる', () => {
    const onEdit = vi.fn();
    render(<FoodCard food={mockFood} onEdit={onEdit} />);

    fireEvent.click(screen.getByText('編集'));
    expect(onEdit).toHaveBeenCalledWith(mockFood);
  });

  it('削除ボタンをクリックするとonDeleteが呼ばれる', () => {
    const onDelete = vi.fn();
    render(<FoodCard food={mockFood} onDelete={onDelete} />);

    fireEvent.click(screen.getByText('削除'));
    expect(onDelete).toHaveBeenCalledWith(1);
  });

  it('完了ボタンをクリックするとonDoneが呼ばれる', () => {
    const onDone = vi.fn();
    render(<FoodCard food={mockFood} onDone={onDone} />);

    fireEvent.click(screen.getByText('完了'));
    expect(onDone).toHaveBeenCalledWith(mockFood);
  });

  it('期限切れの場合、期限切れバッジが表示される', () => {
    const expiredFood: FoodDTO = {
      ...mockFood,
      expirationDate: '2020-01-01',
    };
    render(<FoodCard food={expiredFood} />);
    expect(screen.getByText('期限切れ')).toBeInTheDocument();
  });
});
