import React, { useState } from "react";
import { Input, Form, Button, message, Spin } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import logo from "../assets/images/Final Jabaram Logo-07.png";

const config = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};

const { REACT_APP_LOCAL, REACT_APP_PRO } = process.env;
const apiUrl =
  process.env.NODE_ENV === "production" ? REACT_APP_PRO : REACT_APP_LOCAL;

export default function Login() {
  const [loading, setLoading] = useState(false);
  const onFinish = (values) => {
    setLoading(true);
    axios
      .post(`${apiUrl}/login`, { ...values }, config)
      .then(async (res) => {
        if (res.data.role === "admin" || "superadmin") {
          await message.success(res.data.message, 3);
          window.location.replace("/dashboard");
        } else {
          await message.error("You are not admin", 3);
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        message.error(error.response.data.message);
      });
  };

  return (
    <React.Fragment>
      <div className="loginBackground">
        <div className="loginContainer">
          <Spin spinning={loading} tip="Loading ...">
            <div className="background_login">
              {/* <img className="login-logo" src={logo} alt="jabarom" /> */}
              <center>
                <h1>StudentID</h1>
              </center>
            </div>
            <Form
              onFinish={onFinish}
              initialValues={{ remember: true }}
              className="login-form"
              layout="vertical"
              size="large"
            >
              {/* =================== Email ================= */}
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "The email type is invalid!",
                  },
                  {
                    required: true,
                    message: "The email field is required.",
                  },
                ]}
              >
                <Input type="email" className="login-label" size="large" />
              </Form.Item>

              {/* =================== Password ================= */}
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password",
                  },
                ]}
              >
                <Input.Password
                  type="password"
                  className="login-label"
                  size="large"
                />
              </Form.Item>

              {/* =================== Button Submit ================= */}
              <Form.Item>
                <br />
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Login
                </Button>
              </Form.Item>
              {/* <div style={{ marginTop: "20px" }}>
              Don't have an account yet? <Link to="/register">Register</Link>
            </div> */}
            </Form>
          </Spin>
        </div>
      </div>
    </React.Fragment>
  );
}
