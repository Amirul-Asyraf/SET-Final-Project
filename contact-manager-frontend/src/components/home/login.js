import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { connect } from 'react-redux';
import { UserLogin, resetAuthResponsePerComponent } from '../../store/actions/AuthAction';

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:''
        }
    }

    componentDidMount = () =>
    {
        this.props.resetAuthResponsePerComponent();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("Ready to log a user in");
        console.log(this.state);
        this.props.UserLogin(this.state, this.props.history)
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.id]: e.target.value
        })
    }


    render() {
        const {authResponse} = this.props;
        return (
            <div>
                <h1>Login Here</h1>
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
                            label="email" 
                            id="email" 
                            type="email"
                            margin="dense"
                            required
                            onChange={this.handleChange}
                        />

                        <TextField 
                            fullWidth 
                            label="password" 
                            id="password" 
                            type="password" 
                            margin="dense"
                            required
                            onChange={this.handleChange}
                            />

                        <Button type="submit" variant="contained" fullWidth>Login</Button>
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
        UserLogin: (creds, history) => dispatch(UserLogin(creds, history)),
        resetAuthResponsePerComponent:() =>dispatch(resetAuthResponsePerComponent()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
