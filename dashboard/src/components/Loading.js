import { Spin } from "antd";

import React from "react";

function Loading() {
  return (
    <div>
      <center>
        <Spin tip="Loading ..."></Spin>
      </center>
    </div>
  );
}

export default Loading;
