import React, {Component} from 'react';
import VerticalLinearStepper from './VerticalLinearStepper';
import AlignItemsList from './AlignItemsList'
import './Help.scss';
import Paper from '@material-ui/core/Paper';

class Help extends Component {
	render() {
		return (
			<div>
				<div className="displayFlex">
					<Paper>
						<VerticalLinearStepper/>
					</Paper>
					<Paper>
						<AlignItemsList/>
					</Paper>
				</div>
				<p className="center">copyright {new Date().getFullYear()} | All right reserved</p>
			</div>
		);
	}
}

export default Help;
