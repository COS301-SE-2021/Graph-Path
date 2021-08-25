import React from 'react'
import landingSnap from "../img/landing.png";
import {Button, Loader, Modal} from "rsuite";
import "rsuite/dist/styles/rsuite-dark.min.css"
import '../css/Landing.css';
import {useAuth0} from '@auth0/auth0-react';
import JSONPretty from 'react-json-pretty';
import LoginBtn from "./LoginBtn";

function Landing({logInvalid}) {

        const {user, isAuthenticated, isLoading} = useAuth0();
        console.log("props", logInvalid)

        if(isLoading) return <Loader speed="fast" content="Fast" />


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



               {
                   !isAuthenticated && (
                       <LoginBtn/>
                   )
               }



               {
                   isAuthenticated && user.email_verified && (
                       <>
                        {/*<JSONPretty data={user} />*/}
                           <Button onClick={logInvalid} id='signin-btn'>Proceed</Button>

                       </>
                   )

               }

               {console.log(user)}

           </div>
        );
}

export default Landing;