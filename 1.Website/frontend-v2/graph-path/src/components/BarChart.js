import React from 'react' ;
import {Bar} from 'react-chartjs-2';
import axios from "axios";
import {Button, Dropdown, FlexboxGrid, List} from "rsuite";
import Logo from "../img/Logo4.png";
import '../css/Common.css'

class BarChart extends React.Component{
    constructor(props){
        super(props) ;
        this.state = {
            currentProject:{},
            projects:[],
            task:[],
            api:'http://localhost:9001',
            showChart: false
        }
    }

    componentDidMount(){
        this.getAllProjects() ;

    }
    getAllProjects=()=>{

        axios.get(`${this.state.api}/project/getAllProjectsByUserEmail/${this.props.user.email}`,{
            headers:{
                authorization: this.props.user.token
            }
        })
            .then((res)=>{
                console.log('Success',res) ;
                if (res.data.data !== undefined){
                    this.setState({
                        projects :res.data.data ,
                    }) ;

                }
                else{
                    // this.setState({
                    //     loading:false
                    // }) ;
                    alert('No projects')
                }

            })
            .catch((err)=>{

                // this.setState({
                //     loading:false
                // }) ;
                console.log('Error or Rejected',err)
            })
    }
    getChartStats=(projId)=>{
        if(this.state.projects.length > 0 ) {
            this.setState({
                showChart:true
            })
            console.log("get proj id", this.state.projId)


            axios.get(`${this.state.api}/project/statistics/donutChart/`+projId, {
                headers: {
                    authorization: this.props.user.token
                }
            }).then((res) => {
                console.log('Stats Success', res.data.data);
                if (res.data.data !== undefined) {
                    this.setState({
                        task: res.data.data,
                        // loading:false

                    });
                }
            })
                .catch((err) => {
                    console.log('Error or Rejected', err)
                })
        }
    }
    render() {
        return(
            <>
                <div>
                    <h3> Assigned Sub-Tasks Statistics</h3>
                    <Dropdown title={"Projects"}>
                        <Dropdown.Item style={{minWidth:"30vw",marginRight:"10%"}}>
                            <List hover>
                                {this.state.projects.map((item,index)=>
                                    <List.Item key={item['projectName']} index={index}>
                                        <FlexboxGrid>
                                            <FlexboxGrid.Item
                                                colspan={6}
                                            >
                                                <div>{item.projectName}</div>
                                            </FlexboxGrid.Item>
                                            <FlexboxGrid.Item
                                                colspan={6}
                                            >
                                                {/*<div>{item.projectOwner}</div>*/}
                                            </FlexboxGrid.Item>
                                            <FlexboxGrid.Item
                                                // colspan={6}
                                                // style={{
                                                //
                                                // }}
                                            >
                                                <Button onClick={()=>this.getChartStats(item._id)}>View</Button>
                                            </FlexboxGrid.Item>
                                        </FlexboxGrid>
                                    </List.Item>
                                )}
                            </List>
                        </Dropdown.Item>
                    </Dropdown>
                </div>
                {
                    this.state.projects.length > 0 && this.state.showChart ?
                        <>
                            {/*<h5>{this.state.task.projectName}</h5>*/}
                            <h5>Show Project Name</h5>
                            <Bar data={{
                                labels: [
                                    'Not Started',
                                    'In-Progress',
                                    'Complete'
                                ],
                                datasets: [{
                                    label:"project 1",
                                    data: [20,30,100],
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(255, 159, 64, 0.2)',
                                        'rgba(137,255,86,0.2)'
                                    ],
                                    borderColor: [
                                        'rgb(255, 99, 132)',
                                        'rgb(255, 159, 64)',
                                        'rgb(137, 255, 86)',
                                    ],
                                    borderWidth: 1

                                }]

                            }}

                            />
                            <div className="dropdown-div-bar" id="dropdown-div">
                                <Dropdown id="dropdown-title" title={"Not Started"}>
                                    <Dropdown.Item>Task 1 task 1</Dropdown.Item>
                                    <Dropdown.Item>Task 6</Dropdown.Item>
                                    <Dropdown.Item>Task 3</Dropdown.Item>
                                </Dropdown>
                            </div>
                            <div className="dropdown-div-bar-2" id="dropdown-div-3">
                                <Dropdown id="dropdown-title" title={"In-Progress"}>
                                    <Dropdown.Item>Task 4</Dropdown.Item>
                                </Dropdown>
                            </div>
                            <div className="dropdown-div-bar-3" id="dropdown-div-3">
                                <Dropdown id="dropdown-title" title={"Complete"}>
                                    <Dropdown.Item>Task 5</Dropdown.Item>
                                    <Dropdown.Item>Task 7</Dropdown.Item>
                                </Dropdown>
                            </div>
                        </>
                        :
                        <>
                            <h4>
                                Select project you want to view your assigned sub-tasks progress for.
                            </h4>
                            <img alt="graph logo" id="logoPic" src={Logo}/>
                        </>
                }
            </>
        )
    }
}
export default BarChart