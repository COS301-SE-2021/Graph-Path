import React from 'react'
import '../css/Register.css'
import axios from 'axios';
import {useState,useEffect} from 'react'

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)

const useForm = () => {
    const [values,setvalues]=useState({
        firstName: '',
        lastName:'',
        userName:'',
        email:'',
        password:''
    })
}


class Register extends React.Component{
    //const [errors, setErrors]= useState({})
    state ={
        firstName:'',
        lastName:'',
        userName:'',
        email:'',
        password:'',
        wait:false,
        api:'http://localhost:9001',
        answer:null,





    }


    change =(e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit =e=>{
        e.preventDefault(); /*So the values entered don't show on URL and NOT to submit by itself*/
        // this.props.onSubmit(this.state);
        //display loading screen
        this.setState({
            wait:true
        }) ;

        console.log(this.state)
        const data = {
            firstName:this.state.firstName ,
            surname:this.state.lastName,
            email:this.state.email,
            username:this.state.userName,
            password:this.state.password,
            type: "Standard User",
            Notification:"Email"
        }

        console.log(data)

        //talk to api
        // fetch('http://localhost:9001/user/newUser',{
        //     method:'POST',
        //     body:data
        // }) 
        // .then(res => res.json())
        // .then(res =>{
        //     console.log(res) ;
        //     alert('user register, please try login')
        // })
        // .catch(err =>{
        //     if (err){
        //         console.log(err) ;
        //     }
        // })
        //
        // this.setState({
        //     wait:true
        // })
        this.sendData(data) ;


        /*...*/


        /*Clear inputs once you click on submit*/
        this.setState({
            firstName:'',
            lastName:'',
            userName:'',
            email:'',
            password:'',
            wait:false
        });
    }
    
    sendData (data){
        //path to make the post and wait for the response
    axios.post(`${this.state.api}/user/newUser`,data) 
    .then((response) =>{
       if(response.status===400){
           throw Error(response.statusText) ;
       }//else
       console.log('from back end',response)

       const res = response.data;
       console.log(res) ;
       this.setState({
           answer:res.message,
           responseData:res.data //data
        },()=>{
        //    alert('res:'+this.state.answer)
           console.log(this.state)
           if (this.state.answer!== null && this.state.answer){
            //    this.props.changeToDefault() ;
           }
        }) 
    
    },(response)=>{
        console.log('rejected',response) ;
    })
    .catch((error)=>{
        console.log(error) ;
    })
}
    render(){



        if (this.state.wait){
            document.getElementById("registerscreen").className.push('wait')
        }
        else{
            var scrn = document.getElementById('registerscreen') ; 
            if (scrn !== null) scrn.className ="" ; 
        }
        var ans = this.state.answer ;
        if (ans != null || ans != undefined){
            alert(`message:${ans}`) ;
        }

        return (
            <div id="registerscreen">
                <h4>Sign Up</h4>
                <form className="logForm" onSubmit={this.onSubmit} >
                    <p>First Name</p>
                    <input
                        name='firstName'
                           type='text'
                        placeholder='First Name' value={this.state.firstName}
                            onChange={e=>this.change(e)}
                    />

                    <p>Last Name</p>
                    <input
                        name='lastName' type='text'
                        placeholder='Last Name' value={this.state.lastName}
                        onChange={e=>this.change(e)}
                    />

                    <p>Username</p>
                    <input
                        name= 'userName' type='text'
                        placeholder='Username' value={this.state.userName}
                        onChange={e=>this.change(e)}
                    />

                    <p>Email</p>
                    <input
                        name = 'email'
                        type='email'
                        placeholder='Email' value={this.state.email}
                        onChange={e=>this.change(e)}
                    />

                    <p>Password</p>
                    <input
                        name='password'
                        type='password'
                        placeholder='Password' value={this.state.password}
                        onChange={e=>this.change(e)}
                    />

                <br />
                        <button  className="btn1" type="submit"> Submit </button>
                        <small>
                            Already Have an Account? Login <a href="#">Here</a>
                        </small>
                </form>
            </div>
        );
    }
}

export default Register ;