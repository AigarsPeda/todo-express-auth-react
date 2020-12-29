import React from "react";

const BackIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 643 643"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      {...props}
    >
      <path
        d="M153.688 344.02l288.793 288.695c12.672 12.64 33.202 12.64 45.906 0 12.672-12.64 12.672-33.17 0-45.81l-265.885-265.79 265.853-265.79c12.672-12.64 12.672-33.17 0-45.842-12.672-12.64-33.234-12.64-45.906 0L153.656 298.176c-12.477 12.51-12.477 33.363.032 45.843z"
        fillRule="nonzero"
      />
    </svg>
  );
};

export default BackIcon;
