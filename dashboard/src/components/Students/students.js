import React, { useState } from "react";
import {
  Table,
  Layout,
  Tag,
  Row,
  Col,
  Tooltip,
  Popconfirm,
  Spin,
  message,
} from "antd";
import { Link } from "react-router-dom";
// import { FiTrash, FiEdit2 } from "react-icons/fi";
// import { Link } from "react-router-dom";
import { UserAddOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { GET_STUDENTS } from "../../graphql/students";
import moment from "moment";
const { Content } = Layout;

const Users = () => {
  const { loading, data, refetch } = useQuery(GET_STUDENTS);

  if (loading || !data) {
    return (
      <div className="loading">
        <center>
          <Spin tip="Loading ..."></Spin>
        </center>
      </div>
    );
  }

  const columns = [
    {
      title: "Student ID",
      dataIndex: "id",
      key: "id",
      render: (data) => {
        return <div>{data.substring(0, 7) + "..."}</div>;
      },
    },
    // {
    //   title: "Photo",
    //   dataIndex: "avatar",
    //   key: "avatar",
    //   width: "15%",
    //   render: (avatar) => {
    //     return (
    //       <img
    //         style={{ borderRadius: "50px" }}
    //         height="50px"
    //         width="50px"
    //         src={`${process.env.REACT_APP_SERVER}/public/avatar/${avatar}`}
    //         alt="avatar"
    //       />
    //     );
    //   },
    // },
    {
      title: "Full Name",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    // {
    //   title: "Role",
    //   dataIndex: "role",
    //   key: "role",
    //   render: (res, data) => {
    //     const { id, role } = data;
    //     return (
    //       <div>
    //         {role === "admin" && (
    //           <Tag style={{ cursor: "pointer" }} color="green">
    //             <Popconfirm
    //               title="Are you sure to switch this user role?"
    //               onConfirm={() => {
    //                 switchRole({ variables: { id, role: "user" } })
    //                   .then((res) => {
    //                     if (res.data.switchRole.statusCode === "200") {
    //                       return message.success(res.data.switchRole.message);
    //                     } else if (res.data.switchRole.statusCode === "404") {
    //                       return message.warning(res.data.switchRole.message);
    //                     }
    //                     refetch();
    //                   })
    //                   .catch((error) => {
    //                     let err = JSON.parse(JSON.stringify(error));
    //                     message.error(err.graphQLErrors[0].message);
    //                   });
    //               }}
    //               okText="Yes"
    //               cancelText="No"
    //             >
    //               Admin
    //             </Popconfirm>
    //           </Tag>
    //         )}
    //         {role === "user" && (
    //           <Tag style={{ cursor: "pointer" }} color="gold">
    //             <Popconfirm
    //               title="Are you sure to switch this user role？"
    //               onConfirm={() => {
    //                 switchRole({ variables: { id, role: "admin" } })
    //                   .then((res) => {
    //                     message.success(res.data.switchRole.message);
    //                     refetch();
    //                   })
    //                   .catch((error) => {
    //                     let err = JSON.parse(JSON.stringify(error));
    //                     message.error(err.graphQLErrors[0].message);
    //                   });
    //               }}
    //               okText="Yes"
    //               cancelText="No"
    //             >
    //               User
    //             </Popconfirm>
    //           </Tag>
    //         )}
    //         {role === "superadmin" && (
    //           <Tag style={{ cursor: "pointer" }} color="magenta">
    //             SuperAdmin
    //           </Tag>
    //         )}
    //       </div>
    //     );
    //   },
    // },
    {
      title: "Joined",
      dataIndex: "created_at",
      key: "created_at",
      render: (res) => {
        return moment(parseInt(res)).format("Do MMMM YYYY");
      },
    },
    {
      title: "Details",
      dataIndex: "id",
      key: "action",
      render: (id) => {
        return (
          <React.Fragment>
            <Link to={`/dashboard/student/details/${id}`}>
              <Tag color="#262e3c">View</Tag>
            </Link>

            <Link to={`/dashboard/student/edit/${id}`}>
              <Tag color="#f16179">Edit</Tag>
            </Link>
          </React.Fragment>
        );
      },
    },
  ];

  return (
    <React.Fragment>
      <Content>
        <div>
          <h1 className="header-content">Users Table</h1>
          <Table columns={columns} dataSource={data.students} />
        </div>
      </Content>
    </React.Fragment>
  );
};

export default Users;
