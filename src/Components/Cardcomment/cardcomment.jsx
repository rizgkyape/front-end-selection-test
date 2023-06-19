import { Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UrlAPI from '../../Supports/Constant/urlAPI';
import EditCommentModal from '../Editcommentmodal/editcommentmodal';
import DeleteCommentModal from '../Deletecommentmodal/deletecomment';
import { getDataLogin } from '../../Redux/Features/User/userSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onGetAllComment } from '../../Redux/Features/Post/postSlice';

export default function CardComment(props) {
	const dispatch = useDispatch();
	const dataLogin = useSelector((state) => state.user.dataLogin);
	const dataComment = useSelector((state) => state.post.dataAllComment);
	const userLogin = JSON.parse(localStorage?.getItem('userLogin'));

	useEffect(() => {
		dispatch(getDataLogin(userLogin));
		dispatch(onGetAllComment(props.params));
	}, []);

	return (
		<>
			<div className='border-2 border-gray-200 p-8 rounded-lg mb-2'>
				<div className='flex mr-3'>
					<div>
						<Avatar
							alt='profilePicture'
							sx={{ width: 50, height: 50 }}
							src={
								props.profilePicture
									? `${UrlAPI}/profileImage/${props.profilePicture}`
									: 'https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg'
							}
						/>
					</div>
					<div className='ml-4'>
						<h2 className='text-md font-bold'>{props.userName}</h2>
						<div className='mt-2'>
							<p className='md:text-sm text-xs'>{props.comment}</p>
						</div>
					</div>
				</div>
				<div className='flex justify-between items-center w-full mt-10'>
					<div className='md:text-xs text-[10px] font-bold mr-2 w-full'>
						<p>{props.created}</p>
					</div>
					{dataLogin?.id == props.userId ? (
						<div className='w-full flex justify-end mb-2'>
							<div className=''>
								<EditCommentModal
									commentId={props.commentId}
									postId={props.postId}
									comment={props.comment}
									userId={props.userId}
									profilePicture={props.profilePicture}
									userName={props.userName}
									status={props.status}
									created={props.created}
									params={props.params}
								/>
							</div>
							<div>
								<DeleteCommentModal
									commentId={props.commentId}
									postId={props.postId}
									comment={props.comment}
									userId={props.userId}
									profilePicture={props.profilePicture}
									userName={props.userName}
									status={props.status}
									created={props.created}
									params={props.params}
								/>
							</div>
						</div>
					) : (
						<div></div>
					)}
				</div>
			</div>
		</>
	);
}
