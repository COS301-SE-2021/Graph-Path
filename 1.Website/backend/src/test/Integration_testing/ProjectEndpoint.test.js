const makeApp = require('../../app');
const supertest = require('supertest');
const {MongoClient} = require('mongodb')
const MockDBController = require('../../Controllers/MockDBController');
const mongoose = require("mongoose");


describe('project endpoints integration tests',()=> {
//describe('/statistics/RadarGraph/:projectID',()=> {
//describe('Project endpoints',()=> {


    describe("when requesting", ()=>{

        let connection;
        let MockDB;
        let mockMemberObject = {
            email:"test@gmail.com",
            permissions: ['owner']
        }
        let mockProject ={
            _id:  new mongoose.mongo.ObjectID(),
            projectOwner: "testOwner@gmail.com",
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
            const Projects =  await MockDB.collection('Projects');
            const Tasks    =  await MockDB.collection('Tasks');
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
            await Users.insertMany(test_n_users);
            await Tasks.insertMany(test_n_tasks);


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
                let app = makeApp(MockDBController);
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

        describe("project/getProjectByID/:id",()=>{
            it('it should return status code 200', async ()=> {

                let app = makeApp(MockDBController);
                const projectID = mockProject._id;
                let response  = await supertest(app)
                    .get('/project/getProjectByID/'+projectID)
                    .expect(200)
                    .then((res)=>{
                        expect(res).toBe("null")
                    })

            });
            /**TESTING VALIDATION**/
            it('return Bad request , invalid id when ProjectID is invalid', async ()=>{
                let projectID = mockProject._id + "a";
                const endpointString = "/project/getProjectByID/"+projectID;
                let mockRequestToken ="";
                const mockReqBody = {
                    projectName: "",
                    description: "",
                    startDate: "",
                    dueDate: "",
                    email:"",
                };
                //let app = makeApp(MockDBController);
                let mockReq = await supertest(app)
                    .headers('Authorisation','Bearer '+mockRequestToken)
                    .get(endpointString)
                    .send(mockReqBody)
                    .then(res=>{
                        expect(res.status).toBe(420)
                        expect(res.message).toBe("Bad request , invalid id")
                        expect(res.data).toStrictEqual(null)
                    })
            });


            /**TESTING Authentication**/
            it('return error when  token authentication fails', async ()=>{});


            /**TESTING Authorisation**/
            it('return error when token Authorisation fails', async ()=>{});

            /**TESTING Business logic**/
            //what is expected when,validation, Authentication and Authorisation passed
            it("When the request is handled successfully.",async (val)=>{
                let app = makeApp(MockDBController);
                let projectID = mockProject._id;
                let mockReq = await supertest(app)
                    .get("/project/getProjectByID/"+projectID)
                    .expect(200)
                    .then((res)=>{
                        expect(res.message).toBe("Project retrieved.");
                        expect(res.data.projectOwner).toBe(mockProject.projectOwner);
                        expect(res.data.projectName).toBe(mockProject.projectName);
                        expect(res.data.projectDescription).toBe(mockProject.projectDescription);
                        expect(res.data._id).toBe(mockProject._id);
                        expect(res.data.startDate).toBe(mockProject.startDate);
                        expect(res.data.dueDate).toBe(mockProject.dueDate);
                        expect(res.data.status).toBe(mockProject.status);
                        expect(res.data.groupMembers).toBe(mockProject.groupMembers);
                        expect(res.data.graph).toBe(mockProject.graph);
                    })
            })

            it("When there is no project with that ID.",async (val)=>{
                let app = makeApp(MockDBController);
                let projectID = mockProject._id;
                let mockReq = await supertest(app)
                    .get("/project/getProjectByID/"+projectID)
                    .expect(200)
                    .then((res)=>{
                        expect(res.message).toBe("No project with this ID");
                    })
            })
        })



        describe("/getAllProjectsByUserEmail/:email",()=>{
            it('it should return status code 200', async ()=> {

                let app = makeApp(MockDBController);
                const email = "testOwner@gmail.com";
                let response  = await supertest(app)
                    .get('/project/getAllProjectsByUserEmail/'+email)
                    .expect(200)
                    .then((res)=>{
                        expect(res.message).toBe("successful")
                        expect(res.data).toBeDefined()
                    })

            });
            /**TESTING VALIDATION**/
            it('return Bad request , when email is invalid', async ()=>{
                let email= "a";
                const endpointString = "/project/getAllProjectsByUserEmail/"+email;
                let mockRequestToken ="";
                const mockReqBody = {
                    projectName: "",
                    description: "",
                    startDate: "",
                    dueDate: "",
                    email:"",
                };
                //let app = makeApp(MockDBController);
                let mockReq = await supertest(app)
                    .headers('Authorisation','Bearer '+mockRequestToken)
                    .get(endpointString)
                    .send(mockReqBody)
                    .then(res=>{
                        expect(res.status).toBe(420)
                        expect(res.message).toBe("Bad request , invalid id")
                        expect(res.data).toStrictEqual(null)
                    })
            });


            /**TESTING Authentication**/
            it('return error when  token authentication fails', async ()=>{});


            /**TESTING Authorisation**/
            it('return error when token Authorisation fails', async ()=>{});

            /**TESTING Business logic**/
            //what is expected when,validation, Authentication and Authorisation passed
            it("When the request is handled successfully.",async (val)=>{
                let app = makeApp(MockDBController);
                let email = "testOwner@gmail.com";
                let mockReq = await supertest(app)
                    .get("/project/getAllProjectsByUserEmail/"+email)
                    .expect(200)
                    .then((res)=>{
                        expect(res.message).toBe("successful");
                        expect(res.data).toBe(null)
                    })
            })

            it("When there is no project with that ID.",async (val)=>{
                let app = makeApp(MockDBController);
                let email = "testOwner@gmail.com";
                let mockReq = await supertest(app)
                    .get("/project/getAllProjectsByUserEmail/"+email)
                    .expect(200)
                    .then((res)=>{
                        expect(res.message).toBe("unsuccessful. No matched projects for user: "+email);
                    })
            })
        })

        describe("addToProjectGroupMembers",()=>{
            it('it should return status code 200', async ()=> {

                let app = makeApp(MockDBController);
                let response  = await supertest(app)
                    .post('/project/addToProjectGroupMembers')
                    .expect(200)
                    .then((res)=>{
                        expect(res).toBe("null")
                    })

            });
            /**TESTING VALIDATION**/
            it('return Bad request , invalid id when ProjectID is invalid', async ()=>{
                const endpointString = "/project/addToProjectGroupMembers";
                let mockRequestToken ="";
                const mockReqBody = {
                    projectID: "",
                    groupMembers: [],
                };
                //let app = makeApp(MockDBController);
                let mockReq = await supertest(app)
                    .headers('Authorisation','Bearer '+mockRequestToken)
                    .post(endpointString)
                    .send(mockReqBody)
                    .then(res=>{
                        expect(res.status).toBe(420)
                        expect(res.message).toBe("Bad request , invalid id")
                        expect(res.data).toStrictEqual(null)
                    })
            });


            /**TESTING Authentication**/
            it('return error when  token authentication fails', async ()=>{});


            /**TESTING Authorisation**/
            it('return error when token Authorisation fails', async ()=>{});

            /**TESTING Business logic**/
            //what is expected when,validation, Authentication and Authorisation passed
            it("When the request is handled successfully.",async (val)=>{
                let app = makeApp(MockDBController);
                let mockReq = await supertest(app)
                    .post("/project/addToProjectGroupMembers")
                    .expect(200)
                    .then((res)=>{
                        expect(res.message).toBe("successfully added members");
                    })
            })

            it("When there is no project with that ID.",async (val)=>{
                let app = makeApp(MockDBController);
                let mockReq = await supertest(app)
                    .post("/project/addToProjectGroupMembers")
                    .expect(200)
                    .then((res)=>{
                        expect(res.message).toBe("No project with this ID");
                    })
            })
        })

        describe("project/deleteProject",()=>{
            it('it should return status code 200', async ()=> {

                let app = makeApp(MockDBController);
                const projectID = mockProject._id;
                let response  = await supertest(app)
                    .delete('/project/deleteProject')
                    .expect(200)
                    .then((res)=>{
                        expect(res).toBe("null")
                    })

            });
            /**TESTING VALIDATION**/
            it('return Bad request , invalid project id', async ()=>{
                const endpointString = "/project/deleteProject";
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
                    .delete(endpointString)
                    .send(mockReqBody)
                    .then(res=>{
                        expect(res.status).toBe(200)
                        expect(res.message).toBe("Bad request , invalid id")
                        //expect(res.data).toStrictEqual([])
                    })
            });


            /**TESTING Authentication**/
            it('return error when  token authentication fails', async ()=>{});


            /**TESTING Authorisation**/
            it('return error when token Authorisation fails', async ()=>{});

            /**TESTING Business logic**/
            //what is expected when,validation, Authentication and Authorisation passed
            it("When the request is handled successfully.",async (val)=>{
                let app = makeApp(MockDBController);
                let mockReq = await supertest(app)
                    .delete("/project/deleteProject")
                    .expect(200)
                    .then((res)=>{
                        expect(res.message).toBe("Project was removed successfully.");
                    })
            })

            it("When there is no project with that ID.",async (val)=>{
                let app = makeApp(MockDBController);
                let mockReq = await supertest(app)
                    .delete("/project/deleteProject")
                    .expect(200)
                    .then((res)=>{
                        expect(res.message).toBe("Couldn't remove project.");
                    })
            })
        })

        describe("project/updateProjectGraph",()=>{
            it('it should return status code 200', async ()=> {

                let app = makeApp(MockDBController);
                const projectID = mockProject._id;
                let response  = await supertest(app)
                    .patch('/project/updateProjectGraph')
                    .expect(200)
                    .then((res)=>{
                        expect(res).toBe("null")
                    })

            });
            /**TESTING VALIDATION**/
            it('return Bad request , invalid project id', async ()=>{
                const endpointString = "/project/updateProjectGraph";
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
                    .patch(endpointString)
                    .send(mockReqBody)
                    .then(res=>{
                        expect(res.status).toBe(200)
                        expect(res.message).toBe("Bad request , invalid id")
                        //expect(res.data).toStrictEqual([])
                    })
            });


            /**TESTING Authentication**/
            it('return error when  token authentication fails', async ()=>{});


            /**TESTING Authorisation**/
            it('return error when token Authorisation fails', async ()=>{});

            /**TESTING Business logic**/
            //what is expected when,validation, Authentication and Authorisation passed
            it("When the request is handled successfully.",async (val)=>{
                let app = makeApp(MockDBController);
                let mockReq = await supertest(app)
                    .patch("/project/updateProjectGraph")
                    .expect(200)
                    .then((res)=>{
                        expect(res.message).toBe("The graph was updated.");
                    })
            })

            it("When there is no project with that ID.",async (val)=>{
                let app = makeApp(MockDBController);
                let mockReq = await supertest(app)
                    .patch("/project/updateProjectGraph")
                    .expect(200)
                    .then((res)=>{
                        expect(res.message).toBe("Could not update the graph.");
                    })
            })
        })

        describe("project/removeProjectMember",()=>{
            it('it should return status code 200', async ()=> {

                let app = makeApp(MockDBController);
                const projectID = mockProject._id;
                let response  = await supertest(app)
                    .patch('/project/removeProjectMember')
                    .expect(200)
                    .then((res)=>{
                        expect(res).toBe("null")
                    })

            });
            /**TESTING VALIDATION**/
            it('return Bad request , invalid project id', async ()=>{
                const endpointString = "/project/removeProjectMember";
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
                    .delete(endpointString)
                    .send(mockReqBody)
                    .then(res=>{
                        expect(res.status).toBe(200)
                        expect(res.message).toBe("Bad request , invalid id")
                        //expect(res.data).toStrictEqual([])
                    })
            });


            /**TESTING Authentication**/
            it('return error when  token authentication fails', async ()=>{});


            /**TESTING Authorisation**/
            it('return error when token Authorisation fails', async ()=>{});

            /**TESTING Business logic**/
            //what is expected when,validation, Authentication and Authorisation passed
            it("When the request is handled successfully.",async (val)=>{
                let app = makeApp(MockDBController);
                let mockReq = await supertest(app)
                    .patch("/project/removeProjectMember")
                    .expect(200)
                    .then((res)=>{
                        expect(res.message).toBe("Member removed successfully.");
                    })
            })

            it("When there is no project with that ID.",async (val)=>{
                let app = makeApp(MockDBController);
                let mockReq = await supertest(app)
                    .patch("/project/removeProjectMember")
                    .expect(200)
                    .then((res)=>{
                        expect(res.message).toBe("Could not remove member.");
                    })
            })
        })

        describe("project/updateEverythingProject",()=>{
            it('it should return status code 200', async ()=> {

                let app = makeApp(MockDBController);
                const projectID = mockProject._id;
                let response  = await supertest(app)
                    .put('/project/updateEverythingProject')
                    .expect(200)
                    .then((res)=>{
                        expect(res).toBe("null")
                    })

            });
            /**TESTING VALIDATION**/
            it('return Bad request , invalid project id', async ()=>{
                const endpointString = "/project/updateEverythingProject";
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
                    .put(endpointString)
                    .send(mockReqBody)
                    .then(res=>{
                        expect(res.status).toBe(200)
                        expect(res.message).toBe("Bad request , invalid id")
                        //expect(res.data).toStrictEqual([])
                    })
            });


            /**TESTING Authentication**/
            it('return error when  token authentication fails', async ()=>{});


            /**TESTING Authorisation**/
            it('return error when token Authorisation fails', async ()=>{});

            /**TESTING Business logic**/
            //what is expected when,validation, Authentication and Authorisation passed
            it("When the request is handled successfully.",async (val)=>{
                let app = makeApp(MockDBController);
                let mockReq = await supertest(app)
                    .put("/project/updateEverythingProject")
                    .expect(200)
                    .then((res)=>{
                        expect(res.message).toBe("The project was updated.");
                    })
            })

            it("When there is no project with that ID.",async (val)=>{
                let app = makeApp(MockDBController);
                let mockReq = await supertest(app)
                    .put("/project/updateEverythingProject")
                    .expect(200)
                    .then((res)=>{
                        expect(res.message).toBe("The project was not updated.");
                    })
            })
        })

        describe("/statistics/RadarGraph/:projectID",()=>{
            it('it should return status code 200', async ()=> {

                let app = makeApp(MockDBController);
                const projectID = mockProject._id;
                let response  = await supertest(app)
                    .get('/statistics/RadarGraph/'+projectID)
                    .expect(200)
                    .then((res)=>{
                        expect(res).toBe("null")
                    })

            });
            /**TESTING VALIDATION**/
            it('return Bad request , invalid project id', async ()=>{
                let projectID = mockProject._id;
                const endpointString = "/statistics/RadarGraph/"+projectID;
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
                    .get(endpointString)
                    .send(mockReqBody)
                    .then(res=>{
                        expect(res.status).toBe(200)
                        expect(res.message).toBe("Bad request , invalid id")
                        //expect(res.data).toStrictEqual([])
                    })
            });


            /**TESTING Authentication**/
            it('return error when  token authentication fails', async ()=>{});


            /**TESTING Authorisation**/
            it('return error when token Authorisation fails', async ()=>{});

            /**TESTING Business logic**/
            //what is expected when,validation, Authentication and Authorisation passed
            it("When the request is handled successfully.",async (val)=>{
                let app = makeApp(MockDBController);
                let projectID = mockProject._id;
                let mockReq = await supertest(app)
                    .get("/statistics/RadarGraph/"+projectID)
                    .expect(200)
                    .then((res)=>{
                        expect(res.message).toBe("successful");
                    })
            })

            it("When there is no project with that ID.",async (val)=>{
                let app = makeApp(MockDBController);
                let projectID = mockProject._id;
                let mockReq = await supertest(app)
                    .get("/statistics/RadarGraph/"+projectID)
                    .expect(200)
                    .then((res)=>{
                        expect(res.message).toBeDefined();
                    })
            })
        })

        describe("/statistics/donutChart/:projectID",()=>{
            it('it should return status code 200', async ()=> {

                let app = makeApp(MockDBController);
                const projectID = mockProject._id;
                let response  = await supertest(app)
                    .get('/statistics/donutChart/'+projectID)
                    .expect(200)
                    .then((res)=>{
                        expect(res).toBe("null")
                    })

            });
            /**TESTING VALIDATION**/
            it('return Bad request , invalid project id', async ()=>{
                let projectID = mockProject._id;
                const endpointString = "/statistics/donutChart/"+projectID;
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
                    .get(endpointString)
                    .send(mockReqBody)
                    .then(res=>{
                        expect(res.status).toBe(200)
                        expect(res.message).toBe("Bad request , invalid id")
                        //expect(res.data).toStrictEqual([])
                    })
            });


            /**TESTING Authentication**/
            it('return error when  token authentication fails', async ()=>{});


            /**TESTING Authorisation**/
            it('return error when token Authorisation fails', async ()=>{});

            /**TESTING Business logic**/
            //what is expected when,validation, Authentication and Authorisation passed
            it("When the request is handled successfully.",async (val)=>{
                let app = makeApp(MockDBController);
                let projectID = mockProject._id;
                let mockReq = await supertest(app)
                    .get("/statistics/donutChart/"+projectID)
                    .expect(200)
                    .then((res)=>{
                        expect(res.message).toBe("successful");
                    })
            })

            it("When there is no project with that ID.",async (val)=>{
                let app = makeApp(MockDBController);
                let projectID = mockProject._id;
                let mockReq = await supertest(app)
                    .get("/statistics/donutChart/"+projectID)
                    .expect(200)
                    .then((res)=>{
                        expect(res.message).toBeDefined();
                    })
            })
        })

        describe("/statistics/barchart/:projectID/:email",()=>{
            it('it should return status code 200', async ()=> {

                let app = makeApp(MockDBController);
                const projectID = mockProject._id;
                let email = "testOwner@gmail.com";
                let response  = await supertest(app)
                    .get('/statistics/RadarGraph/'+projectID +'/'+email)
                    .expect(200)
                    .then((res)=>{
                        expect(res).toBe("null")
                    })

            });
            /**TESTING VALIDATION**/
            it('return Bad request , invalid project id', async ()=>{
                let projectID = mockProject._id;
                let email = "testOwner@gmail.com";
                const endpointString = "/statistics/barchart/"+projectID+"/"+email;
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
                    .get(endpointString)
                    .send(mockReqBody)
                    .then(res=>{
                        expect(res.status).toBe(200)
                        expect(res.message).toBe("Bad request , invalid id")
                        //expect(res.data).toStrictEqual([])
                    })
            });


            /**TESTING Authentication**/
            it('return error when  token authentication fails', async ()=>{});


            /**TESTING Authorisation**/
            it('return error when token Authorisation fails', async ()=>{});

            /**TESTING Business logic**/
            //what is expected when,validation, Authentication and Authorisation passed
            it("When the request is handled successfully.",async (val)=>{
                let app = makeApp(MockDBController);
                let projectID = mockProject._id;
                let email = "testOwner@gmail.com";
                let mockReq = await supertest(app)
                    .get("/statistics/barchart/"+projectID+"/"+email)
                    .expect(200)
                    .then((res)=>{
                        expect(res.message).toBe("successful");
                    })
            })

            it("When there is no project with that ID.",async (val)=>{
                let app = makeApp(MockDBController);
                let projectID = mockProject._id;
                let email = "testOwner@gmail.com";
                let mockReq = await supertest(app)
                    .get("/statistics/barchart/"+projectID +"/"+email)
                    .expect(200)
                    .then((res)=>{
                        expect(res.message).toBeDefined();
                    })
            })
        })

        describe("/project/convertToKanbanBoard/:email",()=>{
            it('it should return status code 200', async ()=> {

                let app = makeApp(MockDBController);
                const email = "testOwner@gmail.com";
                let response  = await supertest(app)
                    .get('/project/convertToKanbanBoard/'+email)
                    .expect(200)
                    .then((res)=>{
                        expect(res).toBe("null")
                    })

            });
            /**TESTING VALIDATION**/
            it('return Bad request , invalid project id', async ()=>{
                let email = "testOwner@gmail.com";
                const endpointString = "/project/convertToKanbanBoard/"+email;
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
                    .get(endpointString)
                    .send(mockReqBody)
                    .then(res=>{
                        expect(res.status).toBe(200)
                        expect(res.message).toBe("Bad request , invalid parameters")
                        //expect(res.data).toStrictEqual([])
                    })
            });


            /**TESTING Authentication**/
            it('return error when  token authentication fails', async ()=>{});


            /**TESTING Authorisation**/
            it('return error when token Authorisation fails', async ()=>{});

            /**TESTING Business logic**/
            //what is expected when,validation, Authentication and Authorisation passed
            it("When the request is handled successfully.",async (val)=>{
                let app = makeApp(MockDBController);
                let email ="testOwner@gmail.com";
                let mockReq = await supertest(app)
                    .get("/project/convertToKanbanBoard/"+email)
                    .expect(200)
                    .then((res)=>{
                        expect(res).toBeDefined();
                    })
            })

            it("When there is no project with that ID.",async (val)=>{
                let app = makeApp(MockDBController);
                let email = "testOwner@gmail.com";
                let mockReq = await supertest(app)
                    .get("/project/convertToKanbanBoard/"+email)
                    .expect(200)
                    .then((res)=>{
                        expect(res).toBeDefined();
                    })
            })
        })

//
    })
});

//Step 1- write describe for each endpoint(here under the describe above,be careful not nest describes)
//Step 2- check what the end point's middleware validates then write it for each validation
//step 3- check what the business logic should return, write a an it for each case
//step 4 - repeat 1-3 for other endpoints