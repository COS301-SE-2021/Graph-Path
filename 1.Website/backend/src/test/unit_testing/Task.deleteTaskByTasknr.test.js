const makeApp = require('../../app');
const supertest = require('supertest');
const {MongoClient} = require('mongodb');

/**** here we mock the database with the relevant collections and documents ***/

/**** here we mock the database with the relevant collections and documents  documents ***/

describe('/deleteTaskByTasknr',  ()=> {

    describe('When requested with a Project number' , ()=>{
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

            await Tasks.insertOne(MockTask)
            let app = makeApp(false,MockDB)
            let response  = await supertest(app)
                .delete('/task/deleteTaskByTasknr')
                .send({
                    tasknr: 1
                })
                .expect(200)
                .then((res)=>{})
        });
        it('it should return a json body', async ()=> {

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

            await Tasks.insertOne(MockTask)
            let app = makeApp(false,MockDB)
            let response  = await supertest(app)
                .delete('/task/deleteTaskByTasknr')
                .send({
                    tasknr: 1
                })
                .expect(200)
                .then((res)=>{
                    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
                })
        });
        it('it should return message \'Deleted on success\'', async ()=> {

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

            await Tasks.insertOne(MockTask)
            let app = makeApp(false,MockDB)
            let response  = await supertest(app)
                .delete('/task/deleteTaskByTasknr')
                .send({
                    tasknr: 1
                })
                .expect(200)
                .then((res)=>{
                    expect(res.body['message']).toBe('Deleted')
                })
        });

    })

});