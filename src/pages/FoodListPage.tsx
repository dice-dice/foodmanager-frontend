import { useState } from 'react';
import { useFoods, useCreateFood, useUpdateFood, useDeleteFood } from '../hooks';
import { FoodCard, FoodForm } from '../components';
import type { FoodDTO } from '../types';

export function FoodListPage() {
  const { data: foods, isLoading, error } = useFoods();
  const createFood = useCreateFood();
  const updateFood = useUpdateFood();
  const deleteFood = useDeleteFood();

  const [showForm, setShowForm] = useState(false);
  const [editingFood, setEditingFood] = useState<FoodDTO | null>(null);

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
    if (window.confirm('この食材を削除しますか？')) {
      deleteFood.mutate(id);
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
        <h1>冷蔵庫</h1>
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
            <FoodForm onSubmit={handleCreate} submitLabel="追加" />
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
            />
          </div>
        </div>
      )}

      {/* Food List */}
      {foods && foods.length > 0 ? (
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
    </div>
  );
}
