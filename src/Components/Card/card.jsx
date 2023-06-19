import Avatar from '@mui/material/Avatar';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditPostModal from '../Editpostmodal/editpostmodal';
import DeletePostModal from '../Deletepostmodal/deletepostmodal';
import UrlAPI from '../../Supports/Constant/urlAPI';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { onGetTotalLikePost } from '../../Redux/Features/Post/postSlice';
import axios from 'axios';
import { getDataLogin } from '../../Redux/Features/User/userSlice';

export default function Card(props) {
	// console.log(props);
	const dispatch = useDispatch();
	const dataLogin = useSelector((state) => state.user.dataLogin);
	console.log(dataLogin)
	const userLogin = JSON.parse(localStorage?.getItem('userLogin'));
	// console.log(dataLogin);
	const [postLike, setPostLike] = useState([]);
	let checkLike = [];

	// FUNCTION

	// get Like post
	const getPostLike = async () => {
		try {
			const result = await axios.get(`${UrlAPI}/posts/like`);
			setPostLike(result?.data?.data);
		} catch (error) {
			console.log(error.message);
		}
	};

	// Like Post
	const likePost = async () => {
		try {
			const result = await axios.post(
				`${UrlAPI}/posts/like?postId=${props.postId}`,
				{},
				{
					headers: {
						authorization: `Bearer ${userLogin}`,
					},
				}
			);

			dispatch(onGetTotalLikePost(props.postId));
			dispatch(getDataLogin(userLogin));
			getPostLike();
		} catch (error) {
			console.log(error.message);
		}
	};

	// Dislike Post
	const unlikePost = async () => {
		try {
			const result = await axios.delete(
				`${UrlAPI}/posts/like?postId=${props.postId}`,
				{
					headers: {
						authorization: `Bearer ${userLogin}`,
					},
				}
			);

			dispatch(onGetTotalLikePost(props.postId));
			dispatch(getDataLogin(userLogin));
			getPostLike();
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		dispatch(onGetTotalLikePost(props.postId));
		dispatch(getDataLogin(userLogin));
		getPostLike();
	}, []);

	return (
		<>
			<div className='border-2 border-gray-200 p-5 rounded-lg mb-2'>
				<div className='px-6 py-3'>
					<div className='flex mr-3'>
						<div>
							<Avatar
								alt='profilePicture'
								src={UrlAPI + '/profileImage/' + props.profilePicture}
							/>
						</div>
						<div className='ml-4 w-full'>
							<Link to={`/post/${props.postId}`}>
								<h2 className='text-md font-bold'>{props.userName}</h2>
								<div className='mt-2'>
									<p className='md:text-sm text-xs'>{props.caption}</p>
								</div>
								<div className='w-full mt-5'>
									<div className='flex justify-center '>
										{props.image ? (
											<img
												className='object-contain rounded-lg object-cover'
												alt='tweepImage'
												src={UrlAPI + '/postImage/' + props.image}
											/>
										) : (
											<div></div>
										)}
									</div>
								</div>
							</Link>
							<div className='mt-2 flex justify-between items-center w-full'>
								<div className='md:flex items-center gap-5 w-full'>
									<div className='md:flex items-center gap-2 w-full'>
										{dataLogin?.like.map((value, index) => {
											if (value.postId == props.postId) {
												checkLike.push(true);
											} else {
												checkLike.push(false);
											}
										})}
										{checkLike.includes(true) ? (
											<div className='mt-[-4px]'>
												<button onClick={unlikePost}>
													<FavoriteIcon className='text-rose-600' />
												</button>
											</div>
										) : (
											<div className='mt-[-4px]'>
												<button onClick={likePost}>
													<FavoriteBorderIcon />
												</button>
											</div>
										)}
										{(checkLike = [])}

										<div className='md:text-xs'>
											{postLike.map((value, index) => {
												if (value.postId == props.postId) {
													return (
														<p className='md:text-base text-sm font-bold'>
															{value.total}
														</p>
													);
												}
											})}
										</div>
										<div>
											<p className='md:text-[12px] text-xs font-bold'>
												{props.created}
											</p>
										</div>
									</div>
									{props.dataLogin == '' || props.dataLogin == props.userId ? (
										<div className='flex'>
											<div className='mr-[-30px]'>
												<EditPostModal
													postId={props.postId}
													userId={props.userId}
													status={props.status}
													caption={props.caption}
													image={props.image}
												/>
											</div>
											<div className=''>
												<DeletePostModal
													postId={props.postId}
													userId={props.userId}
													status={props.status}
												/>
											</div>
										</div>
									) : null}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
