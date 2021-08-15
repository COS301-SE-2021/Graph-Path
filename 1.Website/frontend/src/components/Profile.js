import React from 'react';
import '../css/Profile.css'
import PopUpMessage from "./PopUpMessage";
import {Link} from 'react-router-dom' ;
import axios from "axios";

class Profile extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            disabled : true,
            empty : false,
            valid: false,
            pass: true,
            username: '',
            password: '',
            email: this.props.userEmail.email,
            api:'http://localhost:9001',
            answer:undefined,
            responseData:null,
            popUp: false,
            popUpText: "",

            formErrors: {
                password:""
            }
        }
    }


    /* Change the form to be editable*/
    enableEdit = () => {
        this.setState({
            disabled: !this.state.disabled
        })
    }

    /* disable and enable the pop up*/
    showPopUP = () =>{
        this.setState({
            popUp: true
        })
        setTimeout(
            () =>
                this.setState({
                    popUp: false
                }),5000
        );
    }

    change =(e) => {
        e.preventDefault();
        const {name,value}=e.target;
        let formErrors = {...this.state.formErrors};
        switch(name){
            case 'username':
                this.setState({
                    empty : value.length === 0,
                    valid : name.match(/^[a-zA-Z]+$/)
                })
                break;

            case 'password':
                formErrors.password = value.length < 8 ? 'Minimum for password should be 8 characters'
                    : "";
                if(value.length < 8){
                    this.setState({
                        pass:false
                    })
                }else{
                    this.setState({
                        pass:true
                    })
                }
                break;

            default: break;
        }

       this.setState({ formErrors, [name]: value });

    }

    onSubmit = (e) =>{
        e.preventDefault();
        console.log("submitted",this.state)


        const data = {
            username: this.state.username,
            password: this.state.password
        }
        console.log("data",data)

        if(data.username === '' && data.password === ''){
            //alert("nothing changed");
            this.setState({
                popUpText: "User Information Update Failed"
            });
            this.showPopUP();
        }else{
            //checks if username is empty and password is less than 8
            if(this.state.empty === true || this.state.pass === false){
                this.setState({
                    popUpText: "User Information Update Failed"
                })
                this.showPopUP();
            }else{
                this.sendData(data)
                this.enableEdit();
                this.setState({
                    popUpText: "User Information Updated"
                });
                this.showPopUP()
            }
        }
    }

    sendData(data){
        try {
            /**
             * Set url for value(s) being updated
             */

            let url = '';
            if(data.username !== '' && data.password === ''){
                url = this.state.api+"/user/updateUserUsername/"+this.state.email+"/"+data.username;
            }else if(data.username === '' && data.password !== ''){
                url = this.state.api+"/user/updateUserPassword/"+this.state.email+"/"+data.password;
            }else if(data.username !== '' && data.password !== ''){
                url = this.state.api+"/user/updateUserUsernameAndPassword/"+this.state.email+"/"+data.username+"/"+data.password;
            }


            axios.patch(`${url}`)
                .then((response) => {
                    if (response.status === 400) {
                        throw Error(response.statusText);
                    }

                    const res = response.data;

                    this.setState({
                        answer: res.message,
                       // responseData:res.data
                    }, () => {
                       // console.log("response", this.state.responseData)
                        if (this.state.answer !== undefined) {
                            //alert(`Username or Password changed `)
                            //this.props.updateUser(data)

                        } else {
                            alert(`Something went wrong please update again `)
                        }
                    })
                }, (response) => {
                    console.log('rejected', response);
                    alert('Server Error, Please try again later');
                })
                .then(()=>{
                    axios.get(`http://localhost:9001/user/getUserByID/${this.props.userEmail.id}`)
                        .then((response)=>{
                            if(response.status === 400){
                                throw Error(response.statusText);
                            }
                            const res = response.data;
                            this.setState({
                                responseData: res.data
                            },()=>{
                                console.log("resp",this.state)
                                if(this.state.responseData.username === data.username){
                                    this.props.updateUser(this.state.responseData);
                                }
                            })
                        })
                        .catch((err)=>console.log('Really?',err))
                })

        }catch (error){
            console.log(error);
        }
    }

    render() {
    // console.log(' prop objects',this.props) ; 

        const {formErrors} = this.state;
    const userInfo = this.props.userEmail;
    console.log(userInfo)
        return(
            <div className="profileContainer">
                <div className="App-Link">
                    <Link to="/dashboard" className="btn1" id="dashBtn">Dashboard</Link>
                    <span>   .   </span>
                    {/* <Link to={`${match.url}/editProfile`}  >Edit Profile</Link> */}
                    <input className="btn1" type="button" value="Edit Profile" onClick={this.enableEdit} disabled = {(this.state.disabled) ? "" : "disabled"} />
                </div>

                <h1>Profile</h1>

                <div className="info">
                    <form className="profileForm" onSubmit={this.onSubmit} >
                        <label>First Name</label>
                        <input value={userInfo.firstName}
                           disabled type='text'    />


                        <label>Last Name</label>
                        <input value={userInfo.lastName}
                           disabled
                        type='text'/>


                        <label>Username</label>
                        <input type="text"
                               name="username"
                               placeholder="Enter Username"
                               defaultValue={userInfo.username}
                               onChange={this.change}
                               disabled = {(this.state.disabled) ? "disabled" : ""} />
                        {
                            this.state.empty === true ? <span className="errorSpan" >Field cannot be empty</span> : ""
                        }

                        <label>Email</label>
                        <input value={userInfo.email}
                               type='text'
                               disabled/>

                        <label>New Password</label>
                        <input placeholder="Enter New Password"
                               name="password"
                               type="password"
                               onChange={this.change}
                               value={this.state.password}
                               disabled = {(this.state.disabled) ? "disabled" : ""} />

                        {formErrors.password.length > 0 && (
                            <span className='errorSpan'>{formErrors.password}</span>
                        )}

                        <input type="submit"
                               className="btn1"
                               value="Update"

                               disabled = {(this.state.disabled) ? "disabled" : ""} />


                        <input type="button"
                               className="btn1"
                               id="cancelBtn"
                               value="Cancel"
                               onClick={this.enableEdit}
                               disabled = {(this.state.disabled) ? "disabled" : ""} />

                    </form>
                    {this.state.popUp && <PopUpMessage text={this.state.popUpText} />}

                </div>

            </div>

        )
    }
}
export default Profile;