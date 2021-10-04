import React from 'react' ;
import {Doughnut} from 'react-chartjs-2';
import axios from "axios";
import {Button, Dropdown, FlexboxGrid, List} from "rsuite";
import Logo from "../img/Logo4.png";
import '../css/Common.css'
import PropTypes from "prop-types";

class PieChart extends React.Component{

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
            // console.log("get proj id", this.state.projId)


            axios.get(`${this.props.api}/project/statistics/donutChart/`+projId, {
                headers: {
                    authorization: this.props.user.token
                }
            }).then((res) => {
                // console.log('Stats Success', res.data.data);
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
                    <h3>Project Sub-Tasks Statistics</h3>
                    <Dropdown title={"Select Project"}>
                        <Dropdown.Item style={{minWidth:"30vw",marginRight:"10%"}}>
                            <List hover>
                                {this.state.projects.map((item,index)=>
                                    item.projectOwner === this.props.user.email || item.permissions.includes("view statistics") ?
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
                                :
                                <></>)}
                            </List>
                        </Dropdown.Item>
                    </Dropdown>
                </div>
                {
                    this.state.projects.length > 0 && this.state.showChart ?
                        <>
                        <h5>{this.state.task.projectName}</h5>
                    <Doughnut
                        data={{
                            labels: [
                                'Not Started',
                                'In-Progress',
                                'Complete'
                            ],
                            datasets: [{
                                label: this.state.task.projectName,
                                data: this.state.task.data,
                                backgroundColor: [
                                    'rgb(255,3,3)',
                                    'rgb(234,135,27)',
                                    'rgb(73,239,18)'
                                ],
                                hoverOffset: 4
                            }]
                        }}
                        height={400}
                        width={600}
                        options={{
                            maintainAspectRatio: false,
                        }}
                    />
                            {
                                this.state.task.notStartedTasks !== undefined && this.state.task.notStartedTasks !== [] ?


                                    <div id="dropdown-div">
                                        <Dropdown id="dropdown-title" title={"Not Started"}>
                                            {this.state.task.notStartedTasks.map((item, index) => (
                                                <>
                                                    <Dropdown.Item key={item} index={index}>{item.title}</Dropdown.Item>
                                                </>
                                            ))}
                                        </Dropdown>
                                    </div>
                                    : <></>
                            }
                            {
                                this.state.task.inProgressTasks !== undefined && this.state.task.inProgressTasks !== [] ?


                                    <div id="dropdown-div-2">
                                        <Dropdown id="dropdown-title" title={"In Progress"}>
                                            {this.state.task.inProgressTasks.map((item, index) => (
                                                <Dropdown.Item key={item} index={index}>{item.title}</Dropdown.Item>
                                            ))}
                                        </Dropdown>
                                    </div>
                                    : <></>
                            }
                            {
                                this.state.task.finishedTasks !== undefined && this.state.task.finishedTasks !== [] ?


                                    <div id="dropdown-div-3">
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
                                Select project you want to view the sub-tasks progress for.
                            </h4>
                            <img alt="graph logo" id="logoPic" src={Logo}/>
                        </>
                }
            </>
        )
    }
}

PieChart.propTypes = {
    user:PropTypes.object.isRequired,
    api:PropTypes.string ,
}

export default PieChart;