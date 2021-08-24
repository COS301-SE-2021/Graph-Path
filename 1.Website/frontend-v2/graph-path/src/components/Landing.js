import React from 'react'
import landingSnap from "../img/landing.png";
import {Button, Modal} from "rsuite";
import "rsuite/dist/styles/rsuite-dark.min.css"
import Register from "./Register";
import Login from "./Login";
import '../css/Landing.css';
import {useAuth0} from '@auth0/auth0-react';
import JSONPretty from 'react-json-pretty';
import Dashboard from "./Dashboard";
import Header from "./Header";

const Landing=()=> {
    // constructor(props){
    //     super(props);
    //     this.state={
    //
    //         show:false,
    //         show1:false
    //
    //     }
//         this.close = this.close.bind(this);
//         this.open = this.open.bind(this);
//
//         this.closeLog = this.close.bind(this);
// }

//Deal with Register
//     close() {
//         this.setState({
//             show: false,
//             show1:false });
//
//     }
//     open() {
//         this.setState({ show: true });
//     }
//
//     //Deal with Login
//     closeLog() {
//         this.setState({ show1: false });
//     }
//     openLog=()=> {
//         console.log('openig login')
//         this.setState({ show1: true });
//
//     }
//
//     nextPath =(path)=>{
//         this.props.history.push(path)
//
//     }



    // render(){
        const {loginWithRedirect} = useAuth0();
        const {user, isAuthenticated} = useAuth0();
        const {logout} = useAuth0();

        return(
           <div>
               <div  >
                   <h1 id="pageName">GRAPH PATH </h1>
                   <p className="aboutText introText" >
                       Graph path is an interactive graph based project Management tool. <br/>
                       It aims to organise tasks of a project on a interactive and user friendly graph.
                     </p> 
                   <img id="landing-graph" src={landingSnap} alt="Logo"/>
                   
                   <p className="aboutText">
                       This system provides a way to have all the tasks of a project that needs to be done  represented as a graph.
                        <br/><br/>
                       
                       The graph aims to make it easier to understand the dependencies between the task of the project.
                       <br/><br/>
                       The specific type of graph should be a Directed Acyclic Graph since it would be easy to read,
                       understand and it would provide a very user friendly interface to interact with.
                   </p>

               </div>


               {/*<Modal   show={this.state.show || this.state.show1} onHide={this.close} size="xs" >*/}
               {/*    <Modal.Header>*/}
               {/*        <Modal.Title>Sign Up</Modal.Title>*/}
               {/*    </Modal.Header>*/}
               {/*    <Modal.Body>*/}
               {/*        {*/}
               {/*            this.state.show ? */}
               {/*             <Register />*/}
               {/*        :<Login login={this.props.logInvalid}/>*/}
               {/*        }*/}

               {/*    </Modal.Body>*/}
               {/*</Modal>*/}
               {/*<button data-testid="tidSignUpLink" onClick={this.open} id='signup-btn'>Sign Up</button>*/}
               
               {/*<Button onClick={()=>this.openLog()} id='signin-btn'>Sign In</Button>*/}

               <Button onClick={()=>loginWithRedirect()} id='signin-btn'>Sign In or Sign Up</Button>
               <Button onClick={()=>logout()} id='signup-btn'>Logout</Button>

               {isAuthenticated && user.email_verified && (
                   <JSONPretty data={user} />
                    //this.props.logInvalid
                   // <Header />
               )
               }

               {/*{*/}
               {/*    user.email_verified === false ?*/}
               {/*        <>*/}
               {/*            {alert(user.email+" is not verified, verify email to sign in")}*/}
               {/*        </>:*/}
               {/*        ""*/}
               {/*}*/}
               {console.log(user)}

           </div>
        );
    // }
}

export default Landing;