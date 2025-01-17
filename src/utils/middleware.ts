import { Request, Response, NextFunction } from 'express';
import db from './setupDatabase';

export const checkDatabase = (req: Request, res: Response, next: NextFunction) => {
    db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='users'", (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        
        if (!row) {
            return res.status(500).json({ error: 'Database tables not initialized' });
        }
        
        next();
    });
};