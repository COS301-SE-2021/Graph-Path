import React from 'react' ; 
import SigmaGraph from './SigmaGraph';
import {BrowserRouter as Router, Switch,Route,Link} from 'react-router-dom' ;

class Graph extends React.Component{

    constructor(props){
        super(props) ; 
        this.state=  {
            NodeList: {
                nodes:[{id:"n1",label:"Task A"},{id:"n2",label:"Task B"}],
                edges:[{id:"e1",source:"n1",target:"n2",label:"AB"},]
            },
            linkNumber : -1
        }
    }
    //GET ALL Projects for User
    //Display List of Projects
    //Display  Graph on Click
    render(){
        console.log('Graph rerendering') ;
        const graph2 = {
            nodes:[{id:"n1",label:"Task 1"},{id:"n2",label:"Task 2"}],
            edges:[{id:"e1",source:"n1",target:"n2",label:"AB"},]
        }

        const graph1 = {
            nodes:[{id:"n1",label:"Task A"},{id:"n2",label:"Task B"},{id:"n3",label:"Task C"}],
            edges:[{id:"e1",source:"n1",target:"n2",label:"AB"},{id:"e2",source:"n2",target:"n3",label:"BC"}]
        }
        let listArray = [graph1,graph2] ; 
        let keyNum = -1 ;
        let projNum = -1 ;
        console.log('sending graph obj ',this.state.NodeList)
        return (
            <Router>
                <div>
                    MENU

                    <ul>
                        {
                            
                            listArray.map( i => {
                                
                                keyNum = keyNum+1 ;
                                return <li key={keyNum}> 
                                    <Link data-projnum={keyNum} onClick={(e) =>{
                                    this.changeNodeList(i, e.target.getAttribute("data-projnum"))}}
                                    to={`/project/${keyNum}`}>{i.nodes[0].label}</Link>
                                </li>
                            })
                        }
                    </ul>
                </div>
                
                <Switch>
                    <Route path={`/project/:${this.state.linkNumber}`}>               
                        <SigmaGraph key={this.state.linkNumber}
                            graphToDisplay={this.state.NodeList}
                        />
                    </Route>
                </Switch>
            </Router>
            
        ) ; 
    }

    changeNodeList = (node,num) =>{
        this.setState({
            NodeList:node,
            linkNumber:num
        }) ;
    } 
}

export default Graph ; 