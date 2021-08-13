import React from 'react' ;
// import {BrowserRouter as Router, Switch,Route,Link} from 'react-router-dom' ;

class TaskList extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            tasks: [],
            isloading: false,

            api: "http://localhost:9001"
        }
    }

    componentDidMount = ()=>{
        this.viewTasksByProjects();
    }

    viewTasksByProjects = ()=> {

        this.setState({
            isloading: true
        });

        fetch(`${this.state.api}/Task/getAllTasksByProjects/`)
            .then(res => res.json())
            .then(result => {
                const taskk = result;
                //No tasks to view
                if (taskk.data === undefined) {
                    this.setState({
                        tasks: [],
                        isloading: false
                    });
                } else {
                    //some task found
                    this.setState({
                        tasks: taskk.data,
                        isloading: false

                    });
                }
            })
    }

    render(){
        const {isloading} = this.state;
        if(isloading===false){
            return <div>Check if something gets printed...</div>
        }
        else{
            return(
                //List in a ordered manner

                <ul>
                    <li>

                    </li>
                </ul>
            )
        }

    }
  //  }
}
export default TaskList ;