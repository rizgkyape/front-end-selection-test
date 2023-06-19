import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import FlutterDashOutlinedIcon from '@mui/icons-material/FlutterDashOutlined';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getDataLogin } from '../../Redux/Features/User/userSlice';
import UrlAPI from '../../Supports/Constant/urlAPI';
import axios from 'axios';

const items = ['Home', 'Profile', 'Tweeps', 'Logout'];

const drawerWidth = 180;

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme),
	}),
}));

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

export default function MiniDrawer() {
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const navigate = useNavigate();

	const [openModal, setOpenModal] = React.useState(false);

	const handleOpen = () => {
		setOpenModal(true);
		setOpen(true);
	};
	const handleClose = () => {
		setOpenModal(false);
		setOpen(false);
	};

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	// DATA LOGIN
	const dispatch = useDispatch();
	const dataLogin = useSelector((state) => state.user.dataLogin);
	const userLogin = JSON.parse(localStorage?.getItem('userLogin'));

	useEffect(() => {
		dispatch(getDataLogin(userLogin));
	}, []);

	// FUNCTION LOGOUT
	const onLogout = async () => {
		try {
			const userLogin = localStorage.getItem('userLogin');

			if (userLogin) {
				localStorage.removeItem('userLogin');
			}

			toast.success('Logout success!');

			setTimeout(() => {
				return navigate('/login');
			}, 500);
		} catch (error) {
			if (error.response) {
				toast.error(error.response.data.message);
			} else {
				toast.error(error.message);
			}
		}
	};

	// FUNCTION RESENDING VERIFICATION
	const resendingVerification = async () => {
		try {
			const result = await axios.patch(
				`${UrlAPI}/auth/resendingverification`,
				{},
				{
					headers: {
						authorization: `Bearer ${userLogin}`,
					},
				}
			);

			if (result) {
				toast.success(
					'Resending verification link success ! please check your email'
				);
			}

			localStorage.removeItem('userLogin');
			
			setTimeout(() => {
				navigate('/login');
			}, 500);
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<>
			<Toaster />
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<AppBar position='fixed' open={open}>
					<Toolbar className='bg-[#2B2A4C]'>
						<IconButton
							color='inherit'
							aria-label='open drawer'
							onClick={handleDrawerOpen}
							edge='start'
							sx={{
								marginRight: 5,
								...(open && { display: 'none' }),
							}}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant='h6' noWrap component='div'>
							MonkeType
						</Typography>
					</Toolbar>
				</AppBar>
				<Drawer variant='permanent' open={open}>
					<DrawerHeader className='bg-[#EEE2DE]'>
						<div className='flex justify-start pl-3 w-full text-lg'>
							<FlutterDashOutlinedIcon />
						</div>
						<IconButton onClick={handleDrawerClose}>
							{theme.direction === 'rtl' ? (
								<ChevronRightIcon />
							) : (
								<ChevronLeftIcon />
							)}
						</IconButton>
					</DrawerHeader>
					<Divider />
					<List>
						{/* HOME BUTTON */}
						<ListItem
							key={items[0]}
							disablePadding
							sx={{ display: 'block' }}
							component={Link}
							to='/home'
							onClick={handleDrawerClose}
						>
							<ListItemButton
								sx={{
									minHeight: 48,
									justifyContent: open ? 'initial' : 'center',
									px: 2.5,
								}}
							>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: open ? 3 : 'auto',
										justifyContent: 'center',
									}}
								>
									<HomeIcon />
								</ListItemIcon>
								<ListItemText
									primary={items[0]}
									sx={{ opacity: open ? 1 : 0 }}
								/>
							</ListItemButton>
						</ListItem>

						{/* PROFILE BUTTON */}
						<ListItem
							key={items[1]}
							disablePadding
							sx={{ display: 'block' }}
							component={Link}
							to='/profilepage'
							onClick={handleDrawerClose}
						>
							<ListItemButton
								sx={{
									minHeight: 48,
									justifyContent: open ? 'initial' : 'center',
									px: 2.5,
								}}
							>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: open ? 3 : 'auto',
										justifyContent: 'center',
									}}
								>
									<AccountCircleIcon />
								</ListItemIcon>
								<ListItemText
									primary={items[1]}
									sx={{ opacity: open ? 1 : 0 }}
								/>
							</ListItemButton>
						</ListItem>

						{/* LOGOUT */}
						<ListItem
							key={items[3]}
							disablePadding
							sx={{ display: 'block' }}
							onClick={onLogout}
						>
							<ListItemButton
								sx={{
									minHeight: 48,
									justifyContent: open ? 'initial' : 'center',
									px: 2.5,
								}}
							>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: open ? 3 : 'auto',
										justifyContent: 'center',
									}}
								>
									<LogoutIcon />
								</ListItemIcon>
								<ListItemText
									primary={items[3]}
									sx={{ opacity: open ? 1 : 0 }}
								/>
							</ListItemButton>
						</ListItem>
					</List>
					<Divider />
				</Drawer>
				<Box component='main' sx={{ flexGrow: 1, p: 3 }}>
					<DrawerHeader />
					{dataLogin && dataLogin?.status === false ? (
						<div className='flex justify-center w-screen bg-amber-300 mt-[-25px] ml-[-25px] mb-3'>
							<button onClick={resendingVerification}>
								<div className='ml-[-40px] text-xs font-bold'>
									Click here to activate your account
								</div>
							</button>
						</div>
					) : (
						<div></div>
					)}
				</Box>
			</Box>
		</>
	);
}
