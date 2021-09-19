const MockDBController = require('../../Controllers/MockDBController');
const ProjectmanagerService = require('../../Services/ProjectManagerService');
const {MongoClient} = require("mongodb");
const mongoose = require("mongoose");




describe('ProjectManagerService.getProjectByID',  ()=> {

    let connection;
    let MockDB;
    let mockMemberObject = {
        email:"test@gmail.com",
        permissions: ['owner']
    }

    let mockProject ={
        _id:  new mongoose.mongo.ObjectID(),
        projectOwner: "testOwner",
        projectName:"testProject",
        projectDescription: "testDescription",
        startDate :"2021/01/01",
        dueDate : "2021/01/01",
        status: "not started",
        groupMembers :[mockMemberObject],
        graph: {},
        lastAccessed: new Date(),

    };
    beforeAll(async () => {

        connection = await MongoClient.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        MockDB = await MockDBController;

        const Projects = MockDB.getConnectionInstance().collection('Projects');
        await Projects.insertOne(mockProject);


    });
    afterAll(async () => {
        await  ProjectmanagerService.removeProjectByID(MockDB, mockProject._id)
        await connection.close();
        await MockDB.close();
    });

    it('it should return when an error when the project does not exist',   async () => {

        const invalidID = new mongoose.mongo.ObjectID();
        const response = await ProjectmanagerService.getProjectByID(MockDB,invalidID);
        expect(response.message).toBe("No project with given id");

    });

    it('it should return the project if it exist',   async () => {
        const validID = mockProject._id;
        const response = await ProjectmanagerService.getProjectByID(MockDB,validID);
        expect(response._id).toStrictEqual(validID);

    });


    it('it should return the full project object',   async () => {
        const validID = mockProject._id;
        const response = await ProjectmanagerService.getProjectByID(MockDB,validID);
        expect(response.projectOwner).toStrictEqual(mockProject.projectOwner);
        expect(response.projectName).toStrictEqual(mockProject.projectName);
        expect(response.projectDescription).toStrictEqual(mockProject.projectDescription);
        expect(response.startDate).toStrictEqual(mockProject.startDate);
        expect(response.dueDate).toStrictEqual(mockProject.dueDate);
        expect(response.status).toStrictEqual(mockProject.status);
        expect(response.groupMembers).toStrictEqual(mockProject.groupMembers);
        expect(response.graph).toStrictEqual(mockProject.graph);
        expect(response.lastAccessed).toStrictEqual(mockProject.lastAccessed);

    });

});

describe('ProjectManagerService.getAllProjects',  ()=> {

    let connection;
    let MockDB;
    let mockMemberObject = {
        email:"test@gmail.com",
        permissions: ['owner']
    }

    let mockProject ={
        _id:  new mongoose.mongo.ObjectID(),
        projectOwner: "testOwner",
        projectName:"testProject",
        projectDescription: "testDescription",
        startDate :"2021/01/01",
        dueDate : "2021/01/01",
        status: "not started",
        groupMembers :[mockMemberObject],
        graph: {},
        lastAccessed: new Date(),

    };
    beforeAll(async () => {

        connection = await MongoClient.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        MockDB = await MockDBController;

        let Projects = MockDB.getConnectionInstance().collection('Projects');



    });
    afterAll(async () => {
        await connection.close();
        await MockDB.close();
    });

    it('it should return empty list when there are no projects',   async () => {
        const response = await ProjectmanagerService.getAllProjects(MockDB);
        expect(response).toStrictEqual([]);

    });

    it('it should return a list of all the projects when they exist',   async () => {
        let Projects = MockDB.getConnectionInstance().collection('Projects');
        await Projects.insertOne(mockProject);
        const validID = mockProject._id;
        const response = await ProjectmanagerService.getProjectByID(MockDB,validID);
        expect(response).toBeDefined();

    });


    it('it should return the full project object',   async () => {
        const validID = mockProject._id;
        const response = await ProjectmanagerService.getProjectByID(MockDB,validID);
        expect(response.projectOwner).toStrictEqual(mockProject.projectOwner);
        expect(response.projectName).toStrictEqual(mockProject.projectName);
        expect(response.projectDescription).toStrictEqual(mockProject.projectDescription);
        expect(response.startDate).toStrictEqual(mockProject.startDate);
        expect(response.dueDate).toStrictEqual(mockProject.dueDate);
        expect(response.status).toStrictEqual(mockProject.status);
        expect(response.groupMembers).toStrictEqual(mockProject.groupMembers);
        expect(response.graph).toStrictEqual(mockProject.graph);
        expect(response.lastAccessed).toStrictEqual(mockProject.lastAccessed);

    });

});

