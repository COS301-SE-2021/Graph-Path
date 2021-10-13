function ExampleProject(){
    return  {
        _id: "001",
        projectName: "Project Template 1",
        projectDescription: "An Example of a project created using Graph Path",
        dueDate: "2021-10-15",
        // groupMembers: [{…}],
        lastAccessed: "Tue Oct 12 2021 17:45:19 ",
        permissions: [],
        projectOwner: "ntpnaane@gmail.com",
        startDate: "2021-10-12" ,
        status: "not started" , 
        graph: {nodes: [
            {
                color: "#fff",
                critical: false,
                id: "n0",
                label: "Start",
                size: 20,
                status: "start",
                x: -293.7459411621094,
                y: 177.5208282470703
            },{
                color: "#d00",
                critical: true,
                id: "n1",
                label: "Task 1",
                size: 20,
                status: "not started",
                x: -37.745941162109375,
                y: 209.5208282470703,
            },{
                color: "#d00" ,
                critical: false,
                id: "n2",
                label: "Task 2",
                size: 20,
                status: "not started",
                x: 155.950439453125,
                y: 223.390625
            },{
                color: "#d00" ,
                critical: true,
                id: "n3",
                label: "Task 3",
                size: 20,
                status: "not started",
                x: 10.916656494140625,
                y: 75.02082824707031
            },{
                color: "#d00",
                critical: false,
                id: "n4",
                label: "Task 4",
                size: 20,
                status: "not started",
                x: 172.950439453125,
                y: 162.390625
            },{
                color: "#d00",
                critical: false,
                id: "n5",
                label: "semi-final task",
                size: 20,
                status: "not started",
                x: 382.950439453125,
                y: 183.390625}
        ],
            edges: [
                {
                    color: "#fff",
                    from: "n0",
                    id: "e1",
                    label: "Start to -> Task 1",
                    to: "n1",
                    width: 7,
                },
                {
                    color: "#fff",
                    from: "n0",
                    id: "e2",
                    label: "Start to -> Task 3",
                    to: "n3",
                    width: 7,
                },
                {
                    color: "#fff",
                    from: "n3",
                    id: "e3",
                    label: "Task 3 to -> Task 4",
                    to: "n4",
                    width: 7,
                }, {
                    color: "#fff" ,
                    from: "n1",
                    id: "e5",
                    label: "Task 1 to -> Task 2",
                    to: "n2",
                    width: 7,
                },{
                    color: "#fff",
                    from: "n2",
                    id: "e4",
                    label: "Task 2 to -> semi-final task",
                    to: "n5",
                    width: 7,
                },{
                    color: "#fff",
                    from: "n2",
                    id: "e6",
                    label: "Task 2 to -> Task 4",
                    to: "n4",
                    width: 7,
                },{
                    color: "#fff",
                    from: "n4",
                    id: "e7",
                    label: "Task 4 to -> semi-final task",
                    to: "n5",
                    width: 7}
            ]}
    }
}

export default ExampleProject ;