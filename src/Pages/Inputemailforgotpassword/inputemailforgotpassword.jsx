import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { onRegister } from '../../Redux/Features/User/userSlice';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import FlutterDashOutlinedIcon from '@mui/icons-material/FlutterDashOutlined';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UrlAPI from '../../Supports/Constant/urlAPI';
import { useNavigate } from 'react-router-dom';

export default function InputForgotPassword() {
	const _email = useRef();
	const navigate = useNavigate();

	// FUNCTION
	const forgotPassword = async () => {
		try {
			if (!_email.current.value) {
				throw { message: 'Please fill out the form!' };
			}

			const submitEmail = await axios.post(`${UrlAPI}/auth/forgotpassword`, {
				email: _email.current.value,
			});

			if (submitEmail) {
				toast.success('Please check your email for resetting your password!');

				_email.current.value = '';

				setTimeout(() => {
					navigate('/login');
				}, 500);
			}
		} catch (error) {
			if (error.response) {
				toast.error(error.response.data.message);
			} else {
				toast.error(error.message);
			}
		}
	};
	return (
		<>
			<Toaster />
			<div className='flex justify-center items-center bg-[#2B2A4C] h-screen'>
				<div className='bg-[#EEE2DE] md:p-12 md:pb-20 p-6 rounded-[20px] shadow-2xl shadow-gray-900'>
					<div className='flex justify-center mb-4'>
						<FlutterDashOutlinedIcon
							className='text-[#d32f2f]'
							fontSize='large'
						/>
					</div>
					<div className='font-bold text-2xl'>
						<h1>PLEASE INPUT YOUR EMAIL</h1>
					</div>
					<div className='mt-5 flex items-center'>
						<TextField
							id='password'
							variant='outlined'
							label='Password'
							type='text'
							autoComplete='current-password'
							size='small'
							fullWidth
							inputRef={_email}
						/>
					</div>
					<div className='mt-3 flex justify-between items-center'>
						<Button variant='contained' size='small' color='error' onClick={forgotPassword}>
							SEND
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}
