const MockDBController = require('../../Controllers/MockDBController');
const taskManagerService = require('../../Services/TaskManagerService');
const {MongoClient} = require("mongodb");
const mongoose = require("mongoose");

describe('TaskManagerService.getTaskByID',  ()=> {

    let connection;
    let MockDB;
    let mockMemberObject = {
        email: "test@gmail.com",
        permissions: ['owner']
    }

    let mockTask={
        _id: new mongoose.mongo.ObjectID(),
        taskMembers: ["ntpnaane@gmail.com"],
        assigner: "test@gmail.com",
        description: "This is a unit testing task.",
        due: "2021-09-21",
        issued: "2021-08-17",
        nodeID: "6117f3aec5960d336cef32ec_n5",
        projectID: "6117f3aec5960d336cef32ec",
        status: "complete"
    }

    beforeAll(async () => {

        connection = await MongoClient.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        MockDB = await MockDBController;

        //const Tasks = MockDB.getConnectionInstance().collection('Tasks');
        //await Tasks.insertOne(mockTask);


    });
    afterAll(async () => {
        //await taskManagerService.deleteTaskByID(MockDB, mockTask._id);
        await connection.close();
        await MockDB.close();
    });

    it('When the task does not exist',   async () => {
        // const Tasks = MockDB.getConnectionInstance().collection('Tasks');
        // await Tasks.insertOne(mockTask);
        const invalidID = new mongoose.mongo.ObjectID();
        const response = await taskManagerService.getTaskByID(MockDB,invalidID);
        expect(response).toBe("No available task");

        await taskManagerService.deleteTaskByID(MockDB, mockTask._id);

    });

    it('it should return the task if it exists',   async () => {
        const Tasks = MockDB.getConnectionInstance().collection('Tasks');
        await Tasks.insertOne(mockTask);
        const validID = mockTask._id;
        const response = await taskManagerService.getTaskByID(MockDB,validID);
        expect(response._id).toStrictEqual(validID);

        await taskManagerService.deleteTaskByID(MockDB, mockTask._id);
    });


    it('it should return the full task object',   async () => {
        const Tasks = MockDB.getConnectionInstance().collection('Tasks');
        await Tasks.insertOne(mockTask);
        const validID = mockTask._id;
        const response = await taskManagerService.getTaskByID(MockDB,validID);
        expect(response.description).toStrictEqual(mockTask.description);
        expect(response.issued).toStrictEqual(mockTask.issued);
        expect(response.nodeID).toStrictEqual(mockTask.nodeID);
        expect(response.due).toStrictEqual(mockTask.due);
        expect(response.status).toStrictEqual(mockTask.status);
        expect(response.assignee).toStrictEqual(mockTask.assignee);
        expect(response.assigner).toStrictEqual(mockTask.assigner);
        expect(response.project).toStrictEqual(mockTask.project);

        await taskManagerService.deleteTaskByID(MockDB, mockTask._id);

    });

});

describe('TaskManagerService.getAllTasks',  ()=> {

    let connection;
    let MockDB;
    let mockMemberObject = {
        email: "test@gmail.com",
        permissions: ['owner']
    }

    let mockTask={
        _id: new mongoose.mongo.ObjectID(),
        taskMembers: ["ntpnaane@gmail.com"],
        assigner: "test@gmail.com",
        description: "This is a unit testing task.",
        due: "2021-09-21",
        issued: "2021-08-17",
        nodeID: "6117f3aec5960d336cef32ec_n5",
        projectID: "6117f3aec5960d336cef32ec",
        status: "complete"
    }

    beforeAll(async () => {

        connection = await MongoClient.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        MockDB = await MockDBController;

        //const Tasks = MockDB.getConnectionInstance().collection('Tasks');
        //await Tasks.insertOne(mockTask);


    });
    afterAll(async () => {
        //await taskManagerService.deleteTaskByID(MockDB, mockTask._id);
        await connection.close();
        await MockDB.close();
    });

    //currently the db is not empty so this test fails, unless you run it separately
    it('it should return empty list when no tasks',   async () => {

        const invalidID = new mongoose.mongo.ObjectID();
        const response = await taskManagerService.getAllTasks(MockDB);
        expect(response).toStrictEqual([]);

    });

    it('it should return the task information if the task exists',   async () => {
        const Tasks = MockDB.getConnectionInstance().collection('Tasks');
        await Tasks.insertOne(mockTask);

        const validID = mockTask._id;
        const response = await taskManagerService.getAllTasks(MockDB);
        expect(response[0]._id).toStrictEqual(validID);

        await taskManagerService.deleteTaskByID(MockDB, mockTask._id);

    });

});

