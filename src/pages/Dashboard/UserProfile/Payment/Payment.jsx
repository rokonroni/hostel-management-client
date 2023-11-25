import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_payment_gateway_PK)
const Payment = () => {
    return (
        <>
            <SectionTitle title={"Payment Now"} subTitle={"---Want to payment bill?---"} />
            <div className='w-2/3 mx-auto'>
                <Elements stripe={stripePromise}> 
                    <CheckoutForm />
                </Elements>
            </div>
        </>
    );
};

export default Payment;