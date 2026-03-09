function Stat({ label, value }) {
  return (
    <div className="stat">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function QuickStatsStrip({ stats }) {
  return (
    <div className="stats">

      <Stat label="Users" value={stats.total_users} />

      <Stat label="Calls" value={stats.total_calls} />

      <Stat label="Volume" value={`₦${stats.total_volume}`} />

      <Stat label="Paid" value={`₦${stats.total_paid_out}`} />

    </div>
  );
}