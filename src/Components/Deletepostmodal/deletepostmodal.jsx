import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import UrlAPI from '../../Supports/Constant/urlAPI';
import toast, { Toaster } from 'react-hot-toast';
import { onGetAllDataPost } from '../../Redux/Features/Post/postSlice';
import { useDispatch } from 'react-redux';
import { onGetUserPost } from '../../Redux/Features/Post/postSlice';

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

export default function DeletePostModal(props) {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const dispatch = useDispatch();

	const userLogin = JSON.parse(localStorage?.getItem('userLogin'));

	// FUNCTION
	const onDeletePost = async () => {
		try {
			const result = await axios.delete(
				`${UrlAPI}/posts/delete/${props.postId}`,
				{
					headers: {
						authorization: `Bearer ${userLogin}`,
					},
				}
			);

			dispatch(onGetAllDataPost());
			dispatch(onGetUserPost(userLogin));

			handleClose();

			if (result) {
				toast.success('Delete post success!');
			}
		} catch (error) {
			if (error.response) {
				toast.error(error.response.data.message);
			} else {
				toast.error(error.message);
			}
		}
	};

	return (
		<div>
			<Button onClick={handleOpen}>
				<DeleteIcon className='text-black' sx={{ width: 15, height: 15 }}/>
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
						<div>Are you sure you want to delete this post?</div>
						<div className='mt-3'>
							<Button
								variant='contained'
								color='error'
								size='small'
								onClick={onDeletePost}
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