describe('TaskManagerService.getAllTasksByProject',  ()=> {

    let connection;
    let MockDB;
    let mockMemberObject = {
        email: "test@gmail.com",
        permissions: ['owner']
    }

    let mockTask={
        _id: new mongoose.mongo.ObjectID(),
        taskMembers: ["ntpnaane@gmail.com"],
        assigner: "test@gmail.com",
        description: "This is a unit testing task.",
        due: "2021-09-21",
        issued: "2021-08-17",
        nodeID: "6117f3aec5960d336cef32ec_n5",
        projectID: "6117f3aec5960d336cef32ec",
        status: "complete"
    }

    let mockTask2={
        _id: new mongoose.mongo.ObjectID(),
        taskMembers: ["kgmonareng@gmail.com"],
        assigner: "test2@gmail.com",
        description: "This is a unit testing task, the second one",
        due: "2021-09-21",
        issued: "2021-08-17",
        nodeID: "6117f3aec5960d336cef32ec_n5",
        projectID: "6117f3aec5960d336cef32ec",
        status: "in progress"
    }

    beforeAll(async () => {

        connection = await MongoClient.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        MockDB = await MockDBController;

       // const Tasks = MockDB.getConnectionInstance().collection('Tasks');
        //await Tasks.insertOne(mockTask);


    });
    afterAll(async () => {
        await connection.close();
        await MockDB.close();
    });

    it('it should return an empty list when there are no tasks',   async () => {

        const invalidID = new mongoose.mongo.ObjectID();
        const response = await taskManagerService.getAllTasksByProject(MockDB,"6117f3aec5960d336cef32ec");
        expect(response).toStrictEqual([]);

    });

    it('it should return the 1 tasks related to the provided project',   async () => {
        const Tasks = MockDB.getConnectionInstance().collection('Tasks');
        await Tasks.insertOne(mockTask);

        const response1 = await taskManagerService.getTaskByID(MockDB,mockTask._id);
        expect(response1._id).toStrictEqual(mockTask._id);

        const response2 = await taskManagerService.getAllTasks(MockDB);
        expect(response2).not.toStrictEqual([]);


        const response = await taskManagerService.getAllTasksByProject(MockDB,mockTask.projectID);
        //expect(response).toStrictEqual([]);
        expect(response[0]._id).toStrictEqual(mockTask._id);
        expect(response[0].projectID).toStrictEqual(mockTask.projectID);
        expect(response[1]).toStrictEqual(undefined);

        await taskManagerService.deleteTaskByID(MockDB, mockTask._id);

    });

    it('it should return the 2 tasks related to the provided project',   async () => {
        const Tasks = MockDB.getConnectionInstance().collection('Tasks');
        await Tasks.insertOne(mockTask);

        const Tasks2 = MockDB.getConnectionInstance().collection('Tasks');
        await Tasks2.insertOne(mockTask2);

        const response1 = await taskManagerService.getTaskByID(MockDB,mockTask._id);
        expect(response1._id).toStrictEqual(mockTask._id);

        const response3 = await taskManagerService.getTaskByID(MockDB,mockTask2._id);
        expect(response3._id).toStrictEqual(mockTask2._id);

        const response2 = await taskManagerService.getAllTasks(MockDB);
        expect(response2).not.toStrictEqual([]);


        const response = await taskManagerService.getAllTasksByProject(MockDB,mockTask.projectID);
        //expect(response).toStrictEqual([]);
        expect(response[0]._id).toStrictEqual(mockTask._id);
        expect(response[0].projectID).toStrictEqual(mockTask.projectID);
        expect(response[1]._id).toStrictEqual(mockTask2._id);
        expect(response[1].projectID).toStrictEqual(mockTask2.projectID);

        await taskManagerService.deleteTaskByID(MockDB, mockTask._id);
        await taskManagerService.deleteTaskByID(MockDB, mockTask2._id);

    });

});

