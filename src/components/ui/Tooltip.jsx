import { useState } from "react";

export default function Tooltip({
  children,
  content
}) {

  const [visible, setVisible] =
    useState(false);

  return (

    <div
      className="tooltip-wrapper"

      onMouseEnter={() =>
        setVisible(true)
      }

      onMouseLeave={() =>
        setVisible(false)
      }

      onTouchStart={() =>
        setVisible(true)
      }

      onTouchEnd={() =>
        setVisible(false)
      }
    >

      {/* CHILD — NEVER MODIFY */}
      {children}

      {/* TOOLTIP FLOAT */}
      {visible && (

        <div className="tooltip-box">

          {content}

        </div>

      )}

    </div>

  );

}