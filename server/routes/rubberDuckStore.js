import express from 'express';

import duckStoreController from '../controller/duckStore.js';

const router = express.Router();

//REST API
router.get('/process', duckStoreController.processOrder);


export default router;

