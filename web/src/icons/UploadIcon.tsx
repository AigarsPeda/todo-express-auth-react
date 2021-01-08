import React from "react";

const UploadIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 1366 1366"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      {...props}
    >
      <path
        d="M1258.668 833.713v370.667c0 29.408-23.925 53.334-53.333 53.334H160c-29.408 0-53.333-23.926-53.333-53.334V833.713H0v370.667c0 88.224 71.776 160 160 160h1045.335c88.224 0 160-71.776 160-160V833.713h-106.667z"
        fillRule="nonzero"
      />
      <path
        d="M682.668.955L351.243 332.379l75.424 75.424 202.667-202.667v831.244h106.667V205.136l202.667 202.667 75.424-75.424L682.668.955z"
        fillRule="nonzero"
      />
    </svg>
  );
};

export default UploadIcon;
