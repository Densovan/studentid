import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import UserAnalysis from "./dashboard/users";
import TotalCart from "./dashboard/total-cart";
import { Row, Col } from "antd";
import PieChart from "./Charts/PieChart";
import { UserData } from "./Charts/data/Data";
import LineChart from "./Charts/LineChart";
import ProductStockChart from "./Charts/ProductStockChart";
import OrderTable from "./Charts/OrderTable";
import ProductTable from "./Charts/ProductTable";

const { Content } = Layout;

const Dashboard = () => {
  // const [userData, setUserData] = useState("");
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  });

  // const test = UserData.map((res) => res.userGain);

  // console.log(test, "userGain");
  return (
    <React.Fragment>
      <Content>
        <h2 style={{ fontSize: "28px" }}>Basic Informations</h2>
        <br />
        <TotalCart />
        <br />

        <br></br>
        <Row gutter={[32, 32]}>
          <Col span={16}>
            <ProductTable />
          </Col>
          <Col span={8}>
            <div className="pie-box">
              <h1>Products Stock</h1>
              <ProductStockChart />
            </div>
          </Col>
        </Row>
        <OrderTable />
      </Content>
    </React.Fragment>
  );
};
export default Dashboard;
