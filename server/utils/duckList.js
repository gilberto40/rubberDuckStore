import Duck from '../model/duck.js';

// Singleton
class DuckList {

    static instancia = null;

    ducks = [];

    constructor() {
        if (DuckList.instance) {
            return DuckList.instance;
        } 

        DuckList.instance = this;

        this.notifyChange(); 
    }

    /**
     * Every time an update o create is execute, this function notify th list to update
     * 
     * @return Object ducks
     */
    async notifyChange() {
        try {
            const ducks = await Duck.findAll({
                where: { deleted: false },
                order: [['quantity', 'DESC']],
                raw: true
            });
            
            this.ducks = ducks;

        } catch (error) {
            throw error;
        }
    }

    getListDucks() {
        return this.ducks;
    }
}

const duckListInstance = new DuckList();

export default duckListInstance;