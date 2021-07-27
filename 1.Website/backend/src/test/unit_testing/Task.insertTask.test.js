const makeApp = require('../../app');
const supertest = require('supertest');
const {MongoClient} = require('mongodb');


describe('/insertTask',  ()=> {
    describe('When request with a given JSON body ',  () =>{
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
        beforeAll(async () => {
            connection = await MongoClient.connect(global.__MONGO_URI__, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            MockDB = await connection.db(global.__MONGO_DB_NAME__);

            const Users = MockDB.collection('Users');
        });
        afterAll(async () => {
            await connection.close();
            await MockDB.close();
        });
        it('it should return status code 200', async ()=> {

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
            let app = makeApp(false,MockDB)
            let response  = await supertest(app)
                .post('/task/insertTask')
                .send(MockTask)
                .expect(200)
                .then((res)=>{})
        });
        it('it should return a JSON object', async ()=> {

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
            let app = makeApp(false,MockDB)
            let response  = await supertest(app)
                .post('/task/insertTask')
                .send(MockTask)
                .expect(200)
                .then((res)=>{
                    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
                })
        });
        it('it should return JSON object with save message', async ()=> {
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
            let app = makeApp(false,MockDB)
            const response = await supertest(app)
                .post('/task/insertTask')
                .send(MockTask)
                .expect(200)
                .then((res)=>{
                    res.body
                    expect(res.body['message']).toBe('saved')

                })
        });
    });





});