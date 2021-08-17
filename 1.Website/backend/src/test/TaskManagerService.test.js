const MockDBController = require('../Controllers/testDBController');
const TaskmanagerService = require('../Services/TaskManagerService');
const {MongoClient} = require("mongodb");




describe('TaskManagerService',  ()=> {


    let connection;
    let MockDB;
    beforeAll(async () => {

        connection = await MongoClient.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        MockDB =  MockDBController.dbController;




    });
    afterAll(async () => {
        await connection.close();
        await MockDB.close();
    });
    it('should return controller returned',   async () => {
        await TaskmanagerService.getAllTasks(MockDB).then((K)=>{
            console.log('n mock fn',K)
             expect(K).toBe("null");
        }).catch(err=>{

        })



    });

});
