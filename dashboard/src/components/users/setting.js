import React, { useState, useContext } from 'react';

import {
  Upload,
  message,
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  Badge,
} from 'antd';
import { GET_USER, UPDATE_USER } from '../../graphql/user';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { CheckCircleOutlined } from '@ant-design/icons';
import Loading from '../Loading';

function Settings() {
  const [avatarData, setAvatarData] = useState('');

  const { loading: userLoading, data } = useQuery(GET_USER);
  const [updateUser] = useMutation(UPDATE_USER);

  const images = [
    'g9466.png',
    'g9538.png',
    'g9478.png',
    'g9442.png',
    'path6494.png',
    'g9490.png',
    'path5616.png',
    'g9598.png',
  ];

  const onFinish = (values) => {
    console.log('Success:', values);
    updateUser({
      variables: {
        ...values,
        avatar: avatarData !== '' ? avatarData : avatar,
      },
    })
      .then(async (res) => {
        res.data.update_user.statusCode === '400'
          ? await message.error(res.data.update_user.message)
          : await message.success(res.data.update_user.message);
      })
      .then(() => {
        window.location.reload();
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  if (userLoading) return <Loading />;

  const { email, fullname, avatar } = data.user;

  return (
    <React.Fragment>
      <div className="user-setting-container">
        <div className="user-setting-title">
          <h2 className="user-setting">User Settings</h2>
        </div>
        <Row gutter={[16, 16]}>
          {images.map((image) => {
            console.log('image', image);
            return (
              <Col span={3}>
                <Badge
                  // dot={true}
                  count={
                    image === avatar ? (
                      <CheckCircleOutlined style={{ color: '#52c41a' }} />
                    ) : avatarData === image ? (
                      <CheckCircleOutlined style={{ color: '#52c41a' }} />
                    ) : null
                  }
                >
                  <img
                    src={`${process.env.REACT_APP_SERVER}/public/avatar/${image}`}
                    alt={image}
                    className="img-responsive"
                    onClick={() => setAvatarData(image)}
                  />
                </Badge>
              </Col>
            );
          })}
        </Row>

        <Form
          name="basic"
          initialValues={{ email, fullname }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            label="Full Name"
            name="fullname"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input size="large" disabled />
          </Form.Item>
          <Form.Item label="Old Password" name="oldPassword">
            <Input.Password size="large" autoComplete="new-password" />
          </Form.Item>

          <Row gutter={[24, 24]}>
            <Col span={12}>
              <Form.Item label="New Password" name="password">
                <Input.Password size="large" autoComplete="new-password" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Confirm Password" name="confirmPassword">
                <Input.Password size="large" autoComplete="new-password" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="btn-submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </div>
    </React.Fragment>
  );
}

export default Settings;
