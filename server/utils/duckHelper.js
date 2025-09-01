
import DuckList from './duckList.js';
import Duck from '../model/duck.js';


export const updateFunction =  async (req, res, duplicateId = null) => {
    let id;

    if (duplicateId == null) {
        ({ id } = req.params);
    } else {
        id = duplicateId;
    }
    
    const { quantity, price } = req.body;

    const existingDuck = DuckList.getListDucks().find((duck) => duck.id == id);
   
    if (! existingDuck) {
        return res.status(404).json({
            success: false,
            message: `There Is No Duck With id: ${id}`
        });
    }

    const fieldUpdate = {};
    if (quantity !== undefined) {
        fieldUpdate.quantity = quantity;
    }
    if (price !== undefined) {
        fieldUpdate.price = price;
    }

    const [updatedRowsCount] = await Duck.update(fieldUpdate, {
        where: { id: existingDuck.id },
        validate: true
    });

    return updatedRowsCount;
}

export const getDucks = () => {
    return DuckList.getListDucks();
}

export const notifyChangeInListDucks = async () => {
    await DuckList.notifyChange();
}   