import React, {Component} from 'react';
// import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Delete from '@material-ui/icons/DeleteRounded';
import Edit from '@material-ui/icons/EditRounded';
import {connect} from 'react-redux';
import shortid from 'shortid';
import axios from 'axios';
import FormDialog from './FormDialog';

class Clients extends Component {
	componentDidMount() {
		if (this.props.clients.dataClients.length === 0) {
			axios.get("http://localhost:8080/clients/all").then(res => res.data).then(state => this.props.fetchClients(state)).catch(err => console.log("error parsing:\n", err));
		}
	}

	OnSubmitClients = (e) => {
		e.preventDefault();
		const stock = {
			id: shortid.generate(),
			pseudo: this.props.clients.mocksClientPseudo,
			password: this.props.clients.mocksClientPassword
		};
		this.props.addclient(stock);
		this.props.OnChangeClientInputPseudo("");
		this.props.OnChangeClientInputPassword("");
	}
	OnChangeClientInputPseudo = (e) => {
		this.props.OnChangeClientInputPseudo(e.target.value);
	}

	OnChangeClientInputPassword = (e) => {
		this.props.OnChangeClientInputPassword(e.target.value);
	}

	OnClickAddButton = () => {
	}

	OnClickModifierButton = (e) => {
		e.preventDefault();

		const stock = {
			id: "id",
			pseudo: this.props.clients.mocksClientPseudo,
			password: this.props.clients.mocksClientPassword
		};
		this.props.updateClients(stock);
		this.props.OnChangeClientInputPseudo("");
		this.props.OnChangeClientInputPassword("");
		this.props.setToggleShow(false);
	}

	OnClickDeleteClients = (id) => {
		return this.props.deleteClients(id);
	}

	OnClickEditClients = (id) => {
		// return this.props.
	}

	render() {
		const {clients} = this.props;
		const styles = {
			PaperHead: {
				padding: 10,
				margin: 10,
				color: '#727185',
				borderRadius: 3
			},
			Paper: {
				padding: 10,
				paddingRigth: 20,
				margin: 10,
				display: 'block'
			}
		}
		return (<div>
			<FormDialog onsubmit={this.OnSubmitClients.bind(this)} onchangePseudo={this.OnChangeClientInputPseudo} onchangePassword={this.OnChangeClientInputPassword}/>
			<Grid container={true}>
					{
						clients.dataClients.map((h) => {
							return (<span key={h.id}>
								<Grid item={true}>
									<Paper style={styles.Paper}>
										<h2>
											{h.pseudo}{" "}
										</h2>
										<div>
											pass: {h.password}{" "}
										</div>
										<Edit onClick={() => this.OnClickEditClients(h.id)} className="configClient"/>
										<Delete onClick={() => this.OnClickDeleteClients(h.id)} className="configClient"/>
									</Paper>
								</Grid></span>);
						})
					}
			</Grid>
		</div>);
	}
}

const mapStateToProps = state => {
	return {clients: state.clients}
}

const mapDispatchToProps = dispatch => {
	return {
		deleteClients: id => {
			dispatch({type: "DELETE_CLIENTS", id: id});
		},
		addclient: state => {
			dispatch({type: "ADD_CLIENTS", data: state});
		},

		acceptupdateedit: (id, state) => {
			dispatch({type: "ACCEPT_UPDATE_EDIT", id: id, data: state});
		},

		fetchClients: state => {
			dispatch({type: "FETCH_CLIENT", data: state});
		},

		updateClients: data => {
			dispatch({type: "UPDATE_CLIENTS", data: data});
		},

		OnChangeClientInputPseudo: data => {
			dispatch({type: "UPDATE_MOCKS_CLIENT_PSEUDO", data: data});
		},
		OnChangeClientInputPassword: data => {
			dispatch({type: "UPDATE_MOCKS_CLIENT_PASSWORD", data: data});
		},

		updateMocksEdit: data => {
			dispatch({type: "UPDATE_MOCKS_EDIT", data: data});
		},

		updateOneClient: data => {
			dispatch({type: "UPDATE_ONE_CLIENT", data: data});
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Clients);
