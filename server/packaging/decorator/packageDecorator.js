
class PackageDecorator {
    constructor(packageObject) {
        this.packageObject = packageObject;
        this.filledWith = [];
    }

    getMadeOf() {
        return this.packageObject.getMadeOf();
    }

    getFilledWith() {
        const wrappedFilledWith = this.packageObject.getFilledWith();
        return wrappedFilledWith.concat(this.filledWith);
    }
}

export default PackageDecorator;