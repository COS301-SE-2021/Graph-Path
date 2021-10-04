import React from 'react' ;
import {Bar} from 'react-chartjs-2';
import axios from "axios";
import {Button, Dropdown, FlexboxGrid, List} from "rsuite";
import Logo from "../img/Logo4.png";
import '../css/Common.css'
import PropTypes from "prop-types";

class BarChart extends React.Component{
    constructor(props){
        super(props) ;
        this.state = {
            currentProject:{},
            projects:[],
            task:[],
            showChart: false
        }
    }

    componentDidMount(){
        this.getAllProjects() ;

    }
    getAllProjects=()=>{
        axios.get(`${this.props.api}/project/getAllProjectsByUserEmail/${this.props.user.email}`,{
            headers:{
                authorization: this.props.user.token
            }
        })
            .then((res)=>{
                // console.log('Success',res) ;
                if (res.data.data !== undefined){
                    this.setState({
                        projects :res.data.data ,
                    }) ;

                }
                else{
                    alert('No projects')
                }

            })
            .catch((err)=>{
                console.log('Error or Rejected',err)
            })
    }
    getChartStats=(projId)=>{
        if(this.state.projects.length > 0 ) {
            this.setState({
                showChart:true
            })
            // console.log("get proj id", this.state.projId)


            axios.get(`${this.props.api}/project/statistics/barchart/`+projId+`/`+this.props.user.email, {
                headers: {
                    authorization: this.props.user.token
                }
            }).then((res) => {
                // console.log('Stats Assigned Success', res.data.data);
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
                    <Dropdown title={"Select Project"}>
                        <Dropdown.Item style={{minWidth:"30vw",marginRight:"10%"}}>
                            <List hover>
                                {this.state.projects.map((item,index)=>
                                    <List.Item key={index} index={index}>
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
                            <h5>{this.state.task.projectName}</h5>
                            <Bar data={{
                                labels: [
                                    'Not Started',
                                    'In-Progress',
                                    'Complete'
                                ],
                                datasets: [{
                                    label: this.state.task.projectName,
                                    data: this.state.task.data,
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
                            {
                                this.state.task.notStartedTasks !== undefined && this.state.task.notStartedTasks !== [] ?


                                    <div className="dropdown-div-bar" id="dropdown-div">
                                        <Dropdown id="dropdown-title" title={"Not Started"}>
                                            {this.state.task.notStartedTasks.map((item, index) => (
                                                <Dropdown.Item key={item} index={index}>{item.title}</Dropdown.Item>
                                            ))}
                                        </Dropdown>
                                    </div>
                                    : <></>
                            }
                            {
                                this.state.task.inProgressTasks !== undefined && this.state.task.inProgressTasks !== [] ?


                                    <div className="dropdown-div-bar-2" id="dropdown-div-2">
                                        <Dropdown id="dropdown-title" title={"In-Progress"}>
                                            {this.state.task.inProgressTasks.map((item, index) => (
                                                <Dropdown.Item key={item} index={index}>{item.title}</Dropdown.Item>
                                            ))}
                                        </Dropdown>
                                    </div>
                                    : <></>
                            }
                            {
                                this.state.task.finishedTasks !== undefined && this.state.task.finishedTasks !== [] ?


                                    <div className="dropdown-div-bar-3" id="dropdown-div-3">
                                        <Dropdown id="dropdown-title" title={"Complete"}>
                                            {this.state.task.finishedTasks.map((item, index) => (
                                                <Dropdown.Item key={item} index={index}>{item.title}</Dropdown.Item>
                                            ))}
                                        </Dropdown>
                                    </div>
                                    : <></>
                            }
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

BarChart.propTypes = {
    user:PropTypes.object.isRequired,
    api:PropTypes.string ,
}

export default BarChart