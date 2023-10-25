import { ChangeEvent, useEffect, useState } from "react";
import { useAuth, useOrderContext } from "../../hooks";
import { axiosClient } from "../../config";

export const OrderSummary = () => {
  const { user } = useAuth({ middleware: "auth" });

  const {
    sterilizerData,
    getSterilizerPrice,
    sterilizerPrice,
    setSterilizerPrice,
    setApplyPromotionCode,
    setApplySharedCode,
    deliveryCost,
    calculateSubtotal,
    calculateDiscount,
    calculateIVA,
    calculateTotal,
    resetData,
  } = useOrderContext();

  const [inputPromotionCode, setInputPromotionCode] = useState("");
  const [showPromotionCode, setShowPromotionCode] = useState(false);

  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");

  const [errorTextSharedCode, setErrorTextSharedCode] = useState("");
  const [successTextSharedCode, setSuccessTextSharedCode] = useState("");

  const onInputValueChangedPromotionCode = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputPromotionCode(event.target.value);
  };

  const handlePromotionCode = async () => {
    try {
      const resp = await axiosClient.post(
        `/promotion_code`,
        {
          userEmail: user.email,
          promotionCode: inputPromotionCode,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
          },
        }
      );
      console.log(resp);
      setSuccessText("Código de promoción aplicado con éxito.");
      setSterilizerPrice(0);
      setApplyPromotionCode(inputPromotionCode);
      setApplySharedCode(false);
      setErrorText("");
      setShowPromotionCode(true);
    } catch (error) {
      setErrorText(
        "Error al aplicar el código de promoción. Código no válido."
      );
      setSuccessText("");
      setShowPromotionCode(false);
      console.log(error);
    }
  };

  const handleSharedCodesUsedStatus = async () => {
    try {
      const resp = await axiosClient.get(`/promotion_code/${user.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
        },
      });

      if (resp.data.sharedCodesUsed <= 0) {
        setErrorTextSharedCode("Nadie ha usado tu código.");
        setSuccessTextSharedCode("");
      } else {
        setSuccessTextSharedCode("¡Felicidades!, alguien ha usado tu código.");
        setSterilizerPrice(sterilizerPrice! / 2);
        setErrorTextSharedCode("");
        setApplyPromotionCode("");
        setApplySharedCode(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    resetData();
  }, []);

  return (
    <>
      <div className="sm:col-span-2">
        <div className="sticky top-16 flex-none p-6">
          <div className="text-base font-semibold leading-6 text-gray-900">
            Resumen del pedido
          </div>
          <dl className="mt-4 space-y-6 text-sm font-medium text-gray-500">
            <div className="flex justify-between">
              <dt>Tipo de esterilizador</dt>
              <dd className="text-gray-900 text-right">
                {sterilizerData.sterilizerType || "-"}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt>No. de serie</dt>
              <dd className="text-gray-900">
                {sterilizerData.serialNumber || "-"}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt>
                Precio
                {successText ? (
                  <span className="ml-2 rounded-full bg-cyan-200 px-2 py-0.5 text-xs tracking-wide text-gray-600">
                    Gratis
                  </span>
                ) : (
                  <></>
                )}
              </dt>
              <dd className="text-gray-900">
                {successText ? (
                  "$0.00"
                ) : successTextSharedCode ? (
                  <span>${sterilizerPrice!.toFixed(2)}</span>
                ) : (
                  <span>
                    $
                    {getSterilizerPrice(sterilizerData.sterilizerType)?.toFixed(
                      2
                    ) || "0.00"}
                  </span>
                )}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="flex">
                Descuento
                {showPromotionCode && (
                  <span className="ml-2 rounded-full bg-cyan-200 px-2 py-0.5 text-xs tracking-wide text-gray-600">
                    {inputPromotionCode}
                  </span>
                )}
              </dt>
              <dd className="text-gray-900">
                {successText ? (
                  "Pedido gratuito"
                ) : successTextSharedCode ? (
                  "-50%"
                ) : (
                  <span>${calculateDiscount().toFixed(2)}</span>
                )}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt>Costo de envio</dt>
              <dd className="text-gray-900">${deliveryCost.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd className="text-gray-900">
                $
                {isNaN(calculateSubtotal())
                  ? "0.00"
                  : calculateSubtotal().toFixed(2)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt>IVA (16%)</dt>
              <dd className="text-gray-900">
                ${isNaN(calculateIVA()) ? "0.00" : calculateIVA().toFixed(2)}
              </dd>
            </div>

            {sterilizerData.sterilizerType ? (
              <form>
                <label
                  htmlFor="promotionCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Código de descuento
                </label>
                <div className="mt-1 flex space-x-4">
                  <input
                    type="text"
                    id="promotionCode"
                    name="promotionCode"
                    onChange={onInputValueChangedPromotionCode}
                    className="block w-full p-2 rounded-md border-cyan-300 shadow-sm ring-1 ring-inset focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                  />
                  {!successText && !successTextSharedCode && (
                    <button
                      type="button"
                      onClick={handlePromotionCode}
                      className="rounded-md bg-cyan-200 px-4 text-sm font-medium text-gray-600 hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-cyan-50"
                    >
                      Aplicar
                    </button>
                  )}
                </div>
                <>
                  {errorText && (
                    <p className="mt-2 text-sm text-red-600" id="error-message">
                      {errorText}
                    </p>
                  )}
                  {successText && (
                    <p
                      className="mt-2 text-sm text-green-600"
                      id="success-message"
                    >
                      {successText}
                    </p>
                  )}
                </>
                {!inputPromotionCode && showPromotionCode && (
                  <>
                    <p
                      className="mt-2 text-sm text-red-600"
                      id="outdoorNumber-error"
                    >
                      Código de promoción inválido.
                    </p>
                  </>
                )}

                <div className="mt-5 flex space-x-4">
                  <label
                    htmlFor="promotionCode"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Puedes verificar si han usado tu código de descuento
                  </label>

                  {!successText && (
                    <button
                      type="button"
                      onClick={handleSharedCodesUsedStatus}
                      className="rounded-md bg-cyan-200 px-4 text-sm font-medium text-gray-600 hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-cyan-50"
                    >
                      Checar
                    </button>
                  )}
                </div>
                <>
                  {errorTextSharedCode && (
                    <p className="mt-2 text-sm text-red-600" id="error-message">
                      {errorTextSharedCode}
                    </p>
                  )}
                  {successTextSharedCode && (
                    <p
                      className="mt-2 text-sm text-green-600"
                      id="success-message"
                    >
                      {successTextSharedCode}
                    </p>
                  )}
                </>
              </form>
            ) : (
              <></>
            )}

            <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
              <dt className="text-base">Total</dt>
              <dd className="text-base">
                <span>
                  $
                  {isNaN(calculateTotal())
                    ? "0.00"
                    : calculateTotal().toFixed(2)}
                </span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
};
