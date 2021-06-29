import React from 'react'
import '../css/Register.css'
import axios from 'axios';

class Register extends React.Component{
    state ={
        firstName:'',
        lastName:'',
        userName:'',
        email:'',
        password:'',
        wait:false,
        api:'http://localhost:9001',
        answer:null
    }


    change =(e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit =e=>{
        e.preventDefault(); /*So the values entered don't show on URL*/
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



        this.setState({
            wait:true
        })
        this.sendData(data) ;


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

    async sendData(data){
        try{
            
            const response =  await axios.post(`${this.state.api}/user/newUser`,data)
            if (response.status===400){
                throw Error(response.statusText) ;
            }
            else{
                this.setState({
                    answer:response.data.message
                })  ;
            }
        }
        catch(error){
            console.log(error) ;
        }
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
                    <input name='firstName'
                           type='text'
                        placeholder='First Name' value={this.state.firstName}
                            onChange={e=>this.change(e)}
                    />
                    <p>Last Name</p>
                    <input name='lastName' type='text'
                        placeholder='Last Name' value={this.state.lastName}
                        onChange={e=>this.change(e)}
                    />
                    <p>Username</p>
                    <input name= 'userName' type='text'
                        placeholder='Username' value={this.state.userName}
                        onChange={e=>this.change(e)}
                    />

                    <p>Email</p>
                    <input name = 'email'
                        type='email'
                        placeholder='Email' value={this.state.email}
                        onChange={e=>this.change(e)}
                    />
                    <p>Password</p>
                    <input name='password'
                        type='password'
                        placeholder='Password' value={this.state.password}
                        onChange={e=>this.change(e)}
                    />
                <br />
                        <button  className="btn1" type="submit"> Submit </button>
                </form>
            </div>
        );
    }
}

export default Register ;