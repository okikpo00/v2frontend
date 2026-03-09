import {
  Trophy,
  TrendingUp,
  Film,
  Landmark
} from "lucide-react";

/* =========================
   CATEGORY META
========================= */

const CATEGORY_META = {

  sports: {
    label: "Sports",
    Icon: Trophy
  },

  finance: {
    label: "Finance",
    Icon: TrendingUp
  },

  entertainment: {
    label: "Entertainment",
    Icon: Film
  },

  politics: {
    label: "Politics",
    Icon: Landmark
  }

};


/* =========================
   FIXED CATEGORY ORDER
========================= */

const CATEGORY_ORDER = [
  "sports",
  "finance",
  "entertainment",
  "politics"
];


/* =========================
   COMPONENT
========================= */

export default function CategoryTabs({
  active,
  onChange
}) {

  return (

    <div className="category-tabs">

      {CATEGORY_ORDER.map((key) => {

        const meta = CATEGORY_META[key];

        if (!meta) return null;

        const Icon = meta.Icon;

        const isActive = active === key;

        return (

          <button
            key={key}
            type="button"
            className={`category-tab ${isActive ? "active" : ""}`}
            onClick={() => onChange?.(key)}
          >

            <Icon
              size={18}
              strokeWidth={2.2}
              className="category-tab-icon"
            />

            <span className="category-tab-label">
              {meta.label}
            </span>

          </button>

        );

      })}

    </div>

  );

}