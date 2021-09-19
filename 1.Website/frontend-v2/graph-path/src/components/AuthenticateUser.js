import React from 'react';
import {useAuth0} from '@auth0/auth0-react';
import {Button} from "rsuite";

const AuthenticateUser=()=>{
    const {user, isAuthenticated} = useAuth0();

    return(
        <>
        {
            isAuthenticated && user.email_verified && (
            <>
                <JSONPretty data={user} />
                {

                }

            </>
        )

        }
        </>
    )

}
export default AuthenticateUser;