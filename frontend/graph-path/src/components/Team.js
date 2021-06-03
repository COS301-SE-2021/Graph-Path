import React from 'react';

class Team extends React.Component{
    render(){
        const {name} = this.props;
        console.log(this.props);
        if(name === null){
            return (
                <div className="Team">No members for this project</div>
            );
            
        }else{
            return (
                <div>{name.name}</div> 
            );
        }
       
    }
}

export default Team;