import CalculatorStrategy from "./calculatorStrategy.js"; 

class QuantityDiscountStrategy extends CalculatorStrategy {
    calculate(priceAdjust, orderDetails) {
        console.log(priceAdjust);
        console.log(orderDetails);
        if (orderDetails.quantity > 1000) {
            return { priceAdjust: -(priceAdjust * 0.20) , adjusments: "20% Discount for more than 100 units. Total: "};
        }
        return { priceAdjust: 0, adjusments };
    }
}

class PackagingSurchargeStrategy extends CalculatorStrategy {
    calculate(priceAdjust, orderDetails) {
        switch (orderDetails.madeOf) {
            case "Wood":
                return { priceAdjust: (priceAdjust * 0.05 ), adjusments: "5% Charge for Wood Package. Discount Total: "};
            case "Plastic":
                return { priceAdjust: priceAdjust * 0.1, adjusments: "10% Charge for Plastic Package. Discount Total: " };
            case "Cardboard":
                return { priceAdjust: -(priceAdjust * 0.01), adjusments: "1% Discount for Cardboard Package. Discount Total: " };
        }
        return { priceAdjust: 0, adjusments: "" };
    }
}

class CountryDestinationSurchargeStrategy extends CalculatorStrategy { 
     calculate(priceAdjust, orderDetails) {
        switch (orderDetails.destinationCountry) {
            case 'USA':
                return { priceAdjust: priceAdjust * 0.18, adjusments: "18% Charge for Destination Country USA. Discount Total: " };
            case 'Bolivia':
                return { priceAdjust: priceAdjust * 0.13, adjusments: "13% Charge for Destination Country Bolivia. Discount Total: " };
            case 'India':
                return { priceAdjust: priceAdjust * 0.19, adjusments: "13% Charge for Destination Country India. Discount Total: " };
            default:
                return { priceAdjust: priceAdjust * 0.15, adjusments: "13% Charge for Other Country. Discount Total: " };
        }
    }
}

class ShippingCostStrategy extends CalculatorStrategy {
    calculate(priceAdjust, orderDetails) {
        switch (orderDetails.shippingMode) {
            case "Sea":
                return { priceAdjust: 400, adjusments: "400$ Charge Shipping Mode: Sea. Discount Total: " };
            case "Land":
                priceAdjust = (10 * orderDetails.quantity)
                return { priceAdjust: priceAdjust, adjusments: "10$ For Each Duck Charge Shipping Mode: Land. Discount Total: " };
            case "Air":
                let airCost = 30 * orderDetails.quantity;
                if (orderDetails.quantity > 1000) {
                    airCost *= 0.85;
                }
                return { priceAdjust: airCost , adjusments: "30$ For Each Duck with (optional 15% off if quantity is more than 1000) Charge Shipping Mode: Air. Discount Total: " };
        }
    }
}

export { QuantityDiscountStrategy, CountryDestinationSurchargeStrategy, PackagingSurchargeStrategy, ShippingCostStrategy};