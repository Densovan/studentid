import React, { useState } from "react";
import { Modal, Button } from "antd";

const StudentCard = () => {
  const [state, setState] = useState(false);
  const setModal = (event) => {
    setState(event);
  };
  return <div></div>;
};

export default StudentCard;
