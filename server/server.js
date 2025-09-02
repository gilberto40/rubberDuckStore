import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import rubberDuckWarehouseRoutes from './routes/rubberDuckWarehouse.js';
import rubberDuckStoreRoutes from './routes/rubberDuckStore.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const port = 5000;

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT 
});

app.use('/warehouse', rubberDuckWarehouseRoutes);
app.use('/store', rubberDuckStoreRoutes);

app.get('/', (req, res) =>  res.send('Hello from Homepage'));


app.listen(port,() => {
    console.log('listening');
});