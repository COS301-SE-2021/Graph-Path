import React from 'react' ; 

class Edge extends React.Component{
    // constructor(props){
    //     super(props) ; 
    // }
    render(){
        return (
            <svg className="GraphLine">
                <line x1="50" x2="50" y1="0" y2="1000" style={{stroke:'#00000F',
            strokeWidth:'20',}}></line>
            </svg>
        )
    }
}

export default Edge ; 