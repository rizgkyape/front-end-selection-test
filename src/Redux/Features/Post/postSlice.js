import { createSlice } from '@reduxjs/toolkit';
import UrlAPI from '../../../Supports/Constant/urlAPI';
import axios from 'axios';
import toast from 'react-hot-toast';

const initialState = {
	dataAllPost: null,
	dataPostUser: null,
	postDetail: null,
	dataAllComment: null,
	totalLikePost: null,
};

export const postSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {
		setAllDataPost: (initialState, action) => {
			initialState.dataAllPost = action.payload;
		},
		setDataPostUser: (initialState, action) => {
			initialState.dataPostUser = action.payload;
		},
		setPostDetail: (initialState, action) => {
			initialState.postDetail = action.payload;
		},
		setAllComment: (initialState, action) => {
			initialState.dataAllComment = action.payload;
		},
		setTotalLikePost: (initialState, action) => {
			initialState.totalLikePost = action.payload;
		},
	},
});

export const onGetAllDataPost = (limit) => async (dispatch) => {
	try {
		const result = await axios.get(`${UrlAPI}/posts`, {
			params: {
				limit: limit
			}
		});
		console.log(result)
		dispatch(setAllDataPost(result?.data?.data));
	} catch (error) {
		console.log(error.message);
	}
};

export const onGetUserPost = (userLogin) => async (dispatch) => {
	try {
		const result = await axios.get(`${UrlAPI}/posts/user`, {
			headers: {
				authorization: `Bearer ${userLogin}`,
			},
		});

		console.log(result);

		dispatch(setDataPostUser(result));
	} catch (error) {
		console.log(error.message);
	}
};

export const onGetPostDetail = (params) => async (dispatch) => {
	try {
		const result = await axios.get(`${UrlAPI}/posts/detail/${params}`);
		dispatch(setPostDetail(result.data?.data));
	} catch (error) {
		console.log(error.message);
	}
};

export const onGetAllComment = (params) => async (dispatch) => {
	try {
		const result = await axios.get(`${UrlAPI}/posts/comment?postId=${params}`);

		dispatch(setAllComment(result));
	} catch (error) {
		console.log(error.message);
	}
};

export const onLikePost = (_postId, userLogin) => async (dispatch) => {
	try {
		const result = await axios.post(
			`${UrlAPI}/posts/like?postId=${_postId}`,
			{},
			{
				headers: {
					authorization: `Bearer ${userLogin}`,
				},
			}
		);
	} catch (error) {
		console.log(error.message);
	}
};

export const onUnlikePost = (_postId, userLogin) => async (dispatch) => {
	try {
		const result = await axios.delete(
			`${UrlAPI}/posts/like?postId=${_postId}`,
			{
				headers: {
					authorization: `Bearer ${userLogin}`,
				},
			}
		);
	} catch (error) {
		console.log(error.message);
	}
};

export const onGetTotalLikePost = (_postId) => async (dispatch) => {
	try {
		const result = await axios.get(`${UrlAPI}/posts/like?postId=${_postId}`);
		dispatch(setTotalLikePost(result?.data?.data));
	} catch (error) {
		console.log(error.message);
	}
};

export const {
	setAllDataPost,
	setDataPostUser,
	setPostDetail,
	setAllComment,
	setTotalLikePost,
} = postSlice.actions;
export default postSlice.reducer;
