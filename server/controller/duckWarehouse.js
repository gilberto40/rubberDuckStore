import Duck from '../model/duck.js';
import { updateFunction, getDucks, notifyChangeInListDucks } from '../utils/duckHelper.js';


const duckWarehouseController = {
    addDuck: async (req, res) => {
        try {
            const { color, size, price, quantity } = req.body;
            const ducks = getDucks();
        
            const duplicate = ducks.find(duck => 
                duck.color === color &&
                duck.size === size &&
                parseFloat(duck.price) === parseFloat(price)
            );

            if (! duplicate) {
                const duck = await Duck.create({
                    color,
                    size,
                    price: parseFloat(price),
                    quantity: parseInt(quantity),
                    deleted: false
                });

                notifyChangeInListDucks();
                res.status(201).json({
                    success: true,
                    data: `The duck has been added id : ${ duck.id} .`
                })
            } else {
                req.body.quantity = parseInt(req.body.quantity) + duplicate.quantity;
                const updatedRowsCount = await updateFunction(req, res, duplicate.id);
                if (updatedRowsCount > 0) {
                    notifyChangeInListDucks();
                    
                    return res.status(200).json({
                    success: true,
                    message: `Duck id: ${duplicate.id} updated.`
                    });
                }
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    },

    updateDuck: async(req, res) => {
        try {
            const { id } = req.params;
            const updatedRowsCount = await updateFunction(req, res);

            if (updatedRowsCount === -1) {
                return res.status(400).json({
                    success: false,
                    message: `Price And Quantity with the same values`
                }); 
            }

            if (updatedRowsCount === -2) {
                return res.status(404).json({
                    success: false,
                    message: `There Is No Duck With id: ${id}`
                });
            }

            if (updatedRowsCount > 0) {
                notifyChangeInListDucks();
                
                return res.status(200).json({
                success: true,
                message: `Duck id: ${id} updated.`
                });
            } else {
                return res.status(400).json({
                success: false,
                message: `There was an error with duck id: ${id}.`
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    },

    getDucks: async(req, res) => {
        try {
            const ducks = getDucks();

            res.status(200).json({
                success: true,
                data: ducks
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    },

    getDuck: async(req, res) => {
        try {
            const { id } = req.params;
            const ducks = getDucks();

            const existingDuck = ducks.find((duck) => duck.id == id);

            if (existingDuck) {
                res.status(201).json({
                    success: true,
                    data: existingDuck
                });
            } else {
                res.status(500).json({
                    success: false,
                    error: "Incorrect Duck ID"
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
        
    },

    deleteDuck: async(req, res) => {
        try {
            const { id } = req.params;
 
            const duckToDelete = await Duck.findByPk(id);
            
             if (! duckToDelete) {
                return res.status(404).json({ success: false, message: 'Duck not found.' });
            }

            await duckToDelete.softDelete();

            notifyChangeInListDucks();

            res.status(200).json({ success: true, message: 'Duck has been deleted' });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            }); 
        }
    }
}

export default duckWarehouseController;