# use-rn-sqlite v1.0
SQLite hooks for react-native.(For now only expo-sqlite is supported.)  
* Support for multiple queries in transaction
* Support for async await

## Installation
This package use `expo-sqlite`, so you have to download with `expo-sqlite`.

```bash
$ npm install --save expo-sqlite use-rn-sqlite
```

## Demo
https://snack.expo.io/dW-5EZHud

## Usage
```tsx
...

import { useRNSQLite } from 'use-rn-sqlite';

export default function App() {
  const { executeSqlAsync, switchDatabase, closeDatabase } = useRNSQLite('db.db');

  /* execute transaction queries */
  const onInsertPress = async () => {
    const result = await executeSqlAsync(
      ['insert into user(name,age) VALUES("user1",30);'],
      (results, i) => {
        const age = results[i - 1].insertId + 1;
        
        return [`insert into user(name,age) VALUES("user2",${age});`]
      },
      ['select * from user']
    );

    console.log(result);
  }

  /* switch database */
  const onSwitchPress = () => {
    switchDatabase('db2.db');
  }

  useEffect(() => {
    executeSqlAsync([`create table if not exists user (
      id integer primary key not null,
      name text,
      age integer
    )`]);

    return () => {
      closeDatabase();
    }
  },[]);
  
  ...
}
```

## Changelog
See [CHANGELOG.md](./CHANGELOG.md)