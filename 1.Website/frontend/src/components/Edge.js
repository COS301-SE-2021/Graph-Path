import React from 'react' ; 

class Edge extends React.Component{
    constructor(props){
        super(props)  ; 
        this.state = {
            source:'Source Node',
            target:'Target Node'
        }
    }
    handleSelect = (event)=>{
        // console.log(event.target) ;
        if (event.target.id === 'sourceNode'){
            this.setState({
                source:event.target.value , 
            })
        }
        if ( event.target.id ==='targetNode'){
            this.setState({
                target:event.target.value
            })
        }
    }

    createEdge=()=>{
        if (this.state.source === 'Source Node' || this.state.target === 'Target Node'){
            // If no change alert that user must select 
            alert('Please select a valid edge')
        }
        else if (this.state.source === this.state.target){
            alert('Cannot create a looping egde')
        }
        else{
            //send the edge dimensions to graph manager
            if (typeof this.props.addEdge === 'function'){
                this.props.addEdge(this.state.source,this.state.target) ;
            }

        }
        console.log('when create edge clicked',this.state) ;
    }

    render(){
        
        // console.log('listing',this.props, 'state ',this.state) ; 
        const graph = this.props.graphToDisplay ; 
        if (graph !== undefined && graph.nodes !== undefined){
            if (graph.nodes.length > 0){
            //if theres a proper graph, show the nodes
                return (<div >
                <p>    Create Edge Between 
                </p>
                <div style={{display:'inline-flex'}}>
                
                <select value={this.state.source} onChange={this.handleSelect} id={"sourceNode"}>
                <option value={'Source Node'}>Source Node  </option>
                {
                    graph.nodes.map((node,index)=>{
                    return <option key={`s${index}`} value={node.id} >{ // key value is s1,s2,s3
                        node.label  
                    }</option>
                    })}    
                </select>
        
                <select value={this.state.target} onChange={this.handleSelect} id={"targetNode"}>
                <option value={'Target Node'}>Target Node  </option>
                    
                {
                    graph.nodes.map((node,index)=>{
                    return <option key={`t${index}`} value={node.id}> {// key value is t1,t2,t3
                        node.label  
                    }</option>
                    })}    
                </select>
                
                </div>
                <button onClick={this.createEdge}>Create Edge</button>

                </div>)
            }

        }
        return(
          <div>
              Please add a task 
          </div>
        )
    }
}

export default Edge ; 