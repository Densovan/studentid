import React from "react";
import { UPDATE_STUDENT, GET_STUDENT } from "../../graphql/students";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { Layout } from "antd";
import { Avatar } from "antd";
const { Content } = Layout;
const DetailStudent = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_STUDENT, {
    variables: {
      id,
    },
  });
  if (loading) {
    return "loading...";
  }
  const { avatar, fullname, email, gender, dob } = data.student;
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
        </div>
      </Content>
    </div>
  );
};

export default DetailStudent;
