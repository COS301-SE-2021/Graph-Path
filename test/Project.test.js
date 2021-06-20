const app = require('../app');
const supertest = require('supertest');
const http = require('http')
const testApp = http.createServer(app)

describe("POST/users", ()=> {
        describe("when given a username and password", () => {
            it('it should respond with status code 200', async () => {
                response =  await supertest(testApp)
                    .get("/")
                    .expect(200)
                    .then(()=>{


                })

            });
        });
       describe("when the username  or password is missing  " , () =>{
           it("it should return 400 status code", async ()=>{

               let email = ""
               response = await supertest(app)
                   .get('/user/login/')
                   .expect(404)
                   .then(()=>{
                        //expect(response.body['message']).toBe("no email given")
                   })

           })
           it("it should return JSON object with error message", async ()=>{

           })
       })

        describe("when the given username does not exist ",()=>{
            it("should return status code 404", async ()=>{
                response = await supertest(app)

                    .get('/user/login/hvkjvhjfjfvb')
                    .expect(404)
                    .then(()=>{
                    })
            })
            it('should return json body with error message', async ()=>{})
        })


})


describe("GET: /UserList", ()=>{
    describe("when given an email address", ()=>{
        it('should return status 200', function () {
            
        });
    } )
    describe("when the user field is missing", ()=>{
        it('should return status 400',async ()=>{
            response = await supertest(app)
                .get('/user/userList/')
                .expect(400)
                .then(()=>{})
        })
        it('should return a Json body with error message ', async ()=>{
              await supertest(app)
                .get('/user/userList/')
                .expect(400)
                .then((response)=>{
                    expect(response.body['message']).toBe("no email given")
                })

        })
    })
})


