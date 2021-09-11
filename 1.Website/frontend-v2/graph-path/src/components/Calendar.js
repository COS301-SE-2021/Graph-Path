import React from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import axios from "axios";

class Calendar extends React.Component{
    constructor(props){
        super(props) ;
        this.state = {
            api: 'http://localhost:9001',
            projects: [],
            date:undefined,
        }
    }

    componentDidMount(){
        this.getUserProjects() ;
        //this.getTodoList();
    }

    getUserProjects=()=>{
        axios.get(`${this.state.api}/project/getAllProjectsByUserEmail/${this.props.user.email}`,{
            headers:{
                authorization: this.props.user.token
            }
        })
            .then((res)=>{
                if (res.data.data !== undefined){
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

    render() {

        if(this.state.projects.length > 0) {
            console.log(this.state.projects)
            let data =[];
            this.state.projects.map((item,index)=>
                data[index] = {title: this.state.projects[index].projectName, date: this.state.projects[index].dueDate}
            )

            // const data = [
            //         {title: this.state.projects[0].projectName, date: this.state.projects[0].dueDate},
            //         {title: 'event 2', date: '2021-09-11'}
            // ]
            console.log(data)

            return (
                <div>
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        weekends={true}
                        events={data}
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