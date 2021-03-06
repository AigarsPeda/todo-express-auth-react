import React from "react";

const ClockIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      {...props}
    >
      <g fillRule="nonzero">
        <path
          d="M916.252 269.438c-21.208 10.261-30.083 35.781-19.824 56.978 28.032 57.907 42.24 120.323 42.24 185.585 0 235.261-191.406 426.667-426.667 426.667-235.262 0-426.668-191.406-426.668-426.667 0-235.262 191.406-426.668 426.668-426.668 97.49 0 189.072 31.835 264.875 92.054 18.386 14.675 45.272 11.603 59.949-6.845 14.675-18.438 11.603-45.291-6.856-59.947C740.23 39.272 627.302 0 512.001 0 229.699 0 0 229.699 0 512c0 282.302 229.699 512.001 512 512.001 282.302 0 512.001-229.699 512.001-512 0-78.23-17.082-153.198-50.77-222.74-10.24-21.25-35.843-30.103-56.98-19.823z"
          strokeWidth={2.66667}
        />
        <path
          d="M512 170.667c-23.551 0-42.666 19.115-42.666 42.667V512c0 23.552 19.115 42.666 42.667 42.666h213.333c23.552 0 42.667-19.114 42.667-42.666 0-23.552-19.115-42.667-42.667-42.667H554.667v-256c0-23.552-19.114-42.667-42.666-42.667z"
          strokeWidth={2.66667}
        />
      </g>
    </svg>
  );
};

export default ClockIcon;
