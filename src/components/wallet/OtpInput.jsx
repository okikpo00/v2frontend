import { useRef } from "react";

export default function OtpInput({ value, onChange, length = 6 }) {
  const inputs = useRef([]);

  const handleChange = (i, e) => {
    const val = e.target.value.replace(/\D/g, "");
    if (!val) return;

    const next =
      value.substring(0, i) +
      val[val.length - 1] +
      value.substring(i + 1);

    onChange(next);

    if (i < length - 1) {
      inputs.current[i + 1]?.focus();
    }
  };

  const handleBackspace = (i, e) => {
    if (e.key === "Backspace" && !value[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    }
  };

  return (
    <div className="otp-input">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (inputs.current[i] = el)}
          maxLength={1}
          inputMode="numeric"
          value={value[i] || ""}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleBackspace(i, e)}
        />
      ))}
    </div>
  );
}
