import { useState, useMemo } from 'react';
import { useFoods, useCreateFood, useUpdateFood, useDeleteFood } from '../hooks';
import { FoodCard, FoodForm, ConfirmModal } from '../components';
import { isDailyCategory, CATEGORY_IDS } from '../constants';
import type { FoodDTO } from '../types';

export function DailyStockPage() {
  const { data: allFoods, isLoading, error } = useFoods();
  const createFood = useCreateFood();
  const updateFood = useUpdateFood();
  const deleteFood = useDeleteFood();

  // 日用品のみフィルター
  const items = useMemo(() => {
    return allFoods?.filter(food => isDailyCategory(food.categoryId)) || [];
  }, [allFoods]);

  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<FoodDTO | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);

  const handleCreate = (data: FoodDTO) => {
    createFood.mutate([data], {
      onSuccess: () => {
        setShowForm(false);
      },
    });
  };

  const handleUpdate = (data: FoodDTO) => {
    updateFood.mutate([data], {
      onSuccess: () => {
        setEditingItem(null);
      },
    });
  };

  const handleDelete = (id: number) => {
    setDeleteTarget(id);
  };

  const confirmDelete = () => {
    if (deleteTarget !== null) {
      deleteFood.mutate(deleteTarget);
      setDeleteTarget(null);
    }
  };

  const handleEdit = (item: FoodDTO) => {
    setEditingItem(item);
    setShowForm(false);
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger">
        データの読み込みに失敗しました。もう一度お試しください。
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>日用品ストック</h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            setShowForm(!showForm);
            setEditingItem(null);
          }}
        >
          {showForm ? 'キャンセル' : 'アイテムを追加'}
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="mb-0">新しいアイテムを追加</h5>
          </div>
          <div className="card-body">
            <FoodForm onSubmit={handleCreate} showExpiration={false} submitLabel="追加" fixedCategoryId={CATEGORY_IDS.daily} />
          </div>
        </div>
      )}

      {/* Edit Form */}
      {editingItem && (
        <div className="card mb-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">アイテムを編集</h5>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => setEditingItem(null)}
            >
              キャンセル
            </button>
          </div>
          <div className="card-body">
            <FoodForm
              onSubmit={handleUpdate}
              initialData={editingItem}
              showExpiration={false}
              submitLabel="更新"
              fixedCategoryId={CATEGORY_IDS.daily}
            />
          </div>
        </div>
      )}

      {/* Item List */}
      {items.length > 0 ? (
        <div className="row g-3">
          {items.map((item) => (
            <div key={item.id} className="col-md-6 col-lg-4">
              <FoodCard
                food={item}
                onEdit={handleEdit}
                onDelete={handleDelete}
                showExpiration={false}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <p className="text-muted">登録されているアイテムはありません。</p>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            最初のアイテムを追加
          </button>
        </div>
      )}

      <ConfirmModal
        isOpen={deleteTarget !== null}
        title="アイテムの削除"
        message="このアイテムを削除しますか？この操作は取り消せません。"
        confirmLabel="削除"
        cancelLabel="キャンセル"
        confirmVariant="danger"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
