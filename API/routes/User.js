const express = require('express')
const router = express.Router();
const ManageUser = require('../../Services/ManageUser')

router.get('/userList',(req, res, next)=> {

    const back = ManageUser.getAllUsers(req.body);
    res.send(back);
});

router.get('/userEmail',(req, res, next)=>{
    const back = ManageUser.getUserByEmail(req.body);
    res.send(back);
})

router.post('/insertUser',(req, res, next)=> {
    var user = {
        Name: "john",
        Surname: "doe",
        id: 1,
        email: "John@gmail.com"
    }
    mongo.connect(url, (err, db) => {
        db.collection('Users').insertOne(user, (err, result) => {
            console.log("We inserted the user into the database: " + user);
            db.close();
        });
    });

    //*******************************************************************
    //Step 1:  Take request Body :  body = req.body
    /*Step 2:  body should look like this body= { name:
                                            Surname:
                                            email
                                            password
                                            username
                                            type:
                                            Notification:
                                            */
    //step 3: res.status(200).json({body })

    // step 4: use postman to check if it returns the body as expected

    // from here i'll help you setup User into a mongoDB




});



module.exports = router;