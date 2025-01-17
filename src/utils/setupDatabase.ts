import { Database } from 'sqlite3';

let db: Database;

if (process.env.NODE_ENV === 'test') {
    db = new Database(':memory:');
} else {
    db = new Database('database.sqlite');
}

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )`);
});

export default db;