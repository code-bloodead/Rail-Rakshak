import avatar from "assets/img/defaultAvatar.jpg";

type RowObj = {
  name: string[];
  artworks: number;
  rating: number;
};

const tableColumnsTopCreators: RowObj[] = [
  {
    name: ["@User1", avatar],
    artworks: 9821,
    rating: 97,
  },
  {
    name: ["@User2", avatar],
    artworks: 7032,
    rating: 87,
  },
  {
    name: ["@User3", avatar],
    artworks: 5204,
    rating: 82,
  },
  {
    name: ["@User4", avatar],
    artworks: 4309,
    rating: 68,
  },
  {
    name: ["@User5", avatar],
    artworks: 3871,
    rating: 55,
  },
  {
    name: ["@User6", avatar],
    artworks: 3152,
    rating: 46,
  },
  {
    name: ["@User7", avatar],
    artworks: 2907,
    rating: 38,
  },
];

export default tableColumnsTopCreators;
