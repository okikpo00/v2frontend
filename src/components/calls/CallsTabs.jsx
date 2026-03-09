export default function CallsTabs({ mainTab, setMainTab }) {
  return (
    <div className="calls-tabs">
      <button
        className={`calls-tab ${mainTab === "curated" ? "active" : ""}`}
        onClick={() => setMainTab("curated")}
      >
        Curated
      </button>

      <button
        className={`calls-tab ${mainTab === "duels" ? "active" : ""}`}
        onClick={() => setMainTab("duels")}
      >
        1v1
      </button>

      <div
        className="calls-tab-indicator"
        style={{
          transform:
            mainTab === "curated"
              ? "translateX(0%)"
              : "translateX(100%)"
        }}
      />
    </div>
  );
}