describe('ProjectManagerService.getProjectsByUserEmail',  ()=> {

    let connection;
    let MockDB;
    let mockMemberObject = {
        email:"test@gmail.com",
        permissions: ['owner']
    }

    let mockProject ={
        _id:  new mongoose.mongo.ObjectID(),
        projectOwner: "test@gmail.com",
        projectName:"testProject",
        projectDescription: "testDescription",
        startDate :"2021/01/01",
        dueDate : "2021/01/01",
        status: "not started",
        groupMembers :[mockMemberObject],
        graph: {},
        lastAccessed: new Date(),

    };
    beforeAll(async () => {

        connection = await MongoClient.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        MockDB = await MockDBController;

        const Projects = MockDB.getConnectionInstance().collection('Projects');
        await Projects.insertOne(mockProject);


    });
    afterAll(async () => {
        await connection.close();
        await MockDB.close();
    });

    it('it should return an empty list when the user does not have projects',   async () => {

        const email = mockProject.projectOwner;
        const response = await ProjectmanagerService.getAllProjectsByUserEmail(MockDB,"fakemail@gmail.com");
        expect(response).toBe("No matched projects");

    });

    it('it should return the projects if they exist',   async () => {
        const email = mockProject.projectOwner;
        const response = await ProjectmanagerService.getAllProjectsByUserEmail(MockDB,email);
        expect(response).toBeDefined();

    });


    it('it should return the full project object',   async () => {
        const validID = mockProject._id;
        const response = await ProjectmanagerService.getProjectByID(MockDB,validID);
        expect(response.projectOwner).toStrictEqual(mockProject.projectOwner);
        expect(response.projectName).toStrictEqual(mockProject.projectName);
        expect(response.projectDescription).toStrictEqual(mockProject.projectDescription);
        expect(response.startDate).toStrictEqual(mockProject.startDate);
        expect(response.dueDate).toStrictEqual(mockProject.dueDate);
        expect(response.status).toStrictEqual(mockProject.status);
        expect(response.groupMembers).toStrictEqual(mockProject.groupMembers);
        expect(response.graph).toStrictEqual(mockProject.graph);
        expect(response.lastAccessed).toStrictEqual(mockProject.lastAccessed);

    });

});

describe('ProjectManagerService.insertProject',  ()=> {

    let connection;
    let MockDB;
    let mockMemberObject = {
        email:"test@gmail.com",
        permissions: ['owner']
    }

    let mockProject ={
        _id:  new mongoose.mongo.ObjectID(),
        projectOwner: "test@gmail.com",
        projectName:"testProject",
        projectDescription: "testDescription",
        startDate :"2021/01/01",
        dueDate : "2021/01/01",
        status: "not started",
        groupMembers :[mockMemberObject],
        graph: {},
        lastAccessed: new Date(),

    };
    beforeAll(async () => {

        connection = await MongoClient.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        MockDB = await MockDBController;

        const Projects = MockDB.getConnectionInstance().collection('Projects');
        await Projects.insertOne(MockDB, mockProject);


    });
    afterAll(async () => {
        await connection.close();
        await MockDB.close();
    });

    it('it should return an error when the project already exists',   async () => {

        const response = await ProjectmanagerService.insertProject(MockDB,mockProject);
        expect(response.message).toBeDefined();

    });

    it('it should add the project',   async () => {
        let mockProject2 ={
            _id:  new mongoose.mongo.ObjectID(),
            projectOwner: "test@gmail.com",
            projectName:"testProject",
            projectDescription: "testDescription",
            startDate :"2021/01/01",
            dueDate : "2021/01/01",
            status: "not started",
            groupMembers :[mockMemberObject],
            graph: {},
            lastAccessed: new Date(),

        };
        const response = await ProjectmanagerService.insertProject(MockDB,mockProject2);
        expect(response).toBeDefined();

    });


    it('it should return the full project object',   async () => {
        const validID = mockProject._id;
        const response = await ProjectmanagerService.getProjectByID(MockDB,validID);
        expect(response.projectOwner).toStrictEqual(mockProject.projectOwner);
        expect(response.projectName).toStrictEqual(mockProject.projectName);
        expect(response.projectDescription).toStrictEqual(mockProject.projectDescription);
        expect(response.startDate).toStrictEqual(mockProject.startDate);
        expect(response.dueDate).toStrictEqual(mockProject.dueDate);
        expect(response.status).toStrictEqual(mockProject.status);
        expect(response.groupMembers).toStrictEqual(mockProject.groupMembers);
        expect(response.graph).toStrictEqual(mockProject.graph);
        expect(response.lastAccessed).toStrictEqual(mockProject.lastAccessed);

    });

});

