import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/payment.css";

export default function PaymentComplete() {

  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("Processing your payment...");

  useEffect(() => {

    const tx_ref = params.get("tx_ref");
    const transaction_id = params.get("transaction_id");

    if (!tx_ref || !transaction_id) {
      setStatus("error");
      setMessage("Invalid payment response.");
      return;
    }

    let slowTimer = setTimeout(() => {
      setMessage("Still confirming your payment with the bank...");
    }, 3000);

    async function verify() {

      try {

        await api.post("/wallet/payments/flutterwave/verify", {
          tx_ref,
          transaction_id
        });

        clearTimeout(slowTimer);

        setStatus("success");
        setMessage("Deposit successful. Your wallet has been credited.");

        setTimeout(() => {
          navigate("/wallet");
        }, 2000);

      } catch (err) {

        clearTimeout(slowTimer);

        setStatus("error");

        setMessage(
          "We could not confirm your payment. If funds were deducted, please contact support."
        );

      }

    }

    verify();

  }, [params, navigate]);

  return (

    <div className="payment-complete-page">

      {status === "loading" && (
        <>
          <h2>Processing Payment</h2>
          <p>{message}</p>
        </>
      )}

      {status === "success" && (
        <>
          <h2>Deposit Successful</h2>
          <p>{message}</p>
        </>
      )}

      {status === "error" && (
        <>
          <h2>Payment Verification Failed</h2>
          <p>{message}</p>
        </>
      )}

    </div>

  );

}