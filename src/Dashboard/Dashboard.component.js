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
class Dashboard extends Component {

    constructor(){
        super()
        this.state = {
            page : 0,
            rowsPerPage : 10
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
    render() {
        return (
            <div>
                Dashboard
                <Button>Add user</Button>
                {this.StickyHeadTable()}
            </div>
        );
    }
}

export default Dashboard;