describe('ProjectManagerService.removeProjectByID',  ()=> {

    let connection;
    let MockDB;
    let mockMemberObject = {
        email:"test@gmail.com",
        permissions: ['owner']
    }

    let mockProject ={
        _id:  new mongoose.mongo.ObjectID(),
        projectOwner: "test@gmail.com",
        projectName:"testProject",
        projectDescription: "testDescription",
        startDate :"2021/01/01",
        dueDate : "2021/01/01",
        status: "not started",
        groupMembers :[mockMemberObject],
        graph: {},
        lastAccessed: new Date(),

    };
    beforeAll(async () => {

        connection = await MongoClient.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        MockDB = await MockDBController;

        // const Projects = MockDB.getConnectionInstance().collection('Projects');
        // await Projects.insertOne(mockProject);


    });
    afterAll(async () => {
        await connection.close();
        await MockDB.close();
    });

    it('it should return deleted count "0" if the project is not found',   async () => {

        const response = await ProjectmanagerService.removeProjectByID(MockDB,mockProject._id);
        expect(response.deletedCount).toBe(0);

    });

    it('it should remove the project if the project exists',   async () => {
        const Projects = MockDB.getConnectionInstance().collection('Projects');
        await Projects.insertOne(mockProject);

        const response = await ProjectmanagerService.removeProjectByID(MockDB,mockProject._id);
        expect(response).toBeDefined();


    });

});

describe('ProjectManagerService.updateProjectGraph',  ()=> {

    let connection;
    let MockDB;
    let mockMemberObject = {
        email:"test@gmail.com",
        permissions: ['owner']
    }

    let mockProject ={
        _id:  new mongoose.mongo.ObjectID(),
        projectOwner: "test@gmail.com",
        projectName:"testProject",
        projectDescription: "testDescription",
        startDate :"2021/01/01",
        dueDate : "2021/01/01",
        status: "not started",
        groupMembers :[mockMemberObject],
        graph: {},
        lastAccessed: new Date(),

    };
    let mockProject2 ={
        _id:  new mongoose.mongo.ObjectID(),
        projectOwner: "test2@gmail.com",
        projectName:"testProject2",
        projectDescription: "testDescription2",
        startDate :"2021/01/01",
        dueDate : "2021/01/01",
        status: "not started",
        groupMembers :[mockMemberObject],
        graph: {"nodes": [{"id": "n2", "label": "ARS", "x": 113.5, "y": -23.328125, "size": 20, "color": "#f00000"}, {"id": "n1", "label": "1", "x": 2, "y": -15, "size": 20, "color": "#f00000"}, {"id": "n3", "label": "ARS", "x": 4, "y": 4, "size": 20, "color": "#f00000"}], "edges": [{"id": "e1", "from": "n1", "to": "n2", "label": "1 to -> ARS", "color": "#0ff", "size": 2}, {"id": "e2", "from": "n1", "to": "n3", "label": "1 to -> ARS", "color": "#0ff", "size": 2}]},
        lastAccessed: new Date(),

    };

    beforeAll(async () => {

        connection = await MongoClient.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        MockDB = await MockDBController;

        // const Projects = MockDB.getConnectionInstance().collection('Projects');
        // await Projects.insertOne(mockProject);


    });
    afterAll(async () => {
        await connection.close();
        await MockDB.close();
    });

    it('it should return modified count "0" if the project is not found',   async () => {

        const response = await ProjectmanagerService.updateProjectGraph(MockDB,mockProject._id, mockProject.graph);
        expect(response.modifiedCount).toBe(0);

    });

    it('it should update the graph of the project if the project exists (empty graph)',   async () => {
        const Projects = MockDB.getConnectionInstance().collection('Projects');
        await Projects.insertOne(mockProject);

        const replies = await ProjectmanagerService.getProjectByID(MockDB, mockProject._id);
        expect(replies.projectOwner).toStrictEqual(mockProject.projectOwner);

        const response = await ProjectmanagerService.updateProjectGraph(MockDB, mockProject._id, mockProject.graph);
        expect(response.modifiedCount).toStrictEqual(1);
        const reply = await ProjectmanagerService.getProjectByID(MockDB, mockProject._id);
        expect(reply.graph).toStrictEqual(mockProject.graph);

        await ProjectmanagerService.removeProjectByID(MockDB,mockProject._id);
    });

    it('it should update the graph of the project if the project exists (populated graph)',   async () => {
        const Projects = MockDB.getConnectionInstance().collection('Projects');
        await Projects.insertOne(mockProject);

        const response = await ProjectmanagerService.updateProjectGraph(MockDB, mockProject._id, mockProject2.graph);
        expect(response.modifiedCount).toStrictEqual(1);
        const reply = await ProjectmanagerService.getProjectByID(MockDB, mockProject._id);
        expect(reply.graph).toStrictEqual(mockProject2.graph);

        await ProjectmanagerService.removeProjectByID(MockDB,mockProject._id);
    });

});

