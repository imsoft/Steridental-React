export interface PurchaseOrders {

    id: string;

    purchaseOrderNumber: string;
    date: string;

    sterilizerType: string;
    brand: string;
    model: string;
    serialNumber: string;

    billingOption: string;
    companyName_bi: string;
    rfc_bi: string;
    taxStatusRegime_bi: string;
    cfdi_bi: string;
    street_bi: string;
    outdoorNumber_bi: string;
    interiorNumber_bi: string;
    neighborhood_bi: string;
    postalCode_bi: string;
    city_bi: string;
    state_bi: string;
    country_bi: string;

    deliveryMethod: string;
    name_dm: string;
    lastName_dm: string;
    phone_dm: string;
    email_dm: string;
    street_dm: string;
    outdoorNumber_dm: string;
    interiorNumber_dm: string;
    neighborhood_dm: string;
    postalCode_dm: string;
    city_dm: string;
    state_dm: string;
    country_dm: string;

    deliveryCost: number;
    subtotal: number;
    total: number;

    paymentMethods: string;
    cardOwnerName: string;
    cardNumber: string;

}