const makeApp = require('../app');
const supertest = require('supertest');
const {MongoClient} = require('mongodb')
const MockDBController = require('../Controllers/MockDBController');


describe('/getTaskByDescription', ()=>{

    describe("When requested with a task description. ",()=>{
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

        it('it should return status code 200 or 404', async ()=> {
            let app = makeApp(MockDBController)
            let response  = await supertest(app)
                .get('/task/getTaskByDescription')
                .expect(404)
                .then((res)=>{  })

        });

        it('it should return a JSON object', async ()=> {

            let app = makeApp(MockDBController)
            const response = await supertest(app)
                .get('/task/getTaskByDescription')
                .expect(404)
                .then((res)=>{
                    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
                })
        });

        it('should return jsonObject with "message" and "body" fields', async ()=> {
            let app = makeApp(MockDBController)
            const response = await supertest(app)
                .get('/task/getTaskByDescription')
                .expect(404)
                .then((res)=>{
                    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
                    expect(res.body['message']).toBeDefined()
                    expect(res.body['body']).toBeDefined()
                })

        });

        it('should return status 404 and message = "failed. No task with given description" when the description does not exist', async ()=> {
            let app = makeApp(MockDBController);
            const response = await supertest(app)
                .get('/task/getTaskByDescription')
                .expect(404)
                .then((res)=>{
                    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
                    expect(res.body['message']).toBeDefined()
                    expect(res.body['body']).toBeDefined()
                    expect(res.body['message']).toStrictEqual("failed. No task with given description")
                    expect(res.body['body']).toBe(null)
                })


        });

        it('should return status 200 and message = "successful" when the description exists', async ()=> {
            const Tasks = MockDB.collection('Tasks');
            let MockTask = {
                CreationDate: Date.now() ,
                DueDate: Date.now()+1 ,
                TaskName: "Task 0 ",
                Description: "This is a test task",
                tasknr: "Green",
                Status: 'In progress',
                Assignee: ['User1' , 'User2'],
                Assigner: "Kagiso 1",
                ProjectName : "SomeID of the parent Node",
            }
            await Tasks.insertOne(MockTask);
            let app = makeApp(MockDBController);

            const response = await supertest(app)
                .get('/task/getTaskByDescription')
                .send({
                    Description:"This is a test task"
                })
                .expect(200)
                .then((res)=>{
                    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
                    expect(res.body['message']).toBeDefined()
                    expect(res.body['body']).toBeDefined()
                    expect(res.body['message']).toStrictEqual("successful")

                })


        });




    })






})