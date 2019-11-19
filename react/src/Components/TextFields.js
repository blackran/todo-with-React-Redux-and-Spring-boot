import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Delete from '@material-ui/icons/DeleteRounded';
import {connect} from 'react-redux';
import './TextFields.scss';
import shortid from 'shortid';
import axios from 'axios';
//import Fab from '@material-ui/core/Fab';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { createBrowserHistory } from 'history';

class TextFields extends Component {

	OnClickDeleteTask = (id) => {
		// if (window.confirm("executer la suprimation")) {
			this.props.deleteTask(id);
		// }
	}

	OnClickCheckTask = (id) => {
		this.props.checktask(id);
	}
	OnClickCheckTaskAll = () => {
		this.props.checktaskall();
	}

	OnSubmitToAddTask = (e) => {
		e.preventDefault();
		if(this.props.clients.saveNumCli.length !== 0){
			const clients = this.props.clients.saveNumCli[0].id;
			const stock = {
				id: shortid.generate(),
				task: this.props.tasks.mocks,
				etats: false,
				edit: false,
				clients: clients
			}
			if (this.props.tasks.mocks) {
				this.props.addtask(stock);
				this.props.updateMocks('');
			}
		}
	}

	componentDidMount() {

		if(this.props.clients.saveNumCli.length !== 0){
			const clients = this.props.clients.saveNumCli[0].id;
			if (this.props.tasks.dataTasks.length === 0) {
				const url = "http://localhost:8080/task/all/"+clients;
				axios.get(url)
				.then(res => res.data)
				.then(state => this.props.fetchtask(state))
				.catch(err => console.log("error parsing:\n", err));
			}
		}else{
			const history = createBrowserHistory();
			history.push("/");
		}
	}

	componentWillUnmount() {
		this.props.setdatadefault();
	}

	OnSubmitToUpdateTask = (id, e) => {
		e.preventDefault();

		const stock = {
			id: id,
			task: this.props.tasks.mocksEdit,
			etats: false,
			edit: false
		}
		if (this.props.tasks.mocksEdit) {
			this.props.acceptupdateedit(id, stock);
		}
	}

	onClicEdit = (id) => {
		this.props.updatetaskedit(id);
	}

	OnChangeInput = (e) => {
		return this.props.updateMocks(e.target.value);
	}

	OnChangeInputEdit = (e) => {
		return this.props.updateMocksEdit(e.target.value);
	}

	render() {
		const history = createBrowserHistory();
		while(this.props.clients.saveNumCli.length === 0 && history.location.pathname!=="/"){
			history.push("/")
		}
		console.log(this.props.clients.saveNumCli.length +" "+ history.location.pathname)
		const {tasks} = this.props;
		const completedStyle = {
			fontStyle: "italic",
			color: "#cdcdcd",
			textDecoration: "line-through"
		}
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
			},
			Input: {
				padding: 10,
				margin: 10,
				width: 200,
				color: '#727185',
				borderRadius: 3
			}
		}
		return (<div>
			<Grid item xs={12} md={6}>
        <Grid container spacing={1} direction="column" alignItems="flex-start">
          <Grid item>
            <ButtonGroup variant="contained" size="small" aria-label="small contained button group">
              <Button>
								ALL <span className="litle">{tasks.dataTasks.length}</span>
							</Button>
              <Button>
									NOT FINISH <span className="litle">{
									tasks.dataTasks.filter(j => {
										return j.etats === false;
									}).length
								}</span>
							</Button>
              <Button>
									FINISH <span className="litle">{
									tasks.dataTasks.filter(j => {
										return j.etats === true;
									}).length
								}</span>
							</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Grid>

			<Paper style={styles.Input}>
				<form styles={{
						display: 'flex',
						flexWrap: 'wrap'
					}} noValidate="noValidate" autoComplete="off" onSubmit={this.OnSubmitToAddTask.bind(this)}>
					<TextField label="TASK" placeholder="put here your task" styles={{
							width: 200
						}} margin="normal" value={this.props.tasks.mocks} onChange={this.OnChangeInput.bind(this)}/>
					<br/>
					<Button type="submit" variant="contained" color="primary" disabled={this.props.clients.saveNumCli.length === 0}>
						add task
					</Button>
				</form>
			</Paper>
			<br/> {
				tasks.dataTasks.length !== 0
					? (<Checkbox color="primary" onClick={() => this.OnClickCheckTaskAll()} checked={tasks.dataTasks.filter(j => {
							return j.etats === false;
						}).length === 0}/>)
					: null
			}
			<span style={tasks.dataTasks.filter(j => {
					return j.etats === false;
				}).length === 0
					? completedStyle
					: null}>
				{
					tasks.dataTasks.length !== 0
						? "check all"
						: null
				}
			</span>
			<Grid container={true}>
				{
					tasks.dataTasks.length!==0?
					tasks.dataTasks.map((h) => {
						return (<div className="grid" key={h.id}>
							<Grid item={true}>
								<Paper style={styles.Paper}>
									<Checkbox checked={h.etats} color="primary" onClick={() => this.OnClickCheckTask(h.id)}/> {
										h.edit
											? <form styles={{
														display: 'flex',
														flexWrap: 'wrap'
													}} noValidate="noValidate" autoComplete="off" onSubmit={this.OnSubmitToUpdateTask.bind(this, h.id)}>
													<TextField id="standard-with-placeholder" style={{marginBottom: -23,marginTop: 7}} variant="outlined" styles={{
															width: 2000
														}} margin="normal" value={tasks.mocksEdit} onChange={this.OnChangeInputEdit.bind(this)} className="textfield"/>
												</form>
											: <span style={h.etats
														? completedStyle
														: null} onDoubleClick={() => this.onClicEdit(h.id)}>
													{h.task}{" "}
												</span>
									}

									<Delete onClick={() => this.OnClickDeleteTask(h.id)} color='secondary' size="medium" className="delete"/>
								</Paper>
							</Grid>
						</div>);
					}):<h1 style={{opacity: 0.5}}>not exist task</h1>
				}
			</Grid>
		</div>);
	}
}

const mapStateToProps = state => {
	return {tasks: state.tasks, clients: state.clients}
}

const mapDispatchToProps = dispatch => {
	return {
		deleteTask: id => {
			dispatch({type: "DELETE_TASK", id: id});
		},
		addtask: state => {
			dispatch({type: "ADD_TASK", data: state});
		},
		acceptupdateedit: (id, state) => {
			dispatch({type: "ACCEPT_UPDATE_EDIT", id: id, data: state});
		},
		fetchtask: data => {
			dispatch({type: "FETCH_TASK", data: data});
		},
		checktask: id => {
			dispatch({type: "CHECK_TASK", id: id});
		},
		updatetaskedit: id => {
			dispatch({type: "UPDATE_TASK_EDIT", id: id});
		},
		updatetask: data => {
			dispatch({type: "UPDATE_TASK", data: data});
		},
		checktaskall: () => {
			dispatch({type: "CHECK_TASK_ALL"});
		},
		updateMocks: data => {
			dispatch({type: "UPDATE_MOCKS", data: data});
		},
		updateMocksEdit: data => {
			dispatch({type: "UPDATE_MOCKS_EDIT", data: data});
		},
		updateOne: data => {
			dispatch({type: "UPDATE_ONE", data: data});
		},
		setdatadefault: () => {
			dispatch({type: "SET_DATA_DEFAULT"});
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TextFields);
