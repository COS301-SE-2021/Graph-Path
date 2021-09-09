import React from 'react';
import axios from "axios";
import {FlexboxGrid, List} from "rsuite";
import {HashRouter as Router, Link, Route, Switch} from "react-router-dom";
import RadarChart from "./RadarChart";
import {Radar} from 'react-chartjs-2';

class Statistics extends React.Component{
    constructor(props){
        super(props) ;
        this.state = {
            currentProject:{},
            projects:[],
            nodes:[],
            api:'http://localhost:9001'
        }
    }

    componentDidMount(){
        this.getAllProjects() ;

    }

    getProjectChart=()=>{
        if(this.state.projects.length > 0 ) {

            axios.get(`${this.state.api}/project/statistics/RadarGraph/${this.state.projects[2]._id}`, {
                headers: {
                    authorization: this.props.user.token
                }
            }).then((res) => {
                console.log('Stats Success', res.data.data);
                if (res.data.data !== undefined) {
                    this.setState({
                        nodes: res.data.data,
                        // loading:false

                    });
                }
            })
                .catch((err) => {
                    console.log('Error or Rejected', err)
                })
        }
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
                        // loading:false

                    }) ;
                    this.getProjectChart();
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
    render() {
        const {match} =this.props ;
        console.log('user stats',match)
        // console.log('stats proj',this.state.projects.length)
        if(this.state.projects.length > 0){
            console.log('stats proj',this.state.projects[0])
            // const data = {
            //     labels
            // }

        }
        console.log("nodes",this.state.nodes)

        /***
         * What project have
         * show:
         * name
         * owner
         * create an icon
         * have view button
         */
        return(
            <>
                {
                    this.state.projects.length > 0?
                        <>
                        {/*    <Router>*/}
                        {/*<h1>Projects</h1>*/}
                        {/*<div>*/}
                        {/*    <List hover>*/}
                        {/*        {this.state.projects.map((item,index)=>*/}
                        {/*        <List.Item key={item['projectName']} index={index}>*/}
                        {/*            {console.log("item",item.projectName)}*/}
                        {/*            <FlexboxGrid>*/}
                        {/*                <FlexboxGrid.Item*/}
                        {/*                    colspan={6}*/}
                        {/*                    style={{*/}
                        {/*                        flexDirection: 'column',*/}
                        {/*                        alignItems: 'flex-start',*/}
                        {/*                        overflow: 'hidden'*/}
                        {/*                    }}*/}
                        {/*                >*/}
                        {/*                    <div>{item.projectName}</div>*/}
                        {/*                </FlexboxGrid.Item>*/}
                        {/*                <FlexboxGrid.Item*/}
                        {/*                    colspan={6}*/}
                        {/*                    style={{*/}
                        {/*                        flexDirection: 'column',*/}
                        {/*                        alignItems: 'flex-start',*/}
                        {/*                        overflow: 'hidden'*/}
                        {/*                    }}*/}
                        {/*                >*/}
                        {/*                    <div>{item.projectOwner}</div>*/}
                        {/*                </FlexboxGrid.Item>*/}
                        {/*                <FlexboxGrid.Item*/}
                        {/*                    colspan={4}*/}
                        {/*                    style={{*/}

                        {/*                    }}*/}
                        {/*                >*/}
                        {/*                    /!*<Link to={`${match.path}/radarChart`} >View</Link>*!/*/}
                        {/*                </FlexboxGrid.Item>*/}
                        {/*            </FlexboxGrid>*/}
                        {/*        </List.Item>*/}
                        {/*        )}*/}
                        {/*    </List>*/}
                        {/*</div>*/}

                        {/*        <Switch>*/}
                        {/*            /!*<Route path={`${match.path}/radarChart`}>*!/*/}
                        {/*            /!*    <RadarChart />*!/*/}
                        {/*            /!*</Route>*!/*/}
                        {/*        </Switch>*/}
                        {/*    </Router>*/}
                        {/*</>*/}
                            <Radar
                                data={{
                                    labels: this.state.nodes.labels,
                                    datasets: [{
                                        label:this.state.nodes.projectName,
                                        data:this.state.nodes.data,
                                        fill: true,
                                        backgroundColor: 'rgba(255,99,132,0.2)',
                                        borderColor: 'rgb(255,99,132)',
                                        pointBackgroundColor: 'rgb(255, 99, 132)',
                                        pointBorderColor: '#fff',
                                        pointHoverBackgroundColor: '#fff',
                                        pointHoverBorderColor: 'rgb(255, 99, 132)'
                                    },
                                        // {
                                        //     label:'Proj2',
                                        //     data:[1,10,18,5,4],
                                        //     fill: true,
                                        //     backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                        //     borderColor: 'rgb(54, 162, 235)',
                                        //     pointBackgroundColor: 'rgb(54, 162, 235)',
                                        //     pointBorderColor: '#fff',
                                        //     pointHoverBackgroundColor: '#fff',
                                        //     pointHoverBorderColor: 'rgb(54, 162, 235)'
                                        // }
                                    ]

                                }}
                                height={400}
                                width={600}
                                options={{
                                    maintainAspectRatio: false,
                                    elements:{
                                        line: {
                                            borderWidth: 3
                                        }
                                    },
                                    scales:{
                                        // gridLines:{
                                        //     color: '#fff'
                                        // },
                                        r:{
                                            angleLines:{
                                                display: false
                                            },

                                            // suggestedMin:50,
                                            // suggestedMax: 100
                                        }
                                    },
                                }}
                            />
                        </>
                    :
                    <></>
                }
            </>
        )
    }
}
export default Statistics;

