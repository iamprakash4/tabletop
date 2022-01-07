import React, { PureComponent } from 'react';
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
    { 
        id: 'id', 
        label: 'No', 
        minWidth: 20 
    },
    { 
        id: 'first_name', 
        label: 'Name', 
        minWidth: 100,
    },
    { 
        id: 'game_session', 
        label: 'Game session', 
        minWidth: 100,
    },
    {
      id: 'Action',
      label: 'Action',
      minWidth: 170,
      align: 'right',
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

const rows = [
    {id:1, first_name: "Joe", last_name: "Caputo", contact_number: '07658312387', game_session: 'Black Rain'},
    {id:2, first_name: "Piper", last_name: "Chapman", contact_number: '07142548798', game_session: 'Black Rain'},
    {id:3, first_name: "Tasha", last_name: "Jefferson", contact_number: '07998987220', game_session: 'Black Rain'},     
]

class Dashboard extends PureComponent  {

    constructor(){
        super()
        this.state = {
            page : 0,
            rowsPerPage : 10,
            isAddPlayer : false,
            isDeletePlayer : false,
            isEdit: false,
            selectedPlayer:{},
            isViewPlayer : false,
            player:{},
            rows:rows,
            id:rows.length,
            filterRow :null
        }
    }
    
    getPlayerList = () => {
        let {page,rowsPerPage,rows} = this.state
        rows = this.state.filterRow ? this.state.filterRow : rows
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
                            <TableCell key={"No"+i} >
                               {i +1}
                              </TableCell>
                              <TableCell key={"Name"+i} >
                                {row.first_name + ' ' + row.last_name}
                              </TableCell>
                              <TableCell key={"Session"+i} >
                                {row.game_session}
                              </TableCell>
                              <TableCell key={row.first_name} align={'right'}>
                                <Button onClick={this.viewPlayerDialogOpen(row)}>View</Button>
                                <Button onClick={this.editPlayerDialogOpen(row)}>Edit</Button>
                                <Button onClick ={this.deletePlayerDialogOpen(row)}>delete</Button>
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
        isAddPlayer: true
        })
    };
    
    addPlayerClose = () => {
        this.setState({
            isAddPlayer: false,
            isEdit:false,
            player:{}
        })
    };

    viewPlayerDialogOpen = (values)=>() => {
        this.setState({
            player:values,
            isViewPlayer: true
        })
    };
 
    viewPlayerClose = () => {
        this.setState({
            isViewPlayer: false,
            player:{}
        })
    };
      
    deletePlayerDialogOpen = (values) => ()=>{
        this.setState({
            player:values,
            isDeletePlayer: true
        })
    };

   editPlayerDialogOpen = (values)=>() => {
        this.setState({
            isEdit: true,
            player:values,
            isAddPlayer: true
        })
    };
 
   deletePlayerClose = () => {
        this.setState({
            isDeletePlayer: false,
            player:{}
        })
   };

   handleDeletePlayer = ()=>{
       let rows = this.state.rows
       rows = rows.filter(item=>{
           return item.id !== this.state.player.id
       })
       this.setState({
           rows
       },()=>{
          this.deletePlayerClose() 
       })
    }

   handleInput = (e)=>{
        let player = JSON.stringify(this.state.player)
        player = JSON.parse(player)
        player[e.target.name] = e.target.value
        this.setState({
            player
        })
    }

   handleFilter = (e)=>{
    const filterRow = this.state.rows.filter((item)=>{
        return item.game_session === e.target.value
    })
    this.setState({
        filterRow : filterRow
    })
   }

   handleAddPlayer = (e)=>{
    e.preventDefault()
       let rows = this.state.rows
       if(this.state.isEdit){
            const index =  rows.findIndex(item=>{
            return this.state.player.id === item.id 
            })
            rows =  JSON.stringify(rows)
            rows = JSON.parse(rows)
            rows.splice(index,1,this.state.player)
            this.setState({
                rows:rows
            },()=>{
                this.addPlayerClose()
            })
       }else{
            let obj = this.state.player
            obj.id = this.state.id + 1
            rows.push(obj)
            this.setState({rows:rows, id: obj.id},()=>{
                this.addPlayerClose()
            }) 
       }
   }
    

      addPlayer = ()=>{
        return(
            <Dialog
                open={this.state.isAddPlayer}
                onClose={this.addPlayerClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth = {true}
            >
            <form onSubmit = {this.handleAddPlayer}>
                <DialogTitle id="alert-dialog-title">
                    {this.state.isEdit ? "Edit player" : "Add player"}
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
                                            name = 'first_name'
                                            defaultValue = {this.state.player.first_name}
                                            onChange = {this.handleInput}
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
                                            name = 'last_name'
                                            defaultValue = {this.state.player.last_name}
                                            onChange = {this.handleInput}
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
                                            name = 'contact_number'
                                            defaultValue = {this.state.player.contact_number}
                                            onChange = {this.handleInput}
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
                                            name = 'game_session'
                                            defaultValue = {this.state.player.game_session}
                                            onChange = {this.handleInput}
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
                    <Button onClick={this.addPlayerClose}>Disagree</Button>
                    <Button type= {'submit'} autoFocus> Agree </Button>
                </DialogActions>
            </form>
            </Dialog>
        )
    }

    viewPlayer = ()=>{
        const {player} = this.state
        return(
            <Dialog
                open={this.state.isViewPlayer}
                onClose={this.viewPlayerClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth = {true}
            >
                <DialogTitle id="alert-dialog-title">
                    {"View player"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Box sx={{ flexGrow: 1 }}>
                            <Item>
                                <Grid container >
                                    <Grid item xs={5} md={6} style={{padding:'5px'}}> 
                                        <div >
                                            First Name
                                        </div>
                                    </Grid>
                                    <Grid item xs={5} md={6} style={{padding:'5px'}}>
                                        {player.first_name}
                                    </Grid>
                                    <Grid item xs={5} md={6} style={{padding:'5px'}}>
                                        <div >
                                            Last Name
                                        </div>
                                    </Grid>
                                    <Grid item xs={5} md={6} style={{padding:'5px'}}>
                                        {player.last_name}
                                    </Grid>
                                    <Grid item xs={5} md={6} style={{padding:'5px'}}>
                                        <div >
                                            Contact Nameber
                                        </div>
                                    </Grid>
                                    <Grid item xs={5} md={6} style={{padding:'5px'}}>
                                        {player.contact_number}
                                    </Grid>
                                    <Grid item xs={5} md={6} style={{padding:'5px'}}>
                                        <div >
                                            Game session
                                        </div>
                                    </Grid>
                                    <Grid item xs={5} md={6} style={{padding:'5px'}}>
                                        {player.game_session}
                                    </Grid>
                                </Grid>
                            </Item>    
                        </Box>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.viewPlayerClose}>Close</Button>
                </DialogActions>
            </Dialog>
        )
    }

    deletePlayerDialog = ()=>{
        return(
            <Dialog
                open={this.state.isDeletePlayer}
                onClose={this.addPlayerClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth = {true}
            >
                <DialogTitle id="alert-dialog-title">
                {"Delete player"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Box sx={{ flexGrow: 1 }}>
                            Are you sure to delete this player ..?
                        </Box>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.deletePlayerClose}>Disagree</Button>
                    <Button onClick={this.handleDeletePlayer} autoFocus> Agree </Button>
                </DialogActions>
            </Dialog>
        )
    }

    render() {
        return (
            <div>
                Dashboard
                <Button onClick={this.addPlayerDialogOpen}>Add Player</Button>
                <TextField
                    id="outlined-select-currency"
                    select
                    name = 'game_session'
                    defaultValue = {this.state.player.game_session}
                    onChange = {this.handleFilter}
                >
                    {gameSession.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <Button onClick={()=>{
                    this.setState({
                        filterRow: null
                    })
                }}>
                    Reset filter
                </Button>
                {this.getPlayerList()}
                {this.addPlayer()}
                {this.viewPlayer()}
                {this.deletePlayerDialog()}
            </div>
        );
    }
}

export default Dashboard;
