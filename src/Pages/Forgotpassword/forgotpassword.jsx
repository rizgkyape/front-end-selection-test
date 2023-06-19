import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { onRegister } from '../../Redux/Features/User/userSlice';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import FlutterDashOutlinedIcon from '@mui/icons-material/FlutterDashOutlined';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import UrlAPI from '../../Supports/Constant/urlAPI';
import axios from 'axios';
import { useEffect } from 'react';

export default function ForgotPassword() {
	const params = useParams();
	const _password = useRef();
	const _passwordConfirmation = useRef();
	const navigate = useNavigate();

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [token, setToken] = useState([]);
	console.log(token);
	let checkToken = [];

	// Function
	const resetPassword = async () => {
		try {
			if (!_password.current.value && !_passwordConfirmation.current.value) {
				throw { message: 'Please insert your new password!' };
			}

			if (_password.current.value != _passwordConfirmation.current.value) {
				throw { message: "Password doesn't match!" };
			}

			const submitResetPassword = await axios.patch(
				`${UrlAPI}/auth/resetpassword`,
				{
					password: _password.current.value,
					passwordConfirmation: _passwordConfirmation.current.value,
				},
				{
					headers: {
						authorization: `Bearer ${params.token}`,
					},
				}
			);

			if (submitResetPassword) {
				toast.success('Successfully resetting password, please Login');

				setTimeout(() => {
					navigate('/login');
				}, 1000);
			}
		} catch (error) {
			if (error.response) {
				toast.error(error.response.data.message);
			} else {
				toast.error(error.message);
			}
		}
	};

	const passwordToken = async () => {
		try {
			const result = await axios.get(`${UrlAPI}/auth/tokenpassword`);
			setToken(result?.data?.data);
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		passwordToken();
	}, []);

	return (
		<>
			<Toaster />
			{token?.map((value, index) => {
				if (value.passwordToken === params.token) {
					checkToken.push(true);
				} else {
					checkToken.push(false);
				}
			})}
			{checkToken.includes(true) ? (
				<div className='flex justify-center items-center bg-[#2B2A4C] h-screen'>
					<div className='bg-[#EEE2DE] md:p-12 md:pb-20 p-6 rounded-[20px] shadow-2xl shadow-gray-900'>
						<div className='flex justify-center mb-4'>
							<FlutterDashOutlinedIcon
								className='text-[#d32f2f]'
								fontSize='large'
							/>
						</div>
						<div className='font-bold text-2xl'>
							<h1>RESET PASSWORD</h1>
						</div>
						<div className='mt-5 flex items-center'>
							<TextField
								id='password'
								variant='outlined'
								label='Password'
								type={showPassword ? 'text' : 'password'}
								autoComplete='current-password'
								size='small'
								fullWidth
								inputRef={_password}
							/>
							{showPassword === false ? (
								<div
									className='ml-[-45px] bg-[#EEE2DE] z-50 pl-3 cursor-pointer'
									onClick={() => setShowPassword(!showPassword)}
								>
									<VisibilityOutlinedIcon />
								</div>
							) : (
								<div
									className='ml-[-45px] bg-[#EEE2DE] z-50 pl-3 cursor-pointer'
									onClick={() => setShowPassword(!showPassword)}
								>
									<VisibilityOffOutlinedIcon />
								</div>
							)}
						</div>
						<div className='mt-3 flex items-center'>
							<TextField
								id='passwordConfirm'
								variant='outlined'
								label='Password Confirmation'
								type={showConfirmPassword ? 'text' : 'password'}
								autoComplete='current-password'
								size='small'
								fullWidth
								inputRef={_passwordConfirmation}
							/>
							{showConfirmPassword === false ? (
								<div
									className='ml-[-45px] bg-[#EEE2DE] z-50 pl-3 cursor-pointer'
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
								>
									<VisibilityOutlinedIcon />
								</div>
							) : (
								<div
									className='ml-[-45px] bg-[#EEE2DE] z-50 pl-3 cursor-pointer'
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
								>
									<VisibilityOffOutlinedIcon />
								</div>
							)}
						</div>
						<div className='mt-3 flex justify-between items-center'>
							<Button
								variant='contained'
								size='small'
								color='error'
								onClick={resetPassword}
							>
								Forgot Password
							</Button>
						</div>
					</div>
				</div>
			) : (
				<div className='flex justify-center items-center h-screen bg-[#EEE2DE]'>
					<div className='px-20 text-center'>
						<div className='font-bold text-[42px]'>
							<h1>EXPIRED TOKEN</h1>
						</div>
						<div className='mt-2 text-xl'>Your token is expired</div>
					</div>
				</div>
			)}
		</>
	);
}
