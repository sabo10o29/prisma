## Prisma

Prisma はモデル/エンティティ優先移行
このパターンでは、コードでデータベース スキーマの構造を定義し、移行ツールを使用して SQL を生成する
参考
https://www.prisma.io/docs/concepts/components/prisma-migrate/mental-model

### RDB への反映

RDB に反映させるには以下を実行

```
prisma migrate
```

ただし、RDB 更新には権限が必要

```
grant create, alter, drop, references on *.* to user;
```

参考
https://www.prisma.io/docs/concepts/components/prisma-migrate/shadow-database#shadow-database-user-permissions

差分も確認するなら dev を付けることで sql も出力する

```
prisma migrate dev
```

手動でローカルの RDB にスキーマを適用する場合には`prisma migrate`を実行
自動で RDB にスキーマを適用する場合には`prisma migrate dev`を実行したあとの sql ファイルを`docker-entrypoint-initdb.d`以下にマウント＆実行するのが良いかも
