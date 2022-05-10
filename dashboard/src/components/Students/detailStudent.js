import React from "react";
import { DELETE_USER, GET_STUDENT } from "../../graphql/students";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { Layout, Button, Avatar } from "antd";
import { QRCode } from "react-qrcode-logo";

const { Content } = Layout;
const DetailStudent = () => {
  const { id } = useParams();
  const [deleteUser] = useMutation(DELETE_USER);
  const { loading, data } = useQuery(GET_STUDENT, {
    variables: {
      id,
    },
  });
  if (loading) {
    return "loading...";
  }

  const { avatar, fullname, email, gender, dob, studentId } = data.student;
  const DeleteUser = (id) => {
    deleteUser({
      variables: { id },
    }).then((res) => {
      window.location.replace("/dashboard/students");
    });
  };
  return (
    <div>
      <Content>
        <h1 className="header-content">Student Details</h1>
        <div className="card-student">
          <Avatar
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            src={`${avatar}`}
          />
          <br />
          <br />
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
        </div>
        <QRCode value={studentId} />,
      </Content>
      <br />
      <Button onClick={() => DeleteUser(id)} className="button-cancel">
        Delete
      </Button>
    </div>
  );
};

export default DetailStudent;
