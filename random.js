// const array = [1, 2, 3];
// const idd = Math.floor(Math.random() * (10 - 1)) + 1;
// console.log(idd);
// if (!array.includes(idd)) {
//   console.log("hi");
// } else if (array.includes(idd)) {
// }

// const student = await Test.find({});
// const students = student.map((res) => res.studentId);
// console.log(students);
// const idd = Math.floor(Math.random() * (1000000000 - 1)) + 1;
// if (!students.includes(idd)) {
//   const test = new Test({
//     ...args,
//     studentId: `KH${idd}`,
//   });
//   await test.save();
//   return { message: "successfully" };
// } else if (students.includes(idd)) {
// }

const qr = require("qrcode");

let data = {
  id: 1,

  name: "User",

  email: "user@gmail.com",
};

let strData = JSON.stringify(data);

qr.toString(
  strData,
  { type: "terminal" },

  function (err, code) {
    if (err) return console.log("error occurred");

    console.log(code);
  }
);

qr.toDataURL(strData, function (err, code) {
  if (err) return console.log("error occurred");

  console.log(code);
});
