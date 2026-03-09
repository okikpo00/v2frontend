import { useState, useRef, useEffect } from "react";

const BANKS = [
  "Access Bank",
  "Access Bank (Diamond)",
  "ALAT by Wema",
  "Citibank Nigeria",
  "Ecobank Nigeria",
  "Fidelity Bank",
  "First Bank of Nigeria",
  "First City Monument Bank (FCMB)",
  "Globus Bank",
  "Guaranty Trust Bank (GTBank)",
  "Heritage Bank",
  "Jaiz Bank",
  "Keystone Bank",
  "Kuda Bank",
  "Moniepoint Microfinance Bank",
  "Opay",
  "Parallex Bank",
  "Polaris Bank",
  "Providus Bank",
  "Stanbic IBTC Bank",
  "Standard Chartered Bank",
  "Sterling Bank",
  "SunTrust Bank",
  "Titan Trust Bank",
  "Union Bank of Nigeria",
  "United Bank for Africa (UBA)",
  "Unity Bank",
  "VFD Microfinance Bank",
  "Wema Bank",
  "Zenith Bank"
];

export default function BankSelect({ value, onChange }) {

  const [query, setQuery] = useState(value || "");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const filteredBanks = BANKS.filter(bank =>
    bank.toLowerCase().includes(query.toLowerCase())
  );

  /* CLOSE DROPDOWN WHEN CLICKING OUTSIDE */

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleSelect(bank) {
    onChange(bank);
    setQuery(bank);
    setOpen(false);
  }

  return (

    <div className="bank-select" ref={wrapperRef}>

      {/* INPUT */}

      <input
        type="text"
        placeholder="Search bank"
        value={query}
        className="bank-search"
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
      />

      {/* DROPDOWN */}

      {open && (

        <div className="bank-list">

          {filteredBanks.length > 0 ? (

            filteredBanks.map(bank => (

              <div
                key={bank}
                className={`bank-item ${value === bank ? "active" : ""}`}
                onClick={() => handleSelect(bank)}
              >
                {bank}
              </div>

            ))

          ) : (

            <div className="bank-empty">
              No bank found
            </div>

          )}

        </div>

      )}

    </div>

  );

}