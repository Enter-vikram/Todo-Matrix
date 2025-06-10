import React from "react";

export default function Logo({ size = 60 }) {
  const innerSize = size * 0.4;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: "#F24E29",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          content: '""',
          position: "absolute",
          width: "90%",
          height: "90%",
          border: "2px solid white",
          borderRadius: "50%",
        }}
      ></div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={innerSize}
        height={innerSize}
        style={{
          zIndex: 1,
          transform: "rotate(50deg)",
          stroke: "white",
          strokeWidth: 2,
          fill: "none",
        }}
      >
        <path d="M16 3v4a2 2 0 0 0 2 2h1l-5 5" />
        <path d="M8 21v-4l-5-5h1a2 2 0 0 0 2-2V3" />
        <path d="M18 3h-4" />
        <path d="M6 3h4" />
      </svg>
    </div>
  );
}
