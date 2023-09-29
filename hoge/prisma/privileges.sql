-- prismaでmigrateコマンドを実行するために必要
-- 参考：https://www.prisma.io/docs/concepts/components/prisma-migrate/shadow-database#shadow-database-user-permissions
grant create, alter, drop, references on *.* to user;