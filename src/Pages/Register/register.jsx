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
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

export default function Register() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const _email = useRef();
	const _userName = useRef();
	const _password = useRef();
	const _passwordConfirmation = useRef();

	const dataRegister = useSelector((state) => state.user.userRegister);

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);
	const [open, setOpen] = useState(false);

	if (dataRegister) return <Navigate to='/login' />;

	const onSubmitRegister = async () => {
		try {
			setTimeout(() => {
				setOpen(false);
				setIsDisabled(false);
				dispatch(
					onRegister(
						_email.current.value,
						_userName.current.value,
						_password.current.value,
						_passwordConfirmation.current.value
					)
				);
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
				<div className='bg-[#EEE2DE] md:p-12 p-6 rounded-[20px] shadow-2xl shadow-gray-900'>
					<div className='flex justify-center mb-4'>
						<FlutterDashOutlinedIcon
							className='text-[#d32f2f]'
							fontSize='large'
						/>
					</div>
					<div className='font-bold text-2xl'>
						<h1>CREATE YOUR ACCOUNT</h1>
					</div>
					<div className='mt-3'>
						<TextField
							id='email'
							label='Email'
							variant='outlined'
							size='small'
							fullWidth
							inputRef={_email}
						/>
					</div>
					<div className='mt-3'>
						<TextField
							id='username'
							label='Username'
							variant='outlined'
							size='small'
							fullWidth
							inputRef={_userName}
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
							onClick={onSubmitRegister}
							disabled={isDisabled}
						>
							Register
						</Button>
						<Backdrop
							sx={{
								color: '#fff',
								zIndex: (theme) => theme.zIndex.drawer + 1,
							}}
							open={dataRegister === null ? open : !open}
						>
							<CircularProgress color='inherit' />
						</Backdrop>
						<div className='text-xs underline pr-2'>
							<Link to='/login'>Login</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
