import {
  ArrowDownLeft,
  ArrowUpRight,
  Gift,
  Shield
} from "lucide-react";

/**
 * Transaction source → UI mapping
 * Add new source_types here only
 */
const SOURCE_META = {
  deposit: {
    label: "Deposit",
    icon: ArrowDownLeft
  },
  withdrawal: {
    label: "Withdrawal",
    icon: ArrowUpRight
  },
  referral_bonus: {
    label: "Referral bonus",
    icon: Gift
  },
  admin_credit: {
    label: "Admin credit",
    icon: Shield
  },
  admin_debit: {
    label: "Admin debit",
    icon: Shield
  }
};

function getTxMeta(sourceType) {
  return (
    SOURCE_META[sourceType] || {
      label: "Account activity",
      icon: Shield
    }
  );
}

export default function TransactionRow({ tx }) {
  const { label, icon: Icon } = getTxMeta(tx.source_type);

  // Do NOT trust sign — backend controls meaning
  const isCredit = tx.type === "credit";
  const amount = Math.abs(Number(tx.amount || 0));

  return (
    <div className="tx-row">
      <Icon size={16} />

      <div className="tx-info">
        <span className="tx-label">{label}</span>
        <span className="tx-date">
          {new Date(tx.created_at).toLocaleString()}
        </span>
      </div>

      <span className={isCredit ? "credit" : "debit"}>
        {isCredit ? "+" : "-"}₦{amount.toLocaleString()}
      </span>
    </div>
  );
}