import { useLocation } from "react-router-dom";
import Payment from "../Payment/Payment";
import { Helmet } from "react-helmet-async";

const PaymentInfo = () => {
  const location = useLocation();
  const silverCart = location.pathname.includes("checkout/Silver");
  
  const PlatinumCart = location.pathname.includes("checkout/Platinum");
  const silverPrice = 29;
  const goldPrice = 59;
  const platinumPrice = 99;
  if (silverCart) {
    return (
      <div className="my-10">
        <Helmet>
        <title>Hostel Management | Checkout</title>
      </Helmet>
        <div>
          <h1 className="text-center my-4 font-semibold text-3xl ">
            You are selected the Silver Meal Package
          </h1>
        </div>
        <div className="text-center text-xl ">

              <p>Attendance Tracking</p>
              <p>Monthly Reports</p>
              <p>Use on 1 (one) hostel</p>
              <p>3 Months support</p>
        </div>
        <div>
          <Payment totalPrice={silverPrice} />
        </div>
      </div>
    );
  } else if (PlatinumCart) {
    return (
      <div className="my-10">
        <Helmet>
        <title>Hostel Management | Checkout</title>
      </Helmet>
        <div>
          <h1 className="text-center my-4 font-semibold text-3xl ">
            You are selected the Platinum Meal Package
          </h1>
        </div>
        <div className="text-center text-xl ">
          <p>Premium Meal Customization</p>
              <p>Full Staff Management</p>
              <p>Financial Reports</p>
              <p>Use on Unlimited hostels</p>
              <p>12 Months support</p>
        </div>
        <div>
          <Payment totalPrice={platinumPrice} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="my-10">
        <Helmet>
        <title>Hostel Management | Checkout</title>
      </Helmet>
        <div>
          <h1 className="text-center my-4 font-semibold text-3xl ">
            You are selected the Gold Meal Package
          </h1>
        </div>
        <div className="text-center text-xl ">
           <p>Advanced Meal Planning</p>
              <p>Room Allocation</p>
              <p>Attendance Analytics</p>
              <p>Use on 3 (three) hostels</p>
              <p>4 Months support</p>
        </div>
        <div>
          <Payment totalPrice={goldPrice} />
        </div>
      </div>
    );
  }
};

export default PaymentInfo;
