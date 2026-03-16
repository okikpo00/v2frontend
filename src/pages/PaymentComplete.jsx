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

    if (!tx_ref) {
      setStatus("error");
      setMessage("Invalid payment response.");
      return;
    }

    let pollInterval;
    let slowTimer;
    let timeoutStop;

    async function checkDeposit() {

      try {

        const res = await api.get("/wallet/deposit");

        const deposits = res?.data?.data?.items || [];

        const match = deposits.find(d => d.tx_ref === tx_ref);

        if (match && match.status === "completed") {

          clearInterval(pollInterval);
          clearTimeout(slowTimer);
          clearTimeout(timeoutStop);

          setStatus("success");
          setMessage("Deposit successful. Your wallet has been credited.");

          setTimeout(() => {
            navigate("/wallet");
          }, 2000);

        }

      } catch {
        // silent fail
      }

    }

    slowTimer = setTimeout(() => {
      setMessage("Still confirming your payment with the bank...");
    }, 3000);

    pollInterval = setInterval(checkDeposit, 4000);

    timeoutStop = setTimeout(() => {

      clearInterval(pollInterval);

      setStatus("waiting");
      setMessage(
        "Your payment is being confirmed. If your bank was debited, your wallet will update shortly."
      );

    }, 60000);

    checkDeposit();

    return () => {
      clearInterval(pollInterval);
      clearTimeout(slowTimer);
      clearTimeout(timeoutStop);
    };

  }, [params, navigate]);

  return (

    <div className="payment-complete-page">

      {status === "loading" && (
        <div className="payment-card">

          <div className="payment-spinner" />

          <h2>Processing Payment</h2>

          <p>{message}</p>

        </div>
      )}

      {status === "success" && (
        <div className="payment-card success">

          <div className="payment-check">✓</div>

          <h2>Deposit Successful</h2>

          <p>{message}</p>

        </div>
      )}

      {status === "waiting" && (
        <div className="payment-card">

          <div className="payment-spinner" />

          <h2>Payment Received</h2>

          <p>{message}</p>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/wallet")}
          >
            Go to Wallet
          </button>

        </div>
      )}

      {status === "error" && (
        <div className="payment-card error">

          <h2>Payment Processing</h2>

          <p>{message}</p>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/wallet")}
          >
            Go to Wallet
          </button>

        </div>
      )}

    </div>

  );

}