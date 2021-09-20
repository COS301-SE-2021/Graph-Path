describe('task endpoints integration tests',()=> {
//describe('/statistics/RadarGraph/:projectID',()=> {

    describe("when requested", ()=>{

        let connection;
        let MockDB;
        let mockMemberObject = {
            email:"test@gmail.com",
            permissions: ['owner']
        }
        let mockProject ={
            _id:  new mongoose.mongo.ObjectID(),
            projectOwner: "testOwner@gmail.com",
            projectName:"testProject",
            projectDescription: "testDescription",
            startDate :"2021/01/01",
            dueDate : "2021/01/01",
            status: "not started",
            groupMembers :[mockMemberObject],
            graph: {},
            lastAccessed: new Date(),

        };
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
        let mockUser= {

        }
        beforeAll(async () => {

            connection = await MongoClient.connect(global.__MONGO_URI__, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            MockDB = await MockDBController.getConnectionInstance();
            const Projects =  MockDB.collection('Projects');
            const Tasks    =  MockDB.collection('Tasks');
            const Users    =  MockDB.collection('Users');

            const MockProjectCollection = await require('../MockCollections/mockProjects.json');
            const MockTaskCollection = await require('../MockCollections/mockTasks.json');
            const MockUserCollection = await require('../MockCollections/mockUser.json');


            let test_n_projects =[];
            let test_n_users    =[];
            let test_n_tasks    =[];

            for (let i = 0; i <MockProjectCollection.length; i++) {
                test_n_projects.push(MockProjectCollection[i]);
                test_n_projects[i]._id = MockProjectCollection[i]._id.$oid.toString();

            }

            for (let i = 0; i <MockTaskCollection.length; i++) {
                test_n_users.push(MockTaskCollection[i]);
                test_n_users[i]._id = MockTaskCollection[i]._id.$oid.toString();

            }
            for (let i = 0; i <MockUserCollection.length; i++) {
                test_n_tasks.push(MockUserCollection[i]);
                test_n_tasks[i]._id = MockUserCollection[i]._id.$oid.toString();
            }

            await Projects.insertMany(test_n_projects);
            await Projects.insertMany(test_n_users);
            await Projects.insertMany(test_n_tasks);


        });
        afterAll(async () => {
            MockDB.collection('Projects').drop();
            MockDB.collection('Tasks').drop();
            MockDB.collection('Users').drop();
            await connection.close();
            await MockDB.close();
        });


//
    })
});