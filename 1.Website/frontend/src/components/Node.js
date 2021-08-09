import React from 'react' ; 
import Task from './Task' ;
import {Link,withRouter, Route, Switch} from 'react-router-dom' ;
// import '../css/Dashboard.css' ;

class Node extends React.Component{
    constructor(props){
        super(props) ; 
        this.state ={
        }
        this.graphManager = null  ; 
    }

    componentDidMount(){
    
    }
    addNewNode = (name)=>{
      
        if (name.toString().trim().length<=0) {
            alert('Cannot Submit Empty Name')
        }
        else{
            var manager = this.props.graphManager ;
            manager.addNode(name) ;
            this.updateParent()
        
        }
    }
    
    updateParent=()=>{
        if (typeof this.props.updateGraph === 'function'){
            this.props.updateGraph(this.props.graphManager) ;
        }else{
            alert('Could not update Parent graph') ;
        }
    }

    render(){
        const {match} = this.props ;
        var manager = this.props.graphManager ;
        var {project} = this.props ;
         
        console.log(project) ;

        if (manager === undefined){
            return (<div>
                No Graph Mounted
            </div>)
        }
        const query = new URLSearchParams(this.props.location.search );
        return (
            <div>
                <div>
                    <Link to={`${match.url}/addNode`}>Add Nodes</Link><span> </span>
                    <Link to={`${match.url}/edges`}>Add Edges</Link>
                    <br/>
                </div>
                <Switch>
                    <Route path={`${match.url}/addNode`} >
                        
                        <Task addTask={this.addNewNode} 
                        />
                    </Route>
                    <Route path={`${match.url}/task/`} render={()=>{
                        return <>
                        <Task addTask={this.addNewNode} 
                            fullForm={true}
                            label={query.get('label')}
                        />

                        </>
                    }} />
                        
                </Switch>
            
        </div>
        
        )
    }

    displayTask =()=>{
        alert(this.props.task) ;
    }
}

export default withRouter(Node) ;