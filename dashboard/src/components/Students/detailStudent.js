import React from "react";
import { UPDATE_STUDENT, GET_STUDENT } from "../../graphql/students";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router";
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
  console.log(data);
  return <div>DetailStudent</div>;
};

export default DetailStudent;
