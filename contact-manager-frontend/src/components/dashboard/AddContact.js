import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { connect } from 'react-redux';
import { addContactUser } from '../../store/actions/ContactAction';

class AddContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            firstname:'',
            lastname:'',
            profile_image:'',
            phonenumber:'',
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
        this.getBase64(e.target.files[0], (base64String)=>{
            this.state.profile_image = base64String;
            console.log(this.state);
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.props.addContactUser(this.state);
    }

    render() {
        const {contactResponse} = this.props;
        return (
            <div>
                <h1>Adding a new contact</h1>
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
                        onChange={this.handleChange} />

                        <TextField 
                        fullWidth 
                        label="lastname" 
                        id="lastname" 
                        placeholder="Enter your lastname" 
                        margin="dense" 
                        onChange={this.handleChange} />

                        <TextField 
                        fullWidth 
                        label="email" 
                        id="email" 
                        placeholder="Enter your email" 
                        type="email" 
                        margin="dense" 
                        onChange={this.handleChange} />

                        <TextField 
                        fullWidth 
                        label="phone number" 
                        id="phonenumber" 
                        placeholder="Enter your phone number" 
                        type="number" 
                        margin="dense" 
                        required
                        onChange={this.handleChange} />

                        {/* <br/><br/> */}
                        <input type='file' id='file_input' style={{marginTop: 20, marginBottom: 20}} onChange={this.fileTransform}/>
                        {/* <br/><br/> */}

                        <Button 
                        type="submit" 
                        variant="contained" 
                        fullWidth>Add Contact</Button>


                    </Box>

                    <b>{contactResponse!=null?contactResponse:null}</b>
                </form>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        addContactUser:(creds) => dispatch(addContactUser(creds))
    }
}

const mapStateToProps = (state) => {
    return {
        contactResponse: state.contact.contactResponse // from root reducer
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddContact);