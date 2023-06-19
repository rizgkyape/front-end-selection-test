import { createSlice } from '@reduxjs/toolkit';
import UrlAPI from '../../../Supports/Constant/urlAPI';
import axios from 'axios';
import toast from 'react-hot-toast';

const initialState = {
	userRegister: null,
	userLogin: null,
	dataLogin: null,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserRegister: (initialState, action) => {
			initialState.userRegister = action.payload;
		},
		setUserLogin: (initialState, action) => {
			initialState.userLogin = action.payload;
		},
		setDataLogin: (initialState, action) => {
			initialState.dataLogin = action.payload;
		},
	},
});

export const onRegister =
	(email, userName, password, passwordConfirmation) => async (dispatch) => {
		try {
			if (!email || !userName || !password || !passwordConfirmation)
				throw { message: 'Please fill the data' };

			const result = await axios.post(`${UrlAPI}/auth/register`, {
				email,
				userName,
				password,
				passwordConfirmation,
			});

			let payload = {
				email: result?.data?.data.email,
				userName: result?.data?.data.userName,
			};

			dispatch(setUserRegister(payload));
			setTimeout(() => {
				toast.success(
					'Register success ! please check your email for activation link'
				);
			}, 100);
		} catch (error) {
			if (error.response) {
				toast.error(error.response.data.message);
			} else {
				toast.error(error.message);
			}
		}
	};

export const onLogin = (emailOrUsername, password) => async (dispatch) => {
	try {
		if (!emailOrUsername || !password)
			throw { message: 'Please fill the data' };

		let result = await axios.post(`${UrlAPI}/auth/login`, {
			emailOrUsername,
			password,
		});

		if (result.data.success) {
			let payload = {
				id: result?.data?.data.id,
				email: result?.data?.data.email,
				userName: result?.data?.data.userName,
				fullName: result?.data?.data?.fullName,
				profilePicture: result?.data?.data?.profilePicture,
				bio: result?.data?.data?.bio,
				status: result?.data?.data.status,
			};

			toast.success('Login Success!');

			localStorage.setItem(
				'userLogin',
				JSON.stringify(result?.data?.data.token)
			);

			setTimeout(() => {
				dispatch(setUserLogin(payload));
			}, 300);
		} else {
			throw { message: 'Wrong email, phone number or password!' };
		}
	} catch (error) {
		if (error.response) {
			toast.error(error.response.data.message);
		} else {
			toast.error(error.message);
		}
	}
};

export const getDataLogin = (userLogin) => async (dispatch) => {
	try {
		const result = await axios.post(
			`${UrlAPI}/users/profile`,
			{},
			{
				headers: {
					authorization: `Bearer ${userLogin}`,
				},
			}
		);

		const like = await axios.get(`${UrlAPI}/posts/user/like`, {
			headers: {
				authorization: `Bearer ${userLogin}`,
			},
		});

		let payload = {
			id: result.data.data.id,
			email: result.data.data.email,
			userName: result.data.data.userName,
			fullName: result.data.data.fullName,
			profilePicture: result.data.data.profilePicture,
			bio: result.data.data.bio,
			status: result.data.data.status,
			like: like.data.data,
		};

		dispatch(setDataLogin(payload));
	} catch (error) {
		if (error.response) {
			toast.error(error.response.data.message);
		} else {
			toast.error(error.message);
		}
	}
};

export const onEditProfile =
	(fullName, userName, bio, profilePicture, token) => async (dispatch) => {
		try {
			if (!fullName && !userName && !bio && profilePicture === null) {
				throw { message: 'Please fill out the form!' };
			}

			const result = await axios.patch(
				`${UrlAPI}/users/edit/profile`,
				{
					fullName,
					userName,
					bio,
					profilePicture,
				},
				{
					headers: {
						authorization: `Bearer ${token}`,
						'content-type': 'multipart/form-data',
					},
				}
			);
			dispatch(getDataLogin(token));

			if (result) toast.success('Edit profile success!');
		} catch (error) {
			if (error.response) {
				toast.error(error.response.data.message);
			} else {
				toast.error(error.message);
			}
		}
	};

export const { setUserLogin, setUserRegister, setDataLogin } =
	userSlice.actions;
export default userSlice.reducer;
