import { useState, useMemo } from 'react';
import { useFoods, useCreateFood, useUpdateFood, useDeleteFood } from '../hooks';
import { FoodCard, FoodForm, ConfirmModal } from '../components';
import { isFoodCategory, FOOD_CATEGORIES } from '../constants';
import type { FoodDTO } from '../types';

export function FoodListPage() {
  const { data: allFoods, isLoading, error } = useFoods();
  const createFood = useCreateFood();
  const updateFood = useUpdateFood();
  const deleteFood = useDeleteFood();

  // 冷蔵・冷凍・常温のみフィルター
  const foods = useMemo(() => {
    return allFoods?.filter(food => isFoodCategory(food.categoryId)) || [];
  }, [allFoods]);

  const [showForm, setShowForm] = useState(false);
  const [editingFood, setEditingFood] = useState<FoodDTO | null>(null);
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
        setEditingFood(null);
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

  const handleEdit = (food: FoodDTO) => {
    setEditingFood(food);
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
        食材の読み込みに失敗しました。もう一度お試しください。
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>食材ストック</h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            setShowForm(!showForm);
            setEditingFood(null);
          }}
        >
          {showForm ? 'キャンセル' : '食材を追加'}
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="mb-0">新しい食材を追加</h5>
          </div>
          <div className="card-body">
            <FoodForm onSubmit={handleCreate} submitLabel="追加" availableCategories={FOOD_CATEGORIES} />
          </div>
        </div>
      )}

      {/* Edit Form */}
      {editingFood && (
        <div className="card mb-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">食材を編集</h5>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => setEditingFood(null)}
            >
              キャンセル
            </button>
          </div>
          <div className="card-body">
            <FoodForm
              onSubmit={handleUpdate}
              initialData={editingFood}
              submitLabel="更新"
              availableCategories={FOOD_CATEGORIES}
            />
          </div>
        </div>
      )}

      {/* Food List */}
      {foods.length > 0 ? (
        <div className="row g-3">
          {foods.map((food) => (
            <div key={food.id} className="col-md-6 col-lg-4">
              <FoodCard
                food={food}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <p className="text-muted">登録されている食材はありません。</p>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            最初の食材を追加
          </button>
        </div>
      )}

      <ConfirmModal
        isOpen={deleteTarget !== null}
        title="食材の削除"
        message="この食材を削除しますか？この操作は取り消せません。"
        confirmLabel="削除"
        cancelLabel="キャンセル"
        confirmVariant="danger"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
