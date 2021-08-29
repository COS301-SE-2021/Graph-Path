require('dotenv').config({path:'../.env'});
const  nodemailer = require('nodemailer');
const nodeMailGun = require('nodemailer-mailgun-transport');
const hbs = require('nodemailer-express-handlebars');

/*
* This function is used to send notifications
* using outlook email address as the sender
*
* The function takes in type and recipients as parameters
*       -> @type: refers to the type of notification we are sending.
*               ->valid types include: "New Project" , "New Task" , DueDate
*       -> @recipients: This is a list of email addresses as strings of whom the
*                       notification is intended for.
*       ->@bodyInfo: this information needed to compose the body
*
*/
function sendNotification(type , recipients, bodyInfo)
{

    let body = "";
    let subject = "";
    let htmlBody = ""
    let viewPath = ""
    let templateName = ""
    switch (type)
    {
        case "New project":
            subject=" New project assignment"
            body  = "You Have been added to new Project\n";
            viewPath = "./Notifications/views/"
            templateName = 'inviteToProject'

            break;

            case "New task":
                break;

            case "deadline reminder ":
                break;
            default:
                console.log("incorrect  notifcaiton type given type")
                return;
                break;


        }

    const username = "graphpathnocap@outlook.com";
    const password = "NoCaps@2K21";

    let transporter = nodemailer.createTransport({
        service: "hotmail",
        auth:{
            user: username,
            pass: password
        },
        template: templateName
    });
    // here we add support for using html templates and handlebars
    transporter.use('compile',hbs({
        viewEngine:{
            partialsDir:viewPath,
            defaultLayout:""
        },
        viewPath: viewPath,
        extName:".hbs"
    }))

    const options = {
        from : username,
        to : recipients,
        subject : subject,
        text: body,
        attachments: [{
           filename:'graphPathLogo.png',
           path: './Notifications/views/images/graphPathLogo.png',
            cid:'logo'
        },
            {
                filename:'bee.png',
                path: './Notifications/views/images/bee.png',
                cid:'footer'
            }
        ],
        template:'inviteToProject'
    };
    transporter.sendMail(options, function (err, info){
        if( err)
        {
            console.log(err);
            return -1
        }
        else {
            console.log("sent",info)
            return 1;
        }

    })

}

//step 1
 const auth = {
    auth: {
        api_key:'24a5829793580774279cab0bca0fb989-9776af14-25de69c5',
        domian: 'sandboxc317c48b41d44ba399e9809fd7ae2f40.mailgun.org'
    }
 }



const username = process.env.MAIL_USERNAME;
const password = process.env.MAIL_PASSWORD;

let transporter = nodemailer.createTransport({
    service: "hotmail",
    auth:{
        user: username,
        pass: password
    },
    template: 'inviteToProjects'

});

const path = require('path');


transporter.use('compile',hbs({
    viewEngine:{
        partialsDir:path.resolve(__dirname,"./Notifications/views/"),
        defaultLayout:false
    },
    viewPath:path.resolve(__dirname,"./Notifications/views/"),
    extName:".hbs"
}))


function sendInvites(ProjectName , projectOwner , projectDueDate, recipients)
{

    const username = process.env.MAIL_USERNAME;
    const password = process.env.MAIL_PASSWORD;
    let subject="Graph path new project invite";
    let body  = "You Have been invited to a project\n";
    let viewPath = "./Notifications/views/";
    let templateName = 'inviteToProject';

    let transporter = nodemailer.createTransport({
        service: "hotmail",
        auth:{
            user: username,
            pass: password
        },
        template: templateName
    });
    transporter.use('compile',hbs({
        viewEngine:{
            partialsDir:path.resolve(__dirname,viewPath),
            defaultLayout:""
        },
        viewPath: path.resolve(__dirname,viewPath),
        extName:".hbs"
    }))
    const options = {
        from : username,
        to : recipients,
        subject : subject,
        text: body,
        template:'inviteToProject',
        context: {
            projectName: ProjectName,
            owner: projectOwner,
            dueDate: projectDueDate,
        },
        attachments:  [{
            filename: 'graphPathLogo.png',
            path: __dirname +'/Notifications/views/images/graphPathLogo.png',
            cid: 'graphPathLogo'
        }]
    };

    //console.log(username,password)
    transporter.sendMail(options)
        .then((result)=>{

            console.log("success")
        })
        .catch((error)=>{
            console.log("error", error)
        })

}




function NewAccountCreation(userEmail , userName)
{
    const username = process.env.MAIL_USERNAME;
    const password = process.env.MAIL_PASSWORD;
    let subject="Graph path new project invite";
    let body  = "You Have been added to new Project\n";
    let viewPath = "./Notifications/views/";
    let templateName = 'NewAccount';

    let transporter = nodemailer.createTransport({
        service: "hotmail",
        auth:{
            user: username,
            pass: password
        },
        template: templateName
    });
    transporter.use('compile',hbs({
        viewEngine:{
            partialsDir:path.resolve(__dirname,viewPath),
            defaultLayout:""
        },
        viewPath: path.resolve(__dirname,viewPath),
        extName:".hbs"
    }))
    const options = {
        from : username,
        to : userEmail,
        subject : subject,
        text: body,
        template:'NewAccount',
        context: {
            name: userName,
        }
    };

    console.log(username,password)
    transporter.sendMail(options)
        .then((result)=>{

            console.log("success")
        })
        .catch((error)=>{
            console.log("error", error)
        })
}

//sendNotification("New project",'u17049106@tuks.co.za');

//sendInvites("test Project 1", 'u17049106@tuks.co.za');

module.exports = {
    sendInvites,
}


