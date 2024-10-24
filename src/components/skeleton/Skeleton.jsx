import { Skeleton } from "antd";
import React from "react";

const SkeletonLoader = () => {
  return (
    <div>
      <Skeleton.Image style={{ height: 400, width: "100vw" }} active={true} />
      <div style={{ padding: "0 20px 0 110px" }}>
        <br />
        <br />
        <br />
        <br />
        <Skeleton active={true}>
          <div></div>
        </Skeleton>
        <br />
        <br />
        <Skeleton active={true}>
          <div></div>
        </Skeleton>
        <br />
        <br />
        <Skeleton active={true}>
          <div></div>
        </Skeleton>
      </div>
    </div>
  );
};

export default SkeletonLoader;