describe('TaskManagerService.insertTask',  ()=> {

    let connection;
    let MockDB;
    let mockMemberObject = {
        email:"test@gmail.com",
        permissions: ['owner']
    }

    let mockTask={
        _id: new mongoose.mongo.ObjectID(),
        taskMembers: ["ntpnaane@gmail.com"],
        assigner: "test@gmail.com",
        description: "This is a unit testing task.",
        due: "2021-09-21",
        issued: "2021-08-17",
        nodeID: "6117f3aec5960d336cef32ec_n5",
        projectID: "6117f3aec5960d336cef32ec",
        status: "complete"
    }

    beforeAll(async () => {

        connection = await MongoClient.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        MockDB = await MockDBController;

        // const Tasks = MockDB.getConnectionInstance().collection('Tasks');
        // await Tasks.insertOne(mockTask);


    });
    afterAll(async () => {
        await connection.close();
        await MockDB.close();
    });

    it('it should insert correctly',   async () => {

        const response = await taskManagerService.insertTask(MockDB,mockTask);
        expect(response).toBeDefined();
        let reply = await taskManagerService.getTaskByID(MockDB, mockTask._id);
        expect(reply._id).toStrictEqual(mockTask._id);


    });

    // it('The check to see if a task already exists',   async () => {
    //     const Tasks = MockDB.getConnectionInstance().collection('Tasks');
    //     await Tasks.insertOne(mockTask);
    //     let reply = await taskManagerService.getTaskByID(MockDB, mockTask._id);
    //     expect(reply._id).toStrictEqual(mockTask._id);
    //     const response = await taskManagerService.insertTask(MockDB,mockTask);
    //     // expect(response.message).toBeDefined();
    //     expect(response).toThrow();
    //
    // });



});

describe('TaskManagerService.deleteTaskByID',  ()=> {

    let connection;
    let MockDB;
    let mockMemberObject = {
        email:"test@gmail.com",
        permissions: ['owner']
    }

    let mockTask={
        _id: new mongoose.mongo.ObjectID(),
        taskMembers: ["ntpnaane@gmail.com"],
        assigner: "test@gmail.com",
        description: "This is a unit testing task.",
        due: "2021-09-21",
        issued: "2021-08-17",
        nodeID: "6117f3aec5960d336cef32ec_n5",
        projectID: "6117f3aec5960d336cef32ec",
        status: "complete"
    }

    beforeAll(async () => {

        connection = await MongoClient.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        MockDB = await MockDBController;

        // const Tasks = MockDB.getConnectionInstance().collection('Tasks');
        // await Tasks.insertOne(mockTask);


    });
    afterAll(async () => {
        await connection.close();
        await MockDB.close();
    });

    it('it should delete correctly',   async () => {
        const Tasks = MockDB.getConnectionInstance().collection('Tasks');
        await Tasks.insertOne(mockTask);

        let reply = await taskManagerService.deleteTaskByID(MockDB, mockTask._id);
        let response = await  taskManagerService.getTaskByID(MockDB, mockTask._id);
        expect(response).toStrictEqual("No available task");

    });


});

