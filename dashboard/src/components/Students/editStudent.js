// import React, { useState } from "react";
// import {
//   Layout,
//   Form,
//   Input,
//   Row,
//   Col,
//   message,
//   Upload,
//   Button,
//   Select,
//   Spin,
//   DatePicker,
// } from "antd";
// import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
// import { UPDATE_STUDENT, GET_STUDENT } from "../../graphql/students";
// import { useMutation, useQuery } from "@apollo/client";
// import { useParams } from "react-router";
// const { RangePicker } = DatePicker;
// const { Content } = Layout;
// const { Option } = Select;

// const EditStudent = () => {
//   const [form] = Form.useForm();
//   const { id } = useParams();

//   const [state, setState] = useState({
//     imageUrl: null,
//     loading: false,
//   });
//   const [update_student] = useMutation(UPDATE_STUDENT);
//   const [loading, data] = useQuery(GET_STUDENT, {
//     variables: {
//       id,
//     },
//   });
//   if (loading) {
//     return "loading...";
//   }
//   console.log(data);

//   const handleChange = (info) => {
//     if (info.file.status === "uploading") {
//       setState({ loading: true });
//       return;
//     }
//     if (info.file.status === "done") {
//       setState({
//         imageUrl: info.file.response.imageUrl,
//         loading: false,
//       });
//     }
//   };
//   const config = {
//     rules: [
//       {
//         type: "object",
//         required: true,
//         message: "Please select time!",
//       },
//     ],
//   };

//   const onFinish = (values) => {
//     update_student({
//       variables: {
//         ...values,
//         avatar: `${state.imageUrl === null ? "no-user.png" : state.imageUrl}`,
//       },
//     }).then(async (res) => {
//       // instanceRef.current.clear();
//       setState({ imageUrl: null });
//       await message.success(res.data.create_student.message, 3);
//       form.resetFields();
//     });
//     console.log("Success:", values);
//   };
//   const onGenderChange = (value) => {
//     switch (value) {
//       case "male":
//         form.setFieldsValue({
//           note: "Hi, man!",
//         });
//         return;

//       case "female":
//         form.setFieldsValue({
//           note: "Hi, lady!",
//         });
//         return;

//       case "other":
//         form.setFieldsValue({
//           note: "Hi there!",
//         });
//     }
//   };

//   return (
//     <React.Fragment>
//       <Content>
//         <div className="contentContainer-width">
//           <h1 className="header-content">Update Infomation Student</h1>
//           <Form
//             name="basic"
//             layout="vertical"
//             size="large"
//             onFinish={onFinish}
//             form={form}
//           >
//             <Row gutter={[32, 0]}>
//               <Col span={16}>
//                 <Form.Item
//                   label="Fullname"
//                   name="fullname"
//                   rules={[
//                     {
//                       required: true,
//                       message: "Fullname is required!",
//                     },
//                   ]}
//                 >
//                   <Input className="schoolInput" />
//                 </Form.Item>
//                 <Form.Item
//                   label="Email"
//                   name="email"
//                   rules={[
//                     {
//                       required: true,
//                       message: "email is required!",
//                     },
//                   ]}
//                 >
//                   <Input className="schoolInput" />
//                 </Form.Item>
//                 <Form.Item
//                   label="Password"
//                   name="password"
//                   rules={[
//                     {
//                       required: true,
//                       message: "Password is required!",
//                     },
//                   ]}
//                 >
//                   <Input.Password className="schoolInput" />
//                 </Form.Item>
//                 <Form.Item
//                   name="gender"
//                   label="Gender"
//                   rules={[{ required: true }]}
//                 >
//                   <Select
//                     placeholder="Select a gender"
//                     onChange={onGenderChange}
//                     allowClear
//                   >
//                     <Option value="male">male</Option>
//                     <Option value="female">female</Option>
//                     <Option value="other">other</Option>
//                   </Select>
//                 </Form.Item>
//                 <Form.Item name="dob" label="Date Of Birth" {...config}>
//                   <DatePicker />
//                 </Form.Item>
//               </Col>
//               <Col span={8}>
//                 <Form.Item
//                   label="Avatar"
//                   name="avatar"
//                   // rules={[
//                   //   { required: true, message: "Thumbnail is required!" },
//                   // ]}
//                 >
//                   <Upload
//                     name="thumbnail"
//                     listType="picture-card"
//                     className="avatar-uploader"
//                     showUploadList={false}
//                     // action={`${process.env.REACT_APP_SERVER}/upload/image`}
//                     action="http://localhost:9001/upload/image"
//                     // beforeUpload={beforeUpload}
//                     onChange={handleChange}
//                   >
//                     {state.imageUrl ? (
//                       <img
//                         // src={`${process.env.REACT_APP_SERVER}/public/uploads/${state.imageUrl}`}
//                         // src={`http://localhost:7000/public/uploads/${state.imageUrl}`}
//                         src={state.imageUrl}
//                         alt="thumbnail"
//                         style={{ width: "120px", height: "100px" }}
//                       />
//                     ) : (
//                       <div>
//                         {state.loading ? <LoadingOutlined /> : <PlusOutlined />}
//                         <div style={{ marginTop: 8 }}>315 × 200</div>
//                       </div>
//                     )}
//                   </Upload>
//                   <div style={{ color: "red", fontSize: "13px" }}>
//                     The size must under 1MB
//                   </div>
//                 </Form.Item>
//               </Col>
//             </Row>
//             <Row gutter={24}>
//               <Col>
//                 <Form.Item>
//                   <Button
//                     type="primary"
//                     htmlType="submit"
//                     className="button-submit"
//                   >
//                     Submit
//                   </Button>
//                 </Form.Item>
//               </Col>
//               <Col>
//                 <Form.Item>
//                   <Button type="text" className="button-cancel">
//                     Cancel
//                   </Button>
//                 </Form.Item>
//               </Col>
//             </Row>
//           </Form>
//         </div>
//       </Content>
//     </React.Fragment>
//   );
// };

// export default EditStudent;

import React from "react";
import { UPDATE_STUDENT, GET_STUDENT } from "../../graphql/students";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router";

const EditStudent = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_STUDENT, {
    variables: {
      id,
    },
  });
  if (loading) {
    return "loading...";
  }
  console.log(data);
  return <div>EditStudent</div>;
};

export default EditStudent;
