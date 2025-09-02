
class DuckPackage {
    constructor() {
        this.madeOf = '';
        this.filledWith = [];
    }

    /**
     * bring the material the packaging is made of
     * 
     * @returns String
    */
    getMadeOf() {
        return this.madeOf;
    }

    /**
     * bring the packaging filler
     * 
     * @returns String
    */
    getFilledWith() {
        return this.filledWith;
    }
}

export default DuckPackage;