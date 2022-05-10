import React from "react";

const Test = () => {
  // const existingId = "kh000000001";
  // const newIdOnly = existingId.replace(/kh\[(\d+)\]+/g, "$1");
  // console.log(newIdOnly);
  // const newId = existingId.replace(/(\d+)+/g, function (match, number) {
  //   return parseInt(number) + 1;
  //   // return number + 1;
  // });
  // console.log(newId, "newId");
  // let existingId = "fisher[27].man";
  const existingId = "kh000000001";
  let newIdOnly = existingId.replace(/kh\[(\d+)\]+/g, "$1");
  console.log(newIdOnly, "i");

  let newId = existingId.replace(/(\d+)+/g, function (match, number) {
    return parseInt(number) + 1;
  });
  console.log(newId);

  return <div>test</div>;
};

export default Test;
