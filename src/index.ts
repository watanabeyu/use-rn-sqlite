import { useCallback } from 'react';
import * as SQLite from 'expo-sqlite';

type Params = [
  name: string,
  version?: string | undefined,
  description?: string | undefined,
  size?: number | undefined,
  callback?: ((db: SQLite.WebSQLDatabase) => void) | undefined,
];

type SqlParam = [
  query: string,
  args?: (any[] | undefined),
];

type ExecuteSqlAsyncParams = SqlParam | ((results: SQLite.SQLResultSet[], index: number) => SqlParam);

export const useRNSQLite = (...params: Params) => {
  let db = SQLite.openDatabase(...params);

  const executeSqlAsync = useCallback(async (...args: ExecuteSqlAsyncParams[]): Promise<SQLite.SQLResultSet[]> => {
    const response = await new Promise<SQLite.SQLResultSet[]>((resolveAll, rejectAll) => {
      db.transaction(async (tx) => {
        let n = 0;
        const results: SQLite.SQLResultSet[] = [];

        const execAsync = async (transaction: SQLite.SQLTransaction, arg: ExecuteSqlAsyncParams) => {
          const param: SqlParam = typeof arg === 'function' ? arg(results, n) : arg;

          await new Promise<SQLite.SQLResultSet>((resolve, reject) => {
            transaction.executeSql(
              param[0],
              param[1],
              async (t: SQLite.SQLTransaction, resultSet: SQLite.SQLResultSet) => {
                results.push(resultSet);

                if (n !== args.length - 1) {
                  n += 1;
                  await execAsync(t, args[n]);
                }

                resolve(resultSet);
              },
              (_: SQLite.SQLTransaction, error: SQLite.SQLError) => {
                reject(error);

                return true;
              },
            );
          });
        };

        await execAsync(tx, args[n]);

        resolveAll(results);
      }, (error: SQLite.SQLError) => { rejectAll(error); return true; });
    });

    return response;
  }, []);

  const switchDatabase = useCallback((...newParams: Params) => {
    db = SQLite.openDatabase(...newParams);
  }, []);

  const closeDatabase = useCallback(() => {
    // eslint-disable-next-line no-underscore-dangle
    (db as SQLite.WebSQLDatabase & { _db:{ close:() => void } })._db.close();
  }, []);

  return {
    executeSqlAsync,
    switchDatabase,
    closeDatabase,
  };
};
