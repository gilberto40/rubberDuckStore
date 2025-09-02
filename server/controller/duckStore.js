
import PackageFactory from '../packaging/factory/packageFactory.js';
import { PolystyreneBallsDecorator, BubbleWrapDecorator, MoistureBeadsDecorator } from '../packaging/decorator/specificPackageDecorator.js';
import PriceCalculator from '../calculator/priceCalculator.js';
import { getDucks } from '../utils/duckHelper.js';
const duckStoreController = {
    processOrder: async (req, res) => {
        try {
            const { color, size, quantity, destination, shippingMode} = req.body;

            const ducks = getDucks();

            const duckFound = ducks.find(duck => 
                duck.color === color &&
                duck.size === size
            );

            if (! duckFound) {
                return res.status(400).json({
                    success: false,
                    error: "Inexistent Duck"
                });
            }
 
            let packaging = PackageFactory.createPackage(size);

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

            const orderDetails = {
                quantity: quantity,
                madeOf: packageType,
                destinationCountry: destination,
                shippingMode: shippingMode,
                duckPrice : duckFound.price
            };
            const calculator = new PriceCalculator();
            const { totalToPay, details } = calculator.calculateTotal(orderDetails);

            const response = {
                packageType,
                protectionType,
                totalToPay,
                details
            }

            res.status(200).json({
                success: true,
                data: response
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