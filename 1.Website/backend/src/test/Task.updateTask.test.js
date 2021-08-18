const makeApp = require('../app');
const supertest = require('supertest');
const {MongoClient, ObjectID} = require('mongodb')
const MockDBController = require('../Controllers/MockDBController');

describe('/updateTaskDescription' , ()=>{
    describe('when requested with a new task description',()=>{
        let connection;
        let MockDB;
        beforeAll(async () => {
            connection = await MongoClient.connect(global.__MONGO_URI__, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            MockDB = await MockDBController.getConnectionInstance();


        });
        afterAll(async () => {
            await connection.close();
            await MockDB.close();
        });

        it('it should return a JSON object', async ()=> {
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
            let projectID = "647635df78747a453";
            let newDescription = "this is a new test description."
            const requestString = '/task/updateTaskDescription/'+projectID+'/'+newDescription
            let app = makeApp(MockDBController)
            const response = await supertest(app)
                .patch(requestString)
                .expect(200)
                .then((res)=>{
                    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
                })
        });

        it('it should return status 200 or 400', async ()=> {

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
            let projectID = "647635df78747a453";
            let newDescription = "this is a new test description."
            const requestString = '/task/updateTaskDescription/'+projectID+'/'+newDescription
            let app = makeApp(MockDBController)
            const response = await supertest(app)
                .patch(requestString)
                .expect(200)
                .then((res)=>{
                    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
                })
        });

        it('should return jsonObject with "message" and "body" fields', async ()=> {

            let projectID = "678367df9789a4f5ec65";
            let newDescription = "this is a new test description."
            const requestString = '/task/updateTaskDescription/'+projectID+'/'+newDescription

            let app = makeApp(MockDBController)
            const response = await supertest(app)
                .patch(requestString)
                .expect(200)
                .then((res)=>{
                    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
                    expect(res.body['message']).toBeDefined()
                    expect(res.body['data']).toBeDefined()

                })
        });

        it('should return status 200 and message = "Failed. No matched task with given parameters" when the task does not exist', async ()=> {

            let projectID = "678367df9789a4f5ec65";
            let taskNumber = "0";
            let newDescription = "this is a new test description."
            const requestString = '/task/updateTaskDescription/'+projectID+'/'+newDescription

            let app = makeApp(MockDBController)
            const response = await supertest(app)
                .patch(requestString)
                .expect(200)
                .then((res)=>{
                    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
                    expect(res.body['message']).toBeDefined()
                    expect(res.body['data']).toBeDefined()
                    expect(res.body['message']).toStrictEqual("server error: could not update task.")

                })
        });

        it('should return status 200 and message = "successful" when the task description is updated', async ()=> {
            const Tasks = MockDB.collection('Tasks');
            let MockTask = {
                _id : ObjectID._id,
                assignee: ['User1' , 'User2'],
                description: "This is a test task",
                issued: Date.now().toString() ,
                project : "Graph",
                status: 'In progress',
                tasknr: '1',
                assigner: "Kagiso 1",
                due: Date.now()+1 ,

            }
            await Tasks.insertOne(MockTask);
            let MockTask2 = await Tasks.find({}).toArray();
            let app = makeApp(MockDBController)

            let projectID = MockTask2[0]._id;
            let newDescription = "this is a new Task Description";
            const requestString = '/task/updateTaskDescription/'+projectID+'/'+newDescription;

            const response = await supertest(app)
                .patch(requestString)
                .send({
                    project: MockTask['project'],
                    tasknr: MockTask['tasknr'],
                    description: newDescription
                })
                .expect(200)
                .then((res)=>{
                    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
                    expect(res.body['message']).toBeDefined()
                    expect(res.body['data']).toBeDefined()
                    expect(res.body['message']).toStrictEqual("The task was updated successfully.")

                })


        });

        it('should return status 400 and message = "failed" when the task description is updated', async ()=> {
            const Tasks = MockDB.collection('Tasks');
            let MockTask = {
                assignee: ['User1' , 'User2'],
                description: "This is a test task",
                issued: Date.now().toString() ,
                project : "Graph",
                status: 'In progress',
                tasknr: '1',
                assigner: "Kagiso 1",
                due: Date.now()+1 ,

            }
            await Tasks.insertOne(MockTask);

            let app = makeApp(MockDBController)

            let projectID = MockTask.id;
            let taskNumber = "xx";
            let newDescription = "this";

            const requestString = '/task/updateTaskDescription/'+projectID+'/'+newDescription;


            const response = await supertest(app)
                .patch(requestString)
                .send({
                    project: "wrongName",
                    tasknr: 3,
                    description: newDescription
                })
                .expect(200)
                .then((res)=>{
                    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
                    expect(res.body['message']).toBeDefined()
                    expect(res.body['data']).toBeDefined()
                    expect(res.body['message']).toStrictEqual("server error: could not update task.")

                })


        });




    })


})
describe('/updateTaskStatus' , ()=>{
    describe('when requested with a new task description',()=>{
        let connection;
        let MockDB;
        beforeAll(async () => {
            connection = await MongoClient.connect(global.__MONGO_URI__, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            MockDB = await connection.db(global.__MONGO_DB_NAME__);


        });
        afterAll(async () => {
            await connection.close();
            await MockDB.close();
        });

        it('it should return a JSON object', async ()=> {

            let projectName = "";
            let taskNumber = 0;
            let newStatus = "complete"
            const requestString = '/task/updateTaskStatus/:'+projectName+'/:'+taskNumber+'/:'+newStatus
            let app = makeApp(false,MockDB)
            const response = await supertest(app)
                .patch(requestString)
                .expect(200)
                .then((res)=>{
                    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
                })
        });

        it('it should return status 200 or 400', async ()=> {

            let projectName = "";
            let taskNumber = 0;
            let newStatus = "complete"
            const requestString = '/task/updateTaskStatus/:'+projectName+'/:'+taskNumber+'/:'+newStatus
            let app = makeApp(false,MockDB)
            const response = await supertest(app)
                .patch(requestString)
                .expect(200)
                .then((res)=>{
                    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
                })
        });

        it('should return jsonObject with "message" and "body" fields', async ()=> {

            let projectName ="graph";
            let taskNumber = "0";
            let newStatus = "complete"
            const requestString = '/task/updateTaskStatus/'+projectName+'/'+taskNumber+'/'+newStatus;
            let app = makeApp(false,MockDB)
            const response = await supertest(app)
                .patch(requestString)
                .send({
                    project: "graph",
                    tasknr: 1,
                    status:"in-progress"
                })
                .expect(400)
                .then((res)=>{
                    expect(res.headers['content-type']).toBe("application/json; charset=utf-8")
                    expect(res.body['message']).toBeDefined()
                    expect(res.body['data']).toBeDefined()

                })
        });

        it('should return status 400 and message = "Failed. No matched task with given parameters" when the task does not exist', async ()=> {

            let projectName = "";
            let taskNumber = "0";
            let newStatus = "complete"
            const requestString = '/task/updateTaskStatus/:'+projectName+'/:'+taskNumber+'/:'+newStatus

            let app = makeApp(false,MockDB)
            const response = await supertest(app)
                .patch(requestString)
                .expect(400)
                .then((res)=>{
                    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
                    expect(res.body['message']).toBeDefined()
                    expect(res.body['data']).toBeDefined()
                    expect(res.body['message']).toStrictEqual("Failed. No matched task with given parameters")

                })
        });

        it('should return status 200 and message = "successful" when the task status is updated', async ()=> {
            const Tasks = MockDB.collection('Tasks');
            let MockTask = {
                assignee: ['User1' , 'User2'],
                description: "This is a test task",
                issued: Date.now().toString() ,
                project : "Graph",
                status: 'In progress',
                tasknr: '1',
                assigner: "Kagiso 1",
                due: Date.now()+1 ,

            }

            await Tasks.insertOne(MockTask);

            let app = makeApp(false,MockDB)

            let projectName = MockTask['project'];
            let taskNumber = MockTask['tasknr'];
            let newStatus = "complete"
            const requestString = '/task/updateTaskStatus/'+projectName+'/'+taskNumber+'/'+newStatus


            const response = await supertest(app)
                .patch(requestString)
                .send({
                    project: MockTask['project'],
                    tasknr: MockTask['tasknr'],
                    status: newStatus
                })
                .expect(200)
                .then((res)=>{
                    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
                    expect(res.body['message']).toBeDefined()
                    expect(res.body['data']).toBeDefined()
                    expect(res.body['message']).toStrictEqual("success")

                })


        });

        it('should return status 400 and message = "failed" when the task status is not updated', async ()=> {
            const Tasks = MockDB.collection('Tasks');
            let MockTask = {
                assignee: ['User1' , 'User2'],
                description: "This is a test task",
                issued: Date.now().toString() ,
                project : "Graph",
                status: 'complete',
                tasknr: '1',
                assigner: "Kagiso 1",
                due: Date.now()+1 ,

            }

            await Tasks.insertOne(MockTask);

            let app = makeApp(false,MockDB)

            let projectName = MockTask['project'];
            let taskNumber = MockTask['tasknr'];
            let newStatus = "wrong1";
            const requestString = '/task/updateTaskStatus/'+projectName+'/'+taskNumber+'/'+newStatus

            const response = await supertest(app)
                .patch(requestString)
                .send({
                    project: projectName,
                    tasknr: taskNumber,
                    status: newStatus
                })
                .expect(400)
                .then((res)=>{
                    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
                    expect(res.body['message']).toBeDefined()
                    expect(res.body['data']).toBeDefined()
                    expect(res.body['message']).toStrictEqual("Failed. The provided status  '\ "+newStatus+" '\ is not part of the currently accepted status: 'In-progress','complete','not yet started','on hold'")

                })


        });




    })
})
describe('/updateTaskDueDate' , ()=>{

    describe('when requested with a new task due date',()=>{
        let connection;
        let MockDB;
        beforeAll(async () => {
            connection = await MongoClient.connect(global.__MONGO_URI__, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            MockDB = await connection.db(global.__MONGO_DB_NAME__);


        });
        afterAll(async () => {
            await connection.close();
            await MockDB.close();
        });

        it('it should return a JSON object', async ()=> {

            let projectName = "";
            let taskNumber = 0;
            let newDate = Date.now()+1;
            const requestString = '/task/updateTaskDueDate/:'+projectName+'/:'+taskNumber+'/:'+newDate;
            let app = makeApp(false,MockDB)
            const response = await supertest(app)
                .patch(requestString)
                .expect(400)
                .then((res)=>{
                    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
                })
        });

        it('it should return status 200 or 400', async ()=> {

            let projectName = "";
            let taskNumber = 0;
            let newDate = Date.now()+1;
            const requestString = '/task/updateTaskDueDate/:'+projectName+'/:'+taskNumber+'/:'+newDate;
            let app = makeApp(false,MockDB)
            const response = await supertest(app)
                .patch(requestString)
                .expect(400)
                .then((res)=>{
                    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
                })
        });

        it('should return jsonObject with "message" and "body" fields', async ()=> {

            let projectName = "";
            let taskNumber = 0;
            let newDate = Date.now()+1;
            const requestString = '/task/updateTaskDueDate/:'+projectName+'/:'+taskNumber+'/:'+newDate;
            let app = makeApp(false,MockDB)
            const response = await supertest(app)
                .patch(requestString)
                .send({
                    project: "graph",
                    tasknr: 1,
                    due: newDate
                })
                .expect(400)
                .then((res)=>{
                    expect(res.headers['content-type']).toBe("application/json; charset=utf-8")
                    expect(res.body['message']).toBeDefined()
                    expect(res.body['data']).toBeDefined()

                })
        });

        it('should return status 400 and message = "Failed. No matched task with given parameters" when the task does not exist', async ()=> {

            let projectName = "";
            let taskNumber = 0;
            let newDate = Date.now()+1;
            const requestString = '/task/updateTaskDueDate/:'+projectName+'/:'+taskNumber+'/:'+newDate;

            let app = makeApp(false,MockDB)
            const response = await supertest(app)
                .patch(requestString)
                .expect(400)
                .then((res)=>{
                    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
                    expect(res.body['message']).toBeDefined()
                    expect(res.body['data']).toBeDefined()
                    expect(res.body['message']).toStrictEqual("Failed. No matched task with given parameters")

                })
        });

        it('should return status 200 and message = "successful" when the task due date is updated', async ()=> {
            const Tasks = MockDB.collection('Tasks');
            let MockTask = {
                assignee: ['User1' , 'User2'],
                description: "This is a test task",
                issued: Date.now().toString() ,
                project : "Graph",
                status: 'In progress',
                tasknr: '1',
                assigner: "Kagiso 1",
                due: Date.now()+1 ,

            }

            await Tasks.insertOne(MockTask);

            let app = makeApp(false,MockDB)

            let projectName = MockTask['project'];
            let taskNumber = MockTask['tasknr'];
            let newDate = Date.now() +2;
            const requestString = '/task/updateTaskDueDate/'+projectName+'/'+taskNumber+'/'+newDate;


            const response = await supertest(app)
                .patch(requestString)
                .send({
                    project: MockTask['project'],
                    tasknr: MockTask['tasknr'],
                    due: newDate
                })
                .expect(200)
                .then((res)=>{
                    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
                    expect(res.body['message']).toBeDefined()
                    expect(res.body['data']).toBeDefined()
                    expect(res.body['message']).toStrictEqual("success")

                })


        });

        it('should return status 400 and message = "failed" when the task status is not updated', async ()=> {
            const Tasks = MockDB.collection('Tasks');
            let MockTask = {
                assignee: ['User1' , 'User2'],
                description: "This is a test task",
                issued: Date.now().toString() ,
                project : "Graph",
                status: 'complete',
                tasknr: '1',
                assigner: "Kagiso 1",
                due: Date.now()+1 ,

            }

            await Tasks.insertOne(MockTask);

            let app = makeApp(false,MockDB)

            let projectName ="wrong name";
            let taskNumber = MockTask['tasknr'];
            let newDate = Date.now() +2;
            const requestString = '/task/updateTaskDueDate/'+projectName+'/'+taskNumber+'/'+newDate;

            const response = await supertest(app)
                .patch(requestString)
                .send({
                    project: projectName,
                    tasknr: taskNumber,
                    due: newDate
                })
                .expect(400)
                .then((res)=>{
                    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
                    expect(res.body['message']).toBeDefined()
                    expect(res.body['data']).toBeDefined()
                    expect(res.body['message']).toStrictEqual('Failed. No matched task with given parameters')

                })


        });




    })
})
describe('/updateTaskAssignee' , ()=>{

    describe('when requested with a new task Assignee',()=>{
        let connection;
        let MockDB;
        beforeAll(async () => {
            connection = await MongoClient.connect(global.__MONGO_URI__, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            MockDB = await connection.db(global.__MONGO_DB_NAME__);


        });
        afterAll(async () => {
            await connection.close();
            await MockDB.close();
        });

        it('it should return a JSON object', async ()=> {

            let projectName = "";
            let taskNumber = 0;
            let newAssignee = [
                {
                    name:"Assignee1",
                    email:"testAssignee1@testDB.com"
                },
                {
                    name:"Assignee2",
                    email:"testAssignee2@testDB.com"
                }
            ]


            const requestString = '/task/updateTaskAssignee/:'+projectName+'/:'+taskNumber+'/:'+newAssignee;
            let app = makeApp(false,MockDB)
            const response = await supertest(app)
                .patch(requestString)
                .expect(400)
                .then((res)=>{
                    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
                })
        });

        it('it should return status 200 or 400', async ()=> {

            let projectName = "";
            let taskNumber = 0;
            let newAssignee = [
                {
                    name:"Assignee1",
                    email:"testAssignee1@testDB.com"
                },
                {
                    name:"Assignee2",
                    email:"testAssignee2@testDB.com"
                }
            ]


            const requestString = '/task/updateTaskAssignee/:'+projectName+'/:'+taskNumber+'/:'+newAssignee;
            let app = makeApp(false,MockDB)
            const response = await supertest(app)
                .patch(requestString)
                .expect(400)
                .then((res)=>{
                    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
                })
        });

        it('should return jsonObject with "message" and "body" fields', async ()=> {

            let projectName = "";
            let taskNumber = 0;
            let newAssignee = [
                {
                    name:"Assignee1",
                    email:"testAssignee1@testDB.com"
                },
                {
                    name:"Assignee2",
                    email:"testAssignee2@testDB.com"
                }
            ]


            const requestString = '/task/updateTaskAssignee/:'+projectName+'/:'+taskNumber+'/:'+newAssignee;
            let app = makeApp(false,MockDB)
            const response = await supertest(app)
                .patch(requestString)
                .send({
                    project: "graph",
                    tasknr: 1,
                    Assignee: newAssignee
                })
                .expect(400)
                .then((res)=>{
                    expect(res.headers['content-type']).toBe("application/json; charset=utf-8")
                    expect(res.body['message']).toBeDefined()
                    expect(res.body['data']).toBeDefined()

                })
        });

        it('should return status 400 and message = "Failed. No matched task with given parameters" when the task does not exist', async ()=> {

            let projectName = "";
            let taskNumber = 0;
            let newAssignee = [
                {
                    name:"Assignee1",
                    email:"testAssignee1@testDB.com"
                },
                {
                    name:"Assignee2",
                    email:"testAssignee2@testDB.com"
                }
            ]


            const requestString = '/task/updateTaskAssignee/:'+projectName+'/:'+taskNumber+'/:'+newAssignee;
            let app = makeApp(false,MockDB)
            const response = await supertest(app)
                .patch(requestString)
                .expect(400)
                .then((res)=>{
                    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
                    expect(res.body['message']).toBeDefined()
                    expect(res.body['data']).toBeDefined()
                    expect(res.body['message']).toStrictEqual("Failed. No matched task with given parameters")

                })
        });

        it('should return status 200 and message = "successful" when the task Assignee is updated', async ()=> {
            const Tasks = MockDB.collection('Tasks');
            let MockTask = {
                assignee: ['User1' , 'User2'],
                description: "This is a test task",
                issued: Date.now().toString() ,
                project : "Graph",
                status: 'In progress',
                tasknr: '1',
                assigner: "Kagiso 1",
                due: Date.now()+1 ,

            }

            await Tasks.insertOne(MockTask);

            let app = makeApp(false,MockDB)
            let projectName = MockTask['project'];
            let taskNumber = MockTask['tasknr'];
            let newAssignee = [
                {
                    name:"Assignee1",
                    email:"testAssignee1@testDB.com"
                },
                {
                    name:"Assignee2",
                    email:"testAssignee2@testDB.com"
                }
            ]

            newAssignee= JSON.stringify(newAssignee);

            const requestString = '/task/updateTaskAssignee/'+projectName+'/'+taskNumber+'/'+newAssignee;


            const response = await supertest(app)
                .patch(requestString)
                .send({
                    project: MockTask['project'],
                    tasknr: MockTask['tasknr'],
                    assignee: newAssignee
                })
                .expect(200)
                .then((res)=>{
                    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
                    expect(res.body['message']).toBeDefined()
                    expect(res.body['data']).toBeDefined()
                    expect(res.body['message']).toStrictEqual("success")

                })


        });

        it('should return status 400 and message = "failed" when the task Assignee is not updated', async ()=> {
            const Tasks = MockDB.collection('Tasks');
            let MockTask = {
                assignee: ['User1' , 'User2'],
                description: "This is a test task",
                issued: Date.now().toString() ,
                project : "Graph",
                status: 'complete',
                tasknr: '1',
                assigner: "Kagiso 1",
                due: Date.now()+1 ,

            }

            await Tasks.insertOne(MockTask);

            let app = makeApp(false,MockDB)

            let projectName ="wrong name";
            let taskNumber = MockTask['tasknr'];
            let newDate = Date.now() +2;
            const requestString = '/task/updateTaskDueDate/'+projectName+'/'+taskNumber+'/'+newDate;

            const response = await supertest(app)
                .patch(requestString)
                .send({
                    project: projectName,
                    tasknr: taskNumber,
                    due: newDate
                })
                .expect(400)
                .then((res)=>{
                    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
                    expect(res.body['message']).toBeDefined()
                    expect(res.body['data']).toBeDefined()
                    expect(res.body['message']).toStrictEqual('Failed. No matched task with given parameters')

                })


        });




    })
})

