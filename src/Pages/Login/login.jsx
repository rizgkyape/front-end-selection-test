import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import FlutterDashOutlinedIcon from '@mui/icons-material/FlutterDashOutlined';
import { onLogin } from '../../Redux/Features/User/userSlice';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function Login() {
	const [showPassword, setShowPassword] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);
	const [open, setOpen] = useState(false);

	const _emailOrUsername = useRef();
	const _password = useRef();

	const dispatch = useDispatch();

	const dataLogin = useSelector((state) => state.user.userLogin);
	const userLogin = localStorage.getItem('userLogin');

	if (userLogin) return <Navigate to='/home' />;

	const submitLogin = async () => {
		try {
			dispatch(
				onLogin(_emailOrUsername.current.value, _password.current.value)
			);
			setTimeout(() => {
				setIsDisabled(false);
				setOpen(false);
			}, 1000);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsDisabled(true);
			setOpen(true);
		}
	};

	return (
		<>
			<Toaster />
			<div className='flex justify-center items-center bg-[#2B2A4C] h-screen'>
				<div className='flex h-[400px]'>
					<div>
						<img
							src='https://images.pexels.com/photos/1056497/pexels-photo-1056497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
							className='object-cover h-[400px] w-[365px] rounded-[20px] md:block hidden'
						/>
					</div>

					<div className='bg-[#EEE2DE] md:p-12 p-6 shadow-2xl shadow-gray-900 md:rounded-r-[20px] rounded-[20px]'>
						<div className='flex justify-center mb-4'>
							<FlutterDashOutlinedIcon
								className='text-[#d32f2f]'
								fontSize='large'
							/>
						</div>
						<div className='font-bold text-2xl'>
							<h1>SIGN IN TO MONKETYPE</h1>
						</div>
						<div className='text-xs underline pr-2 flex justify-center text-gray-500 my-2'>
							<Link to='/register'>Dont have account ? Register here</Link>
						</div>
						<div className='mt-4'>
							<TextField
								id='emailOrUsername'
								label='Email or username'
								variant='outlined'
								size='small'
								fullWidth
								inputRef={_emailOrUsername}
							/>
						</div>
						<div className='mt-3 flex items-center'>
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
						<div className='mt-3 flex justify-between items-center'>
							<Button
								variant='contained'
								size='small'
								color='error'
								disabled={isDisabled}
								onClick={submitLogin}
							>
								Login
							</Button>
							<Backdrop
								sx={{
									color: '#fff',
									zIndex: (theme) => theme.zIndex.drawer + 1,
								}}
								open={open}
							>
								<CircularProgress color='inherit' />
							</Backdrop>
							<div className='text-xs underline pr-2'>
								<Link to='/forgotpassword'>Forgot Password</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
