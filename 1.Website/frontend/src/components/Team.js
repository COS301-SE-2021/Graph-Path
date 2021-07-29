import React from 'react';
import '../css/Team.css'; 
import Search from 'react-search' ;
class Team extends React.Component{
    constructor(props){
        super(props) ; 
        this.state = {
            chosen:[],
            list: [{id:3,value:'nani@gmail.com'},{id:1,value:'my@gmail.com'},{id:2,value:'my2@gmail.com'}]
        }
    }

    saveMemberList = (result) =>{
        console.log('saving members',result) ;
        if (typeof this.props.chooseMember === 'function' ){
            this.props.chooseMember(result) ; 
        }

    }
    sortResults = (results)=>{
        var ch = [] ; 
        results.forEach(element => {
            console.log('inside each ',element)
            ch.push(element.value) ;
        }) ;
        return new Promise((resolve,reject)=>{
            ch.length>0 ? resolve(ch):reject(ch) 
        }) ; 
    }
    handleSearch= (results)=> {
        // var newList = this.state.list ; 
        console.log('Search/Rm',results) ;
        if (results.length > 0){
            this.sortResults(results)
            .then(ans =>{
                this.setState({
                    chosen : ans
                }) ;
                return this.state.chosen
            })
            .then( ans =>{
                this.saveMemberList(this.state.chosen)
            })
            .catch(err=>{
                console.log('Error when updating team')
            })
        
        }
        else{
            this.setState({
                chosen : []
            }) ;
        }
    }
    handleSelect = (item) =>{
        console.log('key change',item) ;
    }
    render(){
        // const {name} = this.props;
        console.log('Team state',this.state);
        return (
        <Search items={this.state.list} 
            placeholder='Search Member'
            multiple={true}
            // maxSelected={1}
            onItemsChanged = {this.handleSearch}
            // onKeyChange={this.handleSelect}
            // NotFoundPlaceholder='User Not Found,'
            // onSelect={this.handleSelect} 
            // fuseOptions={{keys:["email"]}}
            // resultStringKeyName="email"
        />)
        // if(name === null){
        //     return (
        //         <div className="Team">No members for this project</div>
        //     );
            
        // }else{
        //     return (
        //         <div>{name.name}</div> 
        //     );
        // }
       
    }
}

export default Team;