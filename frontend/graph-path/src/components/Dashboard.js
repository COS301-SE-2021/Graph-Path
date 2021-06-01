import React from 'react' ; 
import Graph from './Graph';
import '../css/Dashboard.css'


const ProjectView = (props) =>{
    var data = props.projName ; 
    console.log(data) ;

    if (data === undefined){
        return <div>Error somewhere</div>
    }
    
    return (
        <div className="GraphDashboard">
            Project Name : {data}
        </div> )
}

class Dashboard extends React.Component{
    constructor(props){
        super(props) ; 
        this.state={
            projects: null ,
        }
    }

    // componentDidMount(){
    //     this.
    // }

    createProject = () => {
        //send project deeds to backend for saving 

        //after receiving confirmation
        //collet the data from backend, set state
        this.setState({
            projects:{
                name:"New Project Made",
                start: new Date()}
        },()=>{
            console.log("Name:",this.state.projects) ;
        }) ; 
    }
    
    
    defaultView = () =>{
        return ( 
            <div className="GraphDashboard">
                Dashboard
                <div>
                    <button onClick={this.createProject}>Create Project</button>
                </div>
            </div>
        ) 
    }

    render(){
        if (this.state.projects === null){
            return <this.defaultView />
        }
        else if (this.state.projects !== null) {
            // console.log("I am here") ;
            //retrieve the projects and start working from there
            return (
                <div>
                    <ProjectView projName="Demo 1"/>
                    <Graph project={this.projects}/>
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