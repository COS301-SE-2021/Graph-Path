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
        var number = prompt('How many nodes?') ;
        for(var i =0 ; i < number ; i++){
            return (
                <div>
                    {/* <p>Is called {this.props.project.name}
                    </p> */}
                    {/* <Node /> */}
                    
                    <Node key={i}
                     color={"blue"}/> 
                    <Edge />
                </div>
            ) ; 
        }
    }
}

export default Graph ; 