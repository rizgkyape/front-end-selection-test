import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '../../Components/Card/card';
import Trending from '../../Components/Trending/trending';
import OutlinedCard from '../../Components/Wordoftheday/wod';
import EditProfilModal from '../../Components/Editprofilemodal/editprofilemodal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDataLogin } from '../../Redux/Features/User/userSlice';
import UrlAPI from '../../Supports/Constant/urlAPI';
import toast, { Toaster } from 'react-hot-toast';
import { onGetUserPost } from '../../Redux/Features/Post/postSlice';
import { onGetTotalLikePost } from '../../Redux/Features/Post/postSlice';

export default function ProfilePage() {
	const dispatch = useDispatch();
	const dataLogin = useSelector((state) => state.user.dataLogin);
	const dataPostUser = useSelector((state) => state.post.dataPostUser);
	const userLogin = JSON.parse(localStorage?.getItem('userLogin'));
	

	useEffect(() => {
		dispatch(getDataLogin(userLogin));
		dispatch(onGetUserPost(userLogin));
	}, []);

	return (
		<>
			<Toaster />
			<div className='mt-[-20px] pb-6'>
				<div className='flex justify-center items-center md:ml-[105px] ml-[85px] md:mr-8 mr-10 '>
					<div className='w-full md:flex justify-between items-center p-10 border-[1px] border-gray-200 rounded-lg'>
						<div className='flex justify-center'>
							<Avatar
								alt='profilePicture'
								src={
									dataLogin?.profilePicture
										? `${UrlAPI}/profileImage/${dataLogin?.profilePicture}`
										: 'https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg'
								}
								sx={{ width: 130, height: 130 }}
								className='border-4 border-black'
							/>
						</div>
						<div className='w-full flex md:justify-start md:ml-20 mt-6'>
							<div className=''>
								<div className='font-bold'>
									<h1>{dataLogin ? dataLogin?.userName : null}</h1>
								</div>
								<div>
									<h2>
										{dataLogin && dataLogin?.fullName === undefined
											? ''
											: dataLogin?.fullName}
									</h2>
								</div>
								<div>
									<h2>
										{dataLogin && dataLogin?.bio === undefined
											? ''
											: dataLogin?.bio}
									</h2>
								</div>
								<div>
									<h2>
										{dataLogin && dataLogin?.email === undefined
											? ''
											: dataLogin?.email}
									</h2>
								</div>
							</div>
						</div>
						<div className='mt-6 md:mt-0'>
							<EditProfilModal
								name={dataLogin?.fullName}
								userName={dataLogin?.userName}
								bio={dataLogin?.bio}
								profilePicture={dataLogin?.profilePicture}
							/>
						</div>
					</div>
				</div>
				<div className='flex justify-center md:ml-[105px] ml-[55px] md:mr-[30px] mr-[3px] mt-2 gap-10'>
					<div className='lg:w-[200px] lg:block hidden'>
						<Trending />
					</div>
					<div className='w-[80%] md:w-[50%] flex-col md:gap-6 ml-[-4px] md:ml-[0px]'>
						{dataPostUser?.data?.data.map((value, index) => {
							return (
								<Card
									key={index}
									postId={value.id}
									image={value.image}
									caption={value.caption}
									created={value.created}
									userId={value.userId}
									profilePicture={value.User?.profilePicture}
									userName={value.User?.userName}
									status={value.User?.status}
									dataLogin={''}
								/>
							);
						})}
					</div>
					<div className='lg:w-[200px] lg:mr-[1px] lg:block hidden'>
						<OutlinedCard />
					</div>
				</div>
			</div>
		</>
	);
}
