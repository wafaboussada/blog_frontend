import { configureStore } from "@reduxjs/toolkit";

import userReducer from './store/user';
import postReducer from './store/posts';


export default configureStore({
    reducer: {
        user: userReducer,
        post: postReducer,
    }
})