import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const CheckoutForm = ({ totalPrice }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const navigate = useNavigate();
  const stripe = useStripe();
  const { user } = useAuth();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("Payment error", error);
      setError(error.message);
    } else {
    
      setError("");
    }
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("Confirm Error");
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        if (totalPrice === 29) {
          const payment = {
            email: user.email,
            price: totalPrice,
            transactionId: paymentIntent.id,
            date: new Date(),
            status: "pending",
          };
          const res = await axiosSecure.post("/payments", payment);
           if (res.data?.paymentResult?.insertedId) {
          Swal.fire({
            title: "Payment successful!",
            text: `Your order has been placed.`,
            icon: "success",
          });
          navigate("/dashboard/userProfile");
          const userUpdate = {
            package: "Silver",
          };
          const response= await axiosSecure.patch('/user/package', userUpdate)
        }
        }
        if (totalPrice === 59) {
          const payment = {
            email: user.email,
            price: totalPrice,
            transactionId: paymentIntent.id,
            date: new Date(),
            status: "pending",
          };
          const res = await axiosSecure.post("/payments", payment);
           if (res.data?.paymentResult?.insertedId) {
          Swal.fire({
            title: "Payment successful!",
            text: `Your order has been placed.`,
            icon: "success",
          });
          navigate("/dashboard/userProfile");
          const userUpdate = {
            package: "Gold",
          };
          const response= await axiosSecure.patch('/user/package', userUpdate)
        }
        }
        if (totalPrice === 99) {
          const payment = {
            email: user.email,
            price: totalPrice,
            transactionId: paymentIntent.id,
            date: new Date(),
            status: "pending",
          };
          const res = await axiosSecure.post("/payments", payment);
           if (res.data?.paymentResult?.insertedId) {
          Swal.fire({
            title: "Payment successful!",
            text: `Your order has been placed.`,
            icon: "success",
          });
          navigate("/dashboard/userProfile");
          const userUpdate = {
            package: "Platinum",
          };
          const response= await axiosSecure.patch('/user/package', userUpdate)
        }
        }

      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn mt-5  "
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay Now
        </button>
        <p className="text-red-600 mt-4">{error}</p>
        {transactionId && (
          <p className="text-green-600">Your Transaction id: {transactionId}</p>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
