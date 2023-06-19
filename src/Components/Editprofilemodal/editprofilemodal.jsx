import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import { useRef } from 'react';
import { onEditProfile } from '../../Redux/Features/User/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDataLogin } from '../../Redux/Features/User/userSlice';
import UrlAPI from '../../Supports/Constant/urlAPI';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

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

export default function EditProfilModal() {
	const [imagePreview, setImagePreview] = useState(null);
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
		setImagePreview(null);
	};

	// Data Login
	const dispatch = useDispatch();
	const dataLogin = useSelector((state) => state.user.dataLogin);
	const userLogin = JSON.parse(localStorage?.getItem('userLogin'));

	useEffect(() => {
		dispatch(getDataLogin(userLogin));
	}, []);

	// REF
	const _fullName = useRef();
	const _userName = useRef();
	const _bio = useRef();
	const _profilePicture = useRef();

	// Function
	const onSumbitEdit = () => {
		try {
			dispatch(
				onEditProfile(
					_fullName.current.value,
					_userName.current.value,
					_bio.current.value,
					_profilePicture.current.files[0],
					userLogin
				)
			);

			handleClose();

			_fullName.current.value = '';
			_userName.current.value = '';
			_bio.current.value = '';

			dispatch(getDataLogin(userLogin));
		} catch (error) {
			toast.error(error.message);
		}
	};

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

	return (
		<div>
			<Toaster />
			<Button
				variant='contained'
				color='error'
				size='small'
				onClick={handleOpen}
				disabled={dataLogin?.status === true ? false : true}
			>
				Edit
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
							<h1>Edit Profile</h1>
						</div>
						<div className='mb-2'>
							<TextField
								defaultValue={dataLogin?.fullName}
								id='fullName'
								label='Name'
								variant='outlined'
								size='small'
								fullWidth
								className='mb-3'
								inputRef={_fullName}
							/>
						</div>
						<div className='mb-2'>
							<TextField
								defaultValue={dataLogin?.userName}
								id='userName'
								label='Username'
								variant='outlined'
								size='small'
								fullWidth
								inputRef={_userName}
							/>
						</div>
						<div className='mb-2'>
							<TextField
								defaultValue={dataLogin?.bio}
								id='bio'
								label='Bio'
								variant='outlined'
								size='small'
								fullWidth
								inputRef={_bio}
							/>
						</div>
						<div className='mt-3'>
							<label>
								<input
									className='hidden'
									type='file'
									ref={_profilePicture}
									onChange={previewFile}
								/>
								<ImageIcon />
							</label>
						</div>
						<div className='mt-3'>
							<img
								src={
									!imagePreview
										? dataLogin?.profilePicture
											? UrlAPI + '/profileImage/' + dataLogin?.profilePicture
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
								onClick={onSumbitEdit}
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
