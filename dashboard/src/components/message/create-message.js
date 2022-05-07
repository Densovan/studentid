import React, { useState, useRef } from 'react';
import { Layout, Form, Input, Row, Col, message, Upload, Button } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import { EDITOR_JS_TOOLS } from '../../libs/constants';
import EditorJs from 'react-editor-js';
import { useMutation, useQuery } from '@apollo/client';
import { TESTIMONIALS } from '../../graphql/testimonials';
import { CREATE_MESSAGE } from '../../graphql/message';
const { Content } = Layout;

const CreateMessage = () => {
  const instanceRef = React.useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    imageUrl: null,
    loading: false,
  });
  const [form] = Form.useForm();

  const [createMessage] = useMutation(CREATE_MESSAGE);
  const { refetch } = useQuery(TESTIMONIALS);

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
    setIsLoading(true);
    createMessage({
      variables: {
        ...values,
        thumbnail: `${
          state.imageUrl === null ? 'no-user.png' : state.imageUrl
        }`,
        description: JSON.stringify(saveDescription),
      },
    })
      .then(async (res) => {
        setState({ imageUrl: null });
        await message.success(res.data.createMessage.message, 3);
        form.resetFields();
        refetch();
      })
      .catch((error) => console.error(error));
    setIsLoading(false);
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
                  rules={[{ required: true, message: 'Please input quote!' }]}
                  className="background-descrption"
                >
                  <EditorJs
                    tools={EDITOR_JS_TOOLS}
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
                      <div>
                        {state.loading ? <LoadingOutlined /> : <PlusOutlined />}
                        <div style={{ marginTop: 8 }}>515 × 300</div>
                      </div>
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
                      loading={isLoading}
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

export default CreateMessage;
