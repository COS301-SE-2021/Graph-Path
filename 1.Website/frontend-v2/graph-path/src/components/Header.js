import {React,Component} from "react";
//import "rsuite/dist/styles/rsuite-default.css" ;
import "rsuite/dist/styles/rsuite-dark.min.css" ;

import {HashRouter as Router,Switch,Route, Redirect} from 'react-router-dom' ;
import Dashboard from "./Dashboard";
import Landing from './Landing' ;
import NotFound from "./NotFound";



class CustomHeader extends Component{

    constructor(props){
        super(props);
        this.state={

            show1:false,
            show2:false,

            show:false,
            openSignin:false,
            logged:false

        }
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }
    changeLogStatus=()=>{
        // console.log('logged')
        this.setState({
            logged:!this.state.logged
        }) ;
    }
    open(){
        this.setState({ show1: true,show2:false})
    }
    close(){
        this.setState({show1: false})
    }
    signInMododal = ()=>{
        this.setState({
            openSignin:!this.state.openSignin
        }) ;
        
    }
    render(){
        return (
            <div data-testid="tidHeader">
                <Router>

                  
                    <Switch>
                        <Route path="/home" render={()=>{
                            return <>
                            <Landing logInvalid={this.changeLogStatus} />
                            {
                       this.state.logged?<Redirect to="/dashboard"/>:""
                   }
                            </> 
                        }} />
                       
                        <Route path='/dashboard' render={()=>{
                            return(
                                <>
                                    <Dashboard/>
                                    {
                       !this.state.logged?<Redirect to="/home"/>:""
                   }
                                </>
                            )
                        }}
                        />
                                          {
                       !this.state.logged?<Redirect to="/home"/>:""
                   }
                  
                  
                    
                        <Route component={NotFound} />

               
                    </Switch>
            </Router>
            </div>

        )
    }
}


export default CustomHeader ;