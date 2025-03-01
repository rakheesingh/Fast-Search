import React from "react";
import { Shimmer } from "react-shimmer";

const ListShimmer: React.FC = () => {
  const shimmerCount = 10; // Number of shimmer items

  return (
    <div>
      {Array.from({ length: shimmerCount }).map((_, index) => (
        <div key={index} style={{ marginBottom: "16px" }}>
          <Shimmer width={400} height={20} />
        </div>
      ))}
    </div>
  );
};

export default ListShimmer;
