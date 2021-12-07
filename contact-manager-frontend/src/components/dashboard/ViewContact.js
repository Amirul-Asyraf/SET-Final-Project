import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Pagination from 'rc-pagination';
// import { Outlet, useNavigate } from 'react-router';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { connect } from 'react-redux';
import { loadContactUser, loadSearchContactUser, deleteContactUser } from '../../store/actions/ContactAction';

class ViewContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search_content: "",
        }
    }

    componentDidMount = () => {
        const page = "";
        this.props.loadContactUser(page);
        // console.log(this.props.loadContacts.data.current_page)
    }

    handleKeyUp = async(e) => {
        await this.setState({
            [e.target.id]: e.target.value
        })
        console.log(this.state)
        if(this.state.search_content==="") {

        } else {
            let page = "";
            this.props.loadSearchContactUser(this.state.search_content, page)
        }
    }

    onChange = (currentPage) => {
        if(this.state.search_content==="") {
            this.props.loadContactUser(currentPage);
        } else {
            this.props.loadSearchContactUser(this.state.search_content, currentPage);
        }
    }

    loadEditpage = (e, id) => {
        this.props.history.push('/dashboard/edit-contacts/'+id);
    }

    DeleteContact = (e,id) => {
        const confirmDialog  = window.confirm("Are you sure you want to delete this contact?");
        if(confirmDialog===true)
        {
            this.props.deleteContactUser(id);
        } else {

        }
    }

    render() {
        const {loadContacts} = this.props;
        // const {data} = loadContacts;
        // console.log(data);
        return (
            <div>
                {/* <TextField 
                        fullWidth 
                        id="search_content" 
                        label="Search" 
                        placeholder="Search"
                        variant="standard" 
                        margin="dense" 
                        required
                        onKeyUp={this.handleKeyUp} 
                /> */}

                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontWeight: 'bolder' }}>First Name</TableCell>
                                <TableCell style={{ fontWeight: 'bolder' }} align="right">Last Name</TableCell>
                                <TableCell style={{ fontWeight: 'bolder' }} align="right">Email</TableCell>
                                <TableCell style={{ fontWeight: 'bolder' }} align="right">Phone Number</TableCell>
                                <TableCell style={{ fontWeight: 'bolder' }} align="right">Profile Image</TableCell>
                                <TableCell style={{ fontWeight: 'bolder' }} align="right">Edit</TableCell>
                                <TableCell style={{ fontWeight: 'bolder' }} align="right">Delete</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {loadContacts && loadContacts.hasOwnProperty('data') ? loadContacts.data.data.map((row) => (
                            <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th"  scope="row"
                                >
                                    {row.firstname}
                                </TableCell>
                                <TableCell align="right">
                                    {row.lastname}
                                </TableCell>
                                <TableCell align="right">
                                    {row.email}
                                </TableCell>
                                <TableCell align="right">
                                    {row.phonenumber}
                                </TableCell>
                                <TableCell align="right">

                                    <img src={loadContacts.file_directory+"/"+row.image_file} width={50} height={50} alt=""/>
                                    {console.log(loadContacts.file_directory+"/"+row.image_file)}
                                </TableCell>
                                <TableCell align="right">
                                    <Button 
                                    variant="contained"
                                    color="primary"
                                    startIcon={<EditIcon />}
                                    id={row.id}
                                    onClick={(e) => this.loadEditpage(e, row.id)}
                                    >
                                        Edit
                                    </Button>
                                </TableCell>
                                <TableCell align="right">
                                    <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<DeleteIcon />}
                                    id={row.id}
                                    onClick={(e) => this.DeleteContact(e, row.id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                            
                        )) : null}
                        </TableBody>
                    </Table>
                </TableContainer>
                {loadContacts?
                <Pagination 
                    className="pagination-restyle"
                    defaultPageSize={5} 
                    total={loadContacts.data.total} 
                    current={loadContacts.data.current_page}
                    prevIcon={<ArrowBackIosNewIcon sx={{ fontSize: 15}}/>}
                    jumpNextIcon={<ArrowForwardIcon sx={{ fontSize: 15}}/>}
                    jumpPrevIcon={<ArrowBackIcon sx={{ fontSize: 15}}/>}
                    nextIcon={<ArrowForwardIosIcon sx={{ fontSize: 15 }}/>}
                    onChange={this.onChange}/>
                : null }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loadContacts: state.contact.loadContacts // from root reducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadContactUser:(page) => dispatch(loadContactUser(page)),
        loadSearchContactUser:(search_content, page) => dispatch(loadSearchContactUser(search_content, page)),
        deleteContactUser:(id) => dispatch(deleteContactUser(id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ViewContact)