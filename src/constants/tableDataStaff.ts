import avatar from "assets/img/defaultAvatar.jpg";

type RowObj = {
  name: string[];
  status: string;
};

const tableColumnsStaff: RowObj[] = [
  {
    name: ["@User1", avatar],
    status: "Available",
  },
  {
    name: ["@User2", avatar],
    status: "Available",
  },
  {
    name: ["@User3", avatar],
    status: "Assigned",
  },
  {
    name: ["@User4", avatar],
    status: "Assigned",
  },
  {
    name: ["@User5", avatar],
    status: "Available",
  },
  {
    name: ["@User6", avatar],
    status: "Assigned",
  },
  {
    name: ["@User7", avatar],
    status: "Available",
  },
];

export default tableColumnsStaff;
