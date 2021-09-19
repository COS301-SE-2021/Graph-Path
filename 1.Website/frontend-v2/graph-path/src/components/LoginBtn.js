import React from 'react';
import {useAuth0} from '@auth0/auth0-react';
import {Button} from "rsuite";

const LoginBtn=()=>{
    const {loginWithRedirect} = useAuth0();
    return(
        <Button onClick={()=>loginWithRedirect()} id='signin-btn'>Sign In or Sign Up</Button>
    )
}
export default LoginBtn;