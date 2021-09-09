import React from 'react' ;
import {Doughnut} from 'react-chartjs-2';

class PieChart extends React.Component{
    /***
     * - Task name
     * - Node name
     *
     * Show Project Names, click one project, get all nodes,
     * click on node and show tasks in a form of pie chart
     *
     * @returns {JSX.Element}
     */
    render() {
        return(
            <>
                <Doughnut
                    data={{
                        labels: [
                            'Task 1',
                            'Task 2',
                            'Task 3'
                        ],
                        datasets: [{
                            label: 'Node 1',
                            data: [50, 80, 100],
                            backgroundColor: [
                                'rgb(255, 99, 132)',
                                'rgb(54, 162, 235)',
                                'rgb(255, 205, 86)'
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
            </>
        )
    }
}
export default PieChart;