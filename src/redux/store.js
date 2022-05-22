import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";

import { appReducer } from "./app-reducer";

export const store = createStore(appReducer, applyMiddleware(thunkMiddleware));
// @ts-ignore
window.store = store;
