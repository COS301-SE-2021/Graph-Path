import React from 'react' ; 
import Graph from './Graph';
import NewProject from './NewProject' ;
import '../css/Dashboard.css'
// import axios from 'axios' ;
import  "whatwg-fetch" ;


const ProjectView = (props) =>{
    var data = props.proj ; 
    // console.log(data) ;

    if (data === undefined){
        return <div>Error somewhere:  data in Project View is Undefined</div>
    }

    if (data==="newProject"){
        return (
            <div className="GraphDashboard">
                New Project 
            </div> ) 
    }
    
    return (
        <div className="GraphDashboard">
            Project Name : {data}
        </div> )
}

class Dashboard extends React.Component{
    constructor(props){
        super(props) ; 
        this.views =  ["default", "newProject"] ; 
        this.state={
            projects: null ,
            view: this.views[0] 
        } ;
    }

    // componentDidMount(){
    //     this.
    // }

    createProject = () => {
        console.log('works')
        //send project deeds to backend for saving 
        this.setState({
            view: this.views[1] 
        }) ;
        

        //after receiving confirmation
        //collet the data from backend, set state
        // this.setState({
        //     projects:{
        //         name:"New Project Made",
        //         start: new Date()}
        // },()=>{
        //     console.log("Name:",this.state.projects) ;
        // }) ; 
    }
    
    viewProjectsFromAPI =()=>{
        // console.log('call to api') ;
        // axios.get('http://graphpath.herokuapp.com/Project/Demo_project')
        fetch('http://localhost:3002/Project/Demo_project1')
        .then(res =>res.json()) 
        .then(data => {
            // console.log(data) ;
            const proj = data ;
                this.setState({
                projects:proj
            }) ; 
        })        
        .catch(err =>{
            console.log('error getting from /project/*',err) ; 
        }
        )
    }
    
    defaultView = () =>{
        return ( 
            <div className="GraphDashboard">
                Dashboard
                <div>
                    <button onClick={this.createProject}>Create Project</button>
                    <button onClick={this.viewProjectsFromAPI}>View Projects</button>
                </div>
            </div>
        ) 
    }

    render(){
        if (this.state.projects === null && this.state.view === this.views[0]){
            return <this.defaultView />
        }
        else if (this.state.projects !== null) {
            console.log(this.state.projects) ;
            //retrieve the projects and start working from there
            return (
                <div>
                    <ProjectView proj={this.state.projects.Name}/>
                    <Graph project={this.state.projects}/>
                    </div>
                ) 
        }
        else if (this.state.view === "newProject"){
            return (
                <div className="NewProject">
                    <ProjectView proj={this.views[1]} />
                    <NewProject />
                </div>
            )
        }
        else{
            return ( 
                <div className="GraphDashboard">
                    Dashboard Default View
                    <div>
                        <button onClick={this.createProject}>Create Project</button>
                    </div>
                </div>
            ) ;
        }
    }
} 



export default Dashboard ; 