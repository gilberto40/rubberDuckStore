import DuckPackage from "./package.js";

class WoodPackage extends DuckPackage {
    constructor() {
        super();
        this.madeOf = 'Wood';
    }
}

class CardboardPackage extends DuckPackage {
    constructor() {
        super();
        this.madeOf = 'Cardboard';
    }
}

class PlasticPackage extends DuckPackage {
    constructor() {
        super();
        this.madeOf = 'Plastic';
    }
}

export { WoodPackage, CardboardPackage, PlasticPackage };