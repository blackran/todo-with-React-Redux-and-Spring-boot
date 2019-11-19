import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/AddCircle';
import {connect} from 'react-redux';

function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen.bind(this)}>
        <AddIcon/>{" "}
        ADD USER
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">ADD USER</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a lot user
          </DialogContentText>
          <form onSubmit={props.onsubmit}>
            <TextField
              autoFocus
              margin="dense"
              id="pseudo"
              label="Pseudo"
              type="text"
              fullWidth
              value={props.states.mocksClientPseudo}
              onChange={props.onchangePseudo}
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="text"
              fullWidth
              value={props.states.mocksClientPassword}
              onChange={props.onchangePassword}
            />
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleClose} color="primary">
                Add { props.test }
              </Button>
            </DialogActions>

          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const mapStateToProps = state => {
	return {states: state.clients}
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

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
