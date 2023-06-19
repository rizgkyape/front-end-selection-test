import * as React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { TextField } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import Button from '@mui/material/Button';
import Card from '../../Components/Card/card';
import Avatar from '@mui/material/Avatar';
import Trending from '../../Components/Trending/trending';
import OutlinedCard from '../../Components/Wordoftheday/wod';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDataLogin } from '../../Redux/Features/User/userSlice';
import UrlAPI from '../../Supports/Constant/urlAPI';
import axios from 'axios';
import { useState } from 'react';
import { onGetAllDataPost } from '../../Redux/Features/Post/postSlice';
import { useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Homepage() {
	// DATA LOGIN
	const dispatch = useDispatch();
	const dataLogin = useSelector((state) => state.user.dataLogin);
	const getAllDataPost = useSelector((state) => state.post.dataAllPost);
	const userLogin = JSON.parse(localStorage?.getItem('userLogin'));
	const [imagePreview, setImagePreview] = useState(null);
	const [limit, setLimit] = useState(0);
	const [post, setPost] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	const [captionLength, setCaptionLength] = useState('');
	console.log(post);

	const _caption = useRef();
	const _image = useRef();

	useEffect(() => {
		dispatch(getDataLogin(userLogin));
		getPost();
	}, []);

	// FUNCTION

	const previewFile = (e) => {
		try {
			const reader = new FileReader();
			const selectedFile = e.target.files[0];

			if (selectedFile) {
				reader.readAsDataURL(selectedFile);
			}

			reader.onload = (readerEvent) => {
				setImagePreview(readerEvent.target.result);
			};
		} catch (error) {
			toast.error(error.message);
		}
	};

	const onCreatePost = async () => {
		try {
			if (dataLogin?.status === false) {
				throw { message: 'Please activate your account!' };
			}

			const result = await axios.post(
				`${UrlAPI}/posts`,
				{
					caption: _caption.current.value,
					image: _image.current.files[0],
				},
				{
					headers: {
						authorization: `Bearer ${userLogin}`,
						'content-type': 'multipart/form-data',
					},
				}
			);

			dispatch(onGetAllDataPost());
			setImagePreview(null);

			_caption.current.value = '';
			_image.current.value = null;

			if (result) {
				toast.success('Post success!');
			}
		} catch (error) {
			if (error.response) {
				toast.error(error.response.data.message);
			} else {
				toast.error(error.message);
			}
		}
	};

	const getPost = async () => {
		try {
			dispatch(onGetAllDataPost());
			setPost(getAllDataPost);
		} catch (error) {
			console.log(error.message);
		}
	};

	const getMorePost = async () => {
		try {
			dispatch(onGetAllDataPost(limit + 2));
			setLimit(limit + 2);
			setPost(getAllDataPost);

			if (limit >= post.length) {
				setHasMore(false);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	// const getPost = async () => {
	// 	try {
	// 		const result = await axios.get(`${UrlAPI}/posts?limit=${limit}`);
	// 		setPost(result);
	// 	} catch (error) {
	// 		console.log(error.message);
	// 	}
	// };

	// const getMorePost = async () => {
	// 	try {
	// 		const result = await axios.get(`${UrlAPI}/posts?limit=${limit + 2}`);
	// 		setLimit(limit + 2);
	// 		setPost(result);
	// 	} catch (error) {
	// 		console.log(error.message);
	// 	}
	// };

	return (
		<>
			<Toaster />
			<div className='mt-[-20px] pb-6'>
				<div className='flex justify-center md:ml-[145px] ml-[85px] md:mr-24 mr-10'>
					<div className='mr-3'>
						<Avatar
							alt='profilePicture'
							src={
								dataLogin?.profilePicture
									? `${UrlAPI}/profileImage/${dataLogin?.profilePicture}`
									: 'https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg'
							}
							sx={{ width: 56, height: 56 }}
						/>
					</div>
					<div className='w-full'>
						<div>
							<TextField
								id='tweet'
								label='What is happening?!'
								multiline
								maxRows={7}
								fullWidth
								inputRef={_caption}
								onChange={(e) => setCaptionLength(e.target.value)}
							/>
						</div>
						<div className='flex justify-between items-center mt-3'>
							<div className='mt-[-7px]'>
								<label>
									<input
										className='hidden'
										type='file'
										ref={_image}
										onChange={previewFile}
									/>
									<ImageIcon />
								</label>
							</div>
							<div
								className={`${
									!imagePreview ? 'hidden' : 'block'
								} mt-3 w-[300px] border-grey-300 rounded-[20px] object-fill flex justify-center`}
							>
								<img
									src={
										!imagePreview
											? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
											: imagePreview
									}
									className='rounded-[20px] border-2'
								/>
							</div>
							<div className='flex items-center justify-center gap-4'>
								<Button
									variant='contained'
									size='small'
									className='text-[10px] font-bold'
									color='error'
									onClick={onCreatePost}
									disabled={
										dataLogin?.status === true && captionLength.length < 300
											? false
											: true
									}
								>
									Tweeps
								</Button>
							</div>
						</div>
					</div>
				</div>
				<div className='flex justify-center md:ml-[105px] ml-[55px] md:mr-[30px] mr-[3px] mt-10 gap-10'>
					<div className='lg:w-[200px] lg:block hidden'>
						<Trending />
					</div>
					<div className='w-[80%] md:w-[50%] flex-col md:gap-6'>
						<InfiniteScroll
							dataLength={post?.length}
							next={getMorePost}
							hasMore={hasMore}
							style={{ overflow: 'hidden' }}
						>
							{getAllDataPost?.map((value, index) => {
								return (
									<Card
										key={index}
										postId={value?.id}
										image={value?.image}
										caption={value?.caption}
										created={value?.created}
										userId={value?.userId}
										profilePicture={value?.User?.profilePicture}
										userName={value?.User?.userName}
										status={value?.User?.status}
										dataLogin={dataLogin?.id}
									/>
								);
							})}
						</InfiniteScroll>
					</div>
					<div className='lg:w-[200px] lg:block hidden'>
						<OutlinedCard />
					</div>
				</div>
			</div>
		</>
	);
}
