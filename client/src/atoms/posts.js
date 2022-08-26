import { atom } from "recoil";
export const posts = atom({
    key: "posts",
    default: [],
  });
export const currentId = atom({
  key: "id",
  default:'',
});
