import React from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import axios from "axios";
import "../css/Calendar.css"

class Calendar extends React.Component{
    constructor(props){
        super(props) ;
        this.state = {
            api: 'http://localhost:9001',
            projects: [],
            tasks:[],
            date:undefined,
        }
    }

    componentDidMount(){
        this.getUserProjects() ;
        this.getUserTasks();
    }

    getUserTasks=()=>{
        axios.get(`${this.state.api}/task/getUserTasks/${this.props.user.email}`,{
            headers:{
                authorization: this.props.user.token
            }
        })
            .then((res)=>{
                if (res.data.data !== undefined){
                    // console.log("tasks",res.data.data)
                    this.setState({
                        tasks :res.data.data ,

                    }) ;
                }
                else{
                    // this.setState({
                    //     loading:false
                    // }) ;
                    // alert('No projects')
                }

            })
            .catch((err)=>{

                // this.setState({
                //     loading:false
                // }) ;
                console.log('Error or Rejected',err)
            })

    }

    getUserProjects=()=>{
        axios.get(`${this.state.api}/project/getAllProjectsByUserEmail/${this.props.user.email}`,{
            headers:{
                authorization: this.props.user.token
            }
        })
            .then((res)=>{
                if (res.data.data !== undefined){
                    console.log("projects",res.data.data)
                    this.setState({
                        projects :res.data.data ,

                    }) ;
                }
                else{
                    // this.setState({
                    //     loading:false
                    // }) ;
                    // alert('No projects')
                }

            })
            .catch((err)=>{

                // this.setState({
                //     loading:false
                // }) ;
                console.log('Error or Rejected',err)
            })

    }

     getRandomColor=()=> {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    render() {

        if(this.state.projects.length > 0) {
            let newD=[]
            let projD=[]
            let taskD=[]

            for(let index=0;index < this.state.projects.length; index++){
                let c = this.getRandomColor()
                projD[index] = {title: this.state.projects[index].projectName, date: this.state.projects[index].dueDate,backgroundColor:c,allDay:true}
                if(this.state.tasks.length > 0){
                    for(let t=0; t < this.state.tasks.length; t++){
                        if(this.state.projects[index]._id === this.state.tasks[t].projectID){
                            taskD[t] = {title: this.state.tasks[t].description, date: this.state.tasks[t].dueDate,color:c,allDay : false}
                        }
                    }
                }

            }

            newD = [...projD,...taskD];

            console.log("data proj",projD)
            console.log("data task",taskD)

            return (
                <div>
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        eventBorderColor="transparent"
                        weekends={true}
                        events={ newD}

                    />

                </div>
            );
        }else{
            return (
                <>
                    <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
                </>
            )
        }
    }
}
export default Calendar;