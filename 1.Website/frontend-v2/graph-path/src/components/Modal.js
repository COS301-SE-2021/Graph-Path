import  React from 'react' ;
import {Badge, Calendar, Popover, Whisper} from "rsuite";
import * as dateFns from "date-fns";
import axios from "axios";
import {eachDayOfInterval, eachMonthOfInterval} from "date-fns";

class Modal extends React.Component{
    constructor(props){
        super(props) ;
        this.state = {
            api: 'http://localhost:9001',
            projects: undefined,
            date:undefined,
            here:0
        }
    }

    // componentDidMount(){
    //     this.getUserProjects() ;
    //     //this.getTodoList();
    // }
    //
    // getUserProjects=()=>{
    //     axios.get(`${this.state.api}/project/getAllProjectsByUserEmail/${this.props.user.email}`,{
    //         headers:{
    //             authorization: this.props.user.token
    //         }
    //     })
    //         .then((res)=>{
    //             if (res.data.data !== undefined){
    //                 this.setState({
    //                     projects :res.data.data ,
    //
    //                 }) ;
    //             }
    //             else{
    //                 // this.setState({
    //                 //     loading:false
    //                 // }) ;
    //                 // alert('No projects')
    //             }
    //
    //         })
    //         .catch((err)=>{
    //
    //             // this.setState({
    //             //     loading:false
    //             // }) ;
    //             console.log('Error or Rejected',err)
    //         })
    //
    // }

     getTodoList=(date)=> {
        let day = dateFns.getDate(date[0]);
        console.log(day)
        switch (day) {
            case 11:
                return [
                    { time: '10:30 am', title: 'Meeting' },
                    { time: '12:00 pm', title: 'Lunch' }
                ];
            case 15:
                return [
                    { time: '09:30 pm', title: 'Products Introduction Meeting' },
                    { time: '12:30 pm', title: 'Client entertaining' },
                    { time: '02:00 pm', title: 'Product design discussion' },
                    { time: '05:00 pm', title: 'Product test and acceptance' },
                    { time: '06:30 pm', title: 'Reporting' },
                    { time: '10:00 pm', title: 'Going home to walk the dog' }
                ];
            default:
                return [];
        }

    }

     renderCell=()=> {
         let result = eachDayOfInterval({
             start: new Date(2021, 8, 1),
             end: new Date(2021, 10, 1)
         })
        const list = this.getTodoList( result);
        console.log("list",result)
        const displayList = list.filter((item, index) => index < 2);

        if (list.length) {
            const moreCount = list.length - displayList.length;
            const moreItem = (
                <li>
                    <Whisper
                        placement="top"
                        trigger="click"
                        speaker={
                            <Popover>
                                {list.map((item, index) => (
                                    <p key={index}>
                                        <b>{item.time}</b> - {item.title}
                                    </p>
                                ))}
                            </Popover>
                        }
                    >
                        <a>{moreCount} more</a>
                    </Whisper>
                </li>
            );

            return (
                <ul className="calendar-todo-list">
                    {displayList.map((item, index) => (
                        <li key={index}>
                            <Badge /> <b>{item.time}</b> - {item.title}
                        </li>
                    ))}
                    {moreCount ? moreItem : null}
                </ul>
            );
        }

        return null;
    }

    render() {
        console.log("calendar",this.props.user)
        //let date = 0; //this.state.projects[0].dueDate;
        if(this.state.projects === undefined){
            //do nothing
        }else{
           // console.log(this.state.projects[0].dueDate)
              //this.state.date = new Date(this.state.projects[0].dueDate)
        }



        return(
            <div data-testid="calendar-div-id">
            <Calendar bordered renderCell={this.renderCell} />
            </div>
        )
    }
}

export default Modal;