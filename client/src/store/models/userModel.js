import { action } from "easy-peasy";

const userModel = {
  user: null,
  setUser: action((state, payload) => {
    state.user = payload;
  }),
  clearUser: action((state) => {
    state.user = null;
  }),
};

export default userModel;