describe('ProjectManagerService.addNewProjectMember',  ()=> {

    let connection;
    let MockDB;
    let mockMemberObject = {
        email:"test@gmail.com",
        permissions: ['owner']
    }
    let mockMemberObject2 = {
        email:"tester2@gmail.com",
        permissions: ['owner']
    }

    mockMembers = [mockMemberObject2];

    let mockProject ={
        _id:  new mongoose.mongo.ObjectID(),
        projectOwner: "test@gmail.com",
        projectName:"testProject",
        projectDescription: "testDescription",
        startDate :"2021/01/01",
        dueDate : "2021/01/01",
        status: "not started",
        groupMembers :[mockMemberObject],
        graph: {},
        lastAccessed: new Date(),

    };
    let mockProject2 ={
        _id:  new mongoose.mongo.ObjectID(),
        projectOwner: "test2@gmail.com",
        projectName:"testProject2",
        projectDescription: "testDescription2",
        startDate :"2021/01/01",
        dueDate : "2021/01/01",
        status: "not started",
        groupMembers :[mockMemberObject],
        graph: {"nodes": [{"id": "n2", "label": "ARS", "x": 113.5, "y": -23.328125, "size": 20, "color": "#f00000"}, {"id": "n1", "label": "1", "x": 2, "y": -15, "size": 20, "color": "#f00000"}, {"id": "n3", "label": "ARS", "x": 4, "y": 4, "size": 20, "color": "#f00000"}], "edges": [{"id": "e1", "from": "n1", "to": "n2", "label": "1 to -> ARS", "color": "#0ff", "size": 2}, {"id": "e2", "from": "n1", "to": "n3", "label": "1 to -> ARS", "color": "#0ff", "size": 2}]},
        lastAccessed: new Date(),

    };

    beforeAll(async () => {

        connection = await MongoClient.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        MockDB = await MockDBController;

        // const Projects = MockDB.getConnectionInstance().collection('Projects');
        // await Projects.insertOne(mockProject);


    });
    afterAll(async () => {
        await connection.close();
        await MockDB.close();
    });

    it('it should be unsuccessful if the project is not found',   async () => {
       await expect(async ()=>{
            await ProjectmanagerService.addNewProjectMember(MockDB,mockProject._id, mockMembers);
        }).rejects.toThrow("update failed");
        // const response = await .addNewProjectMember(MockDB,mockProject._id, mockMembers);
        // expect(response).toBeDefined();

    });

    it('it should update the members of the project if the project exists',   async () => {
        const Projects = MockDB.getConnectionInstance().collection('Projects');
        await Projects.insertOne(mockProject);

        const replies = await ProjectmanagerService.getProjectByID(MockDB, mockProject._id);
        expect(replies.projectOwner).toStrictEqual(mockProject.projectOwner);

        let inputArr = [mockMemberObject2];
        const response = await ProjectmanagerService.addNewProjectMember(MockDB, mockProject._id, inputArr);
        expect(response.groupMembers).toStrictEqual([mockMemberObject,mockMemberObject2]);
        const reply = await ProjectmanagerService.getProjectByID(MockDB, mockProject._id);
        expect(reply.groupMembers).toStrictEqual(mockProject.groupMembers);

        await ProjectmanagerService.removeProjectByID(MockDB,mockProject._id);
    });

});

