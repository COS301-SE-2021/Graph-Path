const  nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')

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
            templateName = 'newProjectNotification'

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
        template:'newProjectNotification'
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

sendNotification("New project",['u17049106@tuks.co.za'])

