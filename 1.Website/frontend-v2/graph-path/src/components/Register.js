import React from 'react'
import { Form, FormGroup, FormControl, ControlLabel} from 'rsuite';

class Register extends React.Component{
    constructor(props){
        super(props);

        this.state={
            show:false,
            forValue: {
                firstName: '',
                lastName:'',
                userName:'',
                email:'',
                password:''
            }

        }
        this.handleChange = this.handleChange.bind(this);


    }
    handleChange(inputs){
        this.setState({
            formValue:inputs
        });
    }
    render(){
        return (
            <Form  formValue={this.state.formValue} onChange={this.handleChange} data-testid="form">
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