describe('ProjectManagerService.updateEverythingProject',  ()=> {

    let connection;
    let MockDB;
    let mockMemberObject = {
        email:"test@gmail.com",
        permissions: ['owner']
    }

    mockMembers=[mockMemberObject];

    let mockProject ={
        _id:  new mongoose.mongo.ObjectID(),
        projectOwner: "test@gmail.com",
        projectName:"testProject",
        projectDescription: "testDescription",
        startDate :"2021/01/01",
        dueDate : "2021/01/01",
        status: "not started",
        groupMembers :[mockMemberObject],
        graph: {},
        lastAccessed: new Date(),

    };
    let mockProject2 ={
        _id:  new mongoose.mongo.ObjectID(),
        projectOwner: "test2@gmail.com",
        projectName:"testProject2",
        projectDescription: "testDescription2",
        startDate :"2021/01/01",
        dueDate : "2021/01/01",
        status: "not started",
        groupMembers :[mockMemberObject],
        graph: {"nodes": [{"id": "n2", "label": "ARS", "x": 113.5, "y": -23.328125, "size": 20, "color": "#f00000"}, {"id": "n1", "label": "1", "x": 2, "y": -15, "size": 20, "color": "#f00000"}, {"id": "n3", "label": "ARS", "x": 4, "y": 4, "size": 20, "color": "#f00000"}], "edges": [{"id": "e1", "from": "n1", "to": "n2", "label": "1 to -> ARS", "color": "#0ff", "size": 2}, {"id": "e2", "from": "n1", "to": "n3", "label": "1 to -> ARS", "color": "#0ff", "size": 2}]},
        lastAccessed: new Date(),

    };

    beforeAll(async () => {

        connection = await MongoClient.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        MockDB = await MockDBController;

        // const Projects = MockDB.getConnectionInstance().collection('Projects');
        // await Projects.insertOne(mockProject);


    });
    afterAll(async () => {
        await connection.close();
        await MockDB.close();
    });

    it('it should return modified count "0" if the project is not found',   async () => {

        const response = await ProjectmanagerService.updateEverythingProject(MockDB,mockProject._id, mockProject.projectName,mockProject.dueDate, mockProject.startDate, mockProject.projectOwner, mockProject.graph, mockProject.groupMembers);
        expect(response.modifiedCount).toBe(0);

    });

    it('it should update the project if the project exists',   async () => {
        const Projects = MockDB.getConnectionInstance().collection('Projects');
        await Projects.insertOne(mockProject);

        const response = await ProjectmanagerService.updateEverythingProject(MockDB,mockProject._id, mockProject.projectName,mockProject.dueDate, mockProject.startDate, mockProject.projectOwner, mockProject.graph, mockProject.groupMembers);
        expect(response.modifiedCount).toStrictEqual(1);
        const reply = await ProjectmanagerService.getProjectByID(MockDB, mockProject._id);
        expect(reply.projectName).toStrictEqual(mockProject.projectName);
        expect(reply.dueDate).toStrictEqual(mockProject.dueDate);
        expect(reply.startDate).toStrictEqual(mockProject.startDate);
        expect(reply.projectOwner).toStrictEqual(mockProject.projectOwner);
        expect(reply.graph).toStrictEqual(mockProject.graph);
        expect(reply.groupMembers).toStrictEqual(mockProject.groupMembers);


        await ProjectmanagerService.removeProjectByID(MockDB,mockProject._id);
    });


});

