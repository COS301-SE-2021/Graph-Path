import React from 'react';
import '../css/PopUpMessage.css'


class PopUpMessage extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            isHidden: false
        }
    }
    //change popUp on parent
    change =()=>{
        this.setState({
            isHidden: !this.state.isHidden
        })
    }

    render() {
        const popUpText = this.props.text;
        return(
            <div  className="popUpContainer">
                <p>{popUpText}</p>
                <button onClick={this.change}>click</button>
            </div>
        )
    }
}
export default PopUpMessage;