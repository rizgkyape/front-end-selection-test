import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import SendIcon from '@mui/icons-material/Send';
import { TextField } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 700,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export default function CreatePostModal() {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div>
			<Button onClick={handleOpen}>
				<SendIcon className='text-gray-500' />
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
							<h1>Create Post</h1>
						</div>
						<div className='mb-2'>
							<TextField
								id='caption'
								label='Caption'
								variant='outlined'
								multiline
								maxRows={5}
								fullWidth
							/>
						</div>
						<div className='mt-3'>
							<label for='postImage'>Post Image :</label>
							<input className='hidden' id='postImage' type='file' />
							<ImageIcon className='ml-2' />
						</div>
						<div className='mt-3'>
							<Button variant='contained' color='error' size='small'>
								Tweeps
							</Button>
						</div>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}
