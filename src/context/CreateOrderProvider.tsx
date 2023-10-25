import { FC, ReactNode, useState } from "react";
import { CreateOrderContext } from ".";
import {
  Bill,
  BillingOption,
  DeliveryMethod,
  ShippingAddress,
  Sterilizer,
} from "../interfaces";
import { SterilizerDataOptions } from "../data";

interface Props {
  children: ReactNode;
}

const SterilizersData_INITIAL_STATE: Sterilizer = {
  id: "",
  sterilizerType: "",
  brand: "",
  model: "",
  serialNumber: "",
};

const BillingsInformation_INITIAL_STATE: Bill = {
  id: "",
  companyName: "",
  rfc: "",
  taxStatusRegime: "",
  cfdi: "",
  street: "",
  outdoorNumber: "",
  interiorNumber: "",
  neighborhood: "",
  postalCode: "",
  city: "",
  state: "",
  country: "",
};

const ShippingsInformation_INITIAL_STATE: ShippingAddress = {
  id: "",
  name: "",
  lastName: "",
  phone: "",
  email: "",
  street: "",
  outdoorNumber: "",
  interiorNumber: "",
  neighborhood: "",
  postalCode: "",
  city: "",
  state: "",
  country: "",
};

const DeliveryMethods_INITIAL_STATE: DeliveryMethod = {
  _id: "",
  title: "",
};

const BillingOptions_INITIAL_STATE: BillingOption = {
  _id: "",
  title: "",
};

export const CreateOrdersProvider: FC<Props> = ({ children }) => {
  const [sterilizerData, setSterilizerData] = useState<Sterilizer>({
    id: "",
    sterilizerType: "",
    brand: "",
    model: "",
    serialNumber: "",
  });

  const [billingInformation, setBillingInformation] = useState<Bill>({
    id: "",
    companyName: "",
    rfc: "",
    taxStatusRegime: "",
    cfdi: "",
    street: "",
    outdoorNumber: "",
    interiorNumber: "",
    neighborhood: "",
    postalCode: "",
    city: "",
    state: "",
    country: "",
  });

  const [shippingInformation, setShippingInformation] =
    useState<ShippingAddress>({
      id: "",
      name: "",
      lastName: "",
      phone: "",
      email: "",
      street: "",
      outdoorNumber: "",
      interiorNumber: "",
      neighborhood: "",
      postalCode: "",
      city: "",
      state: "",
      country: "",
    });

  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>({
    _id: "",
    title: "",
  });

  const [billingOption, setBillingOption] = useState<BillingOption>({
    _id: "",
    title: "",
  });

  const [deliveryCost, setDeliveryCost] = useState<number>(0);

  const [sterilizerPrice, setSterilizerPrice] = useState<number | undefined>(
    undefined
  );

  const [applyPromotionCode, setApplyPromotionCode] = useState("");
  const [applySharedCode, setApplySharedCode] = useState(false);

  const getSterilizerPrice = (typeToSterilizer: string): number | undefined => {
    const filteredSterilizer = SterilizerDataOptions.find(
      (sterilizer) => sterilizer.type === typeToSterilizer
    );

    setSterilizerPrice(filteredSterilizer?.price);
    return filteredSterilizer?.price;
  };

  const calculateSubtotal = () => {
    // const sterilizerPrice = getSterilizerPrice(sterilizerData.sterilizerType);
    return sterilizerPrice! + deliveryCost;
  };

  const calculateDiscount = () => {
    const discount = 0;
    return discount;
  };

  const calculateIVA = () => {
    const subtotal = calculateSubtotal() - calculateDiscount();
    return subtotal * 0.16;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return subtotal + calculateIVA();
  };

  const resetData = () => {
    setSterilizerData(SterilizersData_INITIAL_STATE);
    setBillingInformation(BillingsInformation_INITIAL_STATE);
    setShippingInformation(ShippingsInformation_INITIAL_STATE);
    setDeliveryMethod(DeliveryMethods_INITIAL_STATE);
    setBillingOption(BillingOptions_INITIAL_STATE);
    setDeliveryCost(0);
  };

  return (
    <CreateOrderContext.Provider
      value={{
        sterilizerData,
        setSterilizerData,
        billingInformation,
        setBillingInformation,
        shippingInformation,
        setShippingInformation,
        deliveryMethod,
        setDeliveryMethod,
        deliveryCost,
        setDeliveryCost,
        getSterilizerPrice,
        calculateSubtotal,
        calculateDiscount,
        calculateIVA,
        calculateTotal,
        resetData,
        billingOption,
        setBillingOption,
        sterilizerPrice,
        setSterilizerPrice,
        applyPromotionCode,
        setApplyPromotionCode,
        applySharedCode,
        setApplySharedCode,

        //Methods
      }}
    >
      {children}
    </CreateOrderContext.Provider>
  );
};
