function parser(data) {
  if (!data.includes("KH")) {
    console.log("Invalid input format");
    return;
  }

  let degit = 0;
  let next = 0;
  let padding = 0;

  const stringInt = data.replace("KH", "");
  console.log(data, "data");
  const int = parseInt(stringInt);
  if (int < 10) {
    degit = 1;
    next = int + 1;
    padding = next === 10 ? 7 : 8;
  }
  if (int >= 10 && int < 100) {
    degit = 2;
    next = int + 1;
    padding = next === 100 ? 6 : 7;
  }
  if (int >= 100 && int < 1000) {
    degit = 3;
    next = int + 1;
    padding = next === 1000 ? 5 : 6;
  }
  if (int >= 1000 && int < 10000) {
    degit = 4;
    next = int + 1;
    padding = next === 10000 ? 4 : 5;
  }
  if (int >= 10000 && int < 100000) {
    degit = 5;
    next = int + 1;
    padding = next === 100000 ? 3 : 4;
  }
  if (int >= 100000 && int < 1000000) {
    degit = 6;
    next = int + 1;
    padding = next === 1000000 ? 2 : 3;
  }
  if (int >= 1000000 && int < 10000000) {
    degit = 7;
    next = int + 1;
    padding = next === 10000000 ? 1 : 2;
  }
  if (int >= 10000000 && int < 100000000) {
    degit = 8;
    next = int + 1;
    padding = next === 100000000 ? 0 : 1;
  }
  if (int >= 100000000 && int < 1000000000) {
    degit = 9;
    next = int + 1;
    padding = +1;
  }

  if (int >= 1000000000) throw new Error("Degit exeeded max value");
  console.log(int, "current");
  console.log(degit, "degit");
  console.log(padding, "padding");
  console.log(next, "next");

  return {
    degit,
    current: int,
    next,
    padding,
  };
}

function nextId(current_id) {
  const next = parser(current_id);
  let padding = [];

  for (var i = 0; i < next.padding; i++) {
    padding.push(0);
  }

  console.log("h1", next);

  return `KH${padding.join("")}${next.next}`;
}

function toReadable(id) {
  let by = 3;
  let int = id.replace("KH", "");

  let splited = int.match(/.{1,3}/g);
  return `KH${splited.join("_")}`;
}
// let id = nextId("KH0000987");
let id = nextId("KH99999999");

let rd = toReadable(id);
console.log(rd);
