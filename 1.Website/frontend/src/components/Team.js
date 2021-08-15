import React from 'react';
import '../css/Team.css'; 
import Select from 'react-select';
import axios from 'axios';
class Team extends React.Component{
    constructor(props){
        super(props) ; 
        this.state = {
            chosen:[],
            list:[], 
            role:"client"
        }
    }

    saveMemberList = (result) =>{
        console.log('saving members',result) ;
        if (typeof this.props.chooseMember === 'function' ){
            this.props.chooseMember(result) ; 
        }

    }
    componentDidMount(){
        this.getListOfUsers() ;
    }
    getListOfUsers = ()=>{
        axios.get(`http://localhost:9001/user/listOfAllUsersExceptYourself/${this.props.userEmail}`)
        .then((res)=>{
            console.log(res)
            if (res.data !== undefined){
                const users = res.data.data
                console.log('suers',users) ;
                if (users !== undefined && Array.isArray(users)){
                    var specilized = []  ;
                    users.forEach((val)=>{
                        let temp = {
                            label:`${val.firstName} ${val.lastName}`,
                            value: val.email
                        }
                        specilized.push(temp)
                    }) ; 
                    this.setState({
                        list:specilized
                    }) ;
                }
                else{
                    alert('Something wrong happened')
                }

            }
            else{
                console.log('suers') ;

                this.setState({
                    list:[]
                })
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    sortResults = (results)=>{
        var ch = [] ; 
        results.forEach(element => {
            console.log('inside each ',element)
            let mem = {
                email:element.value,
                role:this.state.role
            }
            ch.push(mem) ;
        }) ;
        return new Promise((resolve,reject)=>{
            ch.length>0 ? resolve(ch):reject(ch) 
        }) ; 
    }
    handleSearch= (results)=> {
        // var newList = this.state.list ; 
        console.log('Search/Rm',results) ;
        if (results.length > 0){
                this.setState({
                chosen : results
            },()=> this.saveMemberList(this.state.chosen)) ;
        
        }
        else{
            this.setState({
                chosen : []
            },()=> this.saveMemberList([])) ;
        }
    }
    handleSelect = (item) =>{
        console.log('key change',item) ;
        this.saveMemberList(item)
    }
    render(){
        const colourStyles = {
            control: styles => ({ ...styles, backgroundColor: 'white' }),
            option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            //   const color = chroma(data.color);
              return {
                ...styles,
                backgroundColor: isDisabled ? 'red' : 'blue',
                color: '#FFF',
                cursor: isDisabled ? 'not-allowed' : 'default',
              };
            }
          };
        if (Array.isArray(this.state.list)){
            if (this.props.currentUsers !== undefined){
                return null
            }
            if (this.state.list.length > 0)
                return (
                    <>
                <Select options={this.state.list} 
                    onChange={this.handleSearch}
                    placeholder={'Search Member'}
                    isSearchable={true}
                    isMulti={true}
                    styles={colourStyles}
                />
                </>)
            else{
            return (
                <div>Loading...</div>
            )
            }
        }
        return (
            <div></div> 
        )
    
    }
}

export default Team;