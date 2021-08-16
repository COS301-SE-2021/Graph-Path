const  DAGTest = require('../../Helpers/DAG');


describe("The DAG function to determine if graph is acyclic ", ()=>{
    const forestGraph = {};
    const cyclicGraph = {
        "nodes": [
            {
                "id": "n1",
                "label": "Fix A",

            },
            {
                "id": "n2",
                "label": "Fix B",

            },
            {
                "id": "n3",
                "label": "Fix C",

            },
            {
                "id": "n4",
                "label": "Fix D",

            }
        ],
        "edges": [
            {
                "id": "e1",
                "source": "n1",
                "target": "n2",

            },
            {
                "id": "e2",
                "source": "n1",
                "target": "n4",

            },
            {
                "id": "e3",
                "source": "n1",
                "target": "n3",

            },
            {
                "id": "e4",
                "source": "n2",
                "target": "n4",

            },
            {
                "id": "e5",
                "source": "n2",
                "target": "n3",

            },
            {
                "id": "e6",
                "source": "n3",
                "target": "n4",

            }
        ]
    };
    const AcyclicGraph = {
        "nodes": [
            {
                "id": "n1",
                "label": "A",
                "x": -33.1972319905599,
                "y": 26.722684676106784,

            },
            {
                "id": "n2",
                "label": "C",

            },
            {
                "id": "n3",
                "label": "Y",

            },
            {
                "id": "n4",
                "label": "L",
                "x": -89.39609156910925,
                "y": 6.905900170783298,

            },
            {
                "id": "n5",
                "label": "I",
                "x": -54.22745505488379,
                "y": -58.370967627181074,

            }
        ],
        "edges": [
            {
                "id": "e1",
                "source": "n1",
                "target": "n2",
                "label": "n1 to n2",
                "color": "#080",

            },
            {
                "id": "e2",
                "source": "n2",
                "target": "n3",
                "label": "n2 to n3",
                "color": "#080",

            },
            {
                "id": "e3",
                "source": "n2",
                "target": "n4",
                "label": "n2 to n4",


            },
            {
                "id": "e4",
                "source": "n4",
                "target": "n5",
                "label": "n4 to n5",

            },
            {
                "id": "e5",
                "source": "n5",
                "target": "n2",
                "label": "n5 to n2",
                "color": "#080",

            }
        ]
    };

    describe("when given an empty graph object",()=>{
        it('should should return true ', ()=> {
            const graph = {};
           const isAcyclic  = DAGTest.isAcyclic(graph);
           expect(isAcyclic).toBe(true);
        });
    })

    describe("when given a graph with no nodes in it ",()=>{
        it('should should return true ', ()=> {
            const graph = {nodes:[]};
            const isAcyclic  = DAGTest.isAcyclic(graph);
            expect(isAcyclic).toBe(true);
        });
    })

    describe("when given an acyclic graph object",()=>{
        it('should should return true ', ()=> {
            const graph = AcyclicGraph;
            const isAcyclic  = DAGTest.isAcyclic(graph);
            expect(isAcyclic).toBe(false);
        });
    })

    describe("when given an cyclic graph object",()=>{
        it('should should return false ', ()=> {
            const graph = cyclicGraph;
            const isAcyclic  = DAGTest.isAcyclic(graph);
            expect(isAcyclic).toBe(true);
        });
    })

    describe("when given a forest graph",()=>{
        it('should should return true ', ()=> {
            const graph = forestGraph;
            const isAcyclic  = DAGTest.isAcyclic(graph);
            expect(isAcyclic).toBe(true);
        });
    })


})