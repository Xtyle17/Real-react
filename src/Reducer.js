import { action } from "easy-peasy";
import { useReducer } from "react";

export const initialState = {
  posts: [],
  body: [],
  title: [],
};
export const ACTIONS = {
  SET_POSTS: "set_post",
  EDIT_TITLE: "edit_title",
  EDIT_BODY: "edit_body",
  ADD_TITLE: "add_title",
  ADD_BODY: "add_body",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_POSTS:
      return { ...state, posts: action.setPost };
    case ACTIONS.EDIT_BODY:
      return { ...state, body: action.payload };
    case ACTIONS.EDIT_TITLE:
      return { ...state, title: action.payload };
    case ACTIONS.ADD_TITLE:
      return { ...state, title: action.addTitle };
    case ACTIONS.ADD_BODY:
      return { ...state, body: action.addBody };

    default:
      return state;
  }
};
