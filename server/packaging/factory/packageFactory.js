import { WoodPackage, CardboardPackage, PlasticPackage } from "./specificPackage.js";

class PackageFactory {
    static createPackage(size) {
        if (size === "XLarge" || size === "Large") {
            return new WoodPackage();
        } else if (size === "Medium") {
            return new CardboardPackage();
        } else if (size === "Small" || size === "XSmall") {
            return new PlasticPackage();
        } else {
            return null;
        }
    }
}

export default PackageFactory;