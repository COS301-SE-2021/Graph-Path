import React from 'react'
import landingSnap from "../img/landing.png";
import {Button, Carousel, Loader, Modal} from "rsuite";
import "rsuite/dist/styles/rsuite-dark.min.css"
import '../css/Landing.css';
import {useAuth0} from '@auth0/auth0-react';
import JSONPretty from 'react-json-pretty';
import LoginBtn from "./LoginBtn";
import Graph_Picture from "../img/graph_2.svg";
import dashboard from "../img/dashboard.jpg";
import createP from "../img/createp.jpg";
import graph from "../img/graph.jpg";
import stats1 from "../img/stats1.jpg";
import stats2 from "../img/stats2.jpg";
import stats3 from "../img/stats3.jpg";
import kanban from "../img/kanban.jpg";

function Landing({logInvalid}) {

        const {user, isAuthenticated, isLoading} = useAuth0();
        console.log("user", user)
        

        if(isLoading) return <Loader speed="fast" content="Loading" />


        return(

            <div data-testid="main-landing-id" id="main-div-landing">
                <div id="left-div">
                        <img id="graph-picture" src={Graph_Picture} alt="graph-picture"/>

                        <Carousel id="carousel-id" autoplay shape='bar' className="custom-slider">
                                <img src={dashboard} />
                                <img src={createP} />
                                <img src={graph} />
                                <img src={kanban} />
                                <img src={stats1} />
                                <img src={stats2} />
                                <img src={stats3} />


                        </Carousel>
                </div>
                <div id="right-div">
                        <h1 id="pageName">GRAPH PATH </h1>
                        <p className="aboutText introText" >
                                Graph path is an interactive graph based project Management tool. <br/>
                                It aims to organise tasks of a project on a interactive and user friendly graph.
                        </p>

                        <div id="landing-btn">
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



                </div>

            </div>




           // <div>
           //     <div  >
           //         <h1 id="pageName">GRAPH PATH </h1>
           //         <p className="aboutText introText" >
           //             Graph path is an interactive graph based project Management tool. <br/>
           //             It aims to organise tasks of a project on a interactive and user friendly graph.
           //           </p>
           //         <img id="landing-graph" src={landingSnap} alt="Logo"/>
           //
           //         <p className="aboutText">
           //             This system provides a way to have all the tasks of a project that needs to be done  represented as a graph.
           //              <br/><br/>
           //
           //             The graph aims to make it easier to understand the dependencies between the task of the project.
           //             <br/><br/>
           //             The specific type of graph should be a Directed Acyclic Graph since it would be easy to read,
           //             understand and it would provide a very user friendly interface to interact with.
           //         </p>
           //
           //     </div>
           //
           //     {/*<Carousel autoplay className="custom-slider">*/}
           //     {/*     <div>*/}
           //     {/*         <p>1</p>*/}
           //     {/*         <p>11</p>*/}
           //     {/*     </div>*/}
           //     {/*    <div>*/}
           //     {/*        <p>2</p>*/}
           //     {/*        <p>22</p>*/}
           //     {/*    </div>*/}
           //     {/*    <div>*/}
           //     {/*        <p>3</p>*/}
           //     {/*        <p>33</p>*/}
           //
           //     {/*    </div>*/}
           //
           //
           //
           //     {/*</Carousel>*/}
           //
           //
           //

           //
           //
           //

           //
           //     {console.log(user)}
           //
           // </div>
        );
}

export default Landing;