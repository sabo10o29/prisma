#!/usr/bin/env bash
find /docker-entrypoint-initdb.d -mindepth 3 -type f -print0 | while read -d $'\0' f; do
  case "$f" in
    *.sql)    echo "$0: running $f"; mysql -u root -p$MYSQL_ROOT_PASSWORD $MYSQL_DATABASE < $f; echo ;;
    *)        echo "$0: ignoring $f" ;;
  esac
  echo
done

