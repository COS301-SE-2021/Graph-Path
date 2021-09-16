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

        const invalidID = new mongoose.mongo.ObjectID();
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
        await Projects.insertOne(mockProject);


    });
    afterAll(async () => {
        await connection.close();
        await MockDB.close();
    });

    it('it should return an error when the project already exists',   async () => {

        const response = await ProjectmanagerService.insertProject(MockDB,mockProject);
        expect(response.message).toBeDefined();

    });

    it('it should add the project when the project',   async () => {
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