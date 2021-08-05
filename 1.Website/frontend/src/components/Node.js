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
        var manager = this.props.graphManager ;
        manager.addNode(name) ;
        this.updateParent()
    }
    
    updateParent=()=>{
        if (typeof this.props.updateGraph === 'function'){
            console.log('Update:',this.props.graphManager)
            this.props.updateGraph(this.props.graphManager) ;
        }else{
            alert('Could not Parent graph') ;
        }
    }

    render(){
        const {match} = this.props ;
        var manager = this.props.graphManager ;

        if (manager === undefined){
            return (<div>
                No Graph Mounted
            </div>)
        }
    
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
                </Switch>
            
        </div>
        
        )
    }

    displayTask =()=>{
        alert(this.props.task) ;
    }
}

export default withRouter(Node) ;