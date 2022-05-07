import React from 'react';
import { Row, Col, Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <React.Fragment>
      <div className="loginBackground">
        <div className="loginContainer">
          <div className="background_login">
            <img className="login-logo" src="/images/logo.png" alt="logo" />
          </div>
          <Form
            className="login-form"
            layout="vertical"
            size="large"
            // onFinish={handleSubmit}
          >
            {/* ============================ Full Name ===================== */}
            <Form.Item
              label="Full name"
              name="fullname"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input className="login-label" />
            </Form.Item>

            {/* ============================ Email ===================== */}
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: 'email',
                },
              ]}
            >
              <Input className="login-label" />
            </Form.Item>

            {/* ============================ Password ===================== */}

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                },
                {
                  min: 8,
                  message: 'password must be more than 8 characters!',
                },
              ]}
            >
              <Input.Password className="login-label" />
            </Form.Item>

            {/* ============================ Button Section ===================== */}
            <Form.Item>
              <Row gutter={8}>
                <Col span={12}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
              <div style={{ marginTop: '15px' }}>
                Already have an account? <Link to="/login">Login</Link>
              </div>
              <br />
              <Row gutter={[12, 12]}></Row>
            </Form.Item>
          </Form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Register;
