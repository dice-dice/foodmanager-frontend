import { Link } from 'react-router-dom';
import { useOverviewStats } from '../hooks';
import { STORAGE_CATEGORY_IDS } from '../constants';

export function DashboardPage() {
  const { data: stats, isLoading, error } = useOverviewStats();

  const getStorageCount = (categoryId: number): number => {
    if (!stats?.categoryBreakdown) return 0;
    const category = stats.categoryBreakdown.find(c => c.categoryId === categoryId);
    return category?.count || 0;
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
      <h1 className="mb-4">ダッシュボード</h1>

      {/* Overview Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-6 col-lg-3">
          <div className="card bg-primary text-white h-100">
            <div className="card-body">
              <h5 className="card-title">食材数</h5>
              <p className="card-text display-4">{stats?.totalFoods || 0}</p>
              <div className="small mt-2">
                <div className="d-flex justify-content-between">
                  <span>冷蔵:</span>
                  <span>{getStorageCount(STORAGE_CATEGORY_IDS.refrigerated)}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>冷凍:</span>
                  <span>{getStorageCount(STORAGE_CATEGORY_IDS.frozen)}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>常温:</span>
                  <span>{getStorageCount(STORAGE_CATEGORY_IDS.roomTemp)}</span>
                </div>
              </div>
            </div>
            <div className="card-footer bg-transparent border-0">
              <Link to="/foods" className="text-white">
                食材一覧を見る
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card bg-warning text-dark h-100">
            <div className="card-body">
              <h5 className="card-title">期限間近</h5>
              <p className="card-text display-4">{stats?.expiringIn3Days || 0}</p>
              <small>3日以内</small>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card bg-danger text-white h-100">
            <div className="card-body">
              <h5 className="card-title">期限切れ</h5>
              <p className="card-text display-4">{stats?.expiredCount || 0}</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card bg-info text-white h-100">
            <div className="card-body">
              <h5 className="card-title">買い物リスト</h5>
              <p className="card-text display-4">{stats?.shoppingListCount || 0}</p>
            </div>
            <div className="card-footer bg-transparent border-0">
              <Link to="/shopping" className="text-white">
                買い物リストを見る
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      {stats?.categoryBreakdown && stats.categoryBreakdown.length > 0 && (
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">カテゴリ別食材数</h5>
          </div>
          <div className="card-body">
            <div className="row">
              {stats.categoryBreakdown.map((cat) => (
                <div key={cat.categoryId} className="col-6 col-md-4 col-lg-2 mb-3">
                  <div className="text-center">
                    <div className="display-6">{cat.count}</div>
                    <small className="text-muted">{cat.category}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-4">
        <h5>クイックアクション</h5>
        <div className="d-flex gap-2">
          <Link to="/foods" className="btn btn-outline-primary">
            食材を追加
          </Link>
          <Link to="/shopping" className="btn btn-outline-secondary">
            買い物リストに追加
          </Link>
        </div>
      </div>
    </div>
  );
}
