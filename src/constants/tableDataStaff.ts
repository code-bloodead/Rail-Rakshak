import avatar from "assets/img/defaultAvatar.jpg";

type RowObj = {
  name: string[];
  eid: string;
  contact: string;
  dept: string;
  status: string;
};

const tableColumnsStaff: RowObj[] = [
  {
    name: ["@User1", avatar],
    status: "Available",
    eid: "ABCD1234",
    contact: "1234567890",
    dept: "Maintenance",
  },
  {
    name: ["@User2", avatar],
    status: "Available",
    eid: "ABCD1235",
    contact: "1234567891",
    dept: "Security",
  },
  {
    name: ["@User3", avatar],
    status: "Assigned",
    eid: "ABCD1236",
    contact: "1234567892",
    dept: "Security",
  },
  {
    name: ["@User4", avatar],
    status: "Assigned",
    eid: "ABCD1237",
    contact: "1234567893",
    dept: "Maintenance",
  },
  {
    name: ["@User5", avatar],
    status: "Available",
    eid: "ABCD1238",
    contact: "1234567894",
    dept: "Maintenance",
  },
  {
    name: ["@User6", avatar],
    status: "Assigned",
    eid: "ABCD1239",
    contact: "1234567895",
    dept: "Security",
  },
  {
    name: ["@User7", avatar],
    status: "Available",
    eid: "ABCD1240",
    contact: "1234567896",
    dept: "Maintenance",
  },
];

export default tableColumnsStaff;