describe('TaskManagerService.updateTaskDescription',  ()=> {

    let connection;
    let MockDB;
    let mockMemberObject = {
        email:"test@gmail.com",
        permissions: ['owner']
    }

    let newDesc = "This is the new description.";

    let mockTask={
        _id: new mongoose.mongo.ObjectID(),
        taskMembers: ["ntpnaane@gmail.com"],
        assigner: "test@gmail.com",
        description: "This is a unit testing task.",
        due: "2021-09-21",
        issued: "2021-08-17",
        nodeID: "6117f3aec5960d336cef32ec_n5",
        projectID: "6117f3aec5960d336cef32ec",
        status: "complete"
    }

    let mockTask2={
        _id: new mongoose.mongo.ObjectID(),
        taskMembers: ["ntpnaane@gmail.com"],
        assigner: "test@gmail.com",
        description: "This is a unit testing task.",
        due: "2021-09-21",
        issued: "2021-08-17",
        nodeID: "6117f3aec5960d336cef32ec_n5",
        projectID: "6117f3aec5960d336cef32ec",
        status: "complete"
    }

    beforeAll(async () => {

        connection = await MongoClient.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        MockDB = await MockDBController;

          const Tasks = MockDB.getConnectionInstance().collection('Tasks');
          await Tasks.insertOne(mockTask);


    });
    afterAll(async () => {
        await connection.close();
        await MockDB.close();
    });

    it('it should update correctly',   async () => {


        let reply = await taskManagerService.updateTaskDescription(MockDB, mockTask._id, newDesc);

        let response =  await taskManagerService.getTaskByID(MockDB, mockTask._id);
        expect(response._id).toStrictEqual(mockTask._id);
        expect(response.description).toStrictEqual(newDesc);

    });

    it('If task not found',   async () => {

        let reply = await taskManagerService.updateTaskDescription(MockDB, mockTask2._id);
        expect(reply).toBeDefined();

    });

});

describe('TaskManagerService.updateTaskStatus',  ()=> {

    let connection;
    let MockDB;
    let mockMemberObject = {
        email:"test@gmail.com",
        permissions: ['owner']
    }

    let newStatus = ["not started","not started","complete","back-log"];

    let mockTask={
        _id: new mongoose.mongo.ObjectID(),
        taskMembers: ["ntpnaane@gmail.com"],
        assigner: "test@gmail.com",
        description: "This is a unit testing task.",
        due: "2021-09-21",
        issued: "2021-08-17",
        nodeID: "6117f3aec5960d336cef32ec_n5",
        projectID: "6117f3aec5960d336cef32ec",
        status: "complete"
    }

    beforeAll(async () => {

        connection = await MongoClient.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        MockDB = await MockDBController;

        // const Tasks = MockDB.getConnectionInstance().collection('Tasks');
        // await Tasks.insertOne(mockTask);


    });
    afterAll(async () => {
        await connection.close();
        await MockDB.close();
    });

    it('it should update correctly to newStatus[0]',   async () => {
        const Tasks = MockDB.getConnectionInstance().collection('Tasks');
        await Tasks.insertOne(mockTask);

        let reply = await taskManagerService.updateTaskStatus(MockDB, mockTask._id, newStatus[0]);
        let response =  await taskManagerService.getTaskByID(MockDB, mockTask._id);
        expect(response._id).toStrictEqual(mockTask._id);
        expect(response.status).toStrictEqual(newStatus[0]);

        await taskManagerService.deleteTaskByID(MockDB, mockTask._id);

    });

    it('it should update correctly to newStatus[1]',   async () => {
        const Tasks = MockDB.getConnectionInstance().collection('Tasks');
        await Tasks.insertOne(mockTask);

        let reply = await taskManagerService.updateTaskStatus(MockDB, mockTask._id, newStatus[1]);
        let response =  await taskManagerService.getTaskByID(MockDB, mockTask._id);
        expect(response._id).toStrictEqual(mockTask._id);
        expect(response.status).toStrictEqual(newStatus[1]);

        await taskManagerService.deleteTaskByID(MockDB, mockTask._id);

    });

    it('it should update correctly to newStatus[2]',   async () => {
        const Tasks = MockDB.getConnectionInstance().collection('Tasks');
        await Tasks.insertOne(mockTask);

        let reply = await taskManagerService.updateTaskStatus(MockDB, mockTask._id, newStatus[2]);
        let response =  await taskManagerService.getTaskByID(MockDB, mockTask._id);
        expect(response._id).toStrictEqual(mockTask._id);
        expect(response.status).toStrictEqual(newStatus[2]);

        await taskManagerService.deleteTaskByID(MockDB, mockTask._id);

    });

    it('it should update correctly to newStatus[3]',   async () => {
        const Tasks = MockDB.getConnectionInstance().collection('Tasks');
        await Tasks.insertOne(mockTask);

        let reply = await taskManagerService.updateTaskStatus(MockDB, mockTask._id, newStatus[3]);
        let response =  await taskManagerService.getTaskByID(MockDB, mockTask._id);
        expect(response._id).toStrictEqual(mockTask._id);
        expect(response.status).toStrictEqual(newStatus[3]);

        await taskManagerService.deleteTaskByID(MockDB, mockTask._id);

    });

    it('If task not found',   async () => {
        let reply = await taskManagerService.getTaskByID(MockDB, mockTask._id);
        expect(reply).toStrictEqual("No available task");

    });

});

