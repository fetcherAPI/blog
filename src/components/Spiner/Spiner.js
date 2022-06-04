import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 64,
    }}
    spin
  />
);

export const Spiner = () => {
  return <Spin size='large' tip='Loading...' indicator={antIcon} />;
};
