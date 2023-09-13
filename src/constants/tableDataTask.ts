type RowObj = {
  id: number;
  date: string;
  assigned: string[];
  status: string;
};

const tableDataTask: RowObj[] = [
  {
    id: 1111,
    date: "12 Jan 2021",
    assigned: ["User1", "User2"],
    status: "In Progress",
  },
  {
    id: 2222,
    date: "21 Feb 2021",
    assigned: ["User5"],
    status: "Completed",
  },
  {
    id: 3333,
    date: "13 Mar 2021",
    assigned: ["User6"],
    status: "Completed",
  },
  {
    id: 4444,
    date: "24 Jan 2021",
    assigned: ["User7"],
    status: "In Progress",
  },
  {
    id: 5555,
    date: "24 Oct 2022",
    assigned: ["User8"],
    status: "Completed",
  },
  {
    id: 6666,
    date: "28 Oct 2022",
    assigned: ["User9"],
    status: "In Progress",
  },
];

export default tableDataTask;
