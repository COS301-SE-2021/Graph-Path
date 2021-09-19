import React from 'react';
import {useAuth0} from '@auth0/auth0-react';
import {Button} from "rsuite";

const Logout=()=>{
    const {logout} = useAuth0();
    return(
        <>
            <Button onClick={()=>logout()} id='signup-btn'>Logout</Button>
        </>
    )
}
export default Logout;