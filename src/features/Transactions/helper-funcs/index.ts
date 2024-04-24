
const prices: Record<string, string> = {
    "Dental": "price_1P8JtrP5PlPmwWRiJo87IMvi",
    "Surgery": "price_1P8JrgP5PlPmwWRimpq7OdK9",
    "Training": "price_1P8Js6P5PlPmwWRiTgs9fMHS",
    "Bathing and Grooming": "price_1P8JsQP5PlPmwWRiTfceA7Jt",
    "Emergency Care": "price_1P8JsjP5PlPmwWRism9p6xX6",
    "Immunization": "price_1P8Jt2P5PlPmwWRizldCY631",
    "Check-up": "price_1P8JtIP5PlPmwWRiYRLZGsoH"
}

const pricesList = (service_name: string): string => {
    if (service_name in prices) {
        return prices[service_name];
    }
    return "";
};


export { pricesList }