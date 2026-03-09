import "../styles/info-pages.css";
export default function Support() {
  return (
    <div className="info-page">

      <h1>Support</h1>

      <section className="info-section">
        <p>
          Need help using Trebetta? Below are answers to the most common
          questions from our users.
        </p>

        <p>
          If you still need assistance, you can contact our support team
          directly through WhatsApp.
        </p>
      </section>


      {/* CONTACT SUPPORT */}

      <section className="info-section">

        <div className="support-box">

          <h2>Contact Support</h2>

          <p>
            If you experience any issue with deposits, withdrawals,
            predictions, or your account, our support team is ready to help.
          </p>

          <a
            className="support-whatsapp"
            href="https://wa.me/2348139907368"
            target="_blank"
            rel="noreferrer"
          >
            Message Trey on WhatsApp
          </a>

          <p className="support-note">
            WhatsApp: +234 813 990 7368
          </p>

        </div>

      </section>


      {/* FAQ */}

      <section className="info-section">

        <h2>Frequently Asked Questions</h2>


        <div className="faq-item">
          <h3>How do I place a prediction?</h3>
          <p>
            Open any curated question, select YES or NO, and it will be
            added to your slip. Enter your stake amount and confirm your
            entry to place the prediction.
          </p>
        </div>


        <div className="faq-item">
          <h3>Can I combine multiple questions?</h3>
          <p>
            Yes. Trebetta allows you to combine multiple predictions
            in a single slip. Combining selections increases the total
            odds and potential payout.
          </p>
        </div>


        <div className="faq-item">
          <h3>What happens if one question in my slip loses?</h3>
          <p>
            If any selection in your slip loses, the entire slip loses.
            Your slip will move to the settled section and the stake
            will not be returned.
          </p>
        </div>


        <div className="faq-item">
          <h3>What happens if a question is voided?</h3>
          <p>
            If a question is voided, its odds become 1.00 and it does not
            affect your slip result. Your slip will continue with the
            remaining selections.
          </p>
        </div>


        <div className="faq-item">
          <h3>How do 1v1 challenges work?</h3>
          <p>
            In a 1v1 challenge, one user creates a challenge on a question
            and selects a side (YES or NO). Another user joins the challenge
            and takes the opposite side. Both users stake the same amount
            and the winner receives the prize pool after settlement.
          </p>
        </div>


        <div className="faq-item">
          <h3>Can I cancel a 1v1 challenge?</h3>
          <p>
            Yes. If nobody has accepted your challenge yet, you can cancel
            it and your locked stake will be returned to your wallet.
          </p>
        </div>


        <div className="faq-item">
          <h3>How do I fund my wallet?</h3>
          <p>
            Go to the Wallet page and select "Fund Wallet". Enter the
            amount you want to deposit and complete the payment using
            Flutterwave.
          </p>
        </div>


        <div className="faq-item">
          <h3>How long do deposits take?</h3>
          <p>
            Deposits are usually credited instantly after payment
            confirmation from the payment provider.
          </p>
        </div>


        <div className="faq-item">
          <h3>How do I withdraw my winnings?</h3>
          <p>
            Go to the Wallet page, enter the amount you want to withdraw,
            provide your bank details, and submit the withdrawal request.
          </p>
        </div>


        <div className="faq-item">
          <h3>How long do withdrawals take?</h3>
          <p>
            Withdrawal processing times may vary depending on banking
            systems but are usually completed within a short time.
          </p>
        </div>


        <div className="faq-item">
          <h3>Why can’t I place a prediction?</h3>
          <p>
            This may happen if the question has already closed or your
            wallet balance is insufficient to cover the stake amount.
          </p>
        </div>


        <div className="faq-item">
          <h3>Is my money safe on Trebetta?</h3>
          <p>
            Trebetta uses secure payment providers and internal wallet
            systems to manage user funds safely.
          </p>
        </div>

      </section>

    </div>
  );
}