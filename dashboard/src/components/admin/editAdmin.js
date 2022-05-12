import React, { useState } from "react";
import {
  Layout,
  Form,
  Input,
  Row,
  Col,
  message,
  Upload,
  Button,
  Select,
  Spin,
  DatePicker,
} from "antd";
import moment from "moment";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { UPDATE_ADMIN, GET_ADMIN } from "../../graphql/admin";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router";
const { RangePicker } = DatePicker;
const { Content } = Layout;
const { Option } = Select;

const EditAdmin = ({ history }) => {
  const [form] = Form.useForm();
  const { id } = useParams();

  const [state, setState] = useState({
    imageUrl: null,
    loading: false,
  });
  const [dateString, setDateString] = useState("");
  const [update_admin] = useMutation(UPDATE_ADMIN);
  const { loading, data } = useQuery(GET_ADMIN, {
    variables: {
      id,
    },
  });
  if (loading) {
    return "loading...";
  }
  function onChange(date, dateString) {
    setDateString(dateString);
  }

  const { fullname, email, avatar, gender, dob } = data.admin;

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      setState({
        imageUrl: info.file.response.imageUrl,
        loading: false,
      });
    }
  };
  const config = {
    rules: [
      {
        type: "object",
        required: true,
        message: "Please select time!",
      },
    ],
  };

  const onFinish = (values) => {
    update_admin({
      variables: {
        id: id,
        ...values,
        dob: values["dob"].format("YYYY-MM-DD"),
        avatar: `${state.imageUrl === null ? avatar : state.imageUrl}`,
      },
    }).then(async (res) => {
      // instanceRef.current.clear();
      setState({ imageUrl: null });
      await message.success(res.data.update_admin.message, 3);
      form.resetFields();
      history.push("/dashboard/admins");
    });
    console.log("Success:", values);
  };
  const onGenderChange = (value) => {
    switch (value) {
      case "male":
        form.setFieldsValue({
          note: "Hi, man!",
        });
        return;

      case "female":
        form.setFieldsValue({
          note: "Hi, lady!",
        });
        return;

      case "other":
        form.setFieldsValue({
          note: "Hi there!",
        });
    }
  };

  return (
    <React.Fragment>
      <Content>
        <div className="contentContainer-width">
          <h1 className="header-content">Update Infomation Admin</h1>
          <Form
            name="basic"
            layout="vertical"
            size="large"
            onFinish={onFinish}
            form={form}
            initialValues={{
              fullname,
              email,
              avatar,
              gender,
            }}
          >
            <Row gutter={[32, 0]}>
              <Col span={16}>
                <Form.Item
                  label="Fullname"
                  name="fullname"
                  rules={[
                    {
                      required: true,
                      message: "Fullname is required!",
                    },
                  ]}
                >
                  <Input className="schoolInput" />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "email is required!",
                    },
                  ]}
                >
                  <Input className="schoolInput" />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Password is required!",
                    },
                  ]}
                >
                  <Input.Password className="schoolInput" />
                </Form.Item>
                <Form.Item
                  name="gender"
                  label="Gender"
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder="Select a gender"
                    onChange={onGenderChange}
                    allowClear
                  >
                    <Option value="male">male</Option>
                    <Option value="female">female</Option>
                    <Option value="other">other</Option>
                  </Select>
                </Form.Item>
                {/* <Form.Item name="dob" label="Date Of Birth" {...config}>
                  <DatePicker />
                </Form.Item> */}
                <Form.Item
                  initialValue={moment(dob)}
                  label="Date of Birthh"
                  name="dob"
                >
                  <DatePicker
                    className="schoolInput"
                    style={{ width: "100%" }}
                    onChange={onChange}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Avatar" name="avatar">
                  <Upload
                    name="thumbnail"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://id.saladigital.org/upload/image"
                    // beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    {state.imageUrl ? (
                      <img
                        src={state.imageUrl}
                        alt="thumbnail"
                        style={{ width: "120px", height: "100px" }}
                      />
                    ) : (
                      <img
                        src={`${avatar}`}
                        alt="thumbnail"
                        style={{ width: "120px", height: "100px" }}
                      />
                    )}
                  </Upload>
                  <div style={{ color: "red", fontSize: "13px" }}>
                    The size must under 1MB
                  </div>
                </Form.Item>
              </Col>
            </Row>
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
          </Form>
        </div>
      </Content>
    </React.Fragment>
  );
};

export default EditAdmin;
