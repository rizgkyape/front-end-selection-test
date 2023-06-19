import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import EditIcon from '@mui/icons-material/Edit';
import { TextField } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import { useRef } from 'react';
import { useState } from 'react';
import UrlAPI from '../../Supports/Constant/urlAPI';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import {
	onGetAllDataPost,
	onGetUserPost,
} from '../../Redux/Features/Post/postSlice';
import { useDispatch } from 'react-redux';
import { onGetPostDetail } from '../../Redux/Features/Post/postSlice';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 500,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

const userLogin = JSON.parse(localStorage?.getItem('userLogin'));

export default function EditPostModal(props) {
	const [imagePreview, setImagePreview] = useState(null);
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
		setImagePreview(null);
	};
	const dispatch = useDispatch();

	// REF
	const _caption = useRef();
	const _image = useRef();

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

	const onEditPost = async () => {
		try {
			const result = await axios.patch(
				`${UrlAPI}/posts/edit/${props.postId}`,
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

			handleClose();

			_caption.current.value = '';
			dispatch(onGetAllDataPost());
			dispatch(onGetUserPost(userLogin));
			dispatch(onGetPostDetail(props.postId));
			console.log('masukkkkk');
			if (result) {
				toast.success('Edit post success!');
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
				open={open}
				onClose={handleClose}
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
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
							<h1>Edit Post</h1>
						</div>
						<div className='mb-2'>
							<TextField
								defaultValue={props.caption}
								id='caption'
								label='Caption'
								variant='outlined'
								multiline
								maxRows={5}
								fullWidth
								inputRef={_caption}
							/>
						</div>
						<div className='mt-3'>
							<label for='postImage'>
								<input
									className='hidden'
									id='postImage'
									type='file'
									ref={_image}
									onChange={previewFile}
								/>
								<ImageIcon className='ml-2' />
							</label>
						</div>
						<div className='mt-3'>
							<img
								src={
									!imagePreview
										? props.image
											? UrlAPI + '/postImage/' + props.image
											: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
										: imagePreview
								}
							/>
						</div>
						<div className='mt-3'>
							<Button
								variant='contained'
								color='error'
								size='small'
								onClick={onEditPost}
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
