## Prisma運用検討
### 初期セットアップ
- 要件
    - 開発の中で常にDBスキーマの更新を行うわけではないため、prismaコマンドを実行しなくてもローカルのDBにはスキーマを適用したい
    - `prisma migrate`コマンドを使用するための権限付与
- 実現方法
    - `docker-compose`で`prisma/migrations`を`/docker-entrypoint-initdb.d`にマウントして、`privileges.sql`, `initdb.sh`を使用して権限付与＆スキーマ適用

### PrismaClientを使ったDBアクセス
- 環境変数は`.env`で管理
- `.env`でローカルDB情報とPrismaで使用する`DATABASE_URL`を登録
- `NestJS`上では`ConfigModule`から取得（型チェックなども可能）
- CI/CD, 本番では環境変数を登録しておくことでそちらが優先される

### 開発中のローカルDBへのスキーマ更新
-` prisma migrate dev`コマンドを使用してDBを更新
- ローカルDB情報は`.env`に記載
    - ※初回は「初期セットアップ」から`_prisma_migrations`が存在しないためリセット要求がある

### デプロイ
- 予めスキーマ差分(`prisma/migrations`)をリポジトリへコミット
- CI/CD環境で`prisma migrate deploy`を実行
    - ※deploy先のDBサーバー情報を環境変数として設定しておく


## メモ
### About Prisma
- Prisma はモデル/エンティティ優先移行
このパターンでは、コードでデータベース スキーマの構造を定義し、移行ツールを使用して SQL を生成する
    - 参考: https://www.prisma.io/docs/concepts/components/prisma-migrate/mental-model

### prisma generate
- `schema.prisma`からORMapper生成、`/node_modules/.prisma/client/index.d.ts`に型登録
- `yarn install`で`prisma generate`も行われるため、初期化後にすぐに`schema.prisma`の型を使用できる

### prisma migrate dev
- `prisma generate`も行われる
- 対象DBに差分を適用する
- DB上の適用状態は`_prisma_migrations`に登録される
- 実行にはシャドウデータベースを使用（DBに対して`create, alter, drop, references`権限が必要）
    - 参考: https://www.prisma.io/docs/concepts/components/prisma-migrate/shadow-database#shadow-database-user-permissions
- DBスキーマの差分は`prisma/migrations`以下にsqlファイルとして保存（`prisma deploy`ではこの差分を使用してDB更新を行う）
- DB上に`_prisma_migrations`が存在せず、既存のテーブルがある場合にはリセット(`prisma migrate reset`)を要求される

### prisma migrate reset
- DB上のデータを削除、スキーマ適用

### prisma migrate deploy
- 本番環境のDBにスキーマ更新を行うためのコマンド（これ以外のコマンドを本番環境のDBに行ってはいけない）
- 基本的にCI/CD環境での実行を想定
- `prisma/migrations`以下のsqlファイルとDB上の_prisma_migrationsから差分をDBに適用する
- デプロイ用なので、データベースリセット（既存データの破壊的実行）や`prisma/migrations`の生成は行わない
→差分は`prisma migrate dev`で生成する


