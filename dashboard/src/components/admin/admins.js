import React, { useState, useRef } from "react";
import { Table, Layout, Spin, Input, Button, Space, Tag } from "antd";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";
// import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { GET_ADMINS } from "../../graphql/admin";
import moment from "moment";
const { Content } = Layout;

const Admins = () => {
  const [state, setState] = useState({
    searchText: "",
    searchedColumn: "",
  });
  const searchInput = useRef(null);

  const { loading, data, refetch } = useQuery(GET_ADMINS);

  if (loading || !data) {
    return (
      <div className="loading">
        <center>
          <Spin tip="Loading ..."></Spin>
        </center>
      </div>
    );
  }
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          //   ref={(node) => {
          //     searchInput = node;
          //   }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100);
      }
    },
    render: (text) =>
      state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setState({ searchText: "" });
  };
  const columns = [
    {
      title: "Student ID",
      dataIndex: "id",
      key: "id",
      render: (data) => {
        return <div>{data.substring(0, 7) + "..."}</div>;
      },
      ...getColumnSearchProps("id"),
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
      ...getColumnSearchProps("fullname"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
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
    },
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
          <h1 className="header-content">Admin Table</h1>
          <Table columns={columns} dataSource={data.admins} />
        </div>
      </Content>
    </React.Fragment>
  );
};

export default Admins;
