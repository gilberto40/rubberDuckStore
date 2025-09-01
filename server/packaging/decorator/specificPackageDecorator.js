import PackageDecorator from "./packageDecorator.js";

class PolystyreneBallsDecorator extends PackageDecorator {
    constructor(packageObject) {
        super(packageObject);
        this.packageObject.filledWith.push('Polystyrene balls');
    }
}

class BubbleWrapDecorator extends PackageDecorator {
    constructor(packageObject) {
        super(packageObject);
        this.packageObject.filledWith.push('Bubble wrap bags');
    }
}

class MoistureBeadsDecorator extends PackageDecorator {
    constructor(packageObject) {
        super(packageObject);
        this.packageObject.filledWith.push('Moisture-absorbing beads');
    }
}

export { PolystyreneBallsDecorator, BubbleWrapDecorator, MoistureBeadsDecorator };