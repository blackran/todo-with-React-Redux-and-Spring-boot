import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import ListAlt from '@material-ui/icons/ListAlt';
import HelpIcon from '@material-ui/icons/Help';
import Typography from '@material-ui/core/Typography';
import PowerOff from '@material-ui/icons/PowerOff';

import TextFields from './Components/TextFields.js';
import Help from './Components/Help';
// import FormDialog from './Components/FormDialog';
import Clients from './Components/Clients';

function TabContainer(props) {
	return (<Typography component="div" style={{
			padding: 8 * 3
		}}>
		{props.children}
	</Typography>);
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired
};

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		width: '100%',
		backgroundColor: theme.palette.background.paper
	}
}));

function ScrollableTabsButtonForce(props) {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	function handleChange(event, newValue) {
		setValue(newValue);
	}

	return (<div className={classes.root}>
		<AppBar position="static" color="default">
			<Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="on" indicatorColor="primary" textColor="primary">
				<Tab label="Add Todo" icon={<ListAlt />}/>
				<Tab label="Settings" icon={<PersonPinIcon />}/>
				<Tab label="Help" icon={<HelpIcon />}/>
				<Tab label="Quitter" icon={<PowerOff />}/>
			</Tabs>
		</AppBar>
		{value === 0 && <TabContainer><TextFields/></TabContainer>}
		{value === 1 && <TabContainer><Clients/></TabContainer>}
		{value === 2 && <TabContainer><Help/></TabContainer>}
		{value === 3 && <TabContainer>t{ props.history.push("/") }</TabContainer>}
	</div>);
}

export default ScrollableTabsButtonForce;
