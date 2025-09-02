import express from 'express';

import duckWarehouseController from '../controller/duckWarehouse.js';

const router = express.Router();


router.get('/', duckWarehouseController.getDucks);
router.get('/:id', duckWarehouseController.getDuck);
router.post('/add', duckWarehouseController.addDuck);
router.patch('/update/:id', duckWarehouseController.updateDuck);
router.delete('/delete/:id', duckWarehouseController.deleteDuck);


export default router;


