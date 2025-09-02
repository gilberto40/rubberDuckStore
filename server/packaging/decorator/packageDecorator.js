
//Parent Class for decorators
class PackageDecorator {
    constructor(packageObject) {
        this.packageObject = packageObject;
        this.filledWith = [];
    }

    /**
     * bring the material the packaging is made of
     * 
     * @returns String
     */
    getMadeOf() {
        return this.packageObject.getMadeOf();
    }

    /**
     * bring the packaging filler
     * 
     * @returns String
     */
    getFilledWith() {
        const wrappedFilledWith = this.packageObject.getFilledWith();
        return wrappedFilledWith.concat(this.filledWith);
    }
}

export default PackageDecorator;