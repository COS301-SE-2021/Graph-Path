import {React,Component} from "react";
//import "rsuite/dist/styles/rsuite-default.css" ;
import "rsuite/dist/styles/rsuite-dark.min.css" ;

import {HashRouter as Router,Switch,Route, Redirect} from 'react-router-dom' ;
import Dashboard from "./Dashboard";
import Landing from './Landing' ;
import NotFound from "./NotFound";
import axios from "axios";
import { connect} from 'react-redux' ;



class CustomHeader extends Component{

    constructor(props){
        super(props);
        this.state={

            show1:false,
            show2:false,

            show:false,
            openSignin:false,
            logged:false,
            loggedUser:{}

        }
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }
    changeLogStatus=(user)=>{
        console.log('logged',user)
        
            //get token
            let data = {
                email: user.email ,
                userObject:user
            }

            axios.post(`http://localhost:9001/user/requestToken`,data)
            .then((res)=>{
                // console.log('from token ',res)
                
                let authUser = {...user} ;
                // logInvalid(user)
                if (res.headers.authorization){
                    authUser['token'] =res.headers.authorization ;
                    console.log('Authed',authUser) ;
                    this.props.createUser(authUser);
                    this.setState({
                        logged:!this.state.logged,
                        loggedUser:authUser , 
                    }) ;
                }
                else{
                    alert(res.message) ;
                }
     
            })
            .catch((err)=>{
                console.log('for real',err) ;
            })
    
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
        // console.log('current',this.props)
        return (
            <div data-testid="tidHeader">
                <Router>

                  
                    <Switch>
            
                        <Route exact path="/" render={()=>{
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
                                    <Dashboard authUser={this.state.loggedUser}/>
                                    {
                                        !this.state.logged?<Redirect to="/"/>:""
                                    }
                                </>
                            )
                        }}
                        />
                    {
                       !this.state.logged?<Redirect to="/"/>:""
                    }
                  
                                      
                    <Route component={NotFound} />

               
                    </Switch>
            </Router>
            </div>

        )
    }
}

function createUser(user){
    // console.log('action',user)
    return {
      type:'CREATE_USER',
      payload:user
    }
}

function mapStateToProps(state){
    return {
        loggedUser:state.loggedUser
    } ;
  }
  

const mapDispatchToProps = {
    createUser
  }

export default connect(mapStateToProps,mapDispatchToProps)(CustomHeader) ;