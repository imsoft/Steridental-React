import React from "react";
import router from "./router";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { CreateOrdersProvider } from "./context";
import { ShippingAddressesProvider } from "./context/shippingAddresses";
import "./index.css";
import { SterilizersProvider } from "./context/sterilizers";
import { BillingInformationProvider } from "./context/billingsInformation";
import { ReportsProvider } from "./context/reports";
import { PurchaseOrderProvider } from "./context/purchaseOrder";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CreateOrdersProvider>
      <ShippingAddressesProvider>
        <SterilizersProvider>
          <BillingInformationProvider>
            <ReportsProvider>
              <PurchaseOrderProvider>
                <RouterProvider router={router} />
              </PurchaseOrderProvider>
            </ReportsProvider>
          </BillingInformationProvider>
        </SterilizersProvider>
      </ShippingAddressesProvider>
    </CreateOrdersProvider>
  </React.StrictMode>
);
