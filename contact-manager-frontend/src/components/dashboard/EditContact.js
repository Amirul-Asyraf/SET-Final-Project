import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { connect } from 'react-redux';
import DefaultImg from '../../profile_images/default-avatar.png';
import {loadSingleDataUser, editContactUser} from '../../store/actions/ContactAction';

class EditContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            firstname:'',
            lastname:'',
            profile_image:'',
            phonenumber:'',
            file_directory:'',
            new_image:''
        }
    }

    componentDidMount = () => {
        console.log(this.props);
        const {id} = this.props.match.params;
        this.props.loadSingleDataUser(id);
    }

    componentDidUpdate = async(prevProps, prevState) => {
        if(prevProps.loadSingleContacts !== this.props.loadSingleContacts){
            let singleData = this.props.loadSingleContacts;
             this.setState({
                email:singleData.data.email,
                firstname:singleData.data.firstname,
                lastname:singleData.data.lastname,
                // profile_image:singleData.data.image_file,
                new_image:singleData.data.image_file,
                phonenumber:singleData.data.phonenumber,
                file_directory:singleData.file_directory  
            })
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    //this converts a blob type image to base64 encoded string
    getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', ()=>callback(reader.result));
        reader.readAsDataURL(file);
    }

    fileTransform = (e) => {
        // console.log(e)
        this.getBase64(e.target.files[0], (base64String)=>{
            this.state.profile_image = base64String;
            // this.state.new_image = base64String;

            console.log(this.state);
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { id } = this.props.match.params;
        console.log(this.state);

        this.props.editContactUser(this.state, id);
    }

    render() {
        const { contactResponse } = this.props;
        return (
            <div>
                <h1>Edit Contact</h1>
                <form autoComplete="off" onSubmit={this.handleSubmit}>
                    <Box
                    sx={{
                        m: 'auto',
                        width: 500,
                        maxWidth: '100%',
                    }}
                    style={{alignItems: 'flex-start'}}
                    >
                        <TextField 
                        fullWidth 
                        label="firstname" 
                        id="firstname" 
                        placeholder="Enter your firstname" 
                        margin="dense" 
                        required
                        value={this.state.firstname || ''}
                        onChange={this.handleChange} />

                        <TextField 
                        fullWidth 
                        label="lastname" 
                        id="lastname" 
                        placeholder="Enter your lastname" 
                        margin="dense" 
                        value={this.state.lastname || ''}
                        onChange={this.handleChange} />

                        <TextField 
                        fullWidth 
                        label="email" 
                        id="email" 
                        placeholder="Enter your email" 
                        type="email" 
                        margin="dense" 
                        value= {this.state.email || ''}
                        onChange={this.handleChange} />

                        <TextField 
                        fullWidth 
                        label="phone number" 
                        id="phonenumber" 
                        placeholder="Enter your phone number" 
                        type="number" 
                        margin="dense" 
                        value = {this.state.phonenumber}
                        required
                        onChange={this.handleChange} />

                        {
                            <div>
                                {
                                    this.state.new_image === "" ? <img src={DefaultImg} className="image-restyle" alt=""/>
                                    : <img className="image-restyle" src={this.state.file_directory+"/"+this.state.new_image} alt=""/>
                                }
                            </div>
                        }

                        <input type='file' id='file_input' style={{marginTop: 20, marginBottom: 20}} onChange={this.fileTransform}/>

                        <Button 
                        type="submit" 
                        variant="contained" 
                        fullWidth>Update Contact</Button>


                    </Box>

                    <b>{contactResponse!=null?contactResponse:null}</b>
                </form>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loadSingleContacts: state.contact.loadSingleContacts, // from root reducer
        contactResponse: state.contact.contactResponse
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadSingleDataUser:(id) => dispatch(loadSingleDataUser(id)),
        editContactUser:(credentials, id) => dispatch(editContactUser(credentials, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditContact);