const STATUS_LABELS = {
  completed: "Completed",
  pending: "Pending",
  failed: "Failed"
};

export default function DepositRow({ deposit }) {
  return (
    <div className="deposit-row">
      <div>
        <strong>₦{Number(deposit.amount).toLocaleString()}</strong>

        <div className="muted">
          {deposit.provider} · {STATUS_LABELS[deposit.status]}
        </div>

        <div className="muted">
          {new Date(deposit.created_at).toLocaleString()}
        </div>
      </div>

      <span className={`status-badge ${deposit.status}`}>
        {STATUS_LABELS[deposit.status]}
      </span>
    </div>
  );
}
