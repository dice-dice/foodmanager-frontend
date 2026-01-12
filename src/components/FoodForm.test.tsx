import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FoodForm } from './FoodForm';

describe('FoodForm', () => {
  it('フォームのラベルが正しく表示される', () => {
    render(<FoodForm onSubmit={vi.fn()} />);

    expect(screen.getByLabelText(/名前/)).toBeInTheDocument();
    expect(screen.getByLabelText(/数量/)).toBeInTheDocument();
    expect(screen.getByLabelText(/登録日/)).toBeInTheDocument();
    expect(screen.getByLabelText(/賞味期限/)).toBeInTheDocument();
    expect(screen.getByLabelText(/カテゴリ/)).toBeInTheDocument();
  });

  it('showExpiration=falseの場合、賞味期限フィールドが非表示', () => {
    render(<FoodForm onSubmit={vi.fn()} showExpiration={false} />);

    expect(screen.queryByLabelText(/賞味期限/)).not.toBeInTheDocument();
  });

  it('submitLabelが正しく表示される', () => {
    render(<FoodForm onSubmit={vi.fn()} submitLabel="追加" />);

    expect(screen.getByRole('button', { name: '追加' })).toBeInTheDocument();
  });

  it('名前が空の場合、バリデーションエラーが表示される', async () => {
    const user = userEvent.setup();
    render(<FoodForm onSubmit={vi.fn()} />);

    const nameInput = screen.getByLabelText(/名前/);
    await user.clear(nameInput);

    const submitButton = screen.getByRole('button');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('名前は必須です')).toBeInTheDocument();
    });
  });

  it('数量フィールドにmin属性が設定されている', () => {
    render(<FoodForm onSubmit={vi.fn()} />);

    const quantityInput = screen.getByLabelText(/数量/);
    expect(quantityInput).toHaveAttribute('min', '1');
    expect(quantityInput).toHaveAttribute('type', 'number');
  });

  it('正しいデータでフォームを送信するとonSubmitが呼ばれる', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<FoodForm onSubmit={onSubmit} />);

    const nameInput = screen.getByLabelText(/名前/);
    await user.type(nameInput, 'トマト');

    const submitButton = screen.getByRole('button');
    await user.click(submitButton);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
  });

  it('カテゴリの選択肢が正しく表示される', () => {
    render(<FoodForm onSubmit={vi.fn()} />);

    const categorySelect = screen.getByLabelText(/カテゴリ/);
    expect(categorySelect).toBeInTheDocument();

    expect(screen.getByText('冷蔵')).toBeInTheDocument();
    expect(screen.getByText('冷凍')).toBeInTheDocument();
    expect(screen.getByText('常温')).toBeInTheDocument();
    expect(screen.getByText('その他')).toBeInTheDocument();
    expect(screen.getByText('日用品')).toBeInTheDocument();
  });

  it('初期データがある場合、フォームに値が設定される', () => {
    const initialData = {
      id: 1,
      name: 'にんじん',
      quantity: 5,
      date: '2024-01-15',
      categoryId: 1,
    };

    render(<FoodForm onSubmit={vi.fn()} initialData={initialData} />);

    expect(screen.getByLabelText(/名前/)).toHaveValue('にんじん');
    expect(screen.getByLabelText(/数量/)).toHaveValue(5);
  });
});
