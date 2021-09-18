const makeApp = require('../../app');
const supertest = require('supertest');
const {MongoClient} = require('mongodb')
const MockDBController = require('../../Controllers/MockDBController');

const mongoose = require("mongoose");
const ProjectmanagerService = require("../../Services/ProjectManagerService");
//const mockProjects = require("../../src/test/MockCollections/mockProjects.json");

describe('/statistics/RadarGraph/:projectID',()=> {

    describe("when requested", ()=>{

        let connection;
        let MockDB;
        let mockMemberObject = {
            email:"test@gmail.com",
            permissions: ['owner']
        }
        let mockProject ={
            _id:  new mongoose.mongo.ObjectID(),
            projectOwner: "testOwner",
            projectName:"testProject",
            projectDescription: "testDescription",
            startDate :"2021/01/01",
            dueDate : "2021/01/01",
            status: "not started",
            groupMembers :[mockMemberObject],
            graph: {},
            lastAccessed: new Date(),

        };
        let mockUser= {

        }
        beforeAll(async () => {

            connection = await MongoClient.connect(global.__MONGO_URI__, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            MockDB = await MockDBController.getConnectionInstance();
            const Projects =  MockDB.collection('Projects');
            const Tasks    =  MockDB.collection('Tasks');
            const Users    =  MockDB.collection('Users');

            const MockProjectCollection = await require('../MockCollections/mockProjects.json');
            const MockTaskCollection = await require('../MockCollections/mockTasks.json');
            const MockUserCollection = await require('../MockCollections/mockUser.json');


            let test_n_projects =[];
            let test_n_users    =[];
            let test_n_tasks    =[];

            for (let i = 0; i <MockProjectCollection.length; i++) {
                test_n_projects.push(MockProjectCollection[i]);
                test_n_projects[i]._id = MockProjectCollection[i]._id.$oid.toString();

            }

            for (let i = 0; i <MockTaskCollection.length; i++) {
                test_n_users.push(MockTaskCollection[i]);
                test_n_users[i]._id = MockTaskCollection[i]._id.$oid.toString();

            }
            for (let i = 0; i <MockUserCollection.length; i++) {
                test_n_tasks.push(MockUserCollection[i]);
                test_n_tasks[i]._id = MockUserCollection[i]._id.$oid.toString();
            }

            await Projects.insertMany(test_n_projects);
            await Projects.insertMany(test_n_users);
            await Projects.insertMany(test_n_tasks);


        });
        afterAll(async () => {
            MockDB.collection('Projects').drop();
            MockDB.collection('Tasks').drop();
            MockDB.collection('Users').drop();
            await connection.close();
            await MockDB.close();
        });

        describe("project/newProject",()=>{
            it('it should return status code 200', async ()=> {

                let app = makeApp(MockDBController);
                const projectID = mockProject._id;
                let response  = await supertest(app)
                    .get('/project/statistics/donutChart/'+projectID)
                    .expect(200)
                    .then((res)=>{
                        expect(res).toBe("null")
                    })

            });
            it('')
        })


        it('it should return a JSON object', async ()=> {

            let app = makeApp(MockDBController)
            const response = await supertest(app)
                .get('/task/getAllTasks')
                .expect(200)
                .then((res)=>{
                    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
                })
        });
        it('it should return JSON object with all the task\'s fields', async ()=> {
            const Tasks = MockDB.collection('Tasks');
            let MockTask = {
                description: "Help Mark with his work",
                status: "in-progress",
                project: "Graph-Path",
                tasknr: 1,
                assignee: "Joe",
                assigner: "Alistair",
                due: Date.now(),
                issued: Date.now()+48,
            }
            await Tasks.insertOne(MockTask);
            let app = makeApp(MockDBController);
            const response = await supertest(app)
                .get('/task/getAllTasks')
                .expect(200)
                .then((res)=>{


                    expect(res.body.data[0]['status']).toBeDefined()
                    expect(res.body.data[0]['project']).toBeDefined()
                    expect(res.body.data[0]['tasknr']).toBeDefined()
                    expect(res.body.data[0]['assignee']).toBeDefined()
                    expect(res.body.data[0]['assigner']).toBeDefined()
                    expect(res.body.data[0]['due']).toBeDefined()
                    expect(res.body.data[0]['issued']).toBeDefined()

                })
        });
        it('it should return empty JSON object when there are no projects', async ()=>{
            var Tasks = MockDB.collection('Tasks');
            Tasks.deleteMany({})
            let app = makeApp(MockDBController)
            const response = await supertest(app)
                .get('/task/getAllTasks')
                .expect(200)
                .then((res)=>{

                    expect(res.body).toEqual({
                        message: "The tasks were retrieved.",
                        data: []
                    })
                })
        });


    })
});
