import React from 'react'
import { Form, FormGroup, FormControl, ControlLabel} from 'rsuite';
import '../css/Login.css'

class Login extends React.Component{

    constructor(props){
        super(props);

        this.state={
            forValue: {
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
        return(
            <Form onSubmit={()=>this.props.login()} formValue={this.state.formValue} onChange={this.handleChange} data-testid="form">
                <FormGroup>
                    <ControlLabel> Email</ControlLabel>
                    <FormControl name="email" type="email"/>
                </FormGroup>

                <FormGroup>
                    <ControlLabel> Password</ControlLabel>
                    <FormControl name="password" type="password"/>
                </FormGroup>
                <FormGroup>
                    <FormControl type="submit"/>
                    </FormGroup>
            </Form>
        )
    }
}

export default Login;