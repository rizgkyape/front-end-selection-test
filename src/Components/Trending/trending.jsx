import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Trending() {
	return (
		<div>
			<div className='font-bold text-lg mb-2 flex justify-center'>
				<h1>Trending Topics</h1>
			</div>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='panel1a-content'
					id='panel1a-header'
				>
					<Typography>Argentina</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>Argentina vs Indonesia</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='panel1a-content'
					id='panel1a-header'
				>
					<Typography>Valorant</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>New act starts soon.</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='panel1a-content'
					id='panel1a-header'
				>
					<Typography>Indonesia Open</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>Indonesian players aim for gold medals.</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='panel1a-content'
					id='panel1a-header'
				>
					<Typography>Coldplay</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>Coldplay will come to Indonesia in November</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='panel1a-content'
					id='panel1a-header'
				>
					<Typography>BMTH</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Bring me the horizon will come to Indonesia in November
					</Typography>
				</AccordionDetails>
			</Accordion>
		</div>
	);
}
