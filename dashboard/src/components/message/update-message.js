import React, { useState, useRef } from 'react';
import {
  Layout,
  Form,
  Input,
  Row,
  Col,
  message,
  Upload,
  Button,
  Spin,
} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import { EDITOR_JS_TOOLS } from '../../libs/constants';
import EditorJs from 'react-editor-js';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_MESSAGE, MESSAGE } from '../../graphql/message';
import { useParams } from 'react-router';

const { Content } = Layout;

const UpdateMessage = () => {
  const { id } = useParams();
  const instanceRef = React.useRef(null);
  const [state, setState] = useState({
    imageUrl: null,
    loading: false,
  });
  const [form] = Form.useForm();

  const [updateMessage] = useMutation(UPDATE_MESSAGE);
  const { loading, error, data, refetch } = useQuery(MESSAGE, {
    variables: {
      id,
    },
  });

  if (error) {
    console.error(error);
  }
  if (loading || !data) {
    return (
      <div>
        <center>
          <Spin tip="Loading ..."></Spin>
        </center>
      </div>
    );
  }

  const { fullname, thumbnail, description, position } = data.message;

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      setState({
        imageUrl: info.file.response.image.filename,
        loading: false,
      });
    }
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 1;
    if (!isLt2M) {
      message.error('Your Image must smaller than 1MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleSubmit = async (values) => {
    const saveDescription = await instanceRef.current.save();
    updateMessage({
      variables: {
        ...values,
        id,
        description: JSON.stringify(saveDescription),
        thumbnail: `${state.imageUrl === null ? thumbnail : state.imageUrl}`,
      },
    })
      .then(async (res) => {
        await message.success(res.data.updateMessage.message, 3);
        window.location.replace('/dashboard/message/all');
      })
      .catch((error) => console.error(error));
  };

  return (
    <React.Fragment>
      <Content>
        <div className="contentContainer-width">
          <h1 className="header-content">Add Message</h1>
          <Form
            name="basic"
            layout="vertical"
            form={form}
            onFinish={handleSubmit}
            size="large"
            initialValues={{
              fullname,
              position,
            }}
          >
            <Row gutter={[32, 0]}>
              <Col span={20}>
                <Form.Item
                  label="Full Name"
                  name="fullname"
                  rules={[
                    {
                      required: true,
                      message: 'Please input full name!',
                    },
                  ]}
                >
                  <Input className="schoolInput" />
                </Form.Item>
                <Form.Item
                  label="Position"
                  name="position"
                  rules={[
                    {
                      required: true,
                      message: 'Please input position!',
                    },
                  ]}
                >
                  <Input className="schoolInput" />
                </Form.Item>
                <Form.Item
                  label="Description"
                  name="description"
                  className="background-descrption"
                >
                  <EditorJs
                    tools={EDITOR_JS_TOOLS}
                    data={description === null ? null : JSON.parse(description)}
                    placeholder="Testimonials Words ..."
                    instanceRef={(instance) => (instanceRef.current = instance)}
                  />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="Photo" name="thumbnail">
                  <Upload
                    name="photo"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action={`${process.env.REACT_APP_SERVER}/upload/photo`}
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    {state.imageUrl ? (
                      <img
                        src={`${process.env.REACT_APP_SERVER}/public/uploads/${state.imageUrl}`}
                        alt="thumbnail"
                        style={{ width: '120px', height: '100px' }}
                      />
                    ) : (
                      <img
                        src={`${process.env.REACT_APP_SERVER}/public/uploads/${thumbnail}`}
                        alt="thumbnail"
                        style={{ width: '120px', height: '100px' }}
                      />
                    )}
                  </Upload>
                  <center>
                    <div style={{ color: 'red', fontSize: '13px' }}>
                      The size must under 1MB. Size: 315 × 200
                    </div>
                  </center>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Row gutter={24}>
                <Col>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="button-submit"
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item>
                    <Button type="text" className="button-cancel">
                      Cancel
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </React.Fragment>
  );
};

export default UpdateMessage;
