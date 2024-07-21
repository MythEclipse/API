import 'dotenv/config';

const CONFIG = {
    db: process.env.DB as string | undefined
};

export default CONFIG;