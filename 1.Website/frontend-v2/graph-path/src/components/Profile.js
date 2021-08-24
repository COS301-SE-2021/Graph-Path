import React from 'react' ;
import {Divider, Drawer} from "rsuite";

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
        return(
            <>
                <Drawer full placement={"top"} backdrop={"static"} show={this.state.show} onHide={this.handleClose}>
                    <Drawer.Header>
                        <Drawer.Title>Profile</Drawer.Title>
                        <Divider/>
                    </Drawer.Header>
                    <Drawer.Body></Drawer.Body>
                </Drawer>
            </>
        )
    }


}
export default Profile;