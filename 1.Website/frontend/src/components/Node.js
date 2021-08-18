import React from 'react' ; 
import Task from './Task' ;
import axios from 'axios';
import '../css/Graph.css'
import {Link,withRouter, Route, Switch} from 'react-router-dom' ;
import PopUpMessage from './PopUpMessage';
import ViewTask from "./ViewTask";
// import '../css/Dashboard.css' ;

class Node extends React.Component{
    constructor(props){
        super(props) ; 
        this.state ={
            taskList:[],
            popUp:false,
            filterList:[],
            api:'http://localhost:9001'
        }
        this.graphManager = null  ; 
    }

    componentDidMount(){
        this.viewAllTasks(this.props.project._id) ;
    }
    showPopUP = () =>{
        this.setState({
            popUp: true
        })
        setTimeout(
            () =>
                this.setState({
                    popUp: false
                }),5000
        );
    }
    addNewNode = (name)=>{
      
        if (!name.label.toString().trim().length) {
            alert('Cannot Submit Empty Name')
        }
        else{
            var manager = this.props.graphManager ;
            manager.addNode(name) ;
            this.updateParent() ;
        
        }
    }
    addNewTask = (data) =>{
        axios.post(`${this.state.api}/task/insertTask`,data)
        .then((response) =>{
            if(response.status===400){
                throw Error(response.statusText) ;
            }//else
            console.log('from back end',response)

            const res = response.data;
            console.log(res) ;
            this.setState({
                answer:res.message,
                responseData:res.data //data
            })
            this.showPopUP();
            this.viewAllTasks(this.props.project._id) ;


        },(response)=>{
            console.log('rejected',response) ;
        })
        .catch((error)=>{
            console.log(error) ;
        })
    }
    viewAllTasks =(projectId)=>{

        if(this.props !== undefined || this.props !== null) {
            // alert(this.props.project)
            try {
                axios.get(`${this.state.api}/task/getAllTasksByProject/${projectId}`)
                    .then((response) => {
                        if (response === 400) {
                            throw Error(response.statusText);
                        }

                        if(response.data !== undefined){
                            // console.log('from back end res', response.data.data)
                            const list = response.data.data
                            // console.log("list",list)
                            if(list !== undefined && Array.isArray(list)){
                                let filtered = []
                                list.forEach((val)=>{
                                    filtered.push(val)
                                })

                                this.setState({
                                    taskList:filtered
                                });
                            }else{
                                alert("something went wrong")
                            }
                        }else{
                            this.setState({
                                taskList:[]
                            })
                        }



                    })
            } catch (error) {
                console.log(error)
            }
        }
    }
    
    updateParent=()=>{
        if (typeof this.props.updateGraph === 'function'){
            this.props.updateGraph(this.props.graphManager) ;
        }else{
            alert('Could not update Parent graph') ;
        }
    }

    filterTask=()=>{

    }

    criticalPath=(from)=>{
        let path = this.props.graphManager.highlightCritical(from) ;

        if (path){
            this.updateParent() ;
        }
        else{
            alert('Something wrong')
        }
    }

    render(){
        const {match} = this.props ;
        var manager = this.props.graphManager ;
        var {project} = this.props ;
        const EditGraphPermissionRoles = ['owner','project manager','developer']

         
        // console.log("match",project) ;


        if (manager === undefined || project === undefined){
            return (<div>
                No Graph Mounted
            </div>)
        }
        else{
            const query = new URLSearchParams(this.props.location.search );

            const currUser = {
                email:this.props.userEmail, 
                role: project.role,
            }

            return (
                <div id="add-node-div">
                    {EditGraphPermissionRoles.indexOf(this.props.project.role.toLowerCase())>=0 ? 
                
                    <div id="add-node">
                        <Link to={`${match.url}/addNode`}>Add Nodes</Link><span> </span>
                        {/* <Link to={`${match.url}/edges`}>Add Edges</Link> */}
                        <br/>
                    </div>
                    :"No perm"
                    }
                    <Switch>
                        <Route path={`${match.url}/addNode`} >
                            
                            <Task addTask={this.addNewNode}
                                fullForm = {false} 
                                members={project.groupMembers}

                            />
                        </Route>
                        <Route path={`${match.url}/task/viewTask/`}>


                            <ViewTask taskList={this.state.taskList} nodeId={query.get('id')} projectId={project._id} />
                        </Route>
                        <Route path={`${match.url}/task/`} render={()=>{
                            
                            return <>
                            
                            <Task addTask={this.addNewTask} 
                                fullForm={true}
                                label={query.get('label')}
                                nodeId={query.get('id')}
                                projectId={project._id}
                                members={project.groupMembers}
                                user={currUser}
                                criticalPath={this.criticalPath}
                            />
                            {this.state.popUp && <PopUpMessage text={this.state.answer}/>}

                            </>
                        }} />
                            
                    </Switch>
                
            </div>
        
        )}
    }

    displayTask =()=>{
        alert(this.props.task) ;
    }
}

export default withRouter(Node) ;