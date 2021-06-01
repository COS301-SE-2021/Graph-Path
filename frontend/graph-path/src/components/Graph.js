import React from 'react' ; 
import Node from './Node' ;
import Edge from './Edge' ;

class Graph extends React.Component{

    constructor(props){
        super(props) ; 
        // this.state=  {
        //     project: 
        // }
    }

    render(){
        return (
            <div>
                {/* <p>Is called {this.props.project.name}
                </p> */}
                {/* <Node /> */}
                <Node color={"blue"}/> 
                <Edge />
            </div>
        ) ; 
    }
}

export default Graph ; 