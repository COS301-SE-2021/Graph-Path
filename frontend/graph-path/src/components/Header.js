import React from 'react' ;

class Header extends React.Component{
    // constructor(props){
    //     super(props) ; 
    //     this.state = {
    //         log:false
    //     }
    // } 
    render(){
        if (this.props.log){
            return (
                <header className="App-header">
                <div>Graph Path</div>    
                <div>
                    <form onClick={this.props.logOut}>
                        <input type="submit" value="LogOff"/>    
                    </form></div>
                </header>
            )

        }
        return (
    <header className="App-header">
            Graph Path
            </header>
        )
    }
}

export default Header ; 