import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const bull = (
	<Box component='span' sx={{ mx: '2px', transform: 'scale(0.8)' }}>
		•
	</Box>
);

const card = (
	<React.Fragment>
		<CardContent>
			<Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
				Word of the Day
			</Typography>
			<Typography variant='h5' component='div'>
				be{bull}nev{bull}o{bull}lent
			</Typography>
			<Typography sx={{ mb: 1.5 }} color='text.secondary'>
				adjective
			</Typography>
			<Typography variant='body2'>
				well meaning and kindly.
				<br />
				{'"a benevolent smile"'}
			</Typography>
		</CardContent>
		<CardActions>
			<Button
				size='small'
				component={Link}
				to='https://www.google.com/search?q=benevolent&rlz=1C1CHWL_enID949ID949&oq=benevol&aqs=chrome.1.69i57j0i512l9.3039j1j7&sourceid=chrome&ie=UTF-8'
			>
				Learn More
			</Button>
		</CardActions>
	</React.Fragment>
);

export default function OutlinedCard() {
	return (
		<Box sx={{ minWidth: 100 }}>
			<Card variant='outlined'>{card}</Card>
		</Box>
	);
}
