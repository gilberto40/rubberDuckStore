import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import rubberDuckWarehouseRoutes from './routes/rubberDuckWarehouse.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const port = 5000;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "rubberduckstore",
    port: 3306 
});

app.use('/warehouse', rubberDuckWarehouseRoutes);
app.use('/store', rubberDuckWarehouseRoutes);

app.get('/', (req, res) =>  res.send('Hello from Homepage'));


app.listen(port,() => {
    console.log('listening');
});