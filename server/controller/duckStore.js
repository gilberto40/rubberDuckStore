
import PackageFactory from '../packaging/factory/packageFactory.js';
import { PolystyreneBallsDecorator, BubbleWrapDecorator, MoistureBeadsDecorator } from '../packaging/decorator/specificPackageDecorator.js';

const duckStoreController = {
    processOrder: async (req, res) => {
        try {
            const { color, size, quantity, destination, shippingMode} = req.body;
 
            let packaging = PackageFactory.createPackage(size);
            console.log(packaging);
            if (packaging === null) {
                return res.status(400).json({
                    success: false,
                    error: "Invalid Size"
                });
            }

            if (shippingMode === "Air" && (packaging.getMadeOf() === "Wood" || packaging.getMadeOf() === "Cardboard")) {
                packaging = new PolystyreneBallsDecorator(packaging);
            } else if (shippingMode === "Air" && packaging.getMadeOf() === "Plastic") {
                packaging = new BubbleWrapDecorator(packaging);
            } else if (shippingMode === "Land") {
                packaging = new PolystyreneBallsDecorator(packaging);
            } else if (shippingMode === "Sea") {
               packaging = new MoistureBeadsDecorator(new BubbleWrapDecorator(packaging));
            }

            const packageType = packaging.getMadeOf();
            const protectionType = packaging.getFilledWith();

            console.log(packageType);
            console.log(protectionType);

            res.status(200).json({
                success: true,
                data: protectionType
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    }
}

export default duckStoreController;