import { Button } from '@mui/material';
import axios from 'axios';
import UrlAPI from '../../Supports/Constant/urlAPI';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { onLogin } from '../../Redux/Features/User/userSlice';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Verification() {
	const params = useParams();
	const navigate = useNavigate();
	const [token, setToken] = useState([]);
	console.log(token);
	let checkToken = [];

	const onVerify = async () => {
		try {
			const result = await axios.patch(
				`${UrlAPI}/auth/verification`,
				{},
				{
					headers: {
						authorization: `Bearer ${params.token}`,
					},
				}
			);

			if (result) {
				toast.success(
					'Your account has been successfully activated, please login!'
				);
			}
			setTimeout(() => {
				navigate('/login');
			}, 1000);
		} catch (error) {
			if (error.response) {
				toast.error(error.response.data.message);
			} else {
				toast.error(error.message);
			}
		}
	};

	const getToken = async () => {
		try {
			const result = await axios.get(`${UrlAPI}/auth/token`);
			setToken(result?.data?.data);
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		getToken();
	}, []);

	return (
		<>
			<Toaster />
			{token?.map((value, index) => {
				if (value.token === params.token) {
					checkToken.push(true);
				} else {
					checkToken.push(false);
				}
			})}
			{checkToken.includes(true) ? (
				<div className='flex justify-center items-center h-screen bg-[#EEE2DE]'>
					<div className='px-20'>
						<div className='font-bold text-[42px]'>
							<h1>PLEASE ACTIVATE YOUR ACCOUNT</h1>
						</div>
						<div className='mt-2'>
							Meanwhile we'd love to have you get started right now, we still
							need you to verify your email. Once you've done activate your
							account, you can access all features!
						</div>
						<div className='mt-4'>
							<Button variant='contained' color='error' onClick={onVerify}>
								Click To Activate Your Account
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
