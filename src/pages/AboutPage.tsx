import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function AboutPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h1 className="text-center mb-4">食材管理アプリについて</h1>

          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">このアプリでできること</h5>
              <p className="card-text">
                食材管理アプリは、食材を簡単に管理し、食品ロスを減らすためのアプリです。
                賞味期限の管理や買い物リストの作成をサポートします。
              </p>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">主な機能</h5>
              <ul className="list-unstyled">
                <li className="mb-3">
                  <strong>食材ストック管理</strong>
                  <p className="text-muted mb-0">
                    食材の登録、編集、削除ができます。カテゴリ別に整理して管理できます。
                  </p>
                </li>
                <li className="mb-3">
                  <strong>賞味期限管理</strong>
                  <p className="text-muted mb-0">
                    賞味期限を登録すると、期限が近い食材や期限切れの食材を一目で確認できます。
                  </p>
                </li>
                <li className="mb-3">
                  <strong>買い物リスト</strong>
                  <p className="text-muted mb-0">
                    買いたい食材をリストに追加。購入後は「完了」ボタンで食材ストックに移動できます。
                  </p>
                </li>
                <li className="mb-3">
                  <strong>ダッシュボード</strong>
                  <p className="text-muted mb-0">
                    食材の総数、期限間近の食材数などを一覧で確認できます。
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">使い方</h5>
              <ol className="mb-0">
                <li className="mb-2">アカウントを作成してログインします</li>
                <li className="mb-2">「食材ストック」から食材を登録します</li>
                <li className="mb-2">賞味期限を設定して期限管理を行います</li>
                <li className="mb-2">「買い物リスト」で買い物の計画を立てます</li>
                <li className="mb-2">購入したら「完了」で食材ストックに追加します</li>
              </ol>
            </div>
          </div>

          <div className="text-center">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn btn-primary btn-lg">
                ダッシュボードへ
              </Link>
            ) : (
              <div className="d-flex gap-3 justify-content-center">
                <Link to="/login" className="btn btn-primary btn-lg">
                  ログイン
                </Link>
                <Link to="/register" className="btn btn-outline-primary btn-lg">
                  新規登録
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
