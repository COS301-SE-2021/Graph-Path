import React from 'react' ; 

class Edge extends React.Component{
    // constructor(props){
    //     super(props) ; 
    // }
    render(){
        return (
            <svg className="GraphLine">
                <line x1="0" x2="250" y1="75" y2="75" style={{stroke:'#00000F',
            strokeWidth:'20',}}></line>
            </svg>

        )
    }
}

export default Edge ; 