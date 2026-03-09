export default function HowItWorks() {
  return (
    <div className="page">

      <h1>How Trebetta Works</h1>

      {/* INTRO */}

      <section>
        <h2>What Trebetta Is</h2>
        <p>
          Trebetta is a prediction platform where users participate in
          curated YES or NO questions about trending topics in sports,
          finance, entertainment, and world events.
        </p>

        <p>
          Instead of traditional betting markets with hundreds of options,
          Trebetta focuses on carefully selected questions that reflect
          what people are talking about right now. Users simply choose
          a side — YES or NO — and place an entry on the outcome.
        </p>

        <p>
          Questions are curated daily and each one has fixed odds for both
          outcomes. Users can place entries on single questions or combine
          multiple questions together in a slip to increase potential payout.
        </p>
      </section>


      {/* CURATED QUESTIONS */}

      <section>
        <h2>Curated Questions</h2>

        <p>
          Curated questions are the core experience on Trebetta. Each question
          presents a simple prediction with two possible outcomes: YES or NO.
        </p>

        <p>
          Examples of curated questions include predictions about sporting
          events, financial market movements, entertainment outcomes, or
          trending public topics.
        </p>

        <p>
          Each question shows:
        </p>

        <ul>
          <li>The prediction question</li>
          <li>YES and NO options</li>
          <li>Odds for each option</li>
          <li>The time the question closes</li>
        </ul>

        <p>
          Once a question reaches its closing time, no further entries can
          be placed and the question becomes locked until the final result
          is determined.
        </p>
      </section>


      {/* PLACING AN ENTRY */}

      <section>
        <h2>Placing an Entry</h2>

        <p>
          When you see a question you want to participate in, simply select
          either YES or NO. The selection will be added to your slip.
        </p>

        <p>
          A slip allows you to combine multiple selections together into
          one entry. Combining selections increases the total odds of the
          slip and therefore increases the potential payout.
        </p>

        <p>
          After selecting your questions:
        </p>

        <ul>
          <li>Enter the amount you want to stake</li>
          <li>Review the total odds and potential payout</li>
          <li>Confirm your entry</li>
        </ul>

        <p>
          Once confirmed, the stake is deducted from your wallet and the
          slip becomes active until the questions settle.
        </p>
      </section>


      {/* SETTLEMENT */}

      <section>
        <h2>Question Settlement</h2>

        <p>
          After a question closes, Trebetta verifies the final outcome using
          reliable data sources. The question is then settled as either YES
          or NO depending on the confirmed result.
        </p>

        <p>
          For slips containing multiple questions, every selection must be
          correct for the slip to win.
        </p>

        <p>
          If any selection in the slip loses, the entire slip loses and is
          moved to the settled section.
        </p>

        <p>
          If all selections are correct, the slip wins and the payout is
          credited to your wallet automatically.
        </p>
      </section>


      {/* VOIDED QUESTIONS */}

      <section>
        <h2>Voided Questions</h2>

        <p>
          In rare situations a question may be voided. This can happen if
          the event is cancelled, the data source becomes unreliable, or
          the outcome cannot be verified fairly.
        </p>

        <p>
          When a question is voided:
        </p>

        <ul>
          <li>The question does not count as a win or a loss</li>
          <li>The odds for that question become 1.00</li>
          <li>Your slip continues with the remaining selections</li>
        </ul>

        <p>
          If the slip contains only the voided question, the stake is
          refunded to your wallet.
        </p>
      </section>


      {/* 1V1 DUELS */}

      <section>
        <h2>1v1 Challenges</h2>

        <p>
          Trebetta also allows users to challenge each other directly in
          head-to-head predictions known as 1v1 challenges.
        </p>

        <p>
          In a 1v1 challenge:
        </p>

        <ul>
          <li>A user creates a challenge on a question</li>
          <li>The user chooses either YES or NO</li>
          <li>The user sets a stake amount</li>
          <li>A unique challenge code is generated</li>
        </ul>

        <p>
          Another user can join the challenge using the code. When the
          opponent joins, the challenge becomes locked and both stakes
          form a prize pool.
        </p>

        <p>
          Once the question settles, the winner receives the combined
          prize pool minus platform fees where applicable.
        </p>

        <p>
          If nobody accepts a challenge, the creator can cancel it and the
          locked stake is returned to their wallet.
        </p>
      </section>


      {/* WALLET */}

      <section>
        <h2>Your Wallet</h2>

        <p>
          Every Trebetta account includes a secure wallet where all funds
          are stored and managed.
        </p>

        <p>
          Your wallet balance is used to place entries on curated questions
          and participate in 1v1 challenges.
        </p>

        <p>
          All winnings are credited directly to your wallet after settlement.
        </p>
      </section>


      {/* DEPOSITS */}

      <section>
        <h2>Deposits</h2>

        <p>
          You can fund your wallet using secure online payments powered
          by Flutterwave.
        </p>

        <p>
          To deposit:
        </p>

        <ul>
          <li>Go to the Wallet page</li>
          <li>Select Fund Wallet</li>
          <li>Enter the amount you want to deposit</li>
          <li>Complete the payment through Flutterwave</li>
        </ul>

        <p>
          Once the payment is confirmed, your wallet balance is updated
          automatically.
        </p>
      </section>


      {/* WITHDRAWALS */}

      <section>
        <h2>Withdrawals</h2>

        <p>
          You can withdraw funds from your wallet directly to your
          Nigerian bank account.
        </p>

        <p>
          To withdraw:
        </p>

        <ul>
          <li>Go to the Wallet page</li>
          <li>Enter your withdrawal amount</li>
          <li>Provide your bank details</li>
          <li>Submit the request</li>
        </ul>

        <p>
          Withdrawal requests are processed securely and usually
          completed within a short period depending on bank processing
          times.
        </p>
      </section>


      {/* RESPONSIBLE USE */}

      <section>
        <h2>Responsible Participation</h2>

        <p>
          Trebetta is designed as an entertainment platform. Users are
          encouraged to participate responsibly and only use funds they
          can afford.
        </p>

        <p>
          If you ever feel your participation is becoming excessive,
          we recommend taking a break and managing your activity
          responsibly.
        </p>
      </section>

    </div>
  );
}