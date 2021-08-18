const MockDBController = require('../Controllers/MockDBController');
const TaskmanagerService = require('../Services/TaskManagerService');
const {MongoClient} = require("mongodb");




describe('TaskManagerService',  ()=> {

    let connection;
    let MockDB;
    beforeAll(async () => {

        MockDB = await MockDBController;


    });
    afterAll(async () => {

    });
    it('should return controller returned',   async () => {
        await TaskmanagerService.getAllTasks(MockDBController).then((K)=>{
            console.log('n mock fn',K)
             expect(K).toBe("null");
        }).catch(err=>{

        })



    });

});
