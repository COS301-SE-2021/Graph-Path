const makeApp = require('../app');
const supertest = require('supertest');
const {MongoClient} = require('mongodb');


describe('/getAllTasks',()=> {

    describe("when requested", ()=>{


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

        it('it should return status code 200', async ()=> {
            let app = makeApp(false,MockDB)
            let response  = await supertest(app)
                .get('/task/getAllTasks')
                .expect(200)
                .then((res)=>{  })

        });
        it('it should return a JSON object', async ()=> {

            let app = makeApp(false,MockDB)
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
                CreationDate: Date.now() ,
                DueDate: Date.now()+1 ,
                TaskName: "Task 0 ",
                Description: "This is a test task",
                Label: "Green",
                Status: 'In progress',
                Assignee: ['User1' , 'User2'],
                Assigner: "Kagiso 1",
                Parent_Node : "SomeID of the parent Node",
            }
            await Tasks.insertOne(MockTask);
            let app = makeApp(false,MockDB)
            const response = await supertest(app)
                .get('/task/getAllTasks')
                .expect(200)
                .then((res)=>{
                    res.body
                    expect(res.body[0]['CreationDate']).toBeDefined()
                    expect(res.body[0]['DueDate']).toBeDefined()
                    expect(res.body[0]['TaskName']).toBeDefined()
                    expect(res.body[0]['Description']).toBeDefined()
                    expect(res.body[0]['Label']).toBeDefined()
                    expect(res.body[0]['Status']).toBeDefined()
                    expect(res.body[0]['Assignee']).toBeDefined()
                    expect(res.body[0]['Assigner']).toBeDefined()
                    expect(res.body[0]['Parent_Node']).toBeDefined()
                })
        });
        it('it should return empty JSON object when there are no projects', async ()=>{
            var Tasks = MockDB.collection('Tasks');
            Tasks.deleteMany({})
            let app = makeApp(false,MockDB)
            const response = await supertest(app)
                .get('/task/getAllTasks')
                .expect(200)
                .then((res)=>{

                    expect(res.body).toStrictEqual([])
                })
        });
    })
});
