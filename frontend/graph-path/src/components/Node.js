import React from 'react'

class Node extends React.Component{
    // constructor(props){
    //     super(props) ; 
    //     this.state ={
    //         task:this.props.task ,
    //         started: false
    //     }
    // }

    render(){
        var color = "red"
        if (this.props.color){
            color = this.props.color ; 
            console.log("color: ",color) ; 
        }

        return (
            <a >
        <svg width="120">
            <circle cx="60" cy="80" r="50" fill={color} onClick={this.displayTask}/>
            {/* <div>{this.state.task}</div> */}
        </svg>
        </a>
        )
    }

    displayTask =()=>{
        alert(this.props.task) ;
    }
}

export default Node ;