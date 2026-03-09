import { useState } from "react";
import H2HStoryStrip from "./H2HStoryStrip";
import JoinChallengeInput from "./JoinChallengeInput";
import CreateChallengeModal from "./CreateChallengeModal";
import AcceptChallengeModal from "./AcceptChallengeModal";
import SuccessSlipModal from "./SuccessSlipModal";

import "../../styles/h2h.css";

export default function LiveDuelsSection({ questions = [] }) {

  const [createTarget, setCreateTarget] = useState(null);
  const [acceptTarget, setAcceptTarget] = useState(null);
  const [slipData, setSlipData] = useState(null);

  const noChallenges = !questions || questions.length === 0;

  return (
    <section className="live-duels">

      {/* STORY STRIP OR EMPTY STATE */}

      {noChallenges ? (
        <div className="h2h-empty">

          <div className="h2h-empty-title">
            No live challenges available
          </div>

          <div className="h2h-empty-sub">
       
          </div>

        </div>
      ) : (
        <H2HStoryStrip
          items={questions}
          onSelect={setCreateTarget}
        />
      )}

      {/* JOIN BY CODE INPUT */}

      <JoinChallengeInput
        onChallengeLoaded={setAcceptTarget}
      />

      {/* CREATE MODAL */}

      {createTarget && (
        <CreateChallengeModal
          question={createTarget}
          onClose={() => setCreateTarget(null)}
          onSuccess={(data) => {
            setCreateTarget(null);
            setSlipData({ ...data, variant: "create" });
          }}
        />
      )}

      {/* ACCEPT MODAL */}

      {acceptTarget && (
        <AcceptChallengeModal
          challenge={acceptTarget}
          onClose={() => setAcceptTarget(null)}
          onSuccess={(data) => {
            setAcceptTarget(null);
            setSlipData({ ...data, variant: "accept" });
          }}
        />
      )}

      {/* SUCCESS SLIP */}

      {slipData && (
        <SuccessSlipModal
          data={slipData}
          onClose={() => setSlipData(null)}
        />
      )}

    </section>
  );
}