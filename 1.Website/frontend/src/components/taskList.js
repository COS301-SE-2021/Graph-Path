import React from 'react' ;
import { Link } from 'react-router-dom';

class taskList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            tasks: [],
            isloading: false
        },
            api: "http://localhost:9001"
    }

    componentDidMount = ()=>{
        this.viewTasksByProjects();
    }

    viewTasksByProjects = ()=>{

        this.setState({
           isloading:true
        }) ;

        fetch(`${this.state.api}/Task/getAllTasksByProjects/${}`)
            .then(res=>res.json())
            .then((result)=>{
                const taskk = result ;
                //No tasks to view
                if (taskk.data === undefined ){
                    this.setState({
                        tasks:[],
                        isloading:false
                    }) ;
                }
                else{
                    //some task found
                    this.setState({
                        tasks: taskk.data,
                        isloading:false

                    }) ;
                })
    }
    render(){

        return (

        )
    }
}
export default taskList ;