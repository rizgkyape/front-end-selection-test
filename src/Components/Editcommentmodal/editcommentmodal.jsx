import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { TextField } from '@mui/material';
import { useRef } from 'react';
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

export default function EditCommentModal(props) {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const dispatch = useDispatch();
	const _comment = useRef();

	const userLogin = JSON.parse(localStorage?.getItem('userLogin'));

	// FUNCTION
	const onEditComment = async (req, res) => {
		try {
			if (!_comment.current.value) {
				throw { message: 'Please fill out the form!' };
			}

			const result = await axios.patch(
				`${UrlAPI}/posts/comment/edit?postId=${props.postId}&commentId=${props.commentId}`,
				{
					comment: _comment.current.value,
				},
				{
					headers: {
						authorization: `Bearer ${userLogin}`,
					},
				}
			);

			handleClose();
			_comment.current.value = '';
			dispatch(onGetAllComment(props.params));
      
			if (result) {
				return toast.success('Edit comment success!');
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
				<EditIcon className='text-black' sx={{ width: 15, height: 15 }} />
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
							<h1>Edit Comment</h1>
						</div>
						<div className='mb-2'>
							<TextField
								defaultValue={props.comment}
								id='caption'
								label='Caption'
								variant='outlined'
								multiline
								maxRows={5}
								fullWidth
								inputRef={_comment}
							/>
						</div>
						<div className='mt-3'>
							<Button
								variant='contained'
								color='error'
								size='small'
								onClick={onEditComment}
							>
								Edit
							</Button>
						</div>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}
