import { combineReducers } from "redux";
import { recipesReducer } from "./reducers";

export const rootReducer = combineReducers({ data: recipesReducer });
