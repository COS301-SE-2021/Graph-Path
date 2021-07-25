const  nodemailer = require('nodemailer')

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
function sendNotfication(type , recipients, bodyInfo)
{
    var body = "";
    var subject = "";
    switch (type)
    {
        case "New project":
            subject=" New project assignment"
            body  = "You Have been added to new Project\n";
            body += "project body will go here!"
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
    const transporter = nodemailer.createTransport({
        service: "hotmail",
        auth:{
            user: username,
            pass: password
        }
    });


    const options = {
        from : username,
        to : recipients,
        subject : subject,
        text: body
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

sendNotfication("New project",['u17049106@tuks.co.za','kgmonareng@gmail.com'])

