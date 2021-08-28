import React from 'react' ;
import {
    Avatar,
    Button,
    ButtonToolbar,
    ControlLabel,
    Divider,
    Drawer,
    Form,
    FormControl,
    FormGroup,
    HelpBlock
} from "rsuite";
import '../css/Profile.css'
class Profile extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            show:false
        }
    }

    handleShow=()=>{
        this.setState({
            show:true
        })
    }

    handleClose=()=>{
        this.setState({
            show:false
        })
    }

    render() {
        const picture = this.props.user.picture;
        return(
            <>
                <Drawer full placement={"top"} backdrop={"static"} show={this.state.show} onHide={this.handleClose}>
                    <Drawer.Header>
                        <Drawer.Title>Profile</Drawer.Title>
                        <Divider/>
                    </Drawer.Header>
                    <Drawer.Body id="body-div">
                        <div id="picture-div">
                            <img src={picture} />
                            <Divider/>
                            <h6>{this.props.user.name}</h6>

                        </div>
                        <div id="div-form">
                            <Form layout="horizontal">
                                <FormGroup>
                                    <ControlLabel>Username</ControlLabel>
                                    <FormControl name="name" />
                                    <HelpBlock>Required</HelpBlock>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Email</ControlLabel>
                                    <FormControl name="email" type="email" />
                                    <HelpBlock tooltip>Required</HelpBlock>
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Password</ControlLabel>
                                    <FormControl name="password" type="password" />
                                </FormGroup>
                                <FormGroup>
                                    <ButtonToolbar>
                                        <Button appearance="primary">Submit</Button>
                                        <Button appearance="default">Cancel</Button>
                                    </ButtonToolbar>
                                </FormGroup>
                            </Form>

                        </div>
                    </Drawer.Body>
                </Drawer>
            </>
        )
    }


}
export default Profile;