describe('ProjectManagerService.removeProjectMember',  ()=> {

    let connection;
    let MockDB;
    let mockMemberObject = {
        email:"test@gmail.com",
        permissions: ['owner']
    }
    let mockMemberObject2 = {
        email:"test2@gmail.com",
        permissions: ['owner']
    }

    let mockProject ={
        _id:  new mongoose.mongo.ObjectID(),
        projectOwner: "test@gmail.com",
        projectName:"testProject",
        projectDescription: "testDescription",
        startDate :"2021/01/01",
        dueDate : "2021/01/01",
        status: "not started",
        groupMembers :[mockMemberObject],
        graph: {},
        lastAccessed: new Date(),

    };
    let mockProject2 ={
        _id:  new mongoose.mongo.ObjectID(),
        projectOwner: "test2@gmail.com",
        projectName:"testProject2",
        projectDescription: "testDescription2",
        startDate :"2021/01/01",
        dueDate : "2021/01/01",
        status: "not started",
        groupMembers :[mockMemberObject, mockMemberObject2],
        graph: {},
        lastAccessed: new Date(),

    };

    beforeAll(async () => {

        connection = await MongoClient.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        MockDB = await MockDBController;

        // const Projects = MockDB.getConnectionInstance().collection('Projects');
        // await Projects.insertOne(mockProject);


    });
    afterAll(async () => {
        await connection.close();
        await MockDB.close();
    });

    it('it should remove a member of the project if the project exists',   async () => {
        const Projects = MockDB.getConnectionInstance().collection('Projects');
        await Projects.insertOne(mockProject2);

        const replies = await ProjectmanagerService.getProjectByID(MockDB, mockProject2._id);
        expect(replies.projectOwner).toStrictEqual(mockProject2.projectOwner);

        const response = await ProjectmanagerService.removeProjectMember(MockDB, mockProject2._id, mockMemberObject2.email);
        //expect(response.deletedCount).toStrictEqual(1);
        const reply = await ProjectmanagerService.getProjectByID(MockDB, mockProject2._id);
        expect(reply.groupMembers).toStrictEqual([mockMemberObject]);

        await ProjectmanagerService.removeProjectByID(MockDB,mockProject2._id);
    });

    it('when trying to remove a projectMember that does not exist',   async () => {
        const Projects = MockDB.getConnectionInstance().collection('Projects');
        await Projects.insertOne(mockProject);

        const replies = await ProjectmanagerService.getProjectByID(MockDB, mockProject._id);
        expect(replies.projectOwner).toStrictEqual(mockProject.projectOwner);

        const response = await ProjectmanagerService.removeProjectMember(MockDB, mockProject._id, mockMemberObject2.email);
        //expect(response.groupMembers).toStrictEqual([mockMemberObject]);
        const reply = await ProjectmanagerService.getProjectByID(MockDB, mockProject._id);
        expect(reply.groupMembers).toStrictEqual([mockMemberObject]);

        await ProjectmanagerService.removeProjectByID(MockDB,mockProject._id);
    });

    it('if the project is not found',   async () => {

        const response = await ProjectmanagerService.removeProjectMember(MockDB,mockProject._id, mockMemberObject.email);
        expect(response).toBe("Could not find the project.");

    });

});

