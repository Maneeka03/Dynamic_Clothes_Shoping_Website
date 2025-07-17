import React from "react";

const Waves = () => {
  return (
    <div className=" bottom-0 w-full">
      <style>{`
        @keyframes move-forever {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .wave-animation {
          animation: move-forever cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
        }
      `}</style>

      <svg
        className="w-full h-[20vh] min-h-[150px] max-h-[300px]"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g>
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="0"
            fill="rgba(255,179,71,0.7)"
            className="wave-animation"
            style={{ animationDelay: "-2s", animationDuration: "7s" }}
          />
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="3"
            fill="rgba(255,165,0,0.5)"
            className="wave-animation"
            style={{ animationDelay: "-3s", animationDuration: "10s" }}
          />
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="5"
            fill="rgba(255,140,0,0.3)"
            className="wave-animation"
            style={{ animationDelay: "-4s", animationDuration: "13s" }}
          />
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="7"
            fill="#FF8C00"
            className="wave-animation"
            style={{ animationDelay: "-5s", animationDuration: "20s" }}
          />
        </g>
      </svg>
    </div>
  );
};

export default Waves;
