import dotenv from 'dotenv';

dotenv.config();

const DB_USERNAME = process.env.DB_USERNAME || '';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_DSN = '';

const HTTP_PORT = process.env.HTTP_PORT ? Number(process.env.HTTP_PORT) : 8089;

export default {
    db: {
        dsn: DB_DSN
    },
    server: {
        http: {
            port: HTTP_PORT
        }
    }
};
