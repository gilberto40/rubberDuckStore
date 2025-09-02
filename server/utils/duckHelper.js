
import DuckList from './duckList.js';
import Duck from '../model/duck.js';

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param Int duplicateId 
 * @returns 
 */
export const updateFunction =  async (req, res, duplicateId = null) => {
    let id;

    // This logic is to use this function on the create action
    if (duplicateId == null) {
        ({ id } = req.params);
    } else {
        id = duplicateId;
    }
    
    const { quantity, price } = req.body;

    const existingDuck = DuckList.getListDucks().find((duck) => duck.id == id);
    
    //if it doesn't exist send an error code
    if (existingDuck.price === price && existingDuck.quantity === quantity) {
        return -1;
    }

    //if there is no any change in the information send an erro code
    if (! existingDuck) {
        return -2;
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

/**
 * 
 * Get all the rows in ducks table
 * 
 * @returns {[*]} ducks
*/
export const getDucks = () => {
    return DuckList.getListDucks();
}

/**
 * refresh the ducks list
 * 
 * @return void 
*/
export const notifyChangeInListDucks = async () => {
    await DuckList.notifyChange();
}   