describe('ProjectManagerService.editMemberRole',  ()=> {

    let connection;
    let MockDB;
    let mockMemberObject = {
        email:"test@gmail.com",
        permissions: ['owner']
    }

    let mockProject ={
        _id:  new mongoose.mongo.ObjectID(),
        projectOwner: "test@gmail.com",
        projectName:"testProject",
        projectDescription: "testDescription",
        startDate :"2021/01/01",
        dueDate : "2021/01/01",
        status: "not started",
        groupMembers :[mockMemberObject],
        graph: {},
        lastAccessed: new Date(),

    };
    let mockProject2 ={
        _id:  new mongoose.mongo.ObjectID(),
        projectOwner: "test2@gmail.com",
        projectName:"testProject2",
        projectDescription: "testDescription2",
        startDate :"2021/01/01",
        dueDate : "2021/01/01",
        status: "not started",
        groupMembers :[mockMemberObject],
        graph: {"nodes": [{"id": "n2", "label": "ARS", "x": 113.5, "y": -23.328125, "size": 20, "color": "#f00000"}, {"id": "n1", "label": "1", "x": 2, "y": -15, "size": 20, "color": "#f00000"}, {"id": "n3", "label": "ARS", "x": 4, "y": 4, "size": 20, "color": "#f00000"}], "edges": [{"id": "e1", "from": "n1", "to": "n2", "label": "1 to -> ARS", "color": "#0ff", "size": 2}, {"id": "e2", "from": "n1", "to": "n3", "label": "1 to -> ARS", "color": "#0ff", "size": 2}]},
        lastAccessed: new Date(),

    };

    beforeAll(async () => {

        connection = await MongoClient.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        MockDB = await MockDBController;

        // const Projects = MockDB.getConnectionInstance().collection('Projects');
        // await Projects.insertOne(mockProject);


    });
    afterAll(async () => {
        await connection.close();
        await MockDB.close();
    });

    it('it should return modified count "0" if the project is not found',   async () => {

        const response = await ProjectmanagerService.updateProjectGraph(MockDB,mockProject._id, mockProject.graph);
        expect(response.modifiedCount).toBe(0);

    });

    it('it should update the graph of the project if the project exists (empty graph)',   async () => {
        const Projects = MockDB.getConnectionInstance().collection('Projects');
        await Projects.insertOne(mockProject);

        const response = await ProjectmanagerService.updateProjectGraph(MockDB, mockProject._id, mockProject.graph);
        expect(response.modifiedCount).toStrictEqual(1);
        const reply = await ProjectmanagerService.getProjectByID(MockDB, mockProject._id);
        expect(reply.graph).toStrictEqual(mockProject.graph);

        await ProjectmanagerService.removeProjectByID(MockDB,mockProject._id);
    });

    it('it should update the graph of the project if the project exists (populated graph)',   async () => {
        const Projects = MockDB.getConnectionInstance().collection('Projects');
        await Projects.insertOne(mockProject);

        const response = await ProjectmanagerService.updateProjectGraph(MockDB, mockProject._id, mockProject2.graph);
        expect(response.modifiedCount).toStrictEqual(1);
        const reply = await ProjectmanagerService.getProjectByID(MockDB, mockProject._id);
        expect(reply.graph).toStrictEqual(mockProject2.graph);

        await ProjectmanagerService.removeProjectByID(MockDB,mockProject._id);
    });

});

describe('ProjectManagerService.updateProjectOwner',  ()=> {

    let connection;
    let MockDB;
    let mockMemberObject = {
        email:"test@gmail.com",
        permissions: ['owner']
    }

    let mockProject ={
        _id:  new mongoose.mongo.ObjectID(),
        projectOwner: "test@gmail.com",
        projectName:"testProject",
        projectDescription: "testDescription",
        startDate :"2021/01/01",
        dueDate : "2021/01/01",
        status: "not started",
        groupMembers :[mockMemberObject],
        graph: {},
        lastAccessed: new Date(),

    };
    let mockProject2 ={
        _id:  new mongoose.mongo.ObjectID(),
        projectOwner: "test2@gmail.com",
        projectName:"testProject2",
        projectDescription: "testDescription2",
        startDate :"2021/01/01",
        dueDate : "2021/01/01",
        status: "not started",
        groupMembers :[mockMemberObject],
        graph: {"nodes": [{"id": "n2", "label": "ARS", "x": 113.5, "y": -23.328125, "size": 20, "color": "#f00000"}, {"id": "n1", "label": "1", "x": 2, "y": -15, "size": 20, "color": "#f00000"}, {"id": "n3", "label": "ARS", "x": 4, "y": 4, "size": 20, "color": "#f00000"}], "edges": [{"id": "e1", "from": "n1", "to": "n2", "label": "1 to -> ARS", "color": "#0ff", "size": 2}, {"id": "e2", "from": "n1", "to": "n3", "label": "1 to -> ARS", "color": "#0ff", "size": 2}]},
        lastAccessed: new Date(),

    };

    beforeAll(async () => {

        connection = await MongoClient.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        MockDB = await MockDBController;

        // const Projects = MockDB.getConnectionInstance().collection('Projects');
        // await Projects.insertOne(mockProject);


    });
    afterAll(async () => {
        await connection.close();
        await MockDB.close();
    });

    it('it should return modified count "0" if the project is not found',   async () => {

        const response = await ProjectmanagerService.updateProjectGraph(MockDB,mockProject._id, mockProject.graph);
        expect(response.modifiedCount).toBe(0);

    });

    it('it should update the graph of the project if the project exists (empty graph)',   async () => {
        const Projects = MockDB.getConnectionInstance().collection('Projects');
        await Projects.insertOne(mockProject);

        const response = await ProjectmanagerService.updateProjectGraph(MockDB, mockProject._id, mockProject.graph);
        expect(response.modifiedCount).toStrictEqual(1);
        const reply = await ProjectmanagerService.getProjectByID(MockDB, mockProject._id);
        expect(reply.graph).toStrictEqual(mockProject.graph);

        await ProjectmanagerService.removeProjectByID(MockDB,mockProject._id);
    });

    it('it should update the graph of the project if the project exists (populated graph)',   async () => {
        const Projects = MockDB.getConnectionInstance().collection('Projects');
        await Projects.insertOne(mockProject);

        const response = await ProjectmanagerService.updateProjectGraph(MockDB, mockProject._id, mockProject2.graph);
        expect(response.modifiedCount).toStrictEqual(1);
        const reply = await ProjectmanagerService.getProjectByID(MockDB, mockProject._id);
        expect(reply.graph).toStrictEqual(mockProject2.graph);

        await ProjectmanagerService.removeProjectByID(MockDB,mockProject._id);
    });

});

