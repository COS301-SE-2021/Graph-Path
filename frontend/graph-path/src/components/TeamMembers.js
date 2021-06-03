import React from 'react';
import Team from './Team';
import '../css/Team.css'


class TeamMembers extends React.Component{
   
    constructor(props){
        super(props);
        this.state = {
            show: false
        };
    }

    toggleShow = () => {
        this.setState({
            show: !this.state.show
        })
    }
    render(){
        const {team} = this.props;
        

        if(this.state.show === true){
            return (
                <div className="Team">
                    <button onClick = {this.toggleShow}>
                    Members</button>
                    
                    {team.map((name,index)=> (
                        <Team key={index} name={name} />
                    ))}
                    
                    
                </div>
            );
        }else{
            //show nothing
            return(
                <div className="Team">
                    <button onClick = {this.toggleShow}>Members</button>
                </div>
                
            );
        }
       
    }
}

export default TeamMembers;