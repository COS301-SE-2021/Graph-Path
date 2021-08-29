import {React,Component} from "react";
import PropTypes from 'prop-types' ;
import {Icon, Panel,SelectPicker, Loader} from 'rsuite' ;
import "../css/ProjectManager.css"
import { Route ,Switch, withRouter} from "react-router-dom";
import axios from 'axios' ;
import Project from "./Project";
import ProjectCard from './Reusable/ProjectCard' ;

/*
*   A component that will make async request to peer server for all projects of the logged user, provided in the props   
*   @Component ProjectManager aims to make a list of projects organised in a recently accessed order. When the project opened
*   by default it opens the graph in the specified project. When the project is opened, it should show the graph that will 
*   take up most of the screen.
*   Project Manager lists all the projects and requests the peer server for meta data about the projects.
*   It provides a function for the child component to save the project changes including the graph
*
*
*
*/

class ProjectManager extends Component {

    constructor(props){
        super(props) ;
        this.state = {
            sortValue:'recent',
            loading:false,
            currentProject:{},
            projects:[],
        }
    }
    componentDidMount(){
        this.viewProjectsFromAPI() ;
    }

    viewProjectsFromAPI=()=>{
        this.setState({
            loading:true 
        }) ;

        axios.get(`${this.props.api}/project/getAllProjectsByUserEmail/${this.props.user.email}`,{
            headers:{
                authorization:`Bearer ${this.props.user.token}` 
            }
        })
        .then((res)=>{
            console.log('Success',res) ;
            if (res.data.data !== undefined){
                this.setState({
                    projects :res.data.data ,
                    loading:false                                        
                        
                }) ;
            }
            else{
                this.setState({
                    loading:false                    
                }) ;
                alert('No projects')
            }

        })
        .catch((err)=>{
            
            this.setState({
                loading:false                                        
            }) ;
            console.log('Error or Rejected',err)
        })
    }

    selectCurrentProject=(project)=>{
        this.setState({
            currentProject:project
        })//,()=>this.updateLastAcessed(project)) ;
        
    }

    updateLastAcessed = (project)=>{
       //check if date on project is not over minutes .
       //if it is update the project. If not ? don't update.
       let accessedProject = {
           lastDateAccessed : new Date().toJSON().slice(0,19) ,
           projId: project["_id"] 
       } 
       console.log('B4 update',accessedProject)
       axios.put(`${this.props.api}/project/updateProjectAccessDate`,accessedProject)
       .then((res)=>{
           console.log('comms for accessdate',res) ;
           if (res.data.data){
               this.viewProjectsFromAPI() ;
           }
           else{
               console.log('Did not update access date successfully') ;
           }
       })
       .catch((err)=>{
           console.log('Comm Error',err) ;
       }) ;


       
    }


    deleteProject=(project)=>{
    //make request for deleting project.
        if(project === undefined){
            alert('Can\'t delete Project. Project Invalid') ;
        }
        else{
           
            this.setState({
                loading:true,
                // linkNumber:-1
            }) ;
            console.log('B4 del',project)
            axios.delete(`${this.props.api}/project/deleteProject`,{
                headers:{
                    authorization:`Bearer ${this.props.user.token}`
                } ,
                data:{
                    email:this.props.user.email,
                    projectID:project._id
                }
            })
            .then((res)=>{
                if (res.status >=400){
                    throw res ;
                }
                if(res.data.message === undefined){
                    alert('Network Error') ;
                    this.setState({
                        loading:false
                    }) ;
                }
                else{
                    this.setState({
                        answer:res.data.message
                    })//,()=>this.showPopUP()) ;
                    ;
                    this.viewProjectsFromAPI() ;
                }
            })
            .catch(err=>{
                console.log("error",err)
                this.setState({
                    loading:false
                }) ;
            }) ;
            
        
        }
    }

    handleSortChange =(value)=>{
        // console.log('value',value )
        this.setState({
            sortValue:value
        },()=>this.sortProjects()) ;
    }
    sortProjects = ()=>{
        //if recent? newest last aceess date comes first
        //if alphabetical ? project name is used to sort alphabetically
        //if date ? oldest project first
        // console.log('sorting...') ;
        if (this.state.sortValue === 'recent'){
            let newArray = this.state.projects.sort((v1,v2,)=>{
                let date1=v1.lastDateAccessed.toLowerCase();
                let date2 = v2.lastDateAccessed.toLowerCase();

                if(date1<date2){
                    //date1 came first, put last
                    return 1 ;
                }
                if (date1>date2){
                    return -1 ;
                }
                return 0 ;
            }) ;
            this.setState({
                projects:newArray , 
            }) ;
        }
        else if (this.state.sortValue === 'alpha'){
            let sortedArray = this.state.projects.sort((v1,v2)=>{
                let date1 = v1.projectName.toLowerCase() ;
                let date2 = v2.projectName.toLowerCase() ;

                if (date1<date2){
                    return -1 ;
                }
                else if (date1>date2){
                    return 1 ;
                }
                return 0 ;
            })
            this.setState({
                projects:sortedArray
            }) ;
        }
    }


    render(){

        const options = [{
            label:'Recently Accessed',value:'recent'},{label:'Alphabetical',value:'alpha'},{label:'Date Created',value:'date'}] ;
        const {match} = this.props ;
        if (this.state.loading){
            return <Loader backdrop={false} speed={'slow'} size={'lg'} />
        }
        else{
            return( 
                <div data-testid="tidProjectManager" id="projectManager">
                   <Switch>
                        <Route path={`${match.path}/project`} render={()=>{
                                return <Project  project={this.state.currentProject} 
                                selectProject={this.selectCurrentProject}/>
                        }}/>
                        <Route >
                            <div>
                            Projects <br/>
                            <SelectPicker data={options} value={this.state.sortValue} onChange={this.handleSortChange}/>
                            <div data-testid="tidProjList" id="projects-list">
                                {
                                this.state.projects.length > 0?
                                this.state.projects.map((project,index)=>{
                                return <ProjectCard key={`${index+1}${project.projectName}`} 
                                project={project} 
                                link={`${match.url}/project`} 
                                selectProject={this.selectCurrentProject}
                                deleteProject={this.deleteProject} />    
                            })
                            :<div>
                                <h1>No Projects found please refresh</h1>
                            </div>
                                            
                        }
                            
                                </div>
                    
                            </div>
                        </Route>
                    </Switch>
        
                    
                </div>)
        }
        
    }
}

ProjectManager.propTypes = {
    user :PropTypes.object,
    api:PropTypes.string

}

ProjectManager.defaultProps = {
    user: {
        email : 'ntpnaane@gmail.com' 
    } ,
    api:'http://localhost:9001'
}

export default withRouter(ProjectManager) ; 

// def:[{
//     projectName:"T1",
//     lastDateAccessed: new Date().toJSON().slice(0,17) ,
// },{
//     projectName:"T2",
//     lastDateAccessed: new Date("2021-08-22T16:00").toJSON().slice(0,17) ,
// },{
//     projectName:"S2",
//     lastDateAccessed: new Date("2021-08-12T16:00").toJSON().slice(0,17) ,
// },{
//     projectName:"T1",
//     lastDateAccessed: new Date().toJSON().slice(0,17) ,
// },{
//     projectName:"T2 2",
//     lastDateAccessed: new Date("2021-05-22T16:00").toJSON().slice(0,17) ,
// },{
//     projectName:"S2 65",
//     lastDateAccessed: new Date("2021-06-15T16:00").toJSON().slice(0,17) ,
// },{
//     projectName:"T56",
//     lastDateAccessed: new Date().toJSON().slice(0,17) ,
// },{
//     projectName:"T2 3",
//     lastDateAccessed: new Date("2021-03-23T16:00").toJSON().slice(0,17) ,
// },{
//     projectName:"S2 45",
//     lastDateAccessed: new Date("2021-08-15T16:00").toJSON().slice(0,17) ,
// }]