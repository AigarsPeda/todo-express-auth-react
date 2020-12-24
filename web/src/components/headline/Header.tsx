import React from "react";
import ClockIcon from "../../icons/ClockIcon";

const Headline: React.FC = () => {
  return (
    <div className="headline">
      <ClockIcon />
      <h1>Organize your works</h1>
      <p>
        Let's organize your works with priority and do everything without
        stress.
      </p>
    </div>
  );
};

export default Headline;
