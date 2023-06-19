import Avatar from '@mui/material/Avatar';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditPostModal from '../../Components/Editpostmodal/editpostmodal';
import DeletePostModal from '../../Components/Deletepostmodal/deletepostmodal';
import Trending from '../../Components/Trending/trending';
import OutlinedCard from '../../Components/Wordoftheday/wod';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import CardComment from '../../Components/Cardcomment/cardcomment';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getDataLogin } from '../../Redux/Features/User/userSlice';
import axios from 'axios';
import UrlAPI from '../../Supports/Constant/urlAPI';
import { useParams } from 'react-router-dom';
import {
	onGetPostDetail,
	onLikePost,
} from '../../Redux/Features/Post/postSlice';
import { useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { onGetAllComment } from '../../Redux/Features/Post/postSlice';
import { onGetTotalLikePost } from '../../Redux/Features/Post/postSlice';

export default function SinglePostPage() {
	const params = useParams();
	const dispatch = useDispatch();
	const _comment = useRef();

	const userLogin = JSON.parse(localStorage?.getItem('userLogin'));
	const dataLogin = useSelector((state) => state.user.dataLogin);
	const postDetail = useSelector((state) => state.post.postDetail);
	const dataComment = useSelector((state) => state.post.dataAllComment);
	console.log(dataComment);
	// const dataTotalLike = useSelector((state) => state.post.totalLikePost);
	const [postLike, setPostLike] = useState([]);
	const [commentLength, setCommentLength] = useState('');
	const [visible, setVisible] = useState(5);

	let checkLike = [];

	useEffect(() => {
		dispatch(onGetPostDetail(params.id));
		dispatch(getDataLogin(userLogin));
		dispatch(onGetAllComment(params.id));
		dispatch(onGetTotalLikePost(params.id));
		getPostLike();
	}, []);

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

	// Create Comment
	const createComment = async () => {
		try {
			const result = await axios.post(
				`${UrlAPI}/posts/comment`,
				{
					postId: params.id,
					comment: _comment.current.value,
				},
				{
					headers: {
						authorization: `Bearer ${userLogin}`,
					},
				}
			);

			if (result) {
				toast.success('Create comment success!');
				_comment.current.value = '';
			}

			dispatch(onGetAllComment(params.id));
		} catch (error) {
			toast.error(error.message);
		}
	};

	// Like Post
	const likePost = async () => {
		try {
			const result = await axios.post(
				`${UrlAPI}/posts/like?postId=${params.id}`,
				{},
				{
					headers: {
						authorization: `Bearer ${userLogin}`,
					},
				}
			);

			dispatch(onGetTotalLikePost(params.id));
			dispatch(getDataLogin(userLogin));
			getPostLike();
		} catch (error) {
			console.log(error.message);
		}
	};

	// Unlike Post
	const unlikePost = async () => {
		try {
			const result = await axios.delete(
				`${UrlAPI}/posts/like?postId=${params.id}`,
				{
					headers: {
						authorization: `Bearer ${userLogin}`,
					},
				}
			);

			dispatch(onGetTotalLikePost(params.id));
			dispatch(getDataLogin(userLogin));
			getPostLike();
		} catch (error) {
			console.log(error.message);
		}
	};

	// See more comments
	const showMore = () => {
		setVisible((prevValue) => prevValue + 5);
	};

	return (
		<>
			<Toaster />
			<div className='mt-[-30px] pb-6'>
				<div className='flex justify-center md:ml-[105px] ml-[55px] md:mr-[30px] mr-[3px] mt-2 gap-10'>
					<div className='lg:w-[200px] lg:block hidden'>
						<Trending />
					</div>
					<div className='w-[90%] md:w-[50%] flex-col md:gap-6 ml-[-4px] md:ml-[0px]'>
						<div className='border-2 border-gray-200 p-5 rounded-lg mb-2'>
							<div className='px-6 py-3'>
								<div className='flex mr-3'>
									<div>
										<Avatar
											alt='profilePicture'
											sx={{ width: 50, height: 50 }}
											src={
												UrlAPI +
												'/profileImage/' +
												postDetail?.User?.profilePicture
											}
										/>
									</div>
									<div className='ml-4 w-full'>
										<h2 className='text-md font-bold'>
											{postDetail?.User?.userName}
										</h2>
										<div className='mt-2'>
											<p className='md:text-sm text-xs'>
												{postDetail?.caption}
											</p>
										</div>
										<div className='w-full mt-5'>
											<div className='flex justify-center '>
												{postDetail?.image ? (
													<img
														className='rounded-lg'
														alt='tweepImage'
														src={UrlAPI + '/postImage/' + postDetail?.image}
													/>
												) : (
													<div></div>
												)}
											</div>
										</div>
										<div className='mt-3 flex justify-between items-center'>
											<div className='md:flex items-center gap-5'>
												<div className='flex items-center gap-2'>
													{dataLogin?.like.map((value, index) => {
														if (value.postId == params.id) {
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

													<div>
														{postLike.map((value, index) => {
															if (value.postId == params.id) {
																return (
																	<p className='md:text-base text-sm font-bold'>
																		{value.total}
																	</p>
																);
															}
														})}
													</div>
												</div>
												<div>
													<p className='md:text-[12px] text-xs font-bold'>
														{postDetail?.created}
													</p>
												</div>
											</div>
											{dataLogin?.id == postDetail?.User?.id ? (
												<div className='flex'>
													<div className='mr-[-30px]'>
														<EditPostModal
															postId={postDetail?.id}
															userId={postDetail?.userId}
															status={postDetail?.User?.status}
															caption={postDetail?.caption}
															image={postDetail?.image}
														/>
													</div>
													<div className=''>
														<DeletePostModal
															postId={postDetail?.id}
															userId={postDetail?.userId}
															status={postDetail?.User?.status}
															caption={postDetail?.caption}
															image={postDetail?.image}
														/>
													</div>
												</div>
											) : (
												<div></div>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
						<div>
							<div>
								<TextField
									id='comment'
									label='Write your comment !'
									multiline
									maxRows={5}
									fullWidth
									inputRef={_comment}
									onChange={(e) => setCommentLength(e.target.value)}
								/>
							</div>
							<div className='flex items-center justify-end gap-4 mt-3'>
								<Button
									variant='contained'
									size='small'
									className='text-[10px] font-bold'
									disabled={
										dataLogin?.status === true && commentLength.length < 300
											? false
											: true
									}
									onClick={createComment}
									color='error'
								>
									Comment
								</Button>
							</div>
						</div>
						<div className='mt-3'>
							{dataComment?.data?.data.slice(0, visible).map((value, index) => {
								return (
									<CardComment
										key={index}
										commentId={value?.id}
										postId={value?.postId}
										comment={value?.comment}
										userId={value?.userId}
										profilePicture={value?.User?.profilePicture}
										userName={value?.User?.userName}
										status={value?.User?.status}
										created={value?.created}
										params={params.id}
									/>
								);
							})}
						</div>
						{visible < dataComment?.data?.data.length ? (
							<div className='flex justify-center font-bold'>
								<button onClick={showMore}>See More</button>
							</div>
						) : (
							<div></div>
						)}
					</div>
					<div className='lg:w-[200px] lg:mr-[1px] lg:block hidden'>
						<OutlinedCard />
					</div>
				</div>
			</div>
		</>
	);
}
