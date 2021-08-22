import React from 'react'
import { Form, FormGroup, FormControl, ControlLabel} from 'rsuite';

class Register extends React.Component{

    render(){
        return (
            <Form >
                <FormGroup>
                    <ControlLabel> FirstName</ControlLabel>
                    <FormControl name="firstName" type="name"/>
                </FormGroup>

                <FormGroup>
                    <ControlLabel> LastName</ControlLabel>
                    <FormControl name="lastName" type="name"/>
                </FormGroup>

                <FormGroup>
                    <ControlLabel> Username</ControlLabel>
                    <FormControl name="userName"/>
                </FormGroup>

                <FormGroup>
                    <ControlLabel> Email</ControlLabel>
                    <FormControl name="email" type="email"/>
                </FormGroup>

                <FormGroup>
                    <ControlLabel> Password</ControlLabel>
                    <FormControl name="password" type="password"/>
                </FormGroup>
            </Form>
        )
    }
}

export default Register;