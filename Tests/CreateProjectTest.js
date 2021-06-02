const assert = require('assert');

const createNewProject  = require('../Services/CreateNewProject')



describe("the create new Project function" , function(){


    it('it should create new project',function(){
        let project =
            {
                Name: "Project demo1",
                id: "000",
                startDate:"2021-01-01",
                dueDate:"2021-05-05",
                Members:{
                    developer1 : "Person 1",
                    developer2 : "Person 2",
                    developer3 : "Person 3",
                },
                Owner: "Bob Vans",
                Graph:" some object" ,


            }

        const result = createNewProject(project);
        assert.strictEqual(result,1);
    });



});