describe('TaskManagerService.updateTaskAssignee',  ()=> {

    let connection;
    let MockDB;
    let mockMemberObject = {
        email:"test@gmail.com",
        permissions: ['owner']
    }

    let newAssignee = "test2@gmail.com";

    let mockTask={
        _id: new mongoose.mongo.ObjectID(),
        assignee: "ntpnaane@gmail.com",
        assigner: "test@gmail.com",
        description: "This is a unit testing task.",
        due: "2021-09-21",
        issued: "2021-08-17",
        nodeID: "6117f3aec5960d336cef32ec_n5",
        projectID: "6117f3aec5960d336cef32ec",
        status: "complete"
    }

    beforeAll(async () => {

        connection = await MongoClient.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        MockDB = await MockDBController;

        // const Tasks = MockDB.getConnectionInstance().collection('Tasks');
        // await Tasks.insertOne(mockTask);


    });
    afterAll(async () => {
        await connection.close();
        await MockDB.close();
    });

    it('it should update correctly',   async () => {
        const Tasks = MockDB.getConnectionInstance().collection('Tasks');
        await Tasks.insertOne(mockTask);

        let reply = await taskManagerService.updateTaskAssignee(MockDB, mockTask._id, newAssignee);
        let response =  await taskManagerService.getTaskByID(MockDB, mockTask._id);
        expect(response._id).toStrictEqual(mockTask._id);
        expect(response.assignee).toStrictEqual(newAssignee);

        await taskManagerService.deleteTaskByID(MockDB, mockTask._id);

    });

    it('If task not found',   async () => {
        let reply = await taskManagerService.getTaskByID(MockDB, mockTask._id);
        expect(reply).toStrictEqual("No available task");

    });

});

