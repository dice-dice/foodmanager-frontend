import { useState } from 'react';
import { useShopping, useCreateShopping, useUpdateShopping, useDeleteShopping, useMoveToFoods } from '../hooks';
import { FoodCard, FoodForm } from '../components';
import type { FoodDTO } from '../types';

export function ShoppingListPage() {
  const { data: items, isLoading, error } = useShopping();
  const createItem = useCreateShopping();
  const updateItem = useUpdateShopping();
  const deleteItem = useDeleteShopping();
  const moveToFoods = useMoveToFoods();

  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<FoodDTO | null>(null);

  const handleCreate = (data: FoodDTO) => {
    createItem.mutate([data], {
      onSuccess: () => {
        setShowForm(false);
      },
    });
  };

  const handleUpdate = (data: FoodDTO) => {
    updateItem.mutate([data], {
      onSuccess: () => {
        setEditingItem(null);
      },
    });
  };

  const handleDelete = (id: number) => {
    if (window.confirm('このアイテムを削除しますか？')) {
      deleteItem.mutate(id);
    }
  };

  const handleEdit = (item: FoodDTO) => {
    setEditingItem(item);
    setShowForm(false);
  };

  const handleDone = (item: FoodDTO) => {
    if (window.confirm('冷蔵庫に追加しますか？')) {
      moveToFoods.mutate(item);
    }
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
        買い物リストの読み込みに失敗しました。もう一度お試しください。
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>買い物リスト</h1>
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
            <FoodForm
              onSubmit={handleCreate}
              showExpiration={false}
              submitLabel="追加"
            />
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
            />
          </div>
        </div>
      )}

      {/* Shopping List */}
      {items && items.length > 0 ? (
        <div className="row g-3">
          {items.map((item) => (
            <div key={item.id} className="col-md-6 col-lg-4">
              <FoodCard
                food={item}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onDone={handleDone}
                showExpiration={false}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <p className="text-muted">買い物リストは空です。</p>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            最初のアイテムを追加
          </button>
        </div>
      )}
    </div>
  );
}