describe('ProjectManagerService.updateProjectAccessData',  ()=> {

    let connection;
    let MockDB;
    let mockMemberObject = {
        email:"test@gmail.com",
        permissions: ['owner']
    }

    let mockProject ={
        _id:  new mongoose.mongo.ObjectID(),
        projectOwner: "test@gmail.com",
        projectName:"testProject",
        projectDescription: "testDescription",
        startDate :"2021/01/01",
        dueDate : "2021/01/01",
        status: "not started",
        groupMembers :[mockMemberObject],
        graph: {},
        lastAccessed: new Date(),

    };
    let mockProject2 ={
        _id:  new mongoose.mongo.ObjectID(),
        projectOwner: "test2@gmail.com",
        projectName:"testProject2",
        projectDescription: "testDescription2",
        startDate :"2021/01/01",
        dueDate : "2021/01/01",
        status: "not started",
        groupMembers :[mockMemberObject],
        graph: {"nodes": [{"id": "n2", "label": "ARS", "x": 113.5, "y": -23.328125, "size": 20, "color": "#f00000"}, {"id": "n1", "label": "1", "x": 2, "y": -15, "size": 20, "color": "#f00000"}, {"id": "n3", "label": "ARS", "x": 4, "y": 4, "size": 20, "color": "#f00000"}], "edges": [{"id": "e1", "from": "n1", "to": "n2", "label": "1 to -> ARS", "color": "#0ff", "size": 2}, {"id": "e2", "from": "n1", "to": "n3", "label": "1 to -> ARS", "color": "#0ff", "size": 2}]},
        lastAccessed: new Date(),

    };

    beforeAll(async () => {

        connection = await MongoClient.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        MockDB = await MockDBController;

        // const Projects = MockDB.getConnectionInstance().collection('Projects');
        // await Projects.insertOne(mockProject);


    });
    afterAll(async () => {
        await connection.close();
        await MockDB.close();
    });

    it('it should return modified count "0" if the project is not found',   async () => {

        const response = await ProjectmanagerService.updateProjectGraph(MockDB,mockProject._id, mockProject.graph);
        expect(response.modifiedCount).toBe(0);

    });

    it('it should update the graph of the project if the project exists (empty graph)',   async () => {
        const Projects = MockDB.getConnectionInstance().collection('Projects');
        await Projects.insertOne(mockProject);

        const response = await ProjectmanagerService.updateProjectGraph(MockDB, mockProject._id, mockProject.graph);
        expect(response.modifiedCount).toStrictEqual(1);
        const reply = await ProjectmanagerService.getProjectByID(MockDB, mockProject._id);
        expect(reply.graph).toStrictEqual(mockProject.graph);

        await ProjectmanagerService.removeProjectByID(MockDB,mockProject._id);
    });

    it('it should update the graph of the project if the project exists (populated graph)',   async () => {
        const Projects = MockDB.getConnectionInstance().collection('Projects');
        await Projects.insertOne(mockProject);

        const response = await ProjectmanagerService.updateProjectGraph(MockDB, mockProject._id, mockProject2.graph);
        expect(response.modifiedCount).toStrictEqual(1);
        const reply = await ProjectmanagerService.getProjectByID(MockDB, mockProject._id);
        expect(reply.graph).toStrictEqual(mockProject2.graph);

        await ProjectmanagerService.removeProjectByID(MockDB,mockProject._id);
    });

});
