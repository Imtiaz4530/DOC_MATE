import { createStore } from "easy-peasy";

import userModel from "./models/userModel";

const store = createStore({
  user: userModel,
});

export default store;
