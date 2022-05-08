import React from "react";
import { Layout, Row, Col, Spin } from "antd";
import Countup from "react-countup";
import {
  TeamOutlined,
  VideoCameraOutlined,
  ShoppingOutlined,
  ControlOutlined,
  UserAddOutlined,
  TagOutlined,
} from "@ant-design/icons";
import { GET_ADMINS } from "../../graphql/admin";
import { GET_STUDENTS } from "../../graphql/students";
import { useQuery } from "@apollo/client";
import CountUp from "react-countup";

const { Content } = Layout;

const Loading = () => {
  return (
    <div>
      <center>
        <Spin tip="Loading ..."></Spin>
      </center>
    </div>
  );
};

const Total = () => {
  const { loading, data } = useQuery(GET_STUDENTS);
  if (loading || !data) {
    return <Loading />;
  }

  const User = () => {
    return (
      <React.Fragment>
        <Row className="widget-card">
          <Col span={10}>
            <TeamOutlined className="background-image-widget" />
          </Col>
          <Col span={14}>
            <Countup end={data.students.length} className="counter" />
            <h1 className="text-details">Total Students</h1>
          </Col>
        </Row>
      </React.Fragment>
    );
  };

  const Admin = () => {
    const { loading, data } = useQuery(GET_ADMINS);
    if (loading || !data) {
      return <Loading />;
    }
    return (
      <React.Fragment>
        <Row className="widget-card4">
          <Col span={10}>
            <ControlOutlined className="background-image-widget4" />
          </Col>
          <Col span={14}>
            <Countup end={data.admins.length} className="counter4" />
            {/* <Countup end={100} className="counter4" /> */}

            <h1 className="text-details4">Total ADMIN</h1>
          </Col>
        </Row>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={24} lg={12} xl={6}>
          <User />
        </Col>
        <Col xs={24} sm={24} lg={12} xl={6}>
          <Admin />
        </Col>
        <Col xs={24} sm={24} lg={12} xl={6}>
          {/* <CouresePaid /> */}
        </Col>
        <Col xs={24} sm={24} lg={12} xl={6}>
          {/* <Admin /> */}
        </Col>
      </Row>
    </React.Fragment>
  );
};
export default Total;
