
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
        const basePrice = total;
        let adjusments = [];

        for (const strategy of this.strategies) {
            const info = strategy.calculate(basePrice, orderDetails);
            if (info.adjusments !== "") {
                const formatNumber = Math.abs(info.priceAdjust).toFixed(2);
                adjusments.push(info.adjusments + formatNumber);
            }
            
            total += info.priceAdjust;
        }
  
        return {
            totalToPay: total,
            details: adjusments
        };
    }
}

export default PriceCalculator;