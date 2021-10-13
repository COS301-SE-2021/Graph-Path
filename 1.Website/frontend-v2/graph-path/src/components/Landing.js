import React from 'react'
//import landingSnap from "../img/landing.png";
import {Button, Loader} from "rsuite";
import "rsuite/dist/styles/rsuite-dark.min.css"
import '../css/Landing.css';
import {useAuth0} from '@auth0/auth0-react';
//import JSONPretty from 'react-json-pretty';
import LoginBtn from "./LoginBtn";
import Graph_Picture from "../img/graph_2.svg";
import Log from "../img/Logo3.png";
//import dashboard from "../img/dashboard.jpg";
//import createP from "../img/createp.jpg";
//import graph from "../img/graph.jpg";
//import stats1 from "../img/stats1.jpg";
//import stats2 from "../img/stats2.jpg";
//import stats3 from "../img/stats3.jpg";
//import kanban from "../img/kanban.jpg";
import sendMessage from "../img/landing/SendMessage.gif"
import kanbanBoard from "../img/landing/SearchKanban.gif"
import graphDrag from "../img/landing/GraphDrag.gif"
import statts1 from "../img/landing/statistics1.gif";
import Logo from "../img/Logo3.png";

function Landing({logInvalid}) {

        const {user, isAuthenticated, isLoading} = useAuth0();
        // console.log("user", user)
        

        if(isLoading) return <Loader speed="fast" content="Loading" />



        return(

            <div data-testid="main-landing-id" id="main-div-landing">
                    <div id="landing-btn">
                            <img id="logo-pi" src={Log} alt='logo'/>
                            {
                                    !isAuthenticated && (
                                        <LoginBtn/>
                                    )
                            }
                            {
                                    isAuthenticated && user.email_verified && (
                                        <>
                                                {/*<JSONPretty data={user} />*/}
                                                <Button onClick={()=>logInvalid(user)} id='signin-btn'>Proceed</Button>

                                        </>
                                    )

                            }
                    </div>
                <div id="left-div">

                        <img id="graph-picture" src={Graph_Picture} alt="graph-pic"/>
                        <br/> <br/> <br/> <br/>
                       <div >
                               <h1>Features</h1>
                               <br/> <br/>

                               <h3>Graph View</h3>
                               <p className="landingText">Tasks are organized as an interactive acyclic graph. The graph is user-friendly allowing for node linkage and dragging as the user wishes.</p><br/><br/>
                               <img src={graphDrag} alt='GraphGIF'/> <br/><br/>

                               <h3>Collaborative Chat</h3>
                               <p className="landingText">The Graph Path has a Collaborative Chat intended for project users to interact with one another</p> <br/> <br/>
                               <img src={sendMessage} alt-='ChatGIF' /> <br/><br/>

                               <h3>Kanban Board</h3>
                               <p className="landingText">Traditionally, the Kanban Board is used to display a single project. The Graph Path Kanban has an overview of all projects.</p> <br/> <br/>
                               <img src={kanbanBoard} alt='KanbanGIF' /> <br/><br/>

                               <h3>Statistics</h3>
                               <p className='landingText'>
                                       Graph Path has different statistical views.
                               </p><br/><br/>
                               <img src={statts1} alt='StatsGIF'/> <br/><br/>
                       </div>




                        {/*<Carousel id="carousel-id" autoplay shape='bar' className="custom-slider">*/}
                        {/*        <img src={dashboard} alt='' />*/}
                        {/*        <img src={createP} alt=''/>*/}
                        {/*        <img src={graph} alt=''/>*/}
                        {/*        <img src={kanban} alt=''/>*/}
                        {/*        <img src={stats1} alt=''/>*/}
                        {/*        <img src={stats2} alt=''/>*/}
                        {/*        <img src={stats3} alt=''/>*/}


                        {/*</Carousel>*/}
                </div>
                <div id="right-div">
                        <h1 id="pageName">GRAPH PATH </h1>
                        <p className="aboutText introText" >
                                Graph path is an interactive graph based project Management tool. <br/>
                                It aims to organise tasks of a project on a interactive and user friendly graph.
                        </p>


                </div>
                    <div id="footer-div">
                            <p style={{"fontWeight":"bold"}}>Graph Path &copy; 2021</p>
                    </div>

            </div>

        );
}

export default Landing;