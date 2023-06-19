import { configureStore } from '@reduxjs/toolkit';
import userReducer from './../Features/User/userSlice';
import postReducer from './../Features/Post/postSlice';

export const store = configureStore({
	reducer: {
		user: userReducer,
		post: postReducer,
	},
});
