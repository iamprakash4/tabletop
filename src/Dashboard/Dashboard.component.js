import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';




const columns = [
    { id: 'id', label: 'id', minWidth: 170 },
    { id: 'first_name', 
    label: 'Name', 
    minWidth: 100,
    format: (value,i) => {
        return value.toLocaleString('en-US')
    }
    },
    { id: 'game_session', 
    label: 'Game session', 
    minWidth: 100,
    format: (value,i) => {
        return value.toLocaleString('en-US')
    }
    },
    {
      id: 'Action',
      label: 'Action',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
  ];

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '100%'
  }));

  const gameSession = [
      'Black Rain',
      'One Last Riddle',
      'The Burning Plague',
      'The Sea Witch',
      'Tomb of Horrors'
  ];

class Dashboard extends Component {

    constructor(){
        super()
        this.state = {
            page : 0,
            rowsPerPage : 10,
            addUserPlayer : false
        }
    }
    
    StickyHeadTable = () => {
        const {page,rowsPerPage} = this.state
        const handleChangePage = (event, newPage) => {
            this.setState({
                page: newPage
            })
        };
      
        const handleChangeRowsPerPage = (event) => {
            this.setState({
                rowsPerPage:+event.target.value,
                page: 0
            })
        };

        const rows = [
            {id:1, first_name: "Joe", last_name: "Caputo", contact_number: '07658312387', game_session: 'Black Rain'},
            {id:2, first_name: "Piper", last_name: "Chapman", contact_number: '07142548798', game_session: 'Black Rain'},
            {id:3, first_name: "Tasha", last_name: "Jefferson", contact_number: '07998987220', game_session: 'Black Rain'},     
        ]
      
        return (
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row,i) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                            <TableCell key={row.first_name} >
                               {i +1}
                              </TableCell>
                              <TableCell key={row.first_name} >
                                {row.first_name + ' ' + row.last_name}
                              </TableCell>
                              <TableCell key={row.first_name} >
                                {row.game_session}
                              </TableCell>
                              <TableCell key={row.first_name} align={'right'}>
                                <Button>View</Button>
                                <Button>Edit</Button>
                                <Button>delete</Button>
                              </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        );
      }

       addPlayerDialogOpen = () => {
           this.setState({
            addUserPlayer: true
           })
      };
    
      addUserPlayerClose = () => {
        this.setState({
            addUserPlayer: false
        })
      };
    

      addUserPlayer = ()=>{
        let currency = 'EUR';

        const handleChange = (event) => {
        };
      
        return(
            <Dialog
        open={this.state.addUserPlayer}
        onClose={this.addUserPlayerClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth = {true}
      >
        <DialogTitle id="alert-dialog-title">
          {"Add player"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <Box sx={{ flexGrow: 1 }}>
     
      <Item>
      <Grid container >
      <Grid item xs={5} md={6} style={{padding:'5px'}}> 
          <div style={{marginTop:'15px'}}>
          First Name
          </div>
        </Grid>
        <Grid item xs={5} md={6} style={{padding:'5px'}}>
          <TextField
                required
                id="outlined-basic"
                variant="standard"
            />
        </Grid>
        <Grid item xs={5} md={6} style={{padding:'5px'}}>
          <div style={{marginTop:'15px'}}>
          Last Name
          </div>
        </Grid>
        <Grid item xs={5} md={6} style={{padding:'5px'}}>
          <TextField
                required
                id="outlined-basic"
                variant="standard"
            />
        </Grid>
        <Grid item xs={5} md={6} style={{padding:'5px'}}>
          <div style={{marginTop:'15px'}}>
          Contact Nameber
          </div>
        </Grid>
        <Grid item xs={5} md={6} style={{padding:'5px'}}>
          <TextField
                required
                id="outlined-basic"
                variant="standard"
            />
        </Grid>
        <Grid item xs={5} md={6} style={{padding:'5px'}}>
          <div style={{marginTop:'15px'}}>
          Game session
          </div>
        </Grid>
        <Grid item xs={5} md={6} style={{padding:'5px'}}>
        <TextField
          id="outlined-select-currency"
          select
          value={currency}
          onChange={handleChange}
          helperText="Please select game session"
        >
          {gameSession.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        </Grid>
        </Grid>
      </Item>    
    </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.addUserPlayerClose}>Disagree</Button>
          <Button onClick={this.addUserPlayerClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
        </Dialog>
        )
    }
    render() {
        return (
            <div>
                Dashboard
                <Button onClick={this.addPlayerDialogOpen}>Add Player</Button>
                {this.StickyHeadTable()}
                {this.addUserPlayer()}
            </div>
        );
    }
}

export default Dashboard;