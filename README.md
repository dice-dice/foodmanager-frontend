# Food Manager Frontend

url:https://www.food-manager.jp/

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

## CI/CD (GitHub Actions)

GitHub Actionsを使用して、mainブランチへのpush時に自動でビルド・デプロイを実行します。

### VPS構成

```
VPS ~/food-manager-v2/
├── docker-compose.yml  (手動配置)
├── frontend/           → GitHub: foodmanager-frontend
└── backend/            → GitHub: foodmanager-backend
```

### セットアップ手順

#### 1. ローカルプロジェクトにワークフロー作成

`.github/workflows/ci.yml` を作成

#### 2. VPS側でSSH鍵を作成

```bash
# 鍵を生成
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/id_ed25519_github_actions

# 公開鍵をVPS許可リストに登録
cat ~/.ssh/id_ed25519_github_actions.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

#### 3. GitHub Secretsに登録

リポジトリの **Settings → Secrets and variables → Actions → New repository secret** で以下を登録：

| Name | Value |
|------|-------|
| `VPS_HOST` | VPSのIPアドレス |
| `VPS_USER` | SSHユーザー名 |
| `SSH_PRIVATE_KEY` | 秘密鍵の中身（`cat ~/.ssh/id_ed25519_github_actions`） |

#### 4. ワークフローの内容

```yaml
name: CI and Deploy

on:
  push:
    branches:
      - main
  pull_request:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build

  deploy:
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    steps:
      - name: Setup SSH
        run: |
          mkdir -p ~/.ssh
          echo "${{ secrets.SSH_PRIVATE_KEY }}" > ~/.ssh/id_ed25519
          chmod 600 ~/.ssh/id_ed25519
          ssh-keyscan -H ${{ secrets.VPS_HOST }} >> ~/.ssh/known_hosts
      - name: Deploy on VPS
        run: |
          ssh ${{ secrets.VPS_USER }}@${{ secrets.VPS_HOST }} << 'EOF'
            set -e
            git config --global --add safe.directory /home/daisuke/food-manager-v2/frontend
            cd /home/daisuke/food-manager-v2/frontend
            git fetch origin main
            git reset --hard origin/main
            cd /home/daisuke/food-manager-v2
            docker compose up -d --build
          EOF
```

### デプロイフロー

```
push → build (CI) → 成功 → deploy (VPS) → docker compose up
```

- `needs: build` により、ビルド成功後にのみデプロイが実行されます
- `git reset --hard` を使用することで、force push後も安定してデプロイできます

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
