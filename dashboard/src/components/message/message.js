import React from "react";
import {
  Layout,
  Table,
  Tag,
  Col,
  Row,
  Tooltip,
  Spin,
  message,
  Popconfirm,
} from "antd";

import { Link } from "react-router-dom";
import {
  QuestionCircleOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import { MESSAGES, DELETE_MESSAGE } from "../../graphql/message";
import moment from "moment";

const { Content } = Layout;

const Messages = () => {
  const [deleteMessage] = useMutation(DELETE_MESSAGE);
  const { loading, data, error, refetch } = useQuery(MESSAGES);
  if (error) {
    console.error(error);
  }
  if (loading || !data) {
    return (
      <div>
        <center>
          <Spin tip="Loading ..." />
        </center>
      </div>
    );
  }

  const columns = [
    {
      title: "Photo",
      dataIndex: "thumbnail",
      key: "thumbnail",
      width: "15%",
      render: (thumbnail) => {
        return (
          <img
            style={{ borderRadius: "4px" }}
            height="50px"
            width="80px"
            src={`${process.env.REACT_APP_SERVER}/public/uploads/${thumbnail}`}
            alt="avatar"
          />
        );
      },
    },
    {
      title: "Full Name",
      dataIndex: "fullname",
      key: "fullname",
      width: "25%",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at) => {
        return moment(parseInt(created_at)).format("Do MMMM YYYY");
      },
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (updated_at) => {
        return moment(parseInt(updated_at)).format("Do MMMM YYYY");
      },
    },

    {
      title: "Actions",
      dataIndex: "id",
      key: "actions",
      render: (id) => {
        return (
          <React.Fragment>
            <Link to={`/dashboard/message/edit/${id}`}>
              <Tag color="#2176ff">Edit</Tag>
            </Link>
            <Popconfirm
              title="Are you sure to delete this message?"
              onConfirm={() => {
                deleteMessage({ variables: { id } })
                  .then((res) => {
                    message.success(res.data.deleteMessage.message);
                    refetch();
                  })
                  .catch((error) => {
                    let err = JSON.parse(JSON.stringify(error));
                    message.error(err.graphQLErrors[0].message);
                  });
              }}
              okText="Yes"
              cancelText="No"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            >
              <Tag color="#ff4333">Delete</Tag>
            </Popconfirm>
          </React.Fragment>
        );
      },
    },
  ];

  return (
    <React.Fragment>
      <Content>
        <div>
          <h1 className="header-content">Messages Table</h1>
          <Table columns={columns} dataSource={data.messages} />
        </div>
      </Content>
    </React.Fragment>
  );
};

export default Messages;
