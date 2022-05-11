import React, { useState, useRef } from "react";
import {
  Table,
  Layout,
  Spin,
  Input,
  Button,
  Space,
  Tag,
  Modal,
  Avatar,
  Row,
  Col,
} from "antd";
import FlipCard from "react-flipcard-2";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";
import { QRCode } from "react-qrcode-logo";
import { SearchOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { GET_STUDENTS } from "../../graphql/students";
import moment from "moment";
const { Content } = Layout;

const Users = () => {
  const [states, setStates] = useState(false);
  const [fullname, setFullname] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [avatar, setAvatar] = useState("");
  const [state, setState] = useState({
    searchText: "",
    searchedColumn: "",
  });
  const setModal = (event) => {
    setStates(event);
  };

  const searchInput = useRef(null);

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
      dataIndex: "studentId",
      key: "id",
      render: (data) => {
        return <div>{data.substring(0, 7) + "..."}</div>;
      },
      ...getColumnSearchProps("studentId"),
    },

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
      render: (id, data) => {
        const { studentId, fullname, avatar, dob, email, gender } = data;

        return (
          <React.Fragment>
            {/* <Link to={`/dashboard/student/details/${id}`}>
              <Tag color="#262e3c">View</Tag>
            </Link> */}
            <Tag
              onClick={async () => {
                setModal(true);
                setDob(dob);
                setStudentId(studentId);
                setFullname(fullname);
                setEmail(email);
                setGender(gender);
                setAvatar(avatar);
              }}
              color="#262e3c"
            >
              View
            </Tag>

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
          <Modal
            className="modal"
            width={500}
            // title="Student Details"
            centered
            visible={states}
            // onOk={() => setModal(false)}
            onCancel={() => setModal(false)}
            footer={null}
            closeIcon={true}
          >
            <FlipCard>
              <div>
                <Row gutter={[12, 12]}>
                  <Col sm={7}>
                    <Avatar
                      size={{
                        xs: 24,
                        sm: 32,
                        md: 40,
                        lg: 64,
                        xl: 80,
                        xxl: 100,
                      }}
                      src={`${avatar}`}
                    />
                  </Col>
                  <Col sm={17}>
                    <p>
                      ID: <b>{studentId}</b>
                    </p>
                    <p>
                      Name: <b>{fullname}</b>
                    </p>
                    <p>
                      Date of Birth: <b>{dob}</b>
                    </p>
                    <p>
                      Email: <b>{email}</b>
                    </p>
                    <p>
                      gender: <b>{gender}</b>
                    </p>
                  </Col>
                </Row>
              </div>
              <div>
                {/* <Row>
                  <Col sm={7}>
                    <img
                      style={{ maxWidth: "60%", borderRadius: "50%" }}
                      src="/images/logokompinavy.png"
                    />
                  </Col>
                  <Col style={{ marginTop: "23px" }} sm={17}>
                    <h4> Power By KOOMPI</h4>
                  </Col>
                </Row>
                <Row>
                  <Col sm={7}>
                    <Avatar
                      size={{
                        xs: 24,
                        sm: 32,
                        md: 40,
                        lg: 64,
                        xl: 80,
                        xxl: 100,
                      }}
                      src="/images/logokompinavy.png"
                    />
                  </Col>
                  <Col sm={17}>Power By KOOMI</Col>
                </Row> */}
                <center>
                  <h3>Scan QRCode</h3>

                  <QRCode size={100} value={studentId} />
                </center>
              </div>
            </FlipCard>
          </Modal>
          <h1 className="header-content">Users Table</h1>

          <Table columns={columns} dataSource={data.students} />
        </div>
      </Content>
    </React.Fragment>
  );
};

export default Users;
