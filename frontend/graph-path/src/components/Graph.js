import React from 'react' ; 
import Node from './Node' ;
import Edge from './Edge' ;

class Graph extends React.Component{

    constructor(props){
        super(props) ; 
        this.state=  {
            NodeList:null 
        }
    }

    render(){
        if (!this.props.project){
            return (<div>
                Graph TExt FOr now
            </div>)
        }
        var objs = [] ; 
        // for (var item in Object.keys(this.props.project.Members)){
        //     objs.push(item) ;
        // }
        var obj = this.props.project.Members ; 
        Object.keys(obj).forEach(function (key) {
            var val = obj[key];
            // use val
            objs.push(val) ;
        });

        return (
            <div>
                <p>Is called {this.props.project.Name} </p> 
                {console.log(this.props.project, objs) }
                {objs.map((e,i)=> <Node key={i} task={e} />
                )}
                <Node color={"blue"}/> 
                <Edge />
            </div>
        ) ; 
    }
}

export default Graph ; 