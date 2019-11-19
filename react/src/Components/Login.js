import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Paper} from '@material-ui/core';
import './Login.scss';
import {connect} from 'react-redux';
import axios from 'axios';
import FormDialog from './FormDialog2';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pseudo: "",
			password: "",
			error: false
		}
	}

	componentDidMount() {
		if (this.props.clients.dataClients.length === 0) {
			axios.get("http://localhost:8080/clients/all").then(res => res.data).then(state => this.props.fetchClients(state)).catch(err => console.log("error parsing:\n", err));
		}
	}

	OnSubmitLogin = (e) => {
		e.preventDefault();
		if(this.props.clients.dataClients.length !== 0){
			const stock = this.props.clients.dataClients.filter(h => {
				return h.pseudo === e.target.pseudo.value && h.password === e.target.password.value;
			});
			const bool = e.target.pseudo.value && e.target.password.value && (stock.length > 0)
			if (bool) {
				this.props.history.push('/Task');
				this.props.saveNumCli(stock);
			}else{
				this.setState({error: true})
			}
		}
	}

	OnChangeLoginInput(e){
		this.setState({[e.target.name]: e.target.value});
	}

	render() {
		return (<div>
			<Paper className="PaperLogin">
				<form noValidate="noValidate" autoComplete="off" onSubmit={this.OnSubmitLogin.bind(this)}>
					<TextField label="PSEUDO" placeholder="Example" margin="normal" variant="outlined" value={this.state.pseudo} onChange={this.OnChangeLoginInput.bind(this)} name="pseudo" error={this.state.error}/>
					<br/>
					<TextField label="PASSWORD" type="password" autoComplete="current-password" margin="normal" variant="outlined" value={this.state.password} onChange={this.OnChangeLoginInput.bind(this)} name="password" error={this.state.error}/>
					<br/><br/>
					<Button type="submit" variant="contained">
						Connecter
					</Button>
					<FormDialog/>
				</form>
			</Paper>
		</div>);
	}
}

const mapStateToProps = state => {
	return {clients: state.clients}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchClients: state => {
			dispatch({type: "FETCH_CLIENT", data: state});
		},
		deleteTask: id => {
			dispatch({type: "DELETE_TASK", id: id});
		},
		saveNumCli: data => {
			dispatch({type: "SAVE_NUM_CLIENT", data:data})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
