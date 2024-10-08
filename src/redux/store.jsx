import { configureStore } from "@reduxjs/toolkit";
import { UserUP } from "./slices/userUp";
import blogReducer from './slices/Bloggers';
import Category from "./slices/Category";
import userReducer from "./slices/GetUser";
import favourite from "./slices/favourite";
import Campagins from "./slices/Campagins";
import language from "./slices/language";
const store = configureStore({
    reducer: {
        signupUser: UserUP,
        Bloggers: blogReducer,
        Category: Category,
        user: userReducer,
        fav: favourite,
        campagin: Campagins,
         language: language,

    },
});

export default store;
