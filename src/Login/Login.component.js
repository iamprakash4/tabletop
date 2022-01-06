import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/styles";

class Login extends Component {
    render() {
        return (
            <div>
                <Button onClick={()=>{
                    this.props.history.push('/dashboard')
                }}>
                    Login
                </Button>
            </div>
        );
    }
}

// export default Login;
export default withStyles({ withTheme: true })(Login);
