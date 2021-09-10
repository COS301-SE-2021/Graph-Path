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
import Logo from "../img/Logo3.png";
class Profile extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            show:false,
            disabled: true
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

    enableEdit = () => {
        this.setState({
            disabled: !this.state.disabled
        })
    }

    render() {
        const picture = this.props.user.picture;
        const user = this.props.user;
        return(
            <>
                <Drawer full placement={"top"} backdrop={"static"} show={this.state.show} onHide={this.handleClose}>
                    <Drawer.Header>
                        <Drawer.Title style={{textAlign:"center"}}>Profile</Drawer.Title>
                        <Divider/>
                    </Drawer.Header>
                    <Drawer.Body id="body-div">
                        <div id="picture-div">

                            <img src={picture} />
                            <Divider/>
                            <h6>{this.props.user.name}</h6>

                        </div>
                        <div id="div-form">
                            <form className="profileForm" onSubmit={this.onSubmit} >
                                <label>Username</label>
                                <input defaultValue={this.props.user.name}
                                       disabled = {!!(this.state.disabled)}
                                       onChange={this.change}
                                       type='text'    />


                                <label>Email</label>
                                <input value={user.email}
                                       disabled
                                       type='text'/>


                                {/*<label>Password</label>*/}
                                {/*<input*/}
                                {/*       type='text'*/}
                                {/*       name="dueDate"*/}
                                {/*       onChange={this.change}*/}
                                {/*       disabled = {!!(this.state.disabled)}/>*/}

                                {/*<Button disabled = {(this.state.disabled) ? "" : "disabled"}*/}
                                {/*        onClick={this.enableEdit}>Edit</Button>*/}
                                {/*<Button disabled = {(this.state.disabled) ? "disabled" : ""}*/}
                                {/*        onClick={this.enableEdit}>Cancel</Button>*/}

                            </form>

                        </div>
                        <img id="logo-pics" src={Logo}/>
                    </Drawer.Body>
                </Drawer>
            </>
        )
    }


}
export default Profile;