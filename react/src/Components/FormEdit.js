import React, {Component} from 'react';

class FormEdit extends Component {
	constructor(props){
		super(props);
	}
	render() {
		return (
			<form
				styles={{
					display: 'flex',
					flexWrap: 'wrap'
				}} noValidate="noValidate" autoComplete="off"
				this.props.submit={() => this.OnSubmitToUpdateTask.bind(this)}
			>
				<TextField id="standard-with-placeholder" styles={{
						width: 2000,
					}} margin="normal"
					value={this.props.mocks}
					onChange={this.props.change}
					className="textfield"
				/>
			</form>
		);
	}
}

export default FormEdit;
