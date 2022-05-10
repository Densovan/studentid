// const array = ["1", "2", "3"];
// const idd = Math.floor(Math.random() * (10 - 1)) + 1;
// console.log(idd);
// const arrays = array.map((str) => {
//   return Number(str);
// });
// console.log(arrays);
// if (arrays.includes(idd)) {
//   console.log("hi");
// }

const array = ["k1", "k2", "k3"];
const idd = (Math.floor(Math.random() * (10 - 1)) + 1).toString();

console.log(idd);
const arrays = array.map((str) => {
  return str;
});
console.log(arrays);
if (arrays.includes(`k${idd}`)) {
  console.log("hi");
}

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

// const qr = require("qrcode");

// let data = {
//   id: 1,

//   name: "User",

//   email: "user@gmail.com",
// };

// let strData = JSON.stringify(data);

// qr.toString(
//   strData,
//   { type: "terminal" },

//   function (err, code) {
//     if (err) return console.log("error occurred");

//     console.log(code);
//   }
// );

// qr.toDataURL(strData, function (err, code) {
//   if (err) return console.log("error occurred");

//   console.log(code);
// });
