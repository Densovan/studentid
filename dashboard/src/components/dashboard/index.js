import React from "react";
import { Layout } from "antd";
import Total from "./total";
const { Content } = Layout;
const Index = () => {
  return (
    <div>
      <Content>
        <h2 style={{ fontSize: "28px" }}>Basic Informations</h2>
        <br />
        <Total />
      </Content>
    </div>
  );
};

export default Index;
