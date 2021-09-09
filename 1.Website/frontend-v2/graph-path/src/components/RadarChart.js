import React from 'react' ;
import {Radar} from 'react-chartjs-2';
import {Button} from "rsuite";

class RadarChart extends React.Component{
    /***
     * - Project Name
     * - Node name
     * - number of task on certain node
     * @returns {JSX.Element}
     */
    constructor(props){
        super(props) ;
        this.state = {
            currentProject:{},
            projects:[],
            api:'http://localhost:9001'
        }
    }

    componentDidMount(){
        this.getAllProjects() ;
    }

    render() {
        return(
            <>
                <Button />
                <Radar
                    data={{
                        labels: ['node 1','node 2','node 3','node 4','node 5'],
                        datasets: [{
                            label:'Proj1',
                            data:[4,5,7,8,10],
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
        )
    }
}
export default RadarChart;