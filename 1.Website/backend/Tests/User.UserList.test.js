const app = require('../app');
const supertest = require('supertest');
const http = require('http')
const testApp = http.createServer(app)
const {MongoClient} = require('mongodb');

describe("GET: user/UserList", ()=>{

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