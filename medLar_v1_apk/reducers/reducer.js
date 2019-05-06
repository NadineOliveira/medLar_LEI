import { combineReducers, bindActionCreators } from "redux";

const initial_state = {
  current: [],
  possible: ["ola redux"]
};

const reducer = (state = initial_state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({
  reducers: reducer
});
