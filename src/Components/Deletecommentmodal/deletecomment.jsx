import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import UrlAPI from '../../Supports/Constant/urlAPI';
import toast, { Toaster } from 'react-hot-toast';
import { onGetAllComment } from '../../Redux/Features/Post/postSlice';
import { useDispatch } from 'react-redux';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export default function DeleteCommentModal(props) {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const dispatch = useDispatch();

	const userLogin = JSON.parse(localStorage?.getItem('userLogin'));

	// FUNCTION
	const onDeleteComment = async (req, res) => {
		try {
			const result = await axios.delete(
				`${UrlAPI}/posts/comment/delete?postId=${props.postId}&commentId=${props.commentId}`,
				{
					headers: {
						authorization: `Bearer ${userLogin}`,
					},
				}
			);

			handleClose();
			dispatch(onGetAllComment(props.params));

			if (result) {
				return toast.success('Delete comment success!');
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<div>
			<Button onClick={handleOpen}>
				<DeleteIcon className='text-black' sx={{ width: 15, height: 15 }} />
			</Button>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				open={open}
				onClose={handleClose}
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
				slotProps={{
					backdrop: {
						timeout: 500,
					},
				}}
			>
				<Fade in={open}>
					<Box sx={style}>
						<div className='mb-2 font-bold'>
							<h1>Are you sure you want to delete this post?</h1>
						</div>
						<div className='mt-3'>
							<Button
								variant='contained'
								color='error'
								size='small'
								onClick={onDeleteComment}
							>
								Delete
							</Button>
						</div>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}
