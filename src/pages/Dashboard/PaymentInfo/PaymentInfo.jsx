import { useLocation } from "react-router-dom";
import CheckoutForm from "../Payment/CheckoutForm";
import Payment from "../Payment/Payment";

const PaymentInfo = () => {
  const location = useLocation();
  const silverCart = location.pathname.includes("checkout/Silver");
  
  const PlatinumCart = location.pathname.includes("checkout/Platinum");
  const silverPrice = 59;
  const goldPrice = 59;
  const platinumPrice = 59;
  if (silverCart) {
    return (
      <div className="my-10">
        <div>
          <h1 className="text-center my-4 font-semibold text-3xl ">
            You are selected the Silver Meal Package
          </h1>
        </div>
        <div>
          <p>Silever Package Information</p>
        </div>
        <div>
          <Payment totalPrice={silverPrice} />
        </div>
      </div>
    );
  } else if (PlatinumCart) {
    return (
      <div className="my-10">
        <div>
          <h1 className="text-center my-4 font-semibold text-3xl ">
            You are selected the Platinum Meal Package
          </h1>
        </div>
        <div>
          <p>Platinum  Package Information</p>
        </div>
        <div>
          <Payment totalPrice={platinumPrice} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="my-10">
        <div>
          <h1 className="text-center my-4 font-semibold text-3xl ">
            You are selected the Gold Meal Package
          </h1>
        </div>
        <div>
          <p>Gold Package Information</p>
        </div>
        <div>
          <Payment totalPrice={goldPrice} />
        </div>
      </div>
    );
  }
};

export default PaymentInfo;
