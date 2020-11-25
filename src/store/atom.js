import {
  atom,
} from "recoil";

export const textState = atom({
  key: "textState",
  default: "",
});
export const theme = atom({
  key: "theme",
  default: {
    color: 'red',
    background: 'blue'
  },
});
