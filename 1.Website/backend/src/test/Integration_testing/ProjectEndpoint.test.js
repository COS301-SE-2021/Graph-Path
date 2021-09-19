const makeApp = require('../../app');
const supertest = require('supertest');
const {MongoClient} = require('mongodb')
const MockDBController = require('../../Controllers/MockDBController');
const mongoose = require("mongoose");


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
            /**TESTING VALIDATION**/
            it('return Bad request , invalid id when ProjectName is invalid', async ()=>{
                const endpointString = "/project/newProject";
                let mockRequestToken ="";
                const mockReqBody = {
                    projectName: "",
                    description: "",
                    startDate: "",
                    dueDate: "",
                    email:"",
                };
                let mockReq = await supertest(app)
                    .headers('Authorisation','Bearer '+mockRequestToken)
                    .post(endpointString)
                    .send(mockReqBody)
                    .then(res=>{
                        expect(res.status).toBe(200)
                        expect(res.message).toBe("")
                        expect(res.data).toStrictEqual([])
                    })
            });
            it('return Bad request , invalid id description is invalid', async ()=>{});
            it('return Bad request , invalid id startDate is invalid', async ()=>{});
            it('return Bad request , invalid id dueDate is invalid', async ()=>{});
            it('return Bad request , invalid id email is invalid', async ()=>{});

            /**TESTING Authentication**/
            it('return error when  token authentication fails', async ()=>{});


            /**TESTING Authorisation**/
            it('return error when token Authorisation fails', async ()=>{});

            /**TESTING Business logic**/
            //what is expected when,validation, Authentication and Authorisation passed



        })

        //Step 1- write describe for each endpoint(here under the describe above,be careful not nest describes)
        //Step 2- check what the end point's middleware validates then write it for each validation
        //step 3- check what the business logic should return, write a an it for each case
        //step 4 - repeat 1-3 for other endpoints


    })
});
