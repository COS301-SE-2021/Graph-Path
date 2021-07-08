import React from 'react' ;
import * as FaIcons from "react-icons/fa";
import '../css/common.css'
// import {BrowserRouter as Router, Switch,Route,Link} from 'react-router-dom' ;
// import Profile from "./Profile";

class Username extends React.Component{
    render(){
        const user = this.props.userEmail;
        return(
            <span className="userName" ><FaIcons.FaSmile id="smileIcon" /> Hi, {user.username} </span>
            /* <Router>
                <Link to="/profile">
                    <span className="userName" ><FaIcons.FaSmile id="smileIcon" /> Hi, {user.username} </span>
              </Link>
                <Switch>
                    <Route path="/profile">
                        <Profile />
                    </Route>
                </Switch>
            </Router>*/



        )

    }
}
export default Username;