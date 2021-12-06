import React, { Component } from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { connect } from 'react-redux';
import { signUp, resetAuthResponsePerComponent } from '../../store/actions/AuthAction';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            firstname:'',
            lastname:'',
            password:''
        }
    }

    componentDidMount = () =>
    {
        this.props.resetAuthResponsePerComponent();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("submit button has been clicked");
        console.log(this.state);
        this.props.signUp(this.state);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {
        const {authResponse} = this.props;
        return (
            <div>
                <h1>Register Here</h1>
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
                        required
                        onChange={this.handleChange} />

                        <TextField 
                        fullWidth 
                        label="email" 
                        id="email" 
                        placeholder="Enter your email" 
                        type="email" 
                        margin="dense" 
                        required
                        onChange={this.handleChange} />

                        <TextField 
                        fullWidth 
                        label="password" 
                        id="password" 
                        placeholder="Enter your password" 
                        type="password" 
                        margin="dense" 
                        required
                        onChange={this.handleChange} />

                        <Button 
                        type="submit" 
                        variant="contained" 
                        fullWidth>Register</Button>


                    </Box>

                    <b>{authResponse!==null && authResponse!==""?authResponse:null}</b>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authResponse: state.auth.authResponse
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (creds) => dispatch(signUp(creds)),
        resetAuthResponsePerComponent:() =>dispatch(resetAuthResponsePerComponent())
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
