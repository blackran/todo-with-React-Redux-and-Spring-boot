import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import shortid from 'shortid';
import {connect} from 'react-redux';

function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [pseudo, setPseudo] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleClickOpen() {
    setOpen(true);
    setPseudo('');
    setPassword('');
  }

  function handleClose() {
    setOpen(false);
    setPseudo('');
    setPassword('');
  }

  function handleCloseAndSubmit(){
    props.addclient({"id":shortid.generate(), "pseudo":pseudo, "password":password});
    setOpen(false);
    setPseudo('');
    setPassword('');
  }

  return (
    <div>
      <div style={{float: 'right',position: 'relative', top: -20, left: -10, cursor: 'pointer'}} onClick={handleClickOpen.bind(this)}>
        creacte an account?
      </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">ADD USER</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a lot user
          </DialogContentText>
          <form onSubmit={onsubmit}>
            <TextField
              autoFocus
              margin="dense"
              id="pseudo"
              label="Pseudo"
              type="text"
              fullWidth
              value={pseudo}
              onChange={(e)=>setPseudo(e.target.value)}
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              fullWidth
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleCloseAndSubmit} color="primary">
                Add
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
		addclient: state => {
			dispatch({type: "ADD_CLIENTS", data: state});
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
