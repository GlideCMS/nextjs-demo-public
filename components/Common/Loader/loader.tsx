import React from "react";

export function getLoader() {
  return (
    <svg
      style={{
        maxWidth: "100px",
        marginLeft: "auto",
        marginRight: "auto",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
      version="1.1"
      id="L3"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 100 100"
      enableBackground="new 0 0 0 0"
      xmlSpace="preserve"
    >
      <circle
        fill="none"
        stroke="#0f7af5"
        stroke-width="3"
        cx="50"
        cy="50"
        r="44"
      ></circle>
      <circle
        fill="#1358bf"
        stroke="#0366fc"
        stroke-width="3"
        cx="8"
        cy="54"
        r="6"
      >
        <animateTransform
          attributeName="transform"
          dur="2s"
          type="rotate"
          from="0 50 48"
          to="360 50 52"
          repeatCount="indefinite"
        ></animateTransform>
      </circle>
    </svg>
  );
}
