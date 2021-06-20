const makeApp = require('../app');
const supertest = require('supertest');
const {MongoClient} = require('mongodb');

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

/**** here we mock the database with the relevant collections and documents ***/
const Tasks = MockDB.collection('Tasks')
/**** here we mock the database with the relevant collections and documents  documents ***/

/*describe('/getTaskByTasknr', ()=>{
    describe("when given a task number ", ()=>{
        it('should return status code 200', function () {});
        it('should return JSON body ', function () {});
        it('should return JSON body with all fields of task', function () {});
        it('should return an empty json object when given a non exist number', function () {});
    })
})
*/


describe('/getAllTasks',()=> {


    describe("when called", ()=>{
        it('should return status code 200', async ()=> {
            let app = makeApp(false,MockDB)
            let response  = await supertest(app)
                .get('/')
                .expect(200)
                .then((res)=>{})
        });
        it('should return a JSON object', async ()=> {

        });
        it('should return a JSON object', async ()=> {});
        it('should return a JSON object', async ()=>{});
    })
});

describe('/getAllTasksByProject', function () {});
describe('/insertTask', function () {});
describe('/deleteTaskByTasknr', function () {});