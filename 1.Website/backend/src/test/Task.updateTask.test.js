const makeApp = require('../app');
const supertest = require('supertest');
const {MongoClient} = require('mongodb')


describe('/updateTaskDescription' , ()=>{
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
            let newDescription = "this is a new test description."
            const requestString = '/task/updateTaskDescription/:'+projectName+'/:'+taskNumber+'/:'+newDescription
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
            let newDescription = "this is a new test description."
            const requestString = '/task/updateTaskDescription/:'+projectName+'/:'+taskNumber+'/:'+newDescription
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
            let taskNumber = "0";
            let newDescription = "this is a new test description."
            const requestString = '/task/updateTaskDescription/:'+projectName+'/:'+taskNumber+'/:'+newDescription

            let app = makeApp(false,MockDB)
            const response = await supertest(app)
                .patch(requestString)
                .expect(400)
                .then((res)=>{
                    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
                    expect(res.body['message']).toBeDefined()
                    expect(res.body['data']).toBeDefined()

                })
        });

        it('should return status 400 and message = "Failed. No matched task with given parameters" when the task does not exist', async ()=> {

            let projectName = "";
            let taskNumber = "0";
            let newDescription = "this is a new test description."
            const requestString = '/task/updateTaskDescription/:'+projectName+'/:'+taskNumber+'/:'+newDescription

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

        it('should return status 200 and message = "successful" when the task description is updated', async ()=> {
            const Tasks = MockDB.collection('Tasks');
            let MockTask = {
                issued: Date.now() ,
                due: Date.now()+1 ,
                TaskName: "Task 0 ",
                description: "This is a test task",
                tasknr: 1,
                Status: 'In progress',
                Assignee: ['User1' , 'User2'],
                Assigner: "Kagiso 1",
                project : "Graph",
            }

            await Tasks.insertOne(MockTask);

            let app = makeApp(false,MockDB)

            let projectName = MockTask['project'];
            let taskNumber = MockTask['tasknr'];
            let newDescription = "this";

            const requestString = '/task/updateTaskDescription/'+projectName+'/'+taskNumber+'/'+newDescription


            const response = await supertest(app)
                .patch('/task/updateTaskDescription/'+projectName+'/'+taskNumber+'/'+newDescription)
                .send({
                    project: MockTask['project'],
                    tasknr: MockTask['tasknr'],
                    description: newDescription
                })
                .expect(400)
                .then((res)=>{
                    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
                    expect(res.body['message']).toBeDefined()
                    expect(res.body['data']).toBeDefined()
                    expect(res.body['message']).toStrictEqual("success")

                })


        });

        it('should return status 400 and message = "failed" when the task description is updated', async ()=> {
            const Tasks = MockDB.collection('Tasks');
            let MockTask = {
                issued: Date.now() ,
                due: Date.now()+1 ,
                TaskName: "Task 0 ",
                description: "This is a test task",
                tasknr: 1,
                Status: 'In progress',
                Assignee: ['User1' , 'User2'],
                Assigner: "Kagiso 1",
                project : "Graph",
            }

            await Tasks.insertOne(MockTask);

            let app = makeApp(false,MockDB)

            let projectName = "WrongName";
            let taskNumber = "xx";
            let newDescription = "this";

            const requestString = '/task/updateTaskDescription/'+projectName+'/'+taskNumber+'/'+newDescription


            const response = await supertest(app)
                .patch(requestString)
                .send({
                    project: "wrongName",
                    tasknr: 3,
                    description: newDescription
                })
                .expect(400)
                .then((res)=>{
                    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
                    expect(res.body['message']).toBeDefined()
                    expect(res.body['data']).toBeDefined()
                    expect(res.body['message']).toStrictEqual("Failed. No matched task with given parameters")

                })


        });




    })


})
describe('/updateTaskStatus' , ()=>{

})
describe('/updateTaskDueDate' , ()=>{})
describe('/updateTaskAssignee' , ()=>{})