describe('TaskManagerService.updateTaskAssigner',  ()=> {

    let connection;
    let MockDB;
    let mockMemberObject = {
        email:"test@gmail.com",
        permissions: ['owner']
    }

    let newAssigner = "Test3@gmail.com";

    let mockTask={
        _id: new mongoose.mongo.ObjectID(),
        taskMembers: ["ntpnaane@gmail.com"],
        assigner: "test@gmail.com",
        description: "This is a unit testing task.",
        due: "2021-09-21",
        issued: "2021-08-17",
        nodeID: "6117f3aec5960d336cef32ec_n5",
        projectID: "6117f3aec5960d336cef32ec",
        status: "complete"
    }

    beforeAll(async () => {

        connection = await MongoClient.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        MockDB = await MockDBController;

        // const Tasks = MockDB.getConnectionInstance().collection('Tasks');
        // await Tasks.insertOne(mockTask);


    });
    afterAll(async () => {
        await connection.close();
        await MockDB.close();
    });

    it('it should update correctly',   async () => {
        const Tasks = MockDB.getConnectionInstance().collection('Tasks');
        await Tasks.insertOne(mockTask);

        let reply = await taskManagerService.updateTaskAssigner(MockDB, mockTask._id, newAssigner);
        let response =  await taskManagerService.getTaskByID(MockDB, mockTask._id);
        expect(response._id).toStrictEqual(mockTask._id);
        expect(response.assigner).toStrictEqual(newAssigner);

        await taskManagerService.deleteTaskByID(MockDB, mockTask._id);

    });

    it('If task not found',   async () => {
        let reply = await taskManagerService.getTaskByID(MockDB, mockTask._id);
        expect(reply).toStrictEqual("No available task");

    });

});

describe('TaskManagerService.updateEverythingTask',  ()=> {

    let connection;
    let MockDB;
    let mockMemberObject = {
        email:"test@gmail.com",
        permissions: ['owner']
    }


    let mockTask={
        _id: new mongoose.mongo.ObjectID(),
        taskMembers: ["ntpnaane@gmail.com"],
        assigner: "test@gmail.com",
        description: "This is a unit testing task.",
        due: "2021-09-21",
        issued: "2021-08-17",
        nodeID: "6117f3aec5960d336cef32ec_n5",
        projectID: "6117f3aec5960d336cef32ec",
        status: "complete",
        title: "Title"
    }

    let testTask={
        //_id: new mongoose.mongo.ObjectID(),
        taskMembers: ["tester@gmail.com"],
        assigner: "ntpnaane@gmail.com",
        description: "This is the new unit testing task",
        due: "2021-09-21",
        issued: "2021-08-17",
        nodeID: "6117f3aec5960d336cef32ec_n5",
        projectID: "6117f3aec5960d336cef32ec",
        status: "in progress",
        title: "This is tile"
    }


    beforeAll(async () => {

        connection = await MongoClient.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        MockDB = await MockDBController;

         // const Tasks = MockDB.getConnectionInstance().collection('Tasks');
         // await Tasks.insertOne(mockTask);


    });
    afterAll(async () => {
        await connection.close();
        await MockDB.close();
    });

    it('it should update correctly',   async () => {
        const Tasks = MockDB.getConnectionInstance().collection('Tasks');
        await Tasks.insertOne(mockTask);

        let reply = await taskManagerService.updateEverythingTask(MockDB, mockTask._id, testTask);//.assignee, testTask.assigner, testTask.description, testTask.issued, testTask.due, testTask.nodeID, testTask.status, testTask.projectID
        let response =  await taskManagerService.getTaskByID(MockDB, mockTask._id);
        expect(response._id).toStrictEqual(mockTask._id);
        expect(response.taskMembers).toStrictEqual(testTask.taskMembers);
        expect(response.assigner).toStrictEqual(testTask.assigner);
        expect(response.description).toStrictEqual(testTask.description);
        expect(response.issued).toStrictEqual(testTask.issued);
        expect(response.due).toStrictEqual(testTask.due);
        expect(response.nodeID).toStrictEqual(testTask.nodeID);
        expect(response.status).toStrictEqual(testTask.status);
        expect(response.projectID).toStrictEqual(testTask.projectID);
        expect(response.title).toStrictEqual(testTask.title);

        await taskManagerService.deleteTaskByID(MockDB, mockTask._id);

    });

    it('If task not found',   async () => {
        let reply = await taskManagerService.getTaskByID(MockDB, mockTask._id);
        expect(reply).toStrictEqual("No available task");

    });

});

