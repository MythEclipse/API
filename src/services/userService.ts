import { Database } from 'sqlite3';
import { User } from '../types/userTypes';

export class UserService {
    private db: Database;

    constructor() {
        this.db = new Database('./database.sqlite', (err) => {
            if (err) {
                console.error('Failed to connect to the database', err);
            } else {
                console.log('Connected to the SQLite database');
                this.initializeDatabase();
            }
        });
    }

    private initializeDatabase() {
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            )
        `;
        this.db.run(createTableQuery, (err) => {
            if (err) {
                console.error('Failed to create users table', err);
            }
        });
    }

    findUser(userId: number): Promise<User | undefined> {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE id = ?';
            this.db.get(query, [userId], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row as User);
                }
            });
        });
    }

    saveUser(user: User): Promise<void> {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
            this.db.run(query, [user.name, user.email, user.password], function (err) {
                if (err) {
                    reject(err);
                } else {
                    user.id = this.lastID.toString();
                    resolve();
                }
            });
        });
    }

    updateUser(userId: number, userData: Partial<User>): Promise<void> {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?';
            this.db.run(query, [userData.name, userData.email, userData.password, userId], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    deleteUser(userId: number): Promise<void> {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM users WHERE id = ?';
            this.db.run(query, [userId], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}