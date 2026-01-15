# Food Manager Frontend

url:https://recipe-mini-eikg.vercel.app/

食材・日用品を管理するWebアプリケーションのフロントエンドです。

## 機能

- **食材ストック管理**: 冷蔵・冷凍・常温の食材を管理
- **日用品ストック管理**: 日用品・その他のアイテムを管理
- **買い物リスト**: 買い物予定のアイテムを管理、完了時に各ストックへ移動
- **ダッシュボード**: 各カテゴリの在庫数を一覧表示
- **ユーザー認証**: ログイン・新規登録機能

## 技術スタック

- React 18
- TypeScript
- Vite
- React Router
- React Query (TanStack Query)
- React Hook Form
- Bootstrap 5
- Axios

## 開発環境セットアップ

```bash
# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# テスト
npm test
```

## 環境変数

| 変数名 | 説明 | デフォルト |
|--------|------|------------|
| VITE_API_URL | バックエンドAPIのURL | http://localhost:8080 |

## 本番環境

Docker を使用してデプロイします。

```bash
docker build -t food-manager-frontend .
docker run -p 80:80 food-manager-frontend
```

## ディレクトリ構成

```
src/
├── api/          # API通信
├── components/   # 再利用可能なコンポーネント
├── constants/    # 定数定義
├── contexts/     # React Context
├── hooks/        # カスタムフック
├── pages/        # ページコンポーネント
└── types/        # TypeScript型定義
```

## ライセンス

MIT
