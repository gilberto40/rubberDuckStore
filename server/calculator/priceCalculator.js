
import { QuantityDiscountStrategy, PackagingSurchargeStrategy, CountryDestinationSurchargeStrategy, ShippingCostStrategy } from "./specificStrategy.js";

class PriceCalculator {
    constructor() {
        this.strategies = [
            new QuantityDiscountStrategy(),
            new PackagingSurchargeStrategy(),
            new CountryDestinationSurchargeStrategy(),
            new ShippingCostStrategy()
        ];
    }

    calculateTotal(orderDetails) {
        let total = orderDetails.quantity * orderDetails.duckPrice;
        let adjusments = [];
        console.log("Precio base: " + total);
        for (const strategy of this.strategies) {
            let baseprice = total;
            const info = strategy.calculate(baseprice, orderDetails);
            if (info.adjusments !== "") {
                const formatNumber = Math.abs(info.priceAdjust).toFixed(2);
                adjusments.push(info.adjusments + formatNumber);
            }
            
            total += info.priceAdjust;
        }
        console.log(total);
        console.log(adjusments);
        return {
            totalToPay: total,
            details: adjusments
        };
    }
}

export default PriceCalculator;