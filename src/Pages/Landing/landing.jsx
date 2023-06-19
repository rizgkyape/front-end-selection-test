import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function Landing() {
	return (
		<>
			<div
				style={{
					backgroundImage:
						'url(https://images.pexels.com/photos/7292818/pexels-photo-7292818.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
				}}
				className='w-full h-screen bg-cover flex md:justify-center md:items-center md:flex-row flex-col justify-center items-center md:text-left text-center gap-[30px] p-10'
			>
				<div className='text-[#d32f2f]'>
					<h1 className='font-bold text-[60px] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]'>
						MonkeType
					</h1>
					<div className='text-2xl font-bold'>
						Set yourself free and connect with people in your life.
					</div>
				</div>
				<div>
					<div className='bg-[#2B2A4C] text-[#EEE2DE] w-[320px] p-8 flex items-center justify-center rounded-[20px] shadow-2xl shadow-gray-900 border-[1px] border-black'>
						<div>
							<div className='mb-4 flex items-center'>
								<h1 className='text-xl text-center'>
									LOGIN with you MonkeType account
								</h1>
							</div>
							<div className='flex justify-center mb-4 border-y-[1px] p-4'>
								<Link to='/login'>
									<Button variant='contained' size='large' color='error'>
										LOGIN
									</Button>
								</Link>
							</div>
							<div className='flex justify-center gap-2 text-[12px]'>
								<p>New to MonkeType ?</p>
								<Link to='/register' className='underline'>
									Sign up now
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
