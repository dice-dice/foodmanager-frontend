import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { FoodDTO } from '../types';
import { CATEGORIES, isNoExpirationCategory } from '../constants';

interface FoodFormProps {
  onSubmit: (data: FoodDTO) => void;
  initialData?: FoodDTO;
  showExpiration?: boolean;
  submitLabel?: string;
}

interface FormData {
  name: string;
  quantity: number;
  date: string;
  expirationDate?: string;
  categoryId?: number;
}

export function FoodForm({
  onSubmit,
  initialData,
  showExpiration = true,
  submitLabel = '保存',
}: FoodFormProps) {
  const today = new Date().toISOString().split('T')[0];

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      name: initialData?.name || '',
      quantity: initialData?.quantity || 1,
      date: initialData?.date || today,
      expirationDate: initialData?.expirationDate || '',
      categoryId: initialData?.categoryId,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name || '',
        quantity: initialData.quantity || 1,
        date: initialData.date || today,
        expirationDate: initialData.expirationDate || '',
        categoryId: initialData.categoryId,
      });
    }
  }, [initialData, reset, today]);

  const selectedCategoryId = watch('categoryId');
  const shouldShowExpiration = showExpiration && !isNoExpirationCategory(Number(selectedCategoryId));

  const handleFormSubmit = (data: FormData) => {
    const foodDTO: FoodDTO = {
      ...data,
      id: initialData?.id,
      categoryId: data.categoryId ? Number(data.categoryId) : undefined,
    };
    onSubmit(foodDTO);
    if (!initialData) {
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          名前 *
        </label>
        <input
          type="text"
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          id="name"
          {...register('name', { required: '名前は必須です' })}
        />
        {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="quantity" className="form-label">
          数量 *
        </label>
        <input
          type="number"
          className={`form-control ${errors.quantity ? 'is-invalid' : ''}`}
          id="quantity"
          min="1"
          {...register('quantity', {
            required: '数量は必須です',
            min: { value: 1, message: '数量は1以上にしてください' },
          })}
        />
        {errors.quantity && (
          <div className="invalid-feedback">{errors.quantity.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="date" className="form-label">
          登録日 *
        </label>
        <input
          type="date"
          className={`form-control ${errors.date ? 'is-invalid' : ''}`}
          id="date"
          {...register('date', { required: '登録日は必須です' })}
        />
        {errors.date && <div className="invalid-feedback">{errors.date.message}</div>}
      </div>

      {shouldShowExpiration && (
        <div className="mb-3">
          <label htmlFor="expirationDate" className="form-label">
            賞味期限
          </label>
          <input
            type="date"
            className="form-control"
            id="expirationDate"
            {...register('expirationDate')}
          />
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="categoryId" className="form-label">
          カテゴリ
        </label>
        <select className="form-select" id="categoryId" {...register('categoryId')}>
          <option value="">カテゴリを選択</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
        {isSubmitting ? '保存中...' : submitLabel}
      </button>
    </form>
  );
}
