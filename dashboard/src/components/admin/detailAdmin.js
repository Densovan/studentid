import React from "react";
import { DELETE_USER } from "../../graphql/students";
import { GET_ADMIN } from "../../graphql/admin";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { Layout, Button, Avatar } from "antd";

const { Content } = Layout;
const DetailAdmin = () => {
  const { id } = useParams();
  const [deleteUser] = useMutation(DELETE_USER);
  const { loading, data } = useQuery(GET_ADMIN, {
    variables: {
      id,
    },
  });
  if (loading) {
    return "loading...";
  }
  console.log(data);

  const { avatar, fullname, email, gender, dob, role } = data.admin;
  const DeleteUser = (id) => {
    deleteUser({
      variables: { id },
    }).then((res) => {
      window.location.replace("/dashboard/admins");
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
            ID: <b>{id}</b>
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
          <p>
            Role: <b>{role}</b>
          </p>
        </div>
      </Content>
      <br />
      <Button onClick={() => DeleteUser(id)} className="button-cancel">
        Delete
      </Button>
    </div>
  );
};

export default DetailAdmin;
