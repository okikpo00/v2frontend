const MAP = {
  otp_pending: "Awaiting OTP",
  pending_admin: "Under review",
  completed: "Completed",
  cancelled: "Cancelled",
  failed: "Failed",
};

export default function WithdrawalStatusBadge({ status }) {
  return (
    <span className={`status-badge ${status}`}>
      {MAP[status] || status}
    </span>
  );
}
