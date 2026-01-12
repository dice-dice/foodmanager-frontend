import type { FoodDTO } from '../types';
import { getCategoryName, isNoExpirationCategory } from '../constants';

interface FoodCardProps {
  food: FoodDTO;
  onEdit?: (food: FoodDTO) => void;
  onDelete?: (id: number) => void;
  onDone?: (food: FoodDTO) => void;
  showExpiration?: boolean;
}

export function FoodCard({ food, onEdit, onDelete, onDone, showExpiration = true }: FoodCardProps) {
  // その他・日用品カテゴリは期限を表示しない
  const shouldShowExpiration = showExpiration && !isNoExpirationCategory(food.categoryId);

  const getDaysUntilExpiration = () => {
    if (!food.expirationDate) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expDate = new Date(food.expirationDate);
    expDate.setHours(0, 0, 0, 0);
    const diffTime = expDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getExpirationBadge = () => {
    const days = getDaysUntilExpiration();
    if (days === null) return null;

    if (days < 0) {
      return <span className="badge bg-danger">期限切れ</span>;
    } else if (days <= 3) {
      return <span className="badge bg-warning text-dark">あと{days}日</span>;
    } else {
      return <span className="badge bg-success">あと{days}日</span>;
    }
  };

  return (
    <div className="card h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <h5 className="card-title mb-1">{food.name}</h5>
          {shouldShowExpiration && getExpirationBadge()}
        </div>
        {(food.categoryId || food.categoryName) && (
          <span className="badge bg-secondary mb-2">
            {getCategoryName(food.categoryId) || food.categoryName}
          </span>
        )}
        <p className="card-text mb-1">
          <small className="text-muted">数量: {food.quantity}</small>
        </p>
        {food.date && (
          <p className="card-text mb-1">
            <small className="text-muted">登録日: {food.date}</small>
          </p>
        )}
        {shouldShowExpiration && food.expirationDate && (
          <p className="card-text mb-0">
            <small className="text-muted">賞味期限: {food.expirationDate}</small>
          </p>
        )}
      </div>
      {(onEdit || onDelete || onDone) && (
        <div className="card-footer bg-transparent border-top-0">
          <div className="d-flex gap-2">
            {onEdit && (
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => onEdit(food)}
              >
                編集
              </button>
            )}
            {onDelete && food.id && (
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => onDelete(food.id!)}
              >
                削除
              </button>
            )}
            {onDone && (
              <button
                className="btn btn-sm btn-outline-success"
                onClick={() => onDone(food)}
              >
                完了
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
