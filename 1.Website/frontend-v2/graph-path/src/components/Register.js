import React from 'react'
import { Form, FormGroup, FormControl, ControlLabel,Schema} from 'rsuite';
import '../css/Register.css'

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
        const {StringType} =Schema.Types;
        const model=Schema.Model({
                firstName: StringType().isRequired('Field cannot be left blank'),
            lastName: StringType().isRequired('Field cannot be left blank'),
            userName: StringType().isRequired('Field cannot be left blank'),
            email: StringType()
                .isEmail('Please enter a valid email address.')
                .isRequired('Field cannot be left blank'),
        })

    }
    handleChange(inputs){
        this.setState({
            formValue:inputs
        });
    }


    render(){
        return (
            <div >
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
            </div>

        )
    }
}

export default Register;