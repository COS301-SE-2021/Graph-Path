import React from 'react'
import '../css/Login.css'
import axios from 'axios' ;
import {Link} from 'react-router-dom'

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)

const formValid =({formErrors,...rest})=>{
    let valid =true;

    //Checks for individual null values
    Object.values(formErrors).forEach(val=> {
            val.length> 0 && (valid=false);
        }
    );

    //Checks for when you submit form with all null values
    Object.values(rest).forEach(val=> {
        val==null && (valid=false);
    });

    return valid;

}
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
       // this.setState({
       //     [e.target.name]: e.target.value
        //});

        e.preventDefault(); /*So the values entered don't show on URL*/

        const {name,value}=e.target;

        this.setState({[name]:value });
    }

    onSubmit =e=>{
        e.preventDefault(); /*So the values entered don't show on URL*/

        const {name,value}=e.target;

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
        else /*if (data.password !== '' && data.email!=='' && emailRegex.test(value) && data.password.length>= 8)*/{
            //alert('before send');
            console.log(data);
            this.sendData(data) ;
            console.log('answer from sendData',this.state.answer);
           /* this.setState({
                email:'',
                password:''
            });*/
        }
     //  else formErrors.password='Make sure all fields are filled in '

        //change status of login

        //this.setState({ formErrors, [name]: value });
    }
    
    sendData(data){

      //  let checkError = {...this.state.check};
        try{  

        // fetch(`http://localhost:90001/user/login/${data.email}`)
        axios.get(`http://localhost:9001/user/login/${data.email}`)
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
                console.log(this.state)//Heavey checks
                if (this.state.responseData === undefined || this.state.responseData.password !== this.state.password.toString() ){
                    alert('try again') ;

                    this.setState({
                        formErrors:{
                            email:false,
                            password:false
                        }
                    })
                }
                else if (this.state.responseData.password === this.state.password.toString() && this.state.answer){
                    //access given
                    alert('Am I getting access');
                    this.props.logIn() ; 
                    this.props.updateUser(this.state.responseData)  ;
                }
               // else this.props.logIn() ;
            }) ;
            
        },(response)=>{
                console.log('rejected',response) ;
    
        })
        .catch((error)=>{
            console.log(error) ;
        })
        }
        catch(error){
            console.log(error) ;
        }
         
    }

    render(){
        const {formErrors} = this.state;
        return (

            <div className="loginScreen">
                <form className="logForm" id="inForm" onSubmit= {this.onSubmit}>
                    <h4>Sign In</h4>
                    <p>Email</p>
                    <input
                        className={formErrors.email===false ? 'error': null}
                        name = 'email'
                        type='email'
                        placeholder='Email' value={this.state.email}
                        onChange={this.change}
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
                    {formErrors.password === false && this.state.responseData !==null &&(
                        <span className='errorMessage'>Invalid Password</span>
                    )}
                    <input type="submit" className="btn1" value="Login" />
                    Don't Have an Account? Register <Link to="/signUp"> Here</Link>
                </form>
            </div>


        );
    }
}

export default Login ;