import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState } from "react";
import UseSecureApi from "../Custom/UseSecureApi";
import { useParams } from "react-router-dom";
import { ContextMain } from "../Context/ContextApi";
import { toast } from "react-toastify";
import { title } from "motion/react-client";

const CheckoutForm = () => {
  const stripe = useStripe();
  const id = useParams();
  const elements = useElements();
  const SecureApi = UseSecureApi();
  const { user } = useContext(ContextMain);
  const [userInfo, setUserInfo] = useState([]);
  const [clientSecret, setclientSecret] = useState("");
  useEffect(() => {
    const HandleApi = async () => {
      const res = await SecureApi.get(`/offerPrice/${id.id}`);
      setUserInfo(res.data);
      console.log(res.data);
    };
    HandleApi();
  }, [SecureApi, id]);
  const [users] = userInfo;
  const price = users?.offerAmount;
  const Title = users?.title;
  const AgentEmail = users?.agentEmail;
  const location = users?.location;
  console.log(Title, AgentEmail, location);

  console.log("price--", price);
  useEffect(() => {
    if (price > 0) {
      SecureApi.post("/create-payment-intent", { price: price }).then((res) => {
        console.log(res);
        setclientSecret(res.data.clientSecret);
      });
    }
  }, [SecureApi, price]);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
    const { paymentIntent, error: paymentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
          },
        },
      });
    if (paymentIntent) {
      console.log("payment_intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        toast.success(`You Payment ${paymentIntent.amount} succeeded`);
        const payment = {
          Title: Title,
          name: user?.displayName,
          email: user?.email,
          agentEmail: AgentEmail,
          date: new Date(),
          Amount: paymentIntent.amount,
          Transaction: paymentIntent.id,
          location: location,
          status: "sold",
        };
        const res = SecureApi.post("/payment", payment);
        console.log(res);
      }
    } else {
      console.log("error", paymentError);
    }
  };
  return (
    <>
      <div>
        <div className="max-w-xl mx-auto bg-gray-50">
          <div className="bg-white p-8 shadow-lg">
            <p className="text-2xl bg-purple-600 text-white p-4 my-8 font-bold text-center">
              Payment Gateway
            </p>
            <form
              className="border-gray-100 border-b-2 border-t-2 py-4 rounded-b-md rounded-t-md"
              onSubmit={handleSubmit}
            >
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
                className="mt-8 btn btn-primary"
                type="submit"
                disabled={!stripe || !clientSecret}
              >
                Pay
              </button>
            </form>
            {userInfo.map((user, index) => (
              <>
                <div key={index}>
                  <p className="bg-blue-400 text-white px-4 py-2  mt-4 font-bold">
                    You Pay Amount: <span>{user?.offerAmount}</span>
                  </p>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutForm;
