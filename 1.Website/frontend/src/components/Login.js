import React from 'react'
import '../css/Login.css'
import axios from 'axios' ;
import {Link} from 'react-router-dom'


class Login extends React.Component{
    constructor(props){
        super(props) ; 
        this.state ={
            email:'',
            password:'',
            answer: 'Fields cannot be left blank',

            //Errors
            formErrors:{
                email:false,
                password:false
            },
            responseData:null
        }
    }

    change =(e) => {

        console.log(e.target.name);
        e.preventDefault(); /*So the values entered don't show on URL*/

        const {name,value}=e.target;

        this.setState({[name]:value });
    }

    onSubmit =e=>{
        e.preventDefault(); /*So the values entered don't show on URL*/

       // let formErrors = {...this.state.formErrors};

        // send data to server 
        console.log(this.state)  ;
        // fetch(`http:`)
        // const form = document.getElementById('inForm') ; 
        const data = {
            email: this.state.email,
            password:this.state.password
        } ;
        if (data.password==='' || data.email===''){
            //alert('please enter password') ;
            data.password==='' ?
                this.setState({
                    formErrors:{
                        password:false,
                        email:this.state.formErrors.email

                    },
                    responseData:'',
                    answer:'Cannot be left blank'
                })
                :     this.setState({
                    formErrors: {
                        password: true,
                        email:this.state.formErrors.email
                    },
                    responseData:undefined,
                })
            ;

            data.email==='' ?
                this.setState({
                    formErrors:{
                        email:false,
                        password:this.state.formErrors.password

                    },
                    responseData:undefined,
                    answer:'Cannot be left blank'
                })
                :     this.setState({
                    formErrors: {
                        email: true,
                        password:this.state.formErrors.password
                    },
                    responseData:'',
                })
         }
        else{
            //alert('before send');
            console.log(data);
            this.sendData(data) ;
            console.log('answer from sendData',this.state.answer);
         
        }
    }
    
    sendData(data){

      //  let checkError = {...this.state.check};
        try{  

        // fetch(`http://localhost:90001/user/login/${data.email}`)
        axios.post(`http://localhost:9001/user/login/`,data)
        .then((response)=>{
            if (response.status===400){
                throw Error(response.statusText) ;
            }
            console.log('from back end',response)

            const res = response.data;
            console.log(res) ;
            this.setState({
                answer:res.message,
                responseData:res.data //data
            },()=>{
                // alert('res:'+this.state.answer)
                console.log(this.state)//Heavy checks
                if (this.state.responseData === undefined || this.state.responseData === null ){

                    this.setState({
                        formErrors:{
                            email:false,
                            password:false
                        }
                    })
                }
                else if (this.state.responseData.password !== undefined){
                    //access given
                    // alert('Am I getting access');
                    this.props.logIn(true) ; 
                    this.props.updateUser(this.state.responseData)  ;
                }
               // else this.props.logIn() ;
            }) ;
            
        },(response)=>{
                alert('Server Error, please try again later.\n'+response) ;
                console.log('rejected',response) ;
    
        })
        .catch((error)=>{
            console.log(error) ;
        })
        }
        catch(error){
            console.log(error) ;
        }
        if (this.state.password === 'admin'){
            this.props.logIn() ;
        }
         
    }

    render(){
        const {formErrors} = this.state;
        return (

            <div className="BoxContainer">
                <div className="loginScreen">

                    <form className="logForm" id="inForm" onSubmit= {this.onSubmit}>
                        <div className="FormContainer">
                            <h4>Sign In</h4>
                            <p>Email</p>
                            <input
                                className={formErrors.email===false ? 'error': null}
                                name = 'email'
                                type='email'
                                placeholder='Email' value={this.state.email}
                                onChange={e=>this.change(e)}
                            />
                            {formErrors.email === false && this.state.responseData ===undefined &&(
                                <span className='errorMessage'>{this.state.answer}</span>
                            )}


                            <p>Password</p>
                            <input
                                className={formErrors.password===false ? 'error': null}
                                name='password'
                                type='password'
                                placeholder='Password' value={this.state.password}
                                onChange={e=>this.change(e)}
                            />
                            {formErrors.password === false && this.state.responseData !==null ?
                                <span className='errorMessage'>Invalid Password</span>
                                :<span className='errorMessage'>{this.state.answer.indexOf('password')>0?this.state.answer:''}</span>
                            }
                        </div>

                        <input type="submit" className="btn1" value="Login" />
                        <Link to=""> Forgot your password?</Link>
                        <br/>

                    </form>
                </div>
            </div>



        );
    }
}

export